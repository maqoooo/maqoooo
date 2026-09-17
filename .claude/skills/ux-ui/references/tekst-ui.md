# Mikroteksty po polsku — przyciski, błędy, stany, ton

## Ton

Strony gminne balansują między **urzędowym** (wiarygodność, precyzja prawna) a
**przyjaznym** (mieszkaniec ma zrozumieć za pierwszym razem). Rozwiązanie:
- **Treść prawna** (klauzule, regulamin, oświadczenia) — dosłownie, bez upraszczania,
  ale wizualnie oddzielona i z krótkim streszczeniem „co to znaczy” nad nią.
- **Interfejs** (przyciski, komunikaty, instrukcje) — prosto, w 2. osobie („Wpisz”,
  „Wybierz”), zdania krótkie, bez strony biernej.

Forma grzecznościowa: w interfejsie publicznym „Ty” (Wpisz, Wybierz) jest dziś
normą także w e-administracji (mObywatel, ePUAP używają trybu rozkazującego bez
„Pan/Pani”). Unikaj „Proszę wpisać” (długie, bierne). W treściach prawnych i mailach
formalnych — „Pan/Pani” lub bezosobowo.

Rodzaj gramatyczny: unikaj form wymagających rodzaju użytkownika („Zalogowałeś się”).
Zamiast tego: „Jesteś zalogowany/a” → lepiej „Zalogowano” / „Logowanie zakończone” /
„Witaj, Anno” / „Twoje konto”. Formy bezosobowe lub 2. os. czas teraźniejszy.

## Przyciski

Wzór: **czasownik (tryb rozkazujący) + obiekt**. Użytkownik ma wiedzieć, co się stanie.

| Zamiast | Użyj |
|---|---|
| OK / Wyślij / Zatwierdź | Oddaj głos · Złóż wniosek · Zapisz zmiany · Wyślij deklarację |
| Anuluj (w destrukcyjnym) | Nie usuwaj (obok: Usuń wniosek) |
| Tak / Nie | Usuń projekt / Zachowaj projekt |
| Kliknij tutaj / Więcej | Zobacz szczegóły projektu · Czytaj regulamin |
| Dalej | Przejdź do danych kontaktowych (nazwa następnego kroku) |
| Submit / Login / Sign up | Zaloguj się · Utwórz konto |
| Pobierz | Pobierz potwierdzenie (PDF, 120 KB) |

- Krótko: 1–3 słowa. Bez kropki. Wielka litera tylko na początku.
- Link „Czytaj więcej” ×N → nigdy; link ma mówić dokąd.
- Ikona ✕ zamykania → `aria-label="Zamknij"`.

## Etykiety pól

- Rzeczownik, bez dwukropka: „Numer telefonu”, „Adres e-mail”, „Kod pocztowy”.
- Format w etykiecie lub podpowiedzi, nie w placeholderze: „PESEL (11 cyfr)”.
- Opcjonalność: „Numer mieszkania (opcjonalnie)”.
- Zgody: pełny tekst zgody jako etykieta checkboxa; zaczynaj od czasownika:
  „Oświadczam, że…”, „Wyrażam zgodę na…”. Link do klauzuli: „klauzula informacyjna
  (otwiera się w nowej karcie)”.

## Komunikaty błędów

Struktura: **co jest nie tak + jak poprawić**. Bez „błąd”, bez wykrzykników, bez winy.

| Zamiast | Użyj |
|---|---|
| Błąd | Wpisz numer telefonu |
| Nieprawidłowa wartość | Kod pocztowy ma format 00-000 |
| Pole wymagane | Wybierz obszar, w którym mieszkasz |
| Invalid email | Adres e-mail musi zawierać znak @ i domenę, np. jan@przyklad.pl |
| PESEL niepoprawny | Sprawdź PESEL — ma 11 cyfr, a ostatnia jest cyfrą kontrolną |
| Wystąpił błąd. Spróbuj później. | Nie udało się zapisać głosu. Twoje dane są zachowane — spróbuj ponownie za chwilę. Jeśli problem się powtórzy, napisz: bo@gmina.pl |
| 404 | Nie znaleźliśmy tej strony. Wróć na stronę główną lub sprawdź listę projektów. |
| Sesja wygasła | Dla bezpieczeństwa wylogowaliśmy Cię po 30 minutach bezczynności. Zaloguj się ponownie — wprowadzone dane zostały zapisane jako szkic. |
| Już głosowałeś | Z tego numeru PESEL oddano już głos w tej edycji. Każdy mieszkaniec może zagłosować raz. |

Podsumowanie błędów formularza: „Popraw 3 pola, aby wysłać wniosek:” + lista linków
do pól.

## Puste stany

Struktura: **co to jest / dlaczego pusto + co zrobić**.

- Lista wniosków, nowy urzędnik: „Nie ma jeszcze wniosków w tej edycji. Pojawią się
  tu po otwarciu naboru 1 marca.” lub „…Dodaj wniosek ręcznie”.
- Wyniki filtrowania: „Brak wniosków spełniających te kryteria.” + [Wyczyść filtry].
- Wyszukiwanie: „Nie znaleźliśmy projektu „plac zabaw Kormoran”. Sprawdź pisownię
  lub przeglądaj wszystkie projekty.”
- Głosowanie przed startem: „Głosowanie rozpocznie się 1 października o 8:00.
  Do tego czasu możesz przeglądać projekty.”

## Potwierdzenia i sukces

Odpowiedz na trzy pytania: **co się stało, co masz (dowód), co dalej**.

„Twój głos został zapisany. Numer potwierdzenia: BO-2026-04812. Wysłaliśmy kopię
na adres j***@gmail.com. Wyniki ogłosimy 20 października.”

Nie: „Sukces!”, „Operacja zakończona pomyślnie”, „Dziękujemy!” bez treści.

## Ładowanie i oczekiwanie

- < 1 s: nic.
- 1–3 s: spinner / skeleton, bez tekstu.
- > 3 s: tekst, co się dzieje: „Sprawdzamy uprawnienia do głosowania…”.
- > 10 s: postęp lub wyjaśnienie: „Generujemy PDF — zwykle trwa to do 30 sekund.”

## Potwierdzenia akcji destrukcyjnych

Tytuł = pytanie z obiektem. Treść = konsekwencja. Przyciski = nazwane akcje.

„Usunąć wniosek nr 128 „Ławki w parku”?
Wniosek zniknie z listy i z mapy. Tej operacji nie można cofnąć.
[Zachowaj wniosek] [Usuń wniosek]”

Dla odwracalnych: bez modala, toast „Wniosek przeniesiony do archiwum · Cofnij”.

## Daty, liczby, jednostki (pl-PL)

- Data: `12 marca 2026` w treści, `12.03.2026` w tabelach. Nigdy `03/12/2026`.
- Godzina: `8:00`, `17:30` (24 h). Termin: „do 15 października, 23:59”.
- Kwoty: `1 250 000 zł` (spacja nierozdzielająca jako separator tysięcy, `zł` po
  spacji). W tabelach `tabular-nums`, wyrównanie do prawej.
- Liczebniki z rzeczownikiem — odmiana: 1 wniosek, 2–4 wnioski, 5–21 wniosków,
  22–24 wnioski… Zaimplementuj funkcję `plural(n, 'wniosek','wnioski','wniosków')`
  zamiast „wniosek(ów)”.
- Telefon: `+48 89 123 45 67` lub `89 123 45 67`.

## Słownik — spójność nazw w produkcie

Trzymaj jedną nazwę na jedno pojęcie w całym interfejsie. Przykładowy słownik dla BO
(dostosuj do gminy — jej regulamin ma pierwszeństwo):

| Pojęcie | Używaj | Nie mieszaj z |
|---|---|---|
| propozycja mieszkańca przed weryfikacją | wniosek | projekt, zgłoszenie, pomysł |
| wniosek po pozytywnej weryfikacji, na liście do głosowania | projekt | wniosek, zadanie |
| jednostka podziału gminy | obszar / okręg (wg regulaminu) | dzielnica, rejon, strefa |
| roczny cykl BO | edycja (np. „edycja 2026”) | rok, tura, nabór |
| osoba oddająca głos | mieszkaniec / głosujący | użytkownik, wnioskodawca |
| ocena formalna/merytoryczna | weryfikacja | ocena, akceptacja, sprawdzenie |

Gdy klient używa własnych terminów (np. „zadanie” zamiast „projekt”) — przyjmij jego,
zapisz w słowniku i stosuj konsekwentnie.
