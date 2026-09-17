# Wzorce komponentów — formularze, tabele, nawigacja, stany

Dwa profile odbiorców przewijają się wszędzie:
- **Mieszkaniec (widok publiczny)**: przychodzi rzadko, na telefonie, nie zna systemu.
  Duże, oczywiste, jeden krok na raz, wszystko podpisane tekstem.
- **Urzędnik (panel)**: codziennie, desktop, zna system. Gęsto, szybko, skróty,
  filtry, akcje masowe. Ikony z tooltipem OK, ale najważniejsza akcja ma tekst.

Przy każdym wzorcu zaznaczam, gdzie się różnią.

## Formularze

### Struktura
- **Jedna kolumna.** Dwie kolumny pól tylko dla par naturalnych (kod pocztowy + miasto,
  imię + nazwisko) i tylko na desktopie.
- **Sekcje po 3–6 pól** z nagłówkiem (`fieldset`/`legend` lub `h2`). Odstęp między
  polami 16–20 px, między sekcjami 40–48 px.
- **Etykieta nad polem**, lewa krawędź wyrównana do pola. Nie z boku (rozjeżdża się
  na mobile), nie jako placeholder (znika po wpisaniu).
- **Podpowiedź formatu** pod etykietą lub pod polem, szarym tekstem ≥ 4.5:1
  („Format: 00-000”).
- **Wymagane vs opcjonalne**: oznaczaj **opcjonalne** („(opcjonalnie)”), jeśli większość
  pól jest wymagana. Gwiazdka wymaga legendy.
- **Publiczny formularz > 8 pól → kreator (kroki)**. Pasek postępu z nazwami kroków,
  możliwość powrotu, zapis stanu. Ostatni krok = **podsumowanie** z edycją
  (WCAG 3.3.4 — czynność prawna).

### Pola
- Wysokość inputa 44–48 px na mobile, 40 px w panelu. Font 16 px (mniej → iOS zoomuje).
- Obramowanie ≥ 3:1 do tła (np. `#8a9ea3` na białym), fokus: zmiana koloru + obrys.
- Szerokość pola sugeruje długość danych: kod pocztowy krótki, adres długi.
- Typy: `email`, `tel`, `date` (lub 3 pola dzień/miesiąc/rok dla dat urodzenia —
  natywny datepicker jest zły do dat sprzed 50 lat), `inputmode="numeric"` dla PESEL.
- `autocomplete` zawsze, gdzie ma sens.
- Select z > 10 opcjami → pole z wyszukiwaniem (combobox). Ulice gminy: combobox.
- Radio dla 2–5 opcji wykluczających się (widoczne od razu). Select dla > 5.
- Checkbox zgody: cały tekst zgody klikalny (owinięty w `label`), link do klauzuli
  otwiera się w nowej karcie z informacją o tym.

### Walidacja i błędy
- Waliduj **po opuszczeniu pola** (blur), nie przy każdym znaku; po pierwszym błędzie
  możesz przejść na walidację na bieżąco dla tego pola.
- Błąd: czerwona ramka + ikona + tekst pod polem, `aria-invalid`, `aria-describedby`.
- Po kliknięciu „Wyślij” z błędami: podsumowanie na górze („Popraw 3 pola:” z linkami),
  fokus na podsumowaniu lub pierwszym błędnym polu.
- Tekst błędu mówi, co zrobić — patrz `tekst-ui.md`.
- Nie czyść formularza po błędzie serwera. Nigdy.

### Przyciski w formularzu
- Primary („Wyślij wniosek”) po prawej lub na całą szerokość na mobile; secondary
  („Wstecz”, „Zapisz szkic”) po lewej, lżejszy.
- Podczas wysyłania: przycisk disabled + spinner + tekst „Wysyłanie…”; blokuj podwójne
  kliknięcie.
- Destrukcyjne („Usuń”) — nigdy obok primary w tym samym stylu; osobny kolor, potwierdzenie.

## Przyciski — hierarchia

Na widoku **jeden primary**. Reszta secondary/tertiary/link.

| Poziom | Wygląd | Użycie |
|---|---|---|
| Primary | wypełniony akcentem (gradient OK), tekst biały ≥ 4.5:1 | główna akcja widoku |
| Secondary | obrys 1.5–2 px akcentu lub wypełnienie tint, tekst akcent-deep | alternatywa, „Wstecz” |
| Tertiary / ghost | bez obrysu, tekst akcent | akcje drugorzędne w wierszach, „Anuluj” |
| Destructive | czerwień (`#b3261e` na jasnym), obrys lub wypełnienie | usuwanie, odrzucanie |

- Min. 44 px wysokości na mobile, 40 px w panelu; padding poziomy 20–28 px.
- Tekst: czasownik + obiekt. Ikona po lewej tylko jeśli dodaje znaczenia.
- Stany: hover (ciemniej ~8%), active (ciemniej ~12%, lekki scale 0.98), focus-visible
  (obrys), disabled (opacity .5, `cursor: not-allowed`, ale kontrast tekstu wciąż ≥ 3:1
  jeśli niesie informację).

## Nawigacja

### Publiczna (strona gminy / BO)
- Górny pasek: herb/logo + nazwa gminy (link do strony głównej), 4–7 pozycji,
  primary CTA („Zagłosuj”) z prawej, wyróżniony.
- Mobile: hamburger z podpisem „Menu” (samo ☰ jest słabo rozumiane przez seniorów),
  panel pełnoekranowy, duże pozycje (56 px), zamknięcie ✕ + Esc.
- Breadcrumbs na podstronach głębszych niż 1 poziom.
- Aktywna pozycja: kolor + podkreślenie/wskaźnik (nie tylko kolor).

### Panel administracyjny
- Lewy sidebar (240–280 px), zwijany do ikon (64 px) z tooltipami. Grupy z nagłówkami.
- Górny pasek: nazwa instancji/gminy + **aktywna edycja** (urzędnik musi wiedzieć,
  w której edycji BO pracuje — to najczęstsze źródło błędów), wyszukiwarka globalna,
  konto.
- Breadcrumbs zawsze. Tytuł strony `h1` + akcje strony po prawej (max 2 przyciski,
  reszta w „Więcej”).

## Tabele i listy (panel)

- **Tabela** dla danych porównywalnych w kolumnach (lista wniosków, głosów).
  **Karty** dla treści heterogenicznej z obrazem (projekty na stronie publicznej).
- Kolumny: max 7 widocznych, reszta w ustawieniach kolumn. Pierwsza kolumna = identyfikator
  + nazwa (link do szczegółu). Ostatnia = akcje.
- Wyrównanie: tekst do lewej, liczby do prawej, daty jednolicie (`12.03.2026`).
- Wiersz 44–48 px („comfortable”) domyślnie, opcja „compact” 36 px.
- Zebra lub linie poziome — nie oba. Hover wiersza.
- **Filtry nad tabelą**, zapamiętywane w URL (query string), przycisk „Wyczyść filtry”
  widoczny gdy aktywne; licznik wyników („142 wnioski”).
- Sortowanie kliknięciem w nagłówek, wskaźnik kierunku, `aria-sort`.
- **Akcje masowe**: checkbox w pierwszej kolumnie, pasek akcji pojawia się po zaznaczeniu
  („Zaznaczono 12 · Zmień status · Eksportuj · Usuń”).
- Paginacja u dołu z wyborem rozmiaru strony; alternatywnie „Pokaż więcej”. Nie infinite
  scroll w panelu (gubi pozycję, blokuje stopkę).
- Status w tabeli: badge z tekstem + kolor + ewentualnie ikona. Nie sam kolorowy punkt.
- Mobile: tabela → karty (każdy wiersz = karta z etykietami), nie poziomy scroll całej tabeli.

## Karty (widok publiczny)

- Cała karta klikalna (link na tytule + `::after` rozciągnięty, lub `a` opakowujące
  bez zagnieżdżonych interaktywnych elementów).
- Struktura: obraz (16:9) → kategoria/obszar (małe, uppercase, letter-spacing) →
  tytuł (h3, 2 linie max, `line-clamp`) → skrót (3 linie) → meta (koszt, lokalizacja) → CTA.
- Siatka: 1 kolumna < 640 px, 2 do 1024, 3 powyżej. Gap 24 px.
- Równa wysokość w rzędzie (grid), CTA wyrównane do dołu (`margin-top: auto`).

## Modale i dialogi

- Używaj `<dialog>` — daje fokus, Esc, backdrop za darmo.
- Max szerokość 560 px (formularz) / 400 px (potwierdzenie). Na mobile: pełny ekran
  lub bottom sheet.
- Nagłówek `h2`, treść, przyciski w stopce: secondary „Anuluj” po lewej,
  primary po prawej. Destrukcyjne potwierdzenie: nazwij akcję („Usuń wniosek”),
  nie „Tak/Nie”.
- Nie modal w modalu. Nie modal dla treści dłuższej niż ekran — to podstrona.
- Potwierdzenia dla akcji odwracalnych → zamiast modala toast z „Cofnij” (5–8 s).

## Stany widoku

Każdy widok z danymi ma zaprojektowane:

| Stan | Co pokazać |
|---|---|
| **Ładowanie** | skeleton w kształcie docelowej treści (nie sam spinner na środku), po 300 ms |
| **Pusty (pierwszy raz)** | ilustracja lekka lub ikona + zdanie, co to jest + primary „Dodaj pierwszy…” |
| **Pusty (po filtrze)** | „Brak wyników dla „xyz”” + „Wyczyść filtry” |
| **Błąd** | co się stało po ludzku + „Spróbuj ponownie” + zachowane dane |
| **Sukces** | jednoznaczne potwierdzenie + co dalej (numer, e-mail, link) |
| **Częściowy / offline** | pokaż co masz, oznacz co brakuje |

## Komunikaty zwrotne

- **Toast** (róg, 4–6 s, `role="status"`) — dla potwierdzeń nieblokujących.
- **Inline alert** (w treści, nie znika) — dla błędów formularza, ostrzeżeń kontekstowych.
- **Banner** (góra strony) — dla stanu globalnego („Głosowanie zakończone 15.10”).
- Kolory semantyczne: sukces zielony, ostrzeżenie bursztyn, błąd czerwony, info akcent —
  każdy z ikoną i tekstem. Tła pastelowe (tint), tekst w ciemnej wersji koloru ≥ 4.5:1.

## Landing / strona startowa (publiczna)

Kolejność sekcji, która działa dla stron gminnych:

1. **Hero**: jedno zdanie, co tu można zrobić + jeden CTA + (opcjonalnie) termin/etap.
   Bez karuzeli. Nigdy karuzeli.
2. **Jak to działa**: 3–4 kroki z numerami i ikonami.
3. **Aktualny etap / harmonogram**: oś czasu z zaznaczonym „jesteś tu”.
4. **Treść główna** (projekty, deklaracje, kategorie) — karty.
5. **FAQ** (`<details>`) — 5–8 pytań.
6. **Kontakt + stopka**: dane urzędu, linki: deklaracja dostępności, polityka
   prywatności, klauzula RODO. Stopka to miejsce prawnie wymaganych linków —
   nie ukrywaj ich.

## Responsywność — praktyczne progi

- 320–639 px: 1 kolumna, nav w menu, CTA pełna szerokość, padding boczny 16 px.
- 640–1023 px: 2 kolumny kart, formularz dalej 1 kolumna, padding 24 px.
- ≥ 1024 px: pełny layout, kontener max 1180–1280 px, padding 32 px.
- Używaj `clamp()` dla fontów nagłówków i odstępów sekcji zamiast mnożenia breakpointów.
- Testuj w głowie 320 / 768 / 1280 zanim wyślesz.
