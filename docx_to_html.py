#!/usr/bin/env python3
"""
Konwerter DOCX -> HTML + podpunkty informacyjne
Użycie: python3 docx_to_html.py <plik.docx>
"""

import sys
import re
from docx import Document
from pathlib import Path


def get_paragraphs(doc):
    return [(p.style.name, p.text.strip()) for p in doc.paragraphs]


def extract_section(paragraphs, start_marker, end_marker=None):
    """Wyciąga akapity między dwoma markerami (§ X)."""
    capturing = False
    result = []
    for style, text in paragraphs:
        if text == start_marker:
            capturing = True
            continue
        if capturing:
            if end_marker and text == end_marker:
                break
            if text:
                result.append(text)
    return result


def build_info_boxes(paragraphs):
    """
    Buduje 3 sekcje informacyjne jak na zdjęciu:
    1. Dla kogo jest ten kanał? (§3)
    2. Co możesz zgłaszać?     (§2)
    3. Jak zapewniamy bezpieczeństwo? (§7 + §10)
    """

    # § 3 — kto może zgłaszać
    who_raw = extract_section(paragraphs, "§ 3", "§ 4")
    # Filtrujemy krótkie pozycje (nazwy grup osób)
    who_bullets = []
    for t in who_raw:
        # Krótkie, konkretne pozycje to lista uprawnionych
        if t.endswith(";") or t.endswith("."):
            who_bullets.append(t.rstrip(";."))

    # § 2 — co można zgłaszać
    what_raw = extract_section(paragraphs, "§ 2", "§ 3")
    what_bullets = [t.rstrip(";.") for t in what_raw
                    if t.endswith(";") or t.endswith(".")]

    # § 4 — dostęp do kanałów
    sec4 = extract_section(paragraphs, "§ 4", "§ 5")
    # § 7 + § 10 — bezpieczeństwo danych
    sec7 = extract_section(paragraphs, "§ 7", "§ 8")
    sec10 = extract_section(paragraphs, "§ 10", "§ 11")

    # Konkretne zdania o bezpieczeństwie — dobieramy wg słów kluczowych
    security_bullets = []

    # Z §4: zdanie o dostępie do kanałów
    for t in sec4:
        if "kanał" in t.lower() and "dostęp" in t.lower():
            security_bullets.append(t.rstrip(";."))
            break

    # Z §7: tożsamość/poufność + zaszyfrowanie
    for t in sec7:
        clean = t.rstrip(";.")
        low = clean.lower()
        if t.endswith(":"):
            continue
        if "tożsamość" in low and "poufn" in low:
            security_bullets.append(clean)
        elif "zaszyfrowany" in low or "zabezpieczony hasłem" in low:
            # Skróć do pierwszego zdania jeśli za długie
            first = clean.split(".")[0]
            security_bullets.append(first + ".")

    # Z §10: kluczowe zdania o ochronie danych sygnalisty
    target_starts = [
        "Dane sygnalisty nie są ujawni",
        "Danych sygnalisty nie ujawnia się na wniosek",
        "Dane sygnalisty powinny pozostać poufne",
        "Sygnalista jest informowany o przebiegu",
        "Od sygnalisty nie żąda się",
    ]
    for t in sec10:
        clean = t.rstrip(";.")
        if any(clean.startswith(s) for s in target_starts):
            # Skróć do pierwszego zdania
            first = clean.split(".")[0]
            security_bullets.append(first + ".")

    return who_bullets, what_bullets, security_bullets


def bullets_to_html(items):
    lines = "\n".join(f'    <li>{item}</li>' for item in items)
    return f"<ul>\n{lines}\n</ul>"


def build_info_html(who, what, security):
    return f"""<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<title>Informacje o kanale zgłoszeń</title>
<style>
  body {{ font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; color: #222; }}
  .section {{ display: flex; align-items: flex-start; margin-bottom: 40px; }}
  .number {{ font-size: 80px; font-weight: bold; color: #cde; margin-right: 30px; line-height: 1; min-width: 60px; }}
  .content h2 {{ margin-top: 0; }}
  ul {{ color: #c0392b; padding-left: 20px; }}
  ul li {{ margin-bottom: 6px; }}
  textarea {{ width: 100%; height: 400px; font-family: monospace; font-size: 13px; }}
</style>
</head>
<body>

<h1>Informacje o kanale zgłoszeń wewnętrznych</h1>

<div class="section">
  <div class="number">1</div>
  <div class="content">
    <h2>Dla kogo jest ten kanał?</h2>
    {bullets_to_html(who)}
  </div>
</div>

<div class="section">
  <div class="number">2</div>
  <div class="content">
    <h2>Co możesz zgłaszać?</h2>
    {bullets_to_html(what)}
  </div>
</div>

<div class="section">
  <div class="number">3</div>
  <div class="content">
    <h2>Jak zapewniamy bezpieczeństwo?</h2>
    {bullets_to_html(security)}
  </div>
</div>

</body>
</html>"""


# ─── Konwersja całego regulaminu na HTML ────────────────────────────────────

def regulamin_to_html(paragraphs, title="Regulamin zgłoszeń wewnętrznych"):
    body_parts = [f"<h1>{title}</h1>"]
    in_list = False

    for style, text in paragraphs:
        if not text:
            if in_list:
                body_parts.append("</ul>")
                in_list = False
            continue

        if "Heading" in style or style.startswith("Nagw"):
            if in_list:
                body_parts.append("</ul>")
                in_list = False
            level = "2" if "1" in style else "3"
            body_parts.append(f"<h{level}>{text}</h{level}>")

        elif "List" in style:
            # Czy to wstęp listy (kończy się dwukropkiem)?
            if text.endswith(":"):
                if in_list:
                    body_parts.append("</ul>")
                    in_list = False
                body_parts.append(f"<p>{text}</p>")
            else:
                if not in_list:
                    body_parts.append("<ul>")
                    in_list = True
                body_parts.append(f"  <li>{text}</li>")

        else:
            if in_list:
                body_parts.append("</ul>")
                in_list = False
            body_parts.append(f"<p>{text}</p>")

    if in_list:
        body_parts.append("</ul>")

    body = "\n".join(body_parts)

    return f"""<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>
  body {{ font-family: Arial, sans-serif; max-width: 860px; margin: 40px auto; line-height: 1.7; color: #222; }}
  h1 {{ text-align: center; font-size: 1.6em; }}
  h2 {{ margin-top: 2em; border-bottom: 1px solid #ccc; padding-bottom: 4px; }}
  ul {{ margin: 0.4em 0 1em 1.5em; }}
  li {{ margin-bottom: 4px; }}
  p {{ margin: 0.5em 0; }}
</style>
</head>
<body>
{body}
</body>
</html>"""


# ─── Główna logika ───────────────────────────────────────────────────────────

def process(docx_path: str):
    path = Path(docx_path)
    if not path.exists():
        print(f"Błąd: plik '{docx_path}' nie istnieje.")
        sys.exit(1)

    doc = Document(docx_path)
    paragraphs = get_paragraphs(doc)

    # 1. Skrzynka informacyjna (3 sekcje jak na zdjęciu)
    who, what, security = build_info_boxes(paragraphs)

    info_html = build_info_html(who, what, security)
    info_path = path.with_name(path.stem + "_info.html")
    info_path.write_text(info_html, encoding="utf-8")
    print(f"✓ Sekcje informacyjne: {info_path}")

    # 2. Pełny regulamin jako HTML
    reg_html = regulamin_to_html(paragraphs)
    reg_path = path.with_name(path.stem + "_regulamin.html")
    reg_path.write_text(reg_html, encoding="utf-8")
    print(f"✓ Regulamin HTML:      {reg_path}")

    # Podgląd w terminalu
    print("\n── Dla kogo jest ten kanał? ──")
    for b in who:
        print(f"  • {b}")
    print("\n── Co możesz zgłaszać? ──")
    for b in what:
        print(f"  • {b}")
    print("\n── Jak zapewniamy bezpieczeństwo? ──")
    for b in security:
        print(f"  • {b}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Użycie: python3 docx_to_html.py <plik_regulaminu.docx>")
        sys.exit(1)
    process(sys.argv[1])
