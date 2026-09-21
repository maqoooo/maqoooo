# Kreator przepływu weryfikacji projektów BO — koncepcja

Dokument opisuje narzędzie, w którym **urząd sam projektuje przebieg weryfikacji
projektu**, bez rysowania diagramów. Zakres opisu: jeden etap — **weryfikacja końcowa**.

Punkt wyjścia: istniejący `generator.html` renderuje mapę procesu z JSON-a
(`meta → etapy[] → role[] / kroki[] / przejscia[]`). Brakuje ogniwa **przed** nim:
narzędzia, które ten JSON zbiera od klienta. Kreator to ogniwo uzupełnia.

```
wywiad z urzędem  →  [KREATOR]  →  JSON  →  [GENERATOR]  →  mapa procesu
                         ↓                                      ↓
              lista braków + protokół             checklista konfiguracji panelu
```

---

## 1. Dlaczego nie edytor diagramów

Pierwszy odruch przy takim zadaniu to dać klientowi płótno z klockami i strzałkami.
To nie zadziała, z trzech powodów:

- **Urzędnik nie myśli grafami.** Myśli zdaniami: „dyrektor przypisuje projekt
  weryfikatorowi, ten ma 30 dni". Prosząc o diagram, prosimy o tłumaczenie na obcy
  język — i dostajemy albo pustą planszę, albo diagram, którego nie da się wykonać.
- **Pusta kartka blokuje.** Przy 25 krokach nikt nie wie, od czego zacząć.
- **Dowolny graf jest niewykonalny.** Klient narysuje przepływ, którego platforma
  nie obsłuży, a rozbieżność wyjdzie dopiero we wdrożeniu.

Dlatego kreator działa odwrotnie: **wywiad w języku urzędu + gotowy wzorzec do
przycięcia**, a graf powstaje automatycznie i zawsze mieści się w tym, co platforma
umie wykonać.

Trzy zasady, na których to stoi:

1. **Nie pusta kartka, tylko wzorzec.** Startujemy od typowego przebiegu weryfikacji
   końcowej. Klient go *przycina* — włącza i wyłącza elementy. Odejmowanie jest
   dużo łatwiejsze niż budowanie.
2. **Jeden krok = jedno zdanie po polsku.** „Dyrektor przypisuje weryfikatora".
   Nikt nie wpisuje typu węzła ani identyfikatora.
3. **„Jeszcze nie wiemy" jest prawidłową odpowiedzią.** Każde pytanie można zostawić
   otwarte. Brak trafia na mapę jako żółty znacznik i na listę pytań zwrotnych —
   zamiast blokować cały formularz. To jest realny sposób pracy urzędu: część
   odpowiedzi wymaga uzgodnień między wydziałami i przyjdzie za tydzień.

---

## 2. Warstwy danych — co zbieramy i w jakiej kolejności

Kolejność nie jest dowolna: każda warstwa zamyka pytania, które otwiera następna.

| # | Warstwa | Co ustala | Dlaczego tu |
|---|---------|-----------|-------------|
| 0 | **Kontekst** | gmina, edycja, kto wypełnia, data | nagłówek mapy i protokołu ustaleń |
| 1 | **Ramy etapu** | skąd projekt wchodzi, ile trwa etap, od czego liczymy termin, jakie są możliwe wyniki | granice — bez nich nie wiadomo, co jest początkiem i końcem |
| 2 | **Obsada (role)** | nazwa u klienta + uprawnienie w systemie + kto konkretnie + poprzednia nazwa | role to tory mapy; wszystko dalej się do nich odwołuje |
| 3 | **Ścieżka podstawowa** | które elementy wzorca obowiązują | szkielet przepływu — bez wyjątków |
| 4 | **Odchylenia** | co, gdy brak opinii w terminie, zwrot karty, zła jednostka, zmiany uzgadniane z autorem | rozwidlenia i pętle |
| 5 | **Terminy, statusy, powiadomienia** | per krok | to, co trafia do harmonogramu i szablonów maili |
| 6 | **Podsumowanie** | walidacja, lista braków, eksport | protokół ustaleń do zatwierdzenia |

Kluczowe rozdzielenie: **warstwa 3 nigdy nie pyta o wyjątki**. Gdy przy opisie
ścieżki podstawowej pozwolimy klientowi mówić „a jak nie zdąży, to…", rozmowa się
rozjeżdża i nikt nie panuje nad całością. Najpierw ścieżka szczęśliwa, potem — i tylko
potem — co może pójść inaczej.

### Warstwa 2 w szczegółach: role jako sloty

Kreator nie pyta „jakie macie role" (odpowiedź byłaby listą nazw stanowisk bez
związku z procesem). Pyta o **funkcje w procesie**, a klient je obsadza:

| Slot | Pytanie do klienta | Przykład (Szczecin) |
|------|--------------------|---------------------|
| `otwierajacy` | Kto otwiera etap i kieruje projekt do wydziału? | Administrator → *Weryfikator merytoryczny* |
| `dyrektor` | Kto w wydziale rozdziela pracę / zatwierdza ocenę? | Dyrektor departamentu → *Akceptacja karty oceny* |
| `weryfikator` | Kto merytorycznie ocenia projekt? | Koordynator w wydziale → *Weryfikator* |
| `koord` | Kto rozdziela opinie w jednostce opiniującej? | Koordynator konsultacji → *Konsultujący + koordynator* |
| `opiniujacy` | Kto wydaje opinię cząstkową? | Pracownik opiniujący → *Konsultujący* |
| `decydent` | Kto podejmuje decyzję końcową? | Administrator (ten sam slot co otwierający) |
| `autor` | Wnioskodawca | Autor projektu → *Wnioskodawca* |

Slot jest niezmienny, nazwa jest klienta. Dzięki temu ten sam wzorzec działa
w Szczecinie i w gminie wiejskiej, gdzie „dyrektor departamentu" to sekretarz gminy.

Trzy pola przy każdej roli nie są ozdobą:

- **uprawnienie w systemie** — z zamkniętej listy platformy. To jedyne miejsce,
  w którym język urzędu spotyka się z konfiguracją panelu. Rola bez uprawnienia
  = przepływ, którego nie da się skonfigurować, i walidator to zgłasza.
- **kto konkretnie** (wydział / jednostka / stanowisko) — potrzebne do założenia kont.
- **poprzednia nazwa** — bo w Szczecinie „Koordynator +" stał się „Weryfikator &
  Koordynator +". Mapa pokazuje różnicę, a support wie, czego szukać w zgłoszeniu.

---

## 3. Ekran 3: jak klient „buduje" ścieżkę, nie budując grafu

To jest sedno rozwiązania. Zamiast płótna klient widzi listę przełączników —
każdy odpowiada jednej realnej decyzji organizacyjnej:

| Przełącznik | Pytanie, na które naprawdę odpowiada | Co dodaje do mapy |
|---|---|---|
| Dyrektor rozdziela projekty w wydziale | Czy administrator przypisuje projekt do *wydziału*, czy od razu do *osoby*? | 2 kroki w torze dyrektora |
| Dyrektor zatwierdza kartę oceny | Czy weryfikator kończy sprawę sam? | rozwidlenie + **pętla zwrotu** do poprawy |
| Projekt jest opiniowany poza wydziałem | Czy potrzebna jest opinia zarządu dróg, zieleni, konserwatora? | ścieżka opiniowania |
| W jednostce opiniującej jest koordynator | Czy weryfikator trafia wprost do pracownika, czy przez koordynatora? | dodatkowy krok przekazania |
| Opiniujący może zaproponować zmiany, autor je akceptuje | Czy zakres projektu podlega uzgodnieniu? | rozwidlenie TAK/NIE + ścieżka autora, zbiegająca się z powrotem |
| Decyzję końcową podejmuje ktoś inny | Czy to prezydent / zespół, czy ten sam administrator? | osobny tor |

Sześć przełączników generuje **kilkadziesiąt sensownych wariantów przepływu** —
w praktyce pokrywa to rozpiętość od gminy wiejskiej (wszystko wyłączone: 8 kroków)
po Szczecin (wszystko włączone: 25 kroków, 6 torów). Weryfikacja: włączenie
wszystkich sześciu odtwarza przepływ z Waszego pliku `generator.html`
krok w krok.

Obok każdego przełącznika jest **jedno zdanie, kiedy go wyłączyć** — bo klient nie
wie, czy „koordynator konsultacji" to o nim. Wie, czy ktoś u niego rozdziela sprawy.

Efekt uboczny, który się bardzo opłaca: **ekran Obsada pokazuje tylko te role,
które faktycznie wystąpiły w przepływie**. Gmina bez opiniowania nigdy nie zobaczy
pytania o koordynatora konsultacji.

---

## 4. Ekran 4: odchylenia — pytania, które generują 80% zgłoszeń do supportu

Pytamy tylko o to, co realnie się psuje w trakcie edycji:

1. **Co, gdy jednostka nie wyda opinii w terminie?** (przypomnienie / milcząca zgoda /
   weryfikator zamyka bez opinii / blokada). Wyznacza regułę eskalacji i treść przypomnień.
2. **Ile razy dyrektor może odesłać kartę do poprawy?** Bez limitu pętla może się nie
   zamknąć przed końcem 30-dniowego etapu.
3. **Czy projekt można przekazać do innego wydziału w trakcie etapu?** Decyduje, czy
   weryfikator dostaje przycisk „przekaż dalej", czy musi prosić administratora.
   Bardzo częste zgłoszenie: „mam projekt, który nie jest mój".
4. **Karta oceny:** jakie pola, które obowiązkowe, czy zapis roboczy, kiedy widoczna
   dla autora, **jak agregujemy rozbieżne opinie**. Ostatnie jest krytyczne — bez tej
   reguły system nie wie, kiedy wolno zamknąć ocenę, i klient odkrywa to w trakcie głosowania.

---

## 5. Dwa mechanizmy, które decydują o użyteczności

### 5.1 Podgląd na żywo — tu powstaje „czytelność"

Ekran jest podzielony: **po lewej pytania, po prawej mapa**. Każde kliknięcie
przełącznika, każda wpisana nazwa roli natychmiast przerysowuje mapę. Klient nie
wyobraża sobie skutku swojej odpowiedzi — on go widzi.

To jest jedyny znany mi sposób, żeby urzędnik wyłapał własny błąd: „chwila, dlaczego
dyrektor jest tu dwa razy?". Na formularzu bez podglądu tego nie widać, a na wdrożeniu
kosztuje tydzień.

### 5.2 „Do ustalenia" jako pierwszorzędny obywatel

Każde pole i każdy krok da się oznaczyć jako niedomknięte. Skutki:

- na mapie krok dostaje **żółtą przerywaną ramkę** i etykietę „do ustalenia";
- w nagłówku rośnie licznik („6 rzeczy do ustalenia");
- w podsumowaniu powstaje **lista pytań zwrotnych** gotowa do wysłania mailem.

Bez tego mechanizmu klient utknie na pierwszym pytaniu, którego nie umie rozstrzygnąć
sam — a takich jest zawsze kilka. Z nim: wypełnia 85% w 40 minut, resztę domyka po
naradzie, a Wy przez cały czas widzicie dokładnie, czego brakuje.

---

## 6. Walidacja: sprawdzamy sens przepływu, nie wypełnienie pól

Walidator patrzy na graf, nie na formularz:

**Błędy (czerwone) — przepływ jest wykonalnie zły:**
- krok bez wejścia — nikt go nie uruchamia;
- ślepy zaułek — projekt zatrzymuje się i nigdy nie wychodzi z etapu;
- rozwidlenie z jedną ścieżką;
- przejście do nieistniejącego kroku;
- rola bez nazwy.

**Ostrzeżenia (żółte) — przepływ jest poprawny, ale niekompletny:**
- **rola bez uprawnienia w systemie** — nie da się jej skonfigurować w panelu;
- rozwidlenie bez opisanego warunku („kiedy w prawo, kiedy w lewo?");
- brak długości etapu — nie da się ustawić harmonogramu ani przypomnień;
- brak listy możliwych wyników etapu;
- **w przepływie nie ma momentu, w którym autor dowiaduje się o wyniku** — częsty
  realny błąd, wychodzi dopiero przy skardze wnioskodawcy;
- zestawienie wszystkiego, co oznaczono jako „do ustalenia".

Walidator działa na bieżąco, pod mapą — nie na końcu.

---

## 7. Co wychodzi z narzędzia

Jeden wywiad, cztery produkty:

1. **JSON** w formacie `generator.html` — mapa działa bez żadnych zmian w generatorze.
2. **Mapa procesu** — do rozmowy z klientem, dla supportu, dla nowego pracownika urzędu.
3. **Protokół ustaleń** — mapa + tabela terminów + lista braków. Klient zatwierdza;
   od tej chwili jest to uzgodniony zakres, a nie „mówiliśmy inaczej".
4. **Checklista konfiguracji panelu** — automatycznie z odpowiedzi:
   - role do założenia wraz z uprawnieniami,
   - długość etapu do harmonogramu edycji,
   - statusy projektu do zdefiniowania,
   - kroki wymagające powiadomienia (szablony maili),
   - pola karty oceny.

   To jest tłumaczenie z języka urzędu na język panelu — i realna oszczędność czasu
   wdrożeniowca, bo dziś powstaje ręcznie z notatek.

---

## 8. Jak to wpiąć w proces wdrożenia

Narzędzie ma dwa tryby użycia i oba są potrzebne:

- **Tryb warsztatowy** — wdrożeniowiec prowadzi spotkanie, dzieli ekran, wypełnia na
  żywo. Mapa rośnie na oczach klienta. Najszybsza droga: ~45 minut na etap.
- **Tryb samoobsługowy** — link wysłany do urzędu, klient wypełnia sam, oznacza braki,
  odsyła JSON. Dobre dla gmin, które i tak muszą to uzgodnić wewnętrznie.

Naturalny cykl: warsztat → klient domyka braki → zatwierdzenie protokołu →
konfiguracja panelu z checklisty → mapa trafia do supportu na czas edycji.

**Kolejna edycja:** wczytujecie JSON z poprzedniego roku, klient zmienia tylko to, co
się zmieniło, a kreator oznacza różnice — dokładnie te czerwone znaczniki, które dziś
w pliku Szczecina wpisywane są ręcznie.

---

## 9. Rozszerzenie na pozostałe etapy

Weryfikacja końcowa jest najtrudniejsza (najwięcej ról, pętla akceptacji, uzgodnienia
z autorem), więc świadomie od niej zaczynamy — jeśli model unosi ją, uniesie resztę.
Pozostałe etapy to ten sam kreator z inną biblioteką przełączników:

- **weryfikacja wstępna** — rekomendowane zmiany, konsultacje, decyzja administratora;
- **weryfikacja formalna** — krótsza, bez dyrektora, z konsultacją;
- **etap odwołań** — kto rozpatruje, w jakim terminie, czy wraca do weryfikacji;
- **zgłaszanie projektów** i **głosowanie** — inny charakter (formularz, limity),
  raczej osobne narzędzia niż ten sam wzorzec.

Format JSON już to przewiduje — `etapy[]` jest tablicą, generator przełącza się
między etapami selektorem.

---

## 10. Czego to narzędzie świadomie nie robi

- **Nie zastępuje regulaminu.** Zbiera to, co regulamin już rozstrzygnął; gdy
  regulamin milczy, pokazuje to jako brak — i to jest jego wartość.
- **Nie waliduje zgodności z uchwałą.** Nie wie, czy 30 dni jest zgodne z uchwałą rady.
- **Nie konfiguruje panelu automatycznie.** Produkuje checklistę; wykonuje ją człowiek.
  Automatyzacja tego kroku to osobna decyzja — wymagałaby API panelu i zaufania do
  danych z wywiadu, którego na starcie nie ma.

---

## Uwaga o liście uprawnień

Lista uprawnień w prototypie (`Weryfikator merytoryczny`, `Weryfikator`,
`Weryfikator formalny`, `Weryfikator & Koordynator +`, `Konsultujący`,
`Konsultujący + koordynator`, `Akceptacja karty oceny`, `Wnioskodawca`) pochodzi
**wyłącznie z załączonego pliku Szczecina**. Przed użyciem u klienta trzeba ją
zastąpić pełną, zamkniętą listą uprawnień platformy — inaczej klient wybierze
uprawnienie, którego w panelu nie ma. To jedyne miejsce w kreatorze, gdzie dane
muszą przyjść z systemu, a nie z wywiadu.
