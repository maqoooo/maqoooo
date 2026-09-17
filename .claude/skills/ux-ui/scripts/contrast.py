#!/usr/bin/env python3
"""
Sprawdzanie kontrastu kolorów wg WCAG 2.1 (bez zależności zewnętrznych).

Użycie:
  python contrast.py "#5b6668" "#f3fafc"            # para: tekst, tło
  python contrast.py --css plik.css                  # audyt zmiennych --* z pliku CSS
  python contrast.py --css plik.css --pair ink:bg --pair muted:surface
  python contrast.py --css plik.css --json           # wynik jako JSON

Obsługiwane formaty: #rgb, #rrggbb, #rrggbbaa (alfa łączona z tłem),
rgb(a)(...), hsl(a)(...), nazwy CSS (white, black, ...).

Progi WCAG 2.1:
  AA  tekst normalny  >= 4.5   |  AAA tekst normalny >= 7.0
  AA  tekst duży / UI >= 3.0   |  AAA tekst duży     >= 4.5
"""
import argparse
import colorsys
import json
import re
import sys

NAMED = {
    "white": (255, 255, 255), "black": (0, 0, 0), "red": (255, 0, 0),
    "green": (0, 128, 0), "blue": (0, 0, 255), "gray": (128, 128, 128),
    "grey": (128, 128, 128), "transparent": None,
}

# Domyślne pary sprawdzane w trybie --css (nazwy tokenów bez "--").
# (pierwszy plan, tło, minimalny próg, opis)
DEFAULT_PAIRS = [
    ("ink", "bg", 4.5, "tekst główny na tle strony"),
    ("ink", "surface", 4.5, "tekst główny na karcie"),
    ("ink-strong", "bg", 4.5, "nagłówki na tle strony"),
    ("ink-strong", "surface", 4.5, "nagłówki na karcie"),
    ("muted", "bg", 4.5, "tekst drugorzędny na tle strony"),
    ("muted", "surface", 4.5, "tekst drugorzędny na karcie"),
    ("accent-text", "bg", 4.5, "tekst w kolorze akcentu na tle"),
    ("accent-text", "surface", 4.5, "tekst w kolorze akcentu na karcie"),
    ("accent-link", "bg", 4.5, "linki na tle strony"),
    ("accent-link", "surface", 4.5, "linki na karcie"),
    ("accent-text", "tint", 4.5, "tekst akcentu na tint (badge)"),
    ("on-accent", "primary", 4.5, "tekst na przycisku primary"),
    ("on-accent", "primary-hover", 4.5, "tekst na przycisku primary (hover)"),
    ("on-grad", "accent", 3.0, "tekst na gradiencie (jasny koniec, duży tekst)"),
    ("on-grad", "accent-deep", 4.5, "tekst na gradiencie (ciemny koniec)"),
    ("accent-deep", "bg", 3.0, "obrys fokusu / ikony UI w akcencie na tle"),
    ("line-strong", "bg", 3.0, "obramowanie pól na tle (WCAG 1.4.11)"),
    ("line-strong", "surface", 3.0, "obramowanie pól na karcie (WCAG 1.4.11)"),
    ("ok-text", "ok-bg", 4.5, "komunikat sukcesu"),
    ("ok", "ok-bg", 4.5, "komunikat sukcesu"),
    ("warn", "warn-bg", 4.5, "komunikat ostrzeżenia"),
    ("danger", "danger-bg", 4.5, "komunikat błędu"),
    ("danger", "bg", 4.5, "tekst błędu przy polu"),
    ("danger", "surface", 4.5, "tekst błędu na karcie"),
]


def _clamp(v, lo=0, hi=255):
    return max(lo, min(hi, v))


def parse_color(s):
    """Zwraca (r, g, b, a) w zakresie 0-255 / 0-1 lub None dla 'transparent'."""
    s = s.strip().lower()
    if s in NAMED:
        v = NAMED[s]
        return None if v is None else (*v, 1.0)
    if s.startswith("#"):
        h = s[1:]
        if len(h) in (3, 4):
            h = "".join(c * 2 for c in h)
        if len(h) == 6:
            return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), 1.0)
        if len(h) == 8:
            return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), int(h[6:8], 16) / 255)
        raise ValueError(f"Niepoprawny hex: {s}")
    m = re.match(r"(rgba?|hsla?)\(([^)]+)\)", s)
    if m:
        kind, body = m.groups()
        parts = [p.strip() for p in re.split(r"[,\s/]+", body) if p.strip()]
        nums = []
        for p in parts:
            if p.endswith("%"):
                nums.append(("pct", float(p[:-1])))
            elif p.endswith("deg"):
                nums.append(("num", float(p[:-3])))
            else:
                nums.append(("num", float(p)))
        a = 1.0
        if len(nums) == 4:
            kind_a, va = nums[3]
            a = va / 100 if kind_a == "pct" else va
        if kind.startswith("rgb"):
            ch = []
            for k, v in nums[:3]:
                ch.append(_clamp(round(v * 2.55 if k == "pct" else v)))
            return (*ch, a)
        h = nums[0][1] / 360
        sat = nums[1][1] / 100
        lig = nums[2][1] / 100
        r, g, b = colorsys.hls_to_rgb(h, lig, sat)
        return (round(r * 255), round(g * 255), round(b * 255), a)
    raise ValueError(f"Nierozpoznany kolor: {s}")


def composite(fg, bg):
    """Nakłada fg (z alfą) na bg (nieprzezroczyste). Zwraca (r, g, b)."""
    if fg is None:
        return bg[:3]
    r, g, b, a = fg
    if a >= 1:
        return (r, g, b)
    br, bgc, bb = bg[:3]
    return (round(r * a + br * (1 - a)), round(g * a + bgc * (1 - a)), round(b * a + bb * (1 - a)))


def rel_luminance(rgb):
    def ch(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = rgb
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)


def contrast_ratio(fg_rgb, bg_rgb):
    l1, l2 = rel_luminance(fg_rgb), rel_luminance(bg_rgb)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def grade(ratio):
    return {
        "AA_normal": ratio >= 4.5,
        "AA_large_ui": ratio >= 3.0,
        "AAA_normal": ratio >= 7.0,
        "AAA_large": ratio >= 4.5,
    }


def to_hex(rgb):
    return "#%02x%02x%02x" % tuple(rgb)


def check_pair(fg_s, bg_s):
    bg = parse_color(bg_s)
    if bg is None:
        raise ValueError("Tło nie może być przezroczyste")
    bg_rgb = composite(bg, (255, 255, 255, 1.0)) if bg[3] < 1 else bg[:3]
    fg = parse_color(fg_s)
    fg_rgb = composite(fg, (*bg_rgb, 1.0))
    ratio = contrast_ratio(fg_rgb, bg_rgb)
    return {"fg": fg_s, "bg": bg_s, "fg_effective": to_hex(fg_rgb), "bg_effective": to_hex(bg_rgb),
            "ratio": round(ratio, 2), **grade(ratio)}


def suggest_fix(fg_s, bg_s, target):
    """Przyciemnia/rozjaśnia fg (w HSL) aż osiągnie próg. Zwraca hex lub None."""
    bg = parse_color(bg_s)
    bg_rgb = bg[:3]
    fg = parse_color(fg_s)
    fg_rgb = composite(fg, (*bg_rgb, 1.0))
    h, l, s = colorsys.rgb_to_hls(*(c / 255 for c in fg_rgb))
    darker_bg = rel_luminance(bg_rgb) < 0.5
    step = 0.01 if darker_bg else -0.01
    for _ in range(100):
        l = l + step
        if not 0 <= l <= 1:
            return None
        r, g, b = colorsys.hls_to_rgb(h, l, s)
        cand = (round(r * 255), round(g * 255), round(b * 255))
        if contrast_ratio(cand, bg_rgb) >= target:
            return to_hex(cand)
    return None


def parse_css_vars(text):
    """Zwraca dict: selektor -> {nazwa_tokenu: wartość}. Rozwiązuje var() w obrębie selektora."""
    scopes = {}
    # prosty parser bloków { ... } (bez zagnieżdżeń poza @media)
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    for m in re.finditer(r"([^{}]+)\{([^{}]*)\}", text):
        sel = " ".join(m.group(1).split())
        body = m.group(2)
        vars_ = dict(re.findall(r"--([\w-]+)\s*:\s*([^;]+);", body))
        if not vars_:
            continue
        # zbierz tylko tokeny kolorów (odrzuć rozmiary, gradienty, cienie)
        colors = {}
        for k, v in vars_.items():
            v = v.strip()
            if re.match(r"^(#|rgba?\(|hsla?\(|white|black|transparent)", v):
                colors[k] = v
        # rozwiąż var(--x) do wartości z tego zakresu
        for k, v in vars_.items():
            mm = re.match(r"^var\(--([\w-]+)\)$", v.strip())
            if mm and mm.group(1) in colors:
                colors[k] = colors[mm.group(1)]
        if colors:
            scopes[sel] = {**scopes.get(sel, {}), **colors}
    return scopes


def audit_css(path, pairs, as_json):
    text = open(path, encoding="utf-8").read()
    scopes = parse_css_vars(text)
    if not scopes:
        print("Nie znaleziono zmiennych --* z kolorami w pliku.", file=sys.stderr)
        sys.exit(2)
    results = []
    for sel, tokens in scopes.items():
        for fg, bg, thr, desc in pairs:
            if fg in tokens and bg in tokens:
                try:
                    r = check_pair(tokens[fg], tokens[bg])
                except ValueError as e:
                    results.append({"scope": sel, "pair": f"{fg}:{bg}", "error": str(e)})
                    continue
                ok = r["ratio"] >= thr
                fix = None if ok else suggest_fix(tokens[fg], tokens[bg], thr)
                results.append({"scope": sel, "pair": f"{fg}:{bg}", "desc": desc, "threshold": thr,
                                "ratio": r["ratio"], "pass": ok, "fg": tokens[fg], "bg": tokens[bg],
                                "suggest_fg": fix})
    if as_json:
        print(json.dumps(results, ensure_ascii=False, indent=2))
        return
    fails = 0
    for sel in scopes:
        rows = [r for r in results if r["scope"] == sel]
        if not rows:
            continue
        print(f"\n== {sel} ==")
        for r in rows:
            if "error" in r:
                print(f"  ?  {r['pair']:<24} {r['error']}")
                continue
            mark = "OK " if r["pass"] else "FAIL"
            if not r["pass"]:
                fails += 1
            line = f"  {mark} {r['pair']:<24} {r['ratio']:>5}:1  (min {r['threshold']})  {r['desc']}"
            if r["suggest_fg"]:
                line += f"  → spróbuj {r['suggest_fg']} zamiast {r['fg']}"
            print(line)
    print(f"\n{fails} par poniżej progu." if fails else "\nWszystkie sprawdzone pary spełniają progi.")
    sys.exit(1 if fails else 0)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("colors", nargs="*", help="kolor tekstu, kolor tła")
    ap.add_argument("--css", help="plik CSS z tokenami --*")
    ap.add_argument("--pair", action="append", default=[],
                    help="para tokenów fg:bg[:próg] (np. ink:bg lub accent:bg:3)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    if a.css:
        pairs = DEFAULT_PAIRS
        if a.pair:
            pairs = []
            for p in a.pair:
                bits = p.split(":")
                thr = float(bits[2]) if len(bits) > 2 else 4.5
                pairs.append((bits[0], bits[1], thr, "para użytkownika"))
        audit_css(a.css, pairs, a.json)
        return

    if len(a.colors) != 2:
        ap.error("Podaj dwa kolory (tekst, tło) albo --css plik.css")
    r = check_pair(a.colors[0], a.colors[1])
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return
    print(f"{r['fg']} na {r['bg']}  →  {r['ratio']}:1")
    print(f"  AA  tekst normalny (≥4.5): {'OK' if r['AA_normal'] else 'FAIL'}")
    print(f"  AA  tekst duży / UI (≥3.0): {'OK' if r['AA_large_ui'] else 'FAIL'}")
    print(f"  AAA tekst normalny (≥7.0): {'OK' if r['AAA_normal'] else 'FAIL'}")
    if not r["AA_normal"]:
        fix = suggest_fix(a.colors[0], a.colors[1], 4.5)
        if fix:
            print(f"  Propozycja dla tekstu normalnego: {fix}")
    sys.exit(0 if r["AA_normal"] else 1)


if __name__ == "__main__":
    try:
        main()
    except BrokenPipeError:
        sys.exit(0)
