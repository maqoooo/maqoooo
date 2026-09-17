# Typografia, kolor, tokeny, siatka

## Typografia

### Skala
Bazowo 16 px (1 rem), skala 1.25 („major third”) dla stron publicznych, 1.2 dla
paneli (gęściej). Wartości zaokrąglone, w `rem`, nagłówki przez `clamp()`:

| Rola | Public | Panel | Waga | line-height |
|---|---|---|---|---|
| Display / h1 | `clamp(2rem, 1.4rem + 2.4vw, 3rem)` | 1.75rem | 600–700 | 1.1–1.2 |
| h2 | `clamp(1.5rem, 1.2rem + 1.2vw, 2rem)` | 1.375rem | 600 | 1.2 |
| h3 | 1.25rem | 1.125rem | 600 | 1.3 |
| Body | 1rem (16 px) | 0.9375rem (15 px) | 400 | 1.5–1.6 |
| Small / meta | 0.875rem | 0.8125rem | 400–500 | 1.4 |
| Label / eyebrow | 0.75–0.8125rem, uppercase, letter-spacing .06em | j.w. | 600 | 1.2 |

Body poniżej 16 px na widoku publicznym → nie. Panel: 14–15 px dopuszczalne.

### Zasady
- **Dwie wagi wystarczą** (400 + 600). Trzecia (700) tylko dla display. Poppins ma
  ciężki semibold — 500 często wygląda lepiej niż 600 dla h3.
- **Długość linii 60–75 znaków** dla tekstu ciągłego: `max-width: 65ch` na akapitach.
- **Kontrast wielkości między poziomami ≥ 1.2×** — inaczej hierarchia nie działa.
- Nagłówki: `text-wrap: balance`. Akapity: `text-wrap: pretty` (progressive).
- Liczby w tabelach: `font-variant-numeric: tabular-nums`.
- Polskie znaki: sprawdź, czy wbudowany subset fontu zawiera `ąćęłńóśźż` (Google
  Fonts: `subset=latin-ext`). Brak = „ę” z innego fontu, wygląda fatalnie.
- Nie justuj. Nie używaj kapitalików dla całych zdań. Uppercase tylko dla krótkich
  etykiet (eyebrow) z letter-spacing.

### Poppins — specyfika
- Geometryczny, przyjazny, szeroki. Dobrze wygląda jako nagłówek; w długim tekście
  bywa męczący → dla treści > 3 akapitów rozważ parę: Poppins (nagłówki) + Inter /
  Source Sans 3 (tekst). Dla stron gminnych zwykle jeden font wystarcza.
- Wbudowywanie w standalone HTML: `@font-face` z `src: url(data:font/woff2;base64,…)`,
  `font-display: swap`, wagi 400 i 600, subset latin + latin-ext. Plik ~25 KB na wagę.

## Kolor

### Role kolorów (tokeny), nie „kolory”
Nazywaj po roli, nie po barwie. `--accent`, nie `--turkus`. Dzięki temu dark mode
i rebranding pod gminę to zmiana wartości, nie refaktor.

| Token | Rola | Jasny (domyślny styl użytkownika) | Ciemny |
|---|---|---|---|
| `--bg` | tło strony | `#f3fafc` | `#0b1a1e` |
| `--surface` | karty, panele | `#ffffff` | `#122a30` |
| `--tint` | delikatne tło akcentu (hover, badge) | `#e6f6fa` | `#1b4652` |
| `--line` | separatory, linie tabel (dekoracyjne) | `#dde8eb` | `#22414a` |
| `--line-strong` | obramowania pól, ikony UI (≥ 3:1) | `#6f939a` | `#527f8a` |
| `--primary` / `--primary-hover` | tło przycisku primary (biały tekst ≥ 4.5:1) | `#23788f` / `#1f6f84` | `#3cc3e2` / `#49a4ba` |
| `--ink` | tekst główny | `#2b323f` | `#e3eef1` |
| `--ink-strong` | nagłówki | `#0f3b46` | `#f3fafc` |
| `--muted` | tekst drugorzędny | `#5b6668` | `#a4b8bd` |
| `--accent` | akcent, primary bg, ikony | `#2db3d2` | `#3cc3e2` |
| `--accent-deep` | hover primary, obrys fokusu | `#2f96b0` | `#49a4ba` |
| `--accent-text` | tekst w kolorze akcentu na tle | `#1b5a68` | `#8fd3e4` |
| `--accent-link` | linki | `#2b8ea8` | `#7fd4e6` |
| `--on-accent` | tekst na akcencie | `#ffffff` | `#0b1a1e` |
| `--ok` / `--ok-bg` | sukces | `#1f7a4d` / `#eefbf3` | `#8fdcb2` / `#12352a` |
| `--warn` / `--warn-bg` | ostrzeżenie | `#8a5a00` / `#fff7e6` | `#f2c46d` / `#3a2e0f` |
| `--danger` / `--danger-bg` | błąd | `#b3261e` / `#fdecea` | `#f2a69f` / `#3b1512` |

Gotowy plik: `assets/tokens-starter.css`.

### Pułapki kontrastu — konkretnie
- **Jasny turkus `#2db3d2` na białym ma ~2.5:1** → nie nadaje się na tekst ani ikony
  informacyjne. Na tekst używaj `--accent-text` (`#1b5a68`, ~8:1) lub `--accent-link`
  (`#2b8ea8`, ~3.9:1 — tylko duży tekst / UI, nie body).
- **Biały tekst na `#2db3d2` ma ~2.5:1** → primary button z gradientem do
  `#2f96b0` przechodzi tylko dla dużego tekstu 3:1 na ciemniejszym końcu. Bezpieczniej:
  tekst przycisku 16 px semibold i tło od `#2f96b0` w dół, albo ciemny tekst (`--ink-strong`)
  na jasnym akcencie.
- `--muted` `#5b6668` na `#f3fafc` = ~5.1:1 ✓; na `#ffffff` = ~5.4:1 ✓.
  Jaśniejsze szarości (`#8a9…`) już nie przechodzą dla body.
- Placeholder: domyślny `#757575` na białym = 4.6:1, ledwo. Ustaw jawnie `color: var(--muted)`.

Zawsze potwierdź skryptem `scripts/contrast.py`, nie szacuj.

### Kolory gminy (herb, identyfikacja)
1. Weź kolor główny z herbu/BIP → to `--accent` na duże płaszczyzny.
2. Wygeneruj `--accent-deep` (ciemniej o ~15% w HSL) i `--accent-text` (ciemniej do
   uzyskania ≥ 4.5:1 na `--bg`).
3. `--tint` = ten sam hue, jasność ~95%, nasycenie ~40%.
4. Kolory semantyczne (ok/warn/danger) zostaw standardowe — nie brandować błędów.
5. Herby często mają czerwień + złoto. Czerwień gminy ≠ `--danger` — jeśli akcent
   jest czerwony, błędy oznaczaj mocniej ikoną i tekstem, a `--danger` przesuń w bordo.

### Dark mode
- Te same tokeny, inne wartości w `@media (prefers-color-scheme: dark)` oraz
  `[data-theme="dark"]`. Wzór w `assets/tokens-starter.css`.
- Nie odwracaj kolorów 1:1. W ciemnym trybie: mniejsze nasycenie akcentu na dużych
  płaszczyznach, jaśniejszy akcent na tekst, cienie → zamiast cienia jaśniejsza
  powierzchnia (`--surface` jaśniejsza od `--bg`).
- Czysta czerń `#000` i czysta biel `#fff` na tekst → nie; `#0b1a1e` / `#e3eef1`.
- Obrazy/herby na ciemnym: dodaj jasną plakietkę pod herbem, jeśli ma ciemne kontury.
- Panel administracyjny: dark mode jako opcja użytkownika (przełącznik zapisany
  w localStorage), nie tylko z systemu — urzędnicy pracują w jasnych pokojach.

## Siatka i odstępy

- **Baza 8 px** (4 px dla drobnych korekt wewnątrz komponentu): 4, 8, 12, 16, 24, 32,
  40, 48, 64, 96.
- Tokeny: `--space-1: .25rem` … `--space-12: 6rem` lub nazwane (`--gap-section`).
- Wewnątrz komponentu ≤ 16 px, między komponentami 24–32, między sekcjami 64–96
  (public) / 32–40 (panel).
- Kontener: `max-width: 1180px; margin-inline: auto; padding-inline: clamp(1rem, 4vw, 2rem)`.
- Promienie: 16 px karty/modale, 10–12 px inputy i przyciski prostokątne, 50px/9999px
  pill dla CTA, 6–8 px badge. Jeden system — nie mieszaj 4/6/10/16 w jednym widoku.
- Cienie: dwie warstwy, kolor cienia = akcent z alfa (`rgba(73,164,186,.16)`), nie
  czysta czerń na jasnym tle. Ciemny tryb: czerń z alfa .35–.45.

## Ikony

- Jeden zestaw (Lucide / Heroicons / Phosphor) w jednej grubości kreski (1.5–2 px).
- Rozmiar 20 px przy tekście 16 px, 24 px w przyciskach ikonowych, 16 px w badge.
- Ikona bez tekstu → `aria-label` na przycisku; ikona dekoracyjna → `aria-hidden`.
- Inline SVG z `currentColor` — dziedziczy kolor tekstu i działa w dark mode.
- Emoji jako ikony → nie na produkcji (różny wygląd między systemami, brak kontroli
  kontrastu). W README/prototypie OK.
