# W Dialogu — nowa architektura oferty i pakiety

> Propozycja przebudowy oferty pod sprzedaż do JST. Ceny są orientacyjne i wymagają walidacji na pierwszych 10 rozmowach handlowych. Nazwy programów dotacyjnych wymagają sprawdzenia aktualnych naborów.

---

## 1. Założenia, na których stoi ta oferta

**Rynek.** Około 2 480 gmin, z czego ~1 500 wiejskich, ~650 miejsko-wiejskich, ~300 miejskich i 66 miast na prawach powiatu. Większość klientów to gminy do 20 tys. mieszkańców z budżetem na IT liczonym w dziesiątkach tysięcy złotych rocznie. Oferta musi działać dla nich, a miasta obsługiwać indywidualnie.

**Próg zamówień.** Do 130 000 zł netto gmina kupuje bez przetargu, z rozeznania rynku lub zapytania ofertowego. Każdy pakiet roczny musi mieścić się poniżej tego progu, a najlepiej poniżej 50 000 zł, bo wtedy decyzję podejmuje sekretarz lub skarbnik bez rady gminy i bez planu zamówień.

**Kto kupuje.** W urzędzie nie ma jednego kupca. Są cztery osoby z czterema budżetami:

| Osoba | Czego chce | Z jakiej linii budżetowej płaci |
|---|---|---|
| Skarbnik / naczelnik podatków | Wpływy, mniej błędnych deklaracji, mniej zaległości, mniej postępowań | Obsługa podatków; koszty systemu gospodarowania odpadami (opłata śmieciowa) |
| Sekretarz / kierownik organizacyjny | Spokój w obsłudze mieszkańca, mniej telefonów, zgodność z przepisami | Informatyzacja, administracja |
| Wójt / burmistrz | Wizerunek, aplikacja, widoczny kontakt z mieszkańcem, reelekcja | Promocja, zarządzanie kryzysowe |
| Pełnomocnik ds. konsultacji / BO | Frekwencja, raport, brak skarg na głosowanie | Budżet obywatelski, konsultacje |

**Finansowanie poza budżetem IT.** Koszty obsługi systemu gospodarowania odpadami mogą być pokrywane z opłaty śmieciowej. Budżet obywatelski ma własną pulę. Alerty kryzysowe idą z zarządzania kryzysowego. Sprzedajemy więc trzy różne faktury do trzech różnych paragrafów zamiast jednej dużej do informatyzacji.

**Wniosek.** Nie sprzedajemy „platformy z 22 modułami”. Sprzedajemy trzy produkty, każdy jednemu kupującemu, z jednym asystentem AI jako klamrą. Platforma jest tym, co klient odkrywa po pierwszym zakupie.

---

## 2. Co zmieniamy w architekturze oferty

**Było:** 22 moduły w jednej siatce kafelków, wszystkie równie ważne, klient sam składa pakiet.

**Będzie:**

- **1 warstwa wspólna:** Centrum Dialogu (strona publiczna), konta mieszkańców, panel, role, aplikacja mobilna, asystent AI.
- **3 linie produktowe** odpowiadające trzem kupującym: **Podatki i Opłaty**, **Kontakt z Mieszkańcem**, **Partycypacja**.
- **3 pakiety** według wielkości gminy: **Start**, **Gmina**, **Miasto**.
- **Dodatki** kupowane osobno.
- **1 produkt darmowy** jako wejście do urzędu.

---

## 3. Nowe moduły, które dodajemy

Każdy z nich odpowiada na konkretny ból kupującego i jest tani w budowie, bo korzysta z istniejących danych platformy.

### 3.1 Asystent Mieszkańca (AI na stronie urzędu)
Czat na stronie publicznej i w aplikacji, który odpowiada na pytania mieszkańców na podstawie danych ze wszystkich włączonych modułów oraz z BIP i strony urzędu. „Kiedy wywóz plastiku na Lipowej 12?”, „Jak złożyć DN-1?”, „Co z moim zgłoszeniem nr 6552?”, „Do kiedy konsultacje planu?”. Odpowiada w dzień i w nocy, przekazuje trudne sprawy jako zgłoszenie do właściwego wydziału.
**Dlaczego się sprzeda:** urzędy nie mają ludzi do odbierania telefonów. Jeden moduł, który zdejmuje 30–50% pytań, jest wart więcej niż pięć kafelków. To także naturalna klamra dla całej platformy: im więcej modułów, tym mądrzejszy asystent.

### 3.2 Deklaracja śmieciowa z asystentem
Rozszerzenie asystenta deklaracji na opłatę za gospodarowanie odpadami. Zmiana liczby osób, nowa nieruchomość, kompostownik, korekta. To najczęściej składana deklaracja w każdej gminie, częściej niż podatkowe.
**Dlaczego się sprzeda:** płacone z opłaty śmieciowej, czyli spoza budżetu IT. Skarbnik widzi natychmiastowy zwrot: mniej wezwań, mniej ręcznych poprawek.

### 3.3 Przypomnienia o płatnościach
SMS, e-mail i push przed terminem raty podatku, opłaty śmieciowej i po terminie jako miękkie upomnienie, zanim ruszy formalna windykacja. Na start na podstawie terminów ustawowych i list wgranych z systemu podatkowego, później przez integrację.
**Dlaczego się sprzeda:** każda gmina ma zaległości podatkowe. Poprawa ściągalności o 1–2 punkty procentowe zwraca koszt całego pakietu w pierwszym kwartale. To jedyny moduł, który skarbnik potrafi policzyć na kalkulatorze.

### 3.4 Alerty gminne
Masowe powiadomienia SMS i push do mieszkańców, którzy się zapisali: awaria wody, wichura, zmiana terminu wywozu, zamknięcie drogi, ostrzeżenia RCB w wersji lokalnej. Zapis przez stronę, aplikację i kod QR na słupie.
**Dlaczego się sprzeda:** wójt kupuje to sercem, płaci z zarządzania kryzysowego, a każde użycie buduje bazę kontaktów do wszystkich pozostałych modułów.

### 3.5 Sołectwa i fundusz sołecki
Strona każdego sołectwa z ogłoszeniami sołtysa, terminami zebrań wiejskich, głosowaniem nad funduszem sołeckim, listą zadań i ich realizacją na mapie. Sołtys dostaje prosty panel na telefonie.
**Dlaczego się sprzeda:** 1 500 gmin wiejskich ma łącznie ponad 40 tys. sołectw i nikt nie robi dla nich narzędzia. Wójt gminy wiejskiej ma z sołtysami częstszy kontakt niż z radą. Moduł unikalny na rynku.

### 3.6 Raport dla wójta
Automatyczny tygodniowy i miesięczny raport PDF i e-mail: liczba zgłoszeń i czas ich obsługi w podziale na wydziały, aktywność w konsultacjach, wnioski karty mieszkańca, złożone deklaracje, najczęstsze pytania do asystenta. Podsumowanie pisane przez AI, jedna strona.
**Dlaczego się sprzeda:** wójt nigdy nie zaloguje się do panelu. Raport w skrzynce co poniedziałek to jedyny sposób, żeby widział wartość i przedłużył umowę.

### 3.7 Kreator e-usług
Narzędzie, w którym urząd sam składa e-formularz z pól, dodaje klauzulę, załączniki i kieruje do wydziału, a mieszkaniec podpisuje Profilem Zaufanym i wysyła. Katalog e-usług z wyszukiwarką to jego warstwa publiczna.
**Dlaczego się sprzeda:** urząd ma 50–150 wzorów wniosków w PDF-ach. Nie zbudujemy ich wszystkich za niego. Dajemy narzędzie i 30 gotowych szablonów na start, resztę robi sam lub zamawia jako usługę.

### 3.8 Raport z konsultacji pisany przez AI
Podsumowanie opinii z forum, ankiet i komentarzy do dokumentu: grupowanie tematów, liczby, cytaty, wnioski. Pełnomocnik redaguje i publikuje.
**Dlaczego się sprzeda:** raport z konsultacji to obowiązek i najgorsza część pracy pełnomocnika. To funkcja w linii Partycypacja, nie osobny moduł, ale sprzedaje całą linię.

---

## 4. Co chowamy, łączymy albo oddajemy za darmo

| Moduł dziś | Co robimy | Dlaczego |
|---|---|---|
| Karta mieszkańca | Dodatek tylko w pakiecie Miasto | Gminy poniżej 30 tys. nie mają partnerów do programu. Rozprasza ofertę. |
| Prezentacja budżetu + Mapa inwestycji | Łączymy w jeden dodatek „Przejrzysty budżet” | To ta sama historia dla mieszkańca: skąd pieniądze i na co idą. |
| Propozycje konsultacji | Funkcja w Partycypacji | Nie jest modułem, jest formularzem. |
| Wysłane SMS-y, Treści e-maili, Konta mieszkańców | Warstwa wspólna, niewidoczna w ofercie | Infrastruktura. Klient nie kupuje rejestru SMS-ów. |
| Petycje | Funkcja w Partycypacji | Obowiązek ustawowy, ale nikt za niego nie zapłaci osobno. Dobra „gratisowa” korzyść. |
| Sygnalista | Znika z oferty W Dialogu, cross-sell do sygnalizuj.pl | To gotowy, osobny produkt. Dwa kanały sygnalisty w jednej firmie mylą klienta. |
| Konsultacje radnych, Młodzieżowa rada | Chowamy | Niszowe, słabo utrzymane, tworzą pytania na prezentacji. |
| Newsletter | Wchodzi do Kontaktu z Mieszkańcem jako kanał | Osobno nikogo nie interesuje. |
| Deklaracje dostępności | **Darmowe narzędzie publiczne** | Obowiązek każdego urzędu. Generator za darmo w zamian za e-mail to najtańszy sposób wejścia do 2 480 gmin. |
| Wydarzenia z zapisami | Funkcja w Kontakcie z Mieszkańcem | Przydatne, ale nie jest powodem zakupu. |
| Gospodarka odpadami (harmonogramy) | Rdzeń linii Podatki i Opłaty razem z deklaracją śmieciową | Harmonogram to najczęściej odwiedzana strona każdej gminy. Przyciąga mieszkańców do reszty. |

---

## 5. Linie produktowe

### Linia A: Podatki i Opłaty
**Kupujący:** skarbnik, naczelnik wydziału podatków, referat odpadów.
**Obietnica:** mniej błędnych deklaracji, mniej wezwań, wyższa ściągalność, mniej telefonów.

W środku:
- Asystent deklaracji podatkowych: DN-1 i IN-1, następnie rolny, leśny, transport.
- Deklaracja śmieciowa z asystentem.
- Harmonogram odbioru odpadów (sektory, frakcje, wyjątki, punkty zbiórki).
- Przypomnienia o płatnościach.
- E-usługi podatkowe: zaświadczenie o niezaleganiu, wniosek o zwrot nadpłaty, przeksięgowanie, indywidualny rachunek, pismo ogólne.
- Asystent Mieszkańca w zakresie podatków i odpadów.

**Argument finansowy:** koszt linii może być w części pokryty z opłaty za gospodarowanie odpadami jako koszt obsługi systemu. Sprawdzić z radcą gminy, ale to standardowa praktyka.

### Linia B: Kontakt z Mieszkańcem
**Kupujący:** sekretarz, wójt, referat promocji.
**Obietnica:** każdy mieszkaniec ma urząd w telefonie, każde zgłoszenie ma właściciela i termin, wójt wie, co się dzieje.

W środku:
- Centrum zgłoszeń z mapą, kategoriami, automatycznym kierowaniem do wydziałów i statusami.
- Alerty gminne.
- Ogłoszenia i wydarzenia z push.
- Aplikacja mobilna w barwach gminy.
- Newsletter i SMS.
- Wydarzenia z zapisami.
- Sołectwa i fundusz sołecki (gminy wiejskie i miejsko-wiejskie).
- Raport dla wójta.
- Asystent Mieszkańca w zakresie zgłoszeń, ogłoszeń i spraw ogólnych.

### Linia C: Partycypacja
**Kupujący:** pełnomocnik ds. konsultacji, koordynator budżetu obywatelskiego, sekretarz.
**Obietnica:** konsultacje i głosowania bez skarg, z frekwencją i raportem gotowym w godzinę.

W środku:
- Konsultacje społeczne z etapami, spotkaniami, forum i raportem.
- Ankiety, geoankiety, komentowanie dokumentów z weryfikacją SMS, PESEL, adresem.
- Budżet obywatelski (integracja lub moduł, zależnie od gminy).
- Propozycje konsultacji od mieszkańców.
- Petycje.
- Raport z konsultacji pisany przez AI.
- Konsultacje planistyczne: tryb dla planów ogólnych i miejscowych z geoankietą i zbieraniem uwag do projektu.

### Warstwa wspólna (w każdym pakiecie)
Centrum Dialogu jako strona publiczna, konta mieszkańców z weryfikacją, panel z rolami i 2FA, aplikacja mobilna, asystent AI panelu, klauzule RODO, dostępność cyfrowa, przypisany konsultant, helpdesk.

---

## 6. Pakiety

Pakiety według wielkości gminy. Wielkość określa cenę i limity, nie funkcje. Funkcje wynikają z wybranych linii.

| | **Start** | **Gmina** | **Miasto** |
|---|---|---|---|
| Dla kogo | Gminy do 10 tys. mieszkańców | 10–50 tys. mieszkańców | Powyżej 50 tys., miasta na prawach powiatu, związki gmin |
| Linie produktowe | 1 do wyboru | 2 do wyboru | Wszystkie 3 |
| Asystent Mieszkańca | W zakresie wybranej linii | W zakresie wybranych linii | Pełny, z wiedzą z BIP i strony urzędu |
| Aplikacja mobilna | Wspólna aplikacja W Dialogu z profilem gminy | Wspólna aplikacja z profilem gminy | Własna aplikacja gminy w sklepach |
| Konta pracowników | 10 | 40 | bez limitu |
| SMS w cenie rocznie | 2 000 | 10 000 | 30 000 |
| Wdrożenie i szkolenie | Zdalne, 2 tygodnie | Zdalne + 1 dzień na miejscu, 4 tygodnie | Projekt wdrożeniowy, 8–12 tygodni |
| Opieka | E-mail, 2 dni robocze | Konsultant, 1 dzień roboczy | Konsultant dedykowany, 4 godziny |
| **Cena roczna (orientacyjna, netto)** | **od 7 900 zł** | **od 19 900 zł** | **od 49 000 zł, wycena indywidualna** |
| Opłata wdrożeniowa (jednorazowa) | 2 900 zł | 6 900 zł | od 19 000 zł |

Zasady cenowe:
- Druga linia w pakiecie Start: +4 900 zł rocznie. Trzecia linia w Gminie: +7 900 zł.
- Umowa 24 lub 36 miesięcy: rabat 10% lub 15%. JST lubią stałą cenę na kadencję.
- Cena nigdy nie przekracza 130 000 zł netto rocznie, także w Mieście. Powyżej dzielimy na osobne umowy dla linii.
- Cena rośnie z liczbą mieszkańców, nie z liczbą modułów. Klient nie może „wyłączyć czegoś, żeby było taniej”. To upraszcza rozmowę.

---

## 7. Dodatki

| Dodatek | Cena orientacyjna rocznie | Dla kogo |
|---|---|---|
| Przejrzysty budżet (prezentacja budżetu + mapa inwestycji) | 4 900 zł | Gminy, które chcą pokazać, na co idą pieniądze; dobrze łączy się z Partycypacją |
| Karta mieszkańca | 9 900 zł | Miasta powyżej 30 tys. z lokalnymi przedsiębiorcami |
| Kreator e-usług z katalogiem | 9 900 zł + 30 szablonów w cenie | Urzędy, które chcą uporządkować wnioski; kolejne szablony jako usługa 290 zł za formularz |
| Integracja z systemem podatkowym | wycena, zwykle 8–15 tys. zł jednorazowo | Odblokowuje przypomnienia o płatnościach z realnych sald i podgląd rozliczeń |
| Integracja z płatnościami online | 2 900 zł + prowizja operatora | Po integracji podatkowej |
| Pakiet SMS dodatkowy | według cennika operatora + 10% | Wszyscy |
| Własna aplikacja w sklepach dla pakietów Start i Gmina | 6 900 zł | Gminy, którym zależy na własnej ikonie |

---

## 8. Produkt darmowy jako wejście

**Generator deklaracji dostępności + automatyczny skan WCAG strony urzędu.** Urząd wpisuje adres strony, dostaje raport błędów dostępności i gotową deklarację do publikacji. W zamian: e-mail sekretarza lub informatyka i zgoda na kontakt.

Dlaczego to działa: deklaracja dostępności jest obowiązkiem każdego z 2 480 urzędów i musi być przeglądana co roku do 31 marca. Termin tworzy naturalny sezon kampanii. Skan pokazuje problemy, a rozmowa o problemach strony prowadzi do rozmowy o Centrum Dialogu.

---

## 9. Model sprzedaży

### Wejście do gminy: jedna linia, jeden kupujący, jeden ból
- **Gmina wiejska:** wchodzimy przez skarbnika z linią Podatki i Opłaty. Argument: deklaracja śmieciowa i harmonogram płacone z opłaty śmieciowej, przypomnienia o płatnościach zwracają się w kwartał.
- **Gmina miejsko-wiejska i miasto do 50 tys.:** wchodzimy przez sekretarza lub wójta z Kontaktem z Mieszkańcem. Argument: aplikacja, zgłoszenia, alerty. To widać, to się pokazuje na sesji rady.
- **Miasto:** wchodzimy przez koordynatora budżetu obywatelskiego lub konsultacji z Partycypacją, bo tam już jest budżet i przetarg co roku. Argument: weryfikacja głosów, raport AI, jedna umowa zamiast trzech.

### Ekspansja: po 6 miesiącach dokładamy drugą linię
Asystent Mieszkańca i Raport dla wójta pokazują dane z całej platformy, także z modułów, których gmina nie kupiła („asystent nie zna odpowiedzi na 40 pytań o podatki miesięcznie, bo nie ma linii Podatki”). To najlepszy generator dosprzedaży.

### Pilotaż zamiast przetargu
90 dni pilotażu jednej linii za opłatę wdrożeniową. Po pilotażu decyzja o umowie rocznej. Gmina kupuje bez ryzyka i bez PZP, a my mamy dane do referencji.

### Kanały
- Bezpośredni: webinary dla skarbników (podatki, odpady), dla sekretarzy (dostępność, zgłoszenia), dla koordynatorów BO.
- Sezonowe kampanie: styczeń–marzec deklaracje podatkowe i dostępność; wrzesień–listopad budżet na kolejny rok i BO.
- Partnerzy: firmy obsługujące informatykę gmin (outsourcing IT) z prowizją 15–20%; dostawcy systemów podatkowych jako partnerzy integracyjni.
- Referencje: każda umowa zawiera zgodę na studium przypadku z liczbami.

### Wskaźniki, które mierzymy
Liczba pilotaży miesięcznie, konwersja pilotaż–umowa, średnia liczba linii na klienta po 12 miesiącach, odnowienia, liczba pytań obsłużonych przez Asystenta Mieszkańca na gminę.

---

## 10. Argumentacja dla każdego kupującego

**Skarbnik.**
„Ilu pracowników poprawia dziś deklaracje ręcznie? Ile wezwań wysyłacie rocznie? Ile procent rat podatku wpływa po terminie?” Pokazujemy asystenta wypełniającego DN-1 i deklarację śmieciową oraz kalkulator zwrotu z przypomnień. Zamykamy: „Część kosztu pokrywa opłata śmieciowa, reszta zwraca się z odsetek, których nie musicie ściągać.”

**Sekretarz.**
„Ile telefonów dziennie odbiera sekretariat z pytaniem o wywóz śmieci albo status sprawy?” Pokazujemy Asystenta Mieszkańca odpowiadającego na te pytania i zgłoszenie, które samo trafia do właściwego referatu. Zamykamy: „Jedna umowa, jeden dostawca, jedna klauzula RODO. Nie pięć.”

**Wójt / burmistrz.**
„Jak mieszkaniec dowiaduje się dziś o awarii wody?” Pokazujemy alert push w aplikacji z herbem gminy i Raport dla wójta w skrzynce. Zamykamy: „Mieszkańcy widzą, że urząd odpowiada. Pan widzi co poniedziałek, jak szybko.”

**Informatyk.**
Nie sprzedajemy mu, ale go nie tracimy: brak instalacji na serwerach urzędu, 2FA, lista IP, logi, umowa powierzenia, hosting w UE, eksport danych na żądanie, brak uzależnienia od jednego modułu.

---

## 11. Ryzyka i co trzeba zweryfikować przed startem

- **Finansowanie z opłaty śmieciowej.** Sprawdzić z radcą, jaki zakres kosztów systemu można pokryć. Jeśli tylko harmonogram i deklaracja śmieciowa, wycenić je osobno w linii Podatki.
- **Asystent deklaracji.** Silnik obliczeń deterministyczny, testy per gmina, tryb podglądu dla wydziału podatków. Model językowy tylko w warstwie rozmowy. Bez tego nie sprzedawać skarbnikom.
- **Przypomnienia o płatnościach.** Bez integracji z systemem podatkowym działają tylko na terminach ustawowych i listach wgranych ręcznie. Sprzedawać jako etap 1 i 2, nie obiecywać sald od pierwszego dnia.
- **Asystent Mieszkańca.** Musi mieć twardy zakres wiedzy, cytować źródło i przekazywać do człowieka. Jedna zła odpowiedź o terminie podatkowym w małej gminie wraca jako skarga do wójta.
- **Kreator e-usług.** Logowanie Profilem Zaufanym wymaga integracji z Węzłem Krajowym. Zweryfikować czas i koszt przed umieszczeniem w cenniku.
- **Dług UX w panelu.** Przed prezentacjami poprawić błędy wymienione w dokumentacji: nagłówki listy wydarzeń, 404 struktury ankiety, niejasne przyciski statusów propozycji.
- **Dostępność czatu.** Interfejs asystenta z pełną obsługą klawiatury i czytnika ekranu, wariant bez animacji. Dla sektora publicznego to warunek, nie opcja.

---

## 12. Plan na 12 miesięcy

| Kwartał | Produkt | Sprzedaż |
|---|---|---|
| 1 | Asystent deklaracji DN-1 i deklaracja śmieciowa; darmowy generator dostępności ze skanem; porządki UX | Kampania „deklaracja dostępności do 31 marca”; 5 pilotaży linii Podatki |
| 2 | Asystent Mieszkańca w zakresie podatków i odpadów; Alerty gminne; Raport dla wójta | Webinary dla skarbników; 10 pilotaży; pierwsze 3 studia przypadku |
| 3 | Przypomnienia o płatnościach etap 1; Sołectwa i fundusz sołecki; IN-1, DR-1, DL-1 | Kampania jesienna „budżet na przyszły rok”; program partnerski dla firm IT |
| 4 | Kreator e-usług z 30 szablonami; pierwsza integracja z systemem podatkowym; Raport z konsultacji AI | Dosprzedaż drugiej linii do klientów z Q1–Q2; pierwsze Miasto |

Cel na koniec roku: 40 gmin płacących, średnio 1,6 linii na gminę, 90% odnowień pilotaży.
