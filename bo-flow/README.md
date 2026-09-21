# bo-flow — projektowanie przebiegu weryfikacji projektów BO

Narzędzia dla urzędów: zaprojektowanie przebiegu weryfikacji projektu budżetu
obywatelskiego i wyeksportowanie go do mapy procesu.

| Plik | Co to jest | Dla kogo |
|------|-----------|----------|
| `flow-editor.html` | **Edytor przepływu na płótnie** — węzły, połączenia, biblioteka klocków procesu, inspektor | wdrożeniowiec, zaawansowany klient |
| `kreator-weryfikacji-koncowej.html` | **Wywiad krok po kroku** — 7 ekranów pytań, mapa rysuje się sama | urząd wypełniający samodzielnie |
| `KONCEPCJA.md` | Opis rozwiązania: co zbieramy, w jakiej kolejności, jak to działa | — |

Oba narzędzia produkują **ten sam JSON**, który `generator.html` renderuje bez zmian
(`meta` + `etapy[]` z `role` / `kroki` / `przejscia`).

## flow-editor.html — jak zbudować nowy przebieg

1. **＋ Nowy przebieg** — nazywasz etap, dostajesz puste płótno ze Startem i Końcem.
2. **Klocki** (panel po lewej) — klikasz albo przeciągasz na płótno:
   - *fragmenty procesu* (Przypisanie do wydziału, Opiniowanie w innej jednostce,
     Akceptacja dyrektora z pętlą zwrotu…) wstawiają kilka połączonych węzłów naraz
     i same zakładają brakujące role,
   - *pojedyncze węzły* — Krok, Rozwidlenie, Start, Koniec.
3. **Łączysz** — ciągniesz z dolnego portu węzła na inny węzeł. Przy rozwidleniu
   pierwsze dwa połączenia dostają automatycznie etykiety TAK / NIE.
4. **Opisujesz** w inspektorze po prawej: rola, termin, status widoczny dla autora,
   powiadomienie, a czego nie wiecie — zaznaczacie **„do ustalenia"**.
5. **Role** (zakładka obok Klocków) — nazwa używana w urzędzie + uprawnienie w systemie.
6. **Autoukład** porządkuje płótno w kolumny ról i wiersze kolejności.
7. **Eksport JSON** — poziomy na mapie wyliczane są z układu połączeń (krawędzie
   zwrotne są wykrywane i pomijane, więc pętle nie psują układu).

**Wczytaj JSON** działa w drugą stronę: wklejasz istniejący przebieg z generatora
i edytujesz go na płótnie. **Wzorzec: Szczecin** ładuje weryfikację końcową SBO 2027
(25 kroków, 6 ról) jako punkt wyjścia.

Stan zapisuje się w przeglądarce (localStorage) — zamknięcie karty nie gubi pracy.

Walidator pod inspektorem pilnuje sensu przepływu, nie wypełnienia pól: kroki bez
wejścia, ślepe zaułki, rozwidlenia z jedną ścieżką, role bez uprawnienia w systemie,
brak momentu, w którym autor dowiaduje się o wyniku.
