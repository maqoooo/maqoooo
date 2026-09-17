# Dostępność — WCAG 2.1 AA w polskim sektorze publicznym

## Kontekst prawny (skrót do rozmowy z klientem)

- **Ustawa z 4 kwietnia 2019 r. o dostępności cyfrowej stron internetowych i aplikacji
  mobilnych podmiotów publicznych** — obowiązuje gminy, urzędy, jednostki organizacyjne.
  Odwołuje się do **WCAG 2.1 poziom AA** (załącznik do ustawy wymienia kryteria).
- Każdy podmiot publiczny musi publikować **deklarację dostępności** (wzór i wymagane
  elementy określa ustawa i rozporządzenie); jest sprawdzana przez Ministerstwo
  Cyfryzacji, a skargi trafiają do podmiotu i mogą skończyć się karą.
- Platforma dostarczana gminie jest **częścią jej strony** → gmina jest odpowiedzialna,
  ale problem wraca do dostawcy. Stąd: dostępność to argument sprzedażowy i ochrona
  przed reklamacją.
- Od 2025 r. dodatkowo **Europejski Akt o Dostępności (EAA)** / ustawa o zapewnianiu
  dostępności niektórych produktów i usług — dotyczy usług komercyjnych (e-commerce,
  bankowość), warto o nim wiedzieć przy projektach poza sektorem publicznym.

Nie pisz „zgodne z WCAG”. Pisz, **które kryteria sprawdziłeś i jak**.

## Kryteria, które najczęściej padają — i jak je spełnić

### 1.1.1 Treść nietekstowa
- Każdy `img` ma `alt`. Dekoracyjne: `alt=""`. Herb gminy w nagłówku: `alt="Herb gminy X"`
  albo `alt=""` jeśli obok jest tekst z nazwą.
- Ikony w przyciskach bez tekstu: `aria-label` na przycisku, ikona `aria-hidden="true"`.

### 1.3.1 Informacje i relacje
- Nagłówki są nagłówkami (`h1–h6`), nie pogrubionym `div`.
- Tabele danych mają `th` z `scope`; tabela układu = nie używaj.
- Etykieta powiązana z polem: `<label for="id">` lub owinięcie.
- Grupy radio/checkbox w `fieldset` z `legend`.

### 1.3.5 Określenie przeznaczenia pola
- `autocomplete="name|email|tel|postal-code|street-address|bday"` na polach danych osobowych.

### 1.4.1 Użycie koloru
- Status (zaakceptowany/odrzucony), błąd pola, aktywna zakładka — kolor **plus**
  ikona/tekst/podkreślenie.

### 1.4.3 / 1.4.11 Kontrast
- Tekst ≥ 4.5:1; duży tekst (≥ 24 px, lub ≥ 18.66 px bold) ≥ 3:1.
- Elementy UI i grafika informacyjna ≥ 3:1: obramowanie inputa, ikona, obrys fokusu,
  wykres.
- Tekst na gradiencie/zdjęciu: sprawdź w najjaśniejszym punkcie albo dodaj przyciemnienie.
- Narzędzie: `scripts/contrast.py`.

### 1.4.4 Zmiana rozmiaru tekstu / 1.4.10 Zawijanie
- Bez `maximum-scale=1` i `user-scalable=no`.
- Jednostki `rem` dla fontów; layout nie rozpada się przy 200% zoomu.
- Brak poziomego scrolla na 320 px CSS (= 400% zoom na 1280 px).

### 1.4.12 Odstępy w tekście
- Nie ustawiaj sztywnych wysokości na kontenerach tekstu; `line-height ≥ 1.5`
  dla tekstu ciągłego, `min-height` zamiast `height`.

### 1.4.13 Treść pod kursorem/fokusem
- Tooltip: da się odsunąć myszą bez zamykania, zamyka się Esc, nie znika, gdy
  kursor na niego wjedzie.

### 2.1.1 Klawiatura
- Wszystko, co klikalne, jest `button` lub `a href`. `div` z `onclick` = błąd
  (brak Tab, brak Enter/Spacja).
- Własne komponenty (dropdown, tabs, accordion) obsługują strzałki/Enter/Esc
  zgodnie z wzorcami WAI-ARIA APG.

### 2.4.1 Pomijanie bloków
- Skip link jako pierwszy element w `body`, widoczny po fokusie.

### 2.4.3 Kolejność fokusu / 2.4.7 Widoczny fokus
- Kolejność DOM = kolejność wizualna (ostrożnie z `order` w flex/grid).
- `:focus-visible { outline: 2px solid var(--accent-deep); outline-offset: 2px; }`
  — nigdy `outline: none` bez zamiennika o kontraście ≥ 3:1.

### 2.4.4 Cel łącza
- „Czytaj więcej” ×10 = błąd. Tekst linku sam mówi, dokąd prowadzi, albo ma
  `aria-label`/kontekst w tym samym zdaniu.

### 2.4.6 Nagłówki i etykiety
- Nagłówki opisowe; etykiety pól mówią, co wpisać („Numer telefonu (9 cyfr)”).

### 2.5.3 Etykieta w nazwie
- Widoczny tekst przycisku jest częścią jego nazwy dostępnej (nie nadpisuj
  `aria-label` czymś innym niż widoczny tekst).

### 2.5.5 (AAA, ale stosuj) Rozmiar celu
- 44×44 px na dotyku. WCAG 2.2 wprowadza 24×24 jako AA (2.5.8) — spełniaj 44 na mobile.

### 3.1.1 Język strony
- `<html lang="pl">`. Fragmenty w innym języku: `lang="en"` na elemencie.

### 3.2.2 Podczas wprowadzania
- Zmiana `select` nie wysyła formularza ani nie przenosi na inną stronę bez ostrzeżenia.

### 3.3.1 / 3.3.3 Identyfikacja błędu i sugestia
- Błąd tekstem przy polu, `aria-describedby` łączy pole z komunikatem,
  `aria-invalid="true"`. Podsumowanie błędów na górze formularza z linkami do pól.
- Komunikat mówi, **jak** poprawić: „Kod pocztowy ma format 00-000”.

### 3.3.2 Etykiety lub instrukcje
- Placeholder to nie etykieta. Format podpowiedz w etykiecie lub `aria-describedby`.

### 3.3.4 Zapobieganie błędom (prawne, finansowe, dane)
- Głosowanie w BO, składanie wniosku, deklaracja podatkowa = **czynności prawne**.
  Wymagany krok podsumowania z możliwością poprawy przed ostatecznym wysłaniem,
  lub możliwość cofnięcia.

### 4.1.2 Nazwa, rola, wartość
- Własne komponenty mają `role`, `aria-expanded`, `aria-selected`, `aria-checked`.
  Jeśli można użyć natywnego elementu — użyj (`<details>`, `<dialog>`, `<select>`).

### 4.1.3 Komunikaty o stanie
- Toast „Zapisano”, licznik wyników filtrowania, błąd asynchroniczny →
  `role="status"` lub `aria-live="polite"`; błędy krytyczne `role="alert"`.

## Szybki test bez narzędzi (5 minut)

1. **Tab przez całą stronę** — czy widzisz, gdzie jesteś? Czy dotarłeś wszędzie?
2. **Zoom 200%** — czy coś się nakłada, ucina, znika?
3. **Wyłącz CSS w głowie** — czy kolejność treści ma sens? Nagłówki opisują sekcje?
4. **Odcienie szarości** — czy statusy/błędy dalej rozróżnialne?
5. **Czytnik ekranu na jednym formularzu** (VoiceOver/NVDA) — czy każde pole
   ma nazwę, a błąd jest odczytany?

## Narzędzia automatyczne (wykrywają ~30% problemów)

- axe DevTools / Lighthouse (Chrome) — struktura, kontrast, ARIA.
- WAVE — wizualizacja nagłówków i etykiet.
- `scripts/contrast.py` — kontrast z tokenów CSS.
- Reszta wymaga ręcznego testu z listy powyżej.

## Zapis w deklaracji dostępności

Jeśli coś nie spełnia — nie ukrywaj. Deklaracja ma sekcję „treści niedostępne”
z uzasadnieniem (np. „mapa interaktywna dostarczana przez zewnętrzny serwis”)
i alternatywą („lista projektów w formie tabeli pod mapą”). Dostarcz alternatywę.
