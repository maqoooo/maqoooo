# BRIEF: Landing page „W Dialogu” — do wykonania przez Claude Design / AI do projektowania stron

> Instrukcja użycia: wklej cały ten dokument jako jeden prompt. Część A to brief projektowy. Część B to pełny, ostateczny tekst strony, który należy użyć dosłownie, bez parafrazowania. Elementy w nawiasach kwadratowych `[…]` to miejsca na dane własne klienta, mają zostać jako czytelne placeholdery.

---

# CZĘŚĆ A — BRIEF PROJEKTOWY

## 1. Zadanie

Zaprojektuj i zakoduj **jednostronicowy landing page (strona home, bez podstron)** produktu **W Dialogu**: platformy SaaS dla polskich samorządów (gmin, miast, powiatów). Strona ma sprzedawać trzy linie produktowe i jednego asystenta AI, a jej celem jest umówienie prezentacji handlowej.

Język strony: **polski**. Atrybut `lang="pl"`. Wszystkie teksty pochodzą z Części B. Nie wymyślaj nowych treści, nie skracaj i nie zmieniaj nagłówków. Jeśli sekcja jest za długa na jeden ekran, podziel ją wizualnie, ale zachowaj treść.

## 2. Kontekst produktu w trzech zdaniach

W Dialogu łączy w jednej platformie to, co urząd zwykle kupuje od pięciu dostawców: deklaracje podatkowe wypełniane w rozmowie z asystentem AI, zgłoszenia i alerty dla mieszkańców z aplikacją mobilną, konsultacje społeczne i budżet obywatelski. Oferta jest podzielona na trzy linie produktowe (**Podatki i Opłaty**, **Kontakt z Mieszkańcem**, **Partycypacja**) i trzy pakiety według wielkości gminy (**Start**, **Gmina**, **Miasto**). Klamrą jest **Asystent Mieszkańca**: czat, który odpowiada mieszkańcom z danych urzędu.

## 3. Odbiorcy i cel konwersji

**Kto ogląda stronę:**
- Skarbnik gminy lub naczelnik wydziału podatków (40–60 lat, ostrożny, liczy zwrot).
- Sekretarz gminy (decydent operacyjny, szuka spokoju i zgodności z przepisami).
- Wójt lub burmistrz (patrzy na wizerunek, ogląda na telefonie).
- Pełnomocnik ds. konsultacji lub koordynator budżetu obywatelskiego (młodszy, sprawny cyfrowo).
- Informatyk urzędu (sprawdza bezpieczeństwo, nie decyduje).

**Konwersja główna:** przycisk **„Umów prezentację”** (link do formularza lub kalendarza, na etapie projektu `#kontakt`).
**Konwersja druga:** formularz darmowego narzędzia „Sprawdź stronę i pobierz deklarację” (adres strony + e-mail).
**Konwersja trzecia:** „Poproś o wycenę dla swojej gminy”.

Użytkownik ma zrozumieć w 10 sekund: „to trzy produkty dla urzędu, jest asystent AI, jest cena, mogę zacząć od pilotażu bez przetargu”.

## 4. Kierunek wizualny

**Wzór stylistyczny: letters.app** (AI dla lekarzy, hasło „Patients, not Paperwork”). Przejmujemy z niego:
- czysty, typograficzny landing premium: duże, spokojne nagłówki, dużo światła, mało elementów na ekranie;
- rytm: krótkie, oddychające sekcje, jedna myśl na sekcję, jeden CTA powtarzany konsekwentnie;
- produkt pokazywany przez eleganckie, statyczne podglądy interfejsu osadzone w sekcjach, nie krzykliwe mockupy urządzeń;
- sekcja zaufania i opinii jako spokojny pasek, nie karuzela.

**Czego nie przejmujemy:** treści, medycznego brandingu, palety kolorów letters.app.

**Ton:** nowoczesny produkt technologiczny, nie portal urzędowy. Bez ilustracji stockowych ludzików, bez ikon z darmowych pakietów w stylu „urząd 2012”, bez granatowo-czerwonej estetyki BIP-u. Strona ma wyglądać, jakby zrobił ją zespół produktowy z Warszawy lub Berlina, a nie wydział promocji.

### 4.1 Paleta (tokeny CSS na `:root`)

Jeśli klient dostarczy własne tokeny marki, użyj ich. Domyślnie:

| Token | Wartość | Użycie |
|---|---|---|
| `--bg` | `#FFFFFF` | tło strony |
| `--bg-soft` | `#F6F6F8` | tła sekcji naprzemiennych, karty |
| `--ink` | `#16161D` | nagłówki, tekst główny |
| `--ink-soft` | `#5B5B66` | tekst pomocniczy, opisy |
| `--line` | `#E6E6EB` | obramowania, separatory |
| `--accent` | `#D8367A` | jedyny kolor akcentowy: CTA, dymki asystenta, podświetlenia, etykiety |
| `--accent-soft` | `#FBE7F0` | tła etykiet, podświetlenie pól w demie |
| `--accent-ink` | `#8E1F4F` | tekst na jasnym różu, hover CTA |

Róż jest jedynym akcentem. Nie dodawaj drugiego koloru wyróżniającego. Zieleń, żółć i czerwień wolno użyć wyłącznie w statusach w podglądach interfejsu (np. status zgłoszenia „w realizacji”), w małej skali.

Tryb ciemny: opcjonalny, jeśli narzędzie robi go automatycznie, zachowaj kontrasty AA. Priorytetem jest tryb jasny.

### 4.2 Typografia

Jedna rodzina fontów z Google Fonts z pełnymi polskimi znakami: **Inter** (bezpiecznie) lub **Instrument Sans** / **Geist** (bardziej charakterystycznie). Skala:

- H1 hero: 56–72 px desktop, 36–40 px mobile, waga 600, interlinia 1.05, tracking −0,02 em.
- H2 sekcji: 40–48 px desktop, 28–32 px mobile, waga 600.
- H3 kart i modułów: 20–24 px, waga 600.
- Tekst: 17–18 px desktop, 16 px mobile, interlinia 1.6, kolor `--ink-soft` dla opisów.
- Etykiety nad nagłówkami (`SERCE PLATFORMY`, `DLA SKARBNIKA…`): 12–13 px, wersaliki, tracking +0,08 em, kolor `--accent`, tło `--accent-soft`, zaokrąglone 999 px.

Maksymalna szerokość akapitu: 65–72 znaki. Nagłówki wyśrodkowane tylko w hero, CTA końcowym i sekcji darmowego narzędzia. Pozostałe sekcje wyrównane do lewej.

### 4.3 Siatka i odstępy

- Kontener 1200 px, marginesy boczne 24 px mobile, 40 px tablet, auto desktop.
- Odstępy pionowe między sekcjami: 120–160 px desktop, 72–96 px mobile. Strona ma oddychać.
- Zaokrąglenia: karty 16–20 px, przyciski 12 px lub pill, podglądy interfejsu 12 px z cienką linią `--line` i bardzo delikatnym cieniem.
- Brak ciężkich cieni, gradientów i szkła. Jeśli gradient, to wyłącznie subtelny radialny róż w tle hero na 3–5% krycia.

### 4.4 Przyciski

- **Główny:** tło `--accent`, tekst biały, wysokość 52 px, padding 0 24 px, waga 600, hover `--accent-ink`. Zawsze ten sam tekst w całej stronie: „Umów prezentację” w hero, nagłówku i CTA końcowym.
- **Drugi:** tekstowy z strzałką lub podkreśleniem, kolor `--ink`, hover `--accent`.
- **W sekcjach produktowych:** przycisk obrysowany (`--line`, tekst `--ink`) z treścią z Części B (np. „Zobacz, jak asystent wypełnia DN-1”).

## 5. Struktura strony i specyfikacja sekcji

Kolejność sekcji jest obowiązkowa i odpowiada Części B. Dla każdej sekcji podano układ, elementy wizualne i interakcje.

### 5.1 Nagłówek (sticky)
- Wysokość 64–72 px, tło białe z 90% krycia i blur po przewinięciu, cienka linia dolna.
- Lewa: logotyp tekstowy „W Dialogu” (jeśli brak pliku logo, złóż z fontu, waga 700, „W” w kolorze akcentu).
- Środek: menu z Części B, linki kotwicowe do sekcji.
- Prawa: link tekstowy „Zaloguj się” + przycisk główny „Umów prezentację”.
- Mobile: hamburger, pełnoekranowe menu, CTA na dole menu.

### 5.2 Hero
- Czysto typograficzny, bez sceny demo (demo jest niżej). Wyśrodkowany.
- H1 w dwóch liniach, podtytuł, dwa CTA obok siebie (główny + tekstowy), pod nimi drobny tekst 14 px w `--ink-soft`.
- Pod przyciskami opcjonalny statyczny, wąski podgląd interfejsu: pasek z trzema kafelkami produktów (Podatki i Opłaty · Kontakt z Mieszkańcem · Partycypacja) jako subtelna zapowiedź. Jeśli to zaciemnia hero, pomiń.
- Wysokość hero: około 80–90 vh na desktopie, bez wymuszania pełnego ekranu na mobile.

### 5.3 Pasek zaufania
- Jeden rząd: „Zaufali nam:” + 6–8 szarych placeholderów logotypów (prostokąty 120×40 z podpisem `[logo gminy]`), skala szarości, krycie 60%.
- Pod nimi cztery liczby w jednej linii: duża wartość (40 px, `--ink`) i podpis (15 px, `--ink-soft`). Wartości pozostają jako `[XX]`.

### 5.4 Problem
- Trzy kolumny na desktopie, jedna na mobile. Każda kolumna: mała etykieta miejsca („W wydziale podatków”), akapit.
- Bez ikon. Ewentualnie cienka pionowa linia `--accent` po lewej stronie każdej kolumny.
- Ostatnie zdanie sekcji („W Dialogu ma osobny produkt…”) wyśrodkowane, większym stopniem, jako przejście do sekcji asystenta.

### 5.5 Asystent Mieszkańca (sekcja wyróżniona, serce strony)
- Tło `--bg-soft` na pełną szerokość.
- Układ desktop: lewa kolumna 45% tekst (etykieta, H2, akapit, CTA), prawa 55% **animowane okno czatu**.
- **Okno czatu:** biała karta 16–20 px zaokrąglenia, nagłówek z kropką statusu i napisem „Asystent Mieszkańca · Gmina [Nazwa]”. Dymki mieszkańca po prawej, jasnoszare. Dymki asystenta po lewej, w kolorze `--accent` z białym tekstem lub `--accent-soft` z tekstem `--ink` (wybierz wariant o lepszym kontraście, minimum 4,5:1).
- **Animacja (zapętlona):** cztery wymiany z Części B odtwarzają się po kolei. Wiadomość mieszkańca „wpisuje się” litera po literze (40–60 ms na znak), potem 600 ms wskaźnika „pisze…” (trzy kropki), potem dymek asystenta pojawia się w całości z fade 200 ms. Pauza 2,5 s między wymianami. Po czterech wymianach okno czyści się z fade i pętla zaczyna od nowa. Całość około 35–45 s.
- Pod czatem trzy małe chipsy źródeł, które podświetlają się przy odpowiedniej odpowiedzi: „Harmonogram odpadów”, „Centrum zgłoszeń”, „Deklaracje”, „Karta Mieszkańca”. To wizualny dowód na zdanie „zawsze wiadomo, skąd wziął odpowiedź”.
- **prefers-reduced-motion:** brak animacji, wszystkie cztery wymiany widoczne statycznie.
- Mobile: tekst nad czatem, czat pełnej szerokości, wysokość maks. 520 px z wewnętrznym przewijaniem wyłączonym (animacja skaluje treść, nie wymaga scrolla).

### 5.6 Trzy produkty, wprowadzenie
- Krótki H2 i akapit wyśrodkowane.
- Trzy kafelki w rzędzie (mobile: kolumna): nazwa linii, jedno zdanie „dla kogo” z etykiet sekcji, strzałka. Kafelek jest linkiem kotwicowym do odpowiedniej sekcji. Hover: obrys zmienia kolor na `--accent`.

### 5.7 Linia 1: Podatki i Opłaty
- Układ naprzemienny: tekst po lewej, podgląd interfejsu po prawej.
- **Podgląd interfejsu:** statyczna kompozycja dwóch elementów: mały fragment okna czatu (jedna wymiana o DN-1) i obok „biała kartka” z fragmentem formularza DN-1 w urzędowym stylu (czarne ramki pól, monospace dla numerów pól), gdzie dwa pola są podświetlone `--accent-soft`: „Organ podatkowy” i „Powierzchnia użytkowa 420 m²”. Kontrast: „zimny” formularz vs „ciepły” różowy czat to metafora produktu.
- Opcjonalna delikatna animacja przy wejściu w viewport: pola formularza wypełniają się z opóźnieniem 300 ms. Raz, bez pętli. Reduced-motion: statycznie.
- Lista „Co jest w środku”: 6 punktów jako lista z pogrubioną nazwą i opisem, bez ikon lub z minimalnym znacznikiem w kolorze akcentu.
- „Co zyskuje urząd”: cztery krótkie punkty w kartach `--bg-soft` 2×2.
- Zdanie „Ważne: asystent niczego nie składa…” w ramce z cienką linią `--line`, ikona informacji, tekst 15 px. To ma być widoczne, bo chroni prawnie.
- Przycisk obrysowany z treścią z Części B.

### 5.8 Linia 2: Kontakt z Mieszkańcem
- Układ odwrócony: podgląd po lewej, tekst po prawej.
- **Podgląd interfejsu:** ekran telefonu (bez rysowania fizycznego urządzenia, tylko zaokrąglona ramka 390×720 przeskalowana) z aplikacją gminy: nagłówek z herbem-placeholderem, kafelki „Zgłoś”, „Odpady”, „Alerty”, „Karta Mieszkańca”, poniżej jedno zgłoszenie ze statusem „W realizacji” i alert push „Awaria wody, ul. Polna, do 16:00”. Obok telefonu mały „Raport dla wójta” jako kartka A4 w miniaturze z trzema słupkami.
- Lista „Co jest w środku” ma 8 punktów. Jeśli za długa, ułóż w dwóch kolumnach na desktopie.
- Reszta jak w 5.7.

### 5.9 Linia 3: Partycypacja
- Układ jak 5.7 (tekst lewo, podgląd prawo).
- **Podgląd interfejsu:** karta ankiety z pytaniem i paskiem postępu, obok geoankieta: uproszczona mapa (szare kształty ulic, bez prawdziwej mapy) z trzema pinami w kolorze akcentu, pod tym mały blok „Raport z konsultacji · projekt AI” z trzema wypunktowaniami i przyciskiem „Redaguj”.
- Reszta jak 5.7.

### 5.10 Wspólna platforma
- Tło `--bg-soft`. H2 wyśrodkowany. Sześć punktów w siatce 3×2 jako minimalne karty bez ikon (albo z jednoliterowym znacznikiem w kółku w kolorze akcentu).

### 5.11 Pakiety
- H2 i podtytuł wyśrodkowane.
- Trzy karty cenowe obok siebie (mobile: kolumna, środkowa pierwsza). Karta środkowa „Gmina” wyróżniona: obrys `--accent`, etykieta „Najczęściej wybierany”.
- Każda karta: nazwa pakietu, „Dla kogo”, cena roczna dużym stopniem (40 px) z dopiskiem „netto, rocznie”, opłata wdrożeniowa mniejszym, lista wierszy z tabeli w Części B jako etykieta + wartość, przycisk „Poproś o wycenę”.
- Pod kartami trzy zdania z „Pod tabelą” jako drobne punkty oraz akapit „Dodatki” jako lista inline z separatorami „·”.
- Na desktopie można dodatkowo pokazać pełną tabelę porównawczą w rozwijanym bloku „Porównaj szczegółowo”. Na mobile tylko karty.

### 5.12 Jak kupić (pilotaż)
- Trzy kroki w poziomie z dużymi numerami 01, 02, 03 w kolorze akcentu i cienką linią łączącą. Mobile: pionowa oś czasu.
- Zdanie „Bez instalacji…” jako trzy krótkie chipsy pod krokami.

### 5.13 Bezpieczeństwo i zgodność
- Tło `--bg-soft`. Sześć punktów w dwóch kolumnach, każdy z pogrubioną nazwą i opisem. Minimalne ikony liniowe dopuszczalne (tarcza, klucz, oko, dokument), jednolity zestaw, 24 px, kolor `--ink`.

### 5.14 Darmowe narzędzie
- Sekcja o wyraźnie innym rytmie: wyśrodkowana, wąska (maks. 720 px), etykieta `BEZPŁATNIE DLA KAŻDEGO URZĘDU`, H2, akapit.
- Formularz w jednej linii na desktopie: pole URL, pole e-mail, przycisk główny. Mobile: pola jedno pod drugim.
- Pod formularzem drobny tekst z Części B. Formularz na etapie projektu nie wysyła nic, ma walidację HTML5 i stan sukcesu „Dziękujemy, raport wysłaliśmy na e-mail” jako komunikat inline.

### 5.15 Opinie (placeholder)
- Trzy karty z cytatem w cudzysłowie typograficznym, imieniem, stanowiskiem i gminą jako `[…]`. Bez zdjęć, ewentualnie inicjały w kółku.

### 5.16 FAQ
- Akordeon, jedno pytanie otwarte domyślnie (pierwsze). Znacznik plus/minus po prawej, animacja 200 ms. Semantyka `<details>/<summary>` lub przyciski z `aria-expanded`.

### 5.17 CTA końcowe
- Pełna szerokość, tło `--ink` z białym tekstem albo tło `--accent-soft`. Wybierz jeden wariant, najlepiej ciemny dla kontrastu z resztą strony. H2, akapit, przycisk główny (na ciemnym tle przycisk biały z tekstem `--ink`), obok e-mail i telefon jako `[…]`.

### 5.18 Stopka
- Cztery kolumny z Części B, na mobile akordeon lub kolumna. Drobny tekst praw autorskich. Linki prawne obowiązkowo widoczne: Regulamin, Polityka prywatności, Deklaracja dostępności.

## 6. Interakcje i animacje

- Animacje subtelne: fade i przesunięcie 12–16 px przy wejściu sekcji w viewport, 300–400 ms, easing ease-out, tylko raz.
- Jedyna zapętlona animacja to czat w sekcji 5.5. Podgląd DN-1 w 5.7 animuje się raz.
- Przewijanie kotwicowe płynne (`scroll-behavior: smooth`), z uwzględnieniem wysokości sticky nagłówka (`scroll-margin-top`).
- Wszystko wyłączone lub statyczne przy `prefers-reduced-motion: reduce`.
- Brak autoodtwarzanego wideo, brak parallaxu, brak kursora niestandardowego.

## 7. Responsywność

Punkty graniczne: 390 (telefon), 768 (tablet), 1024 (mały laptop), 1440 (desktop). Strona musi wyglądać dobrze na 390 px bez przewijania poziomego. Tabele cenowe zamieniają się w karty. Podglądy interfejsu skalują się proporcjonalnie, nie są przycinane. Przyciski na mobile pełnej szerokości w hero i CTA końcowym.

## 8. Dostępność (obowiązkowa, klient to sektor publiczny)

- WCAG 2.1 AA: kontrast tekstu minimum 4,5:1, elementów UI 3:1. Sprawdź kontrast białego tekstu na `--accent`; jeśli poniżej 4,5:1, użyj `--accent-ink` na przyciskach lub przyciemnij akcent.
- Pełna obsługa klawiaturą, widoczny focus (obrys 2 px `--accent` z offsetem 2 px).
- Semantyczny HTML: jeden `<h1>`, sekcje w `<section>` z `aria-labelledby`, nawigacja w `<nav>`, link „Przejdź do treści” jako pierwszy element.
- Animowany czat ma `aria-live="polite"` wyłączony podczas pętli (żeby nie zalewać czytnika) i statyczną alternatywę tekstową w `<noscript>` oraz przy reduced-motion.
- Wszystkie podglądy interfejsu jako grafiki dekoracyjne (`aria-hidden="true"`) z sensownym tekstem obok, albo z `alt` opisującym, co pokazują.
- Formularz z etykietami `<label>`, komunikaty błędów tekstowe, nie tylko kolorem.
- Rozmiar celów dotykowych minimum 44×44 px.

## 9. Wymagania techniczne

- Jedna strona: `index.html` + `styles.css` + `script.js`, albo komponent React/Next z Tailwind, jeśli narzędzie tak pracuje. Bez ciężkich bibliotek animacji; czat w czystym JS.
- Fonty z Google Fonts z `font-display: swap` i preload.
- Obrazy: podglądy interfejsu najlepiej jako inline SVG lub złożone z HTML/CSS, żeby były ostre i lekkie. Jeśli PNG, to WebP z `srcset`.
- Wydajność: Lighthouse minimum 90 w każdej kategorii na mobile. LCP poniżej 2,5 s.
- SEO: `<title>` i `<meta name="description">` z Części B, Open Graph z tym samym tytułem, `lang="pl"`, jeden H1.
- Brak zewnętrznych skryptów śledzących na etapie projektu. Miejsce na Consent Manager w stopce.
- Kod czysty, z komentarzami sekcji odpowiadającymi nazwom z Części B (`<!-- HERO -->`, `<!-- ASYSTENT MIESZKANCA -->` itd.), żeby copywriter mógł potem edytować treści bez projektanta.

## 10. Zasoby

- **Logo:** brak pliku. Złóż logotyp tekstowy „W Dialogu” z fontu strony. Zostaw miejsce na podmianę na SVG.
- **Zrzuty produktu:** brak. Wszystkie podglądy interfejsu zbuduj jako uproszczone, schematyczne kompozycje HTML/CSS lub SVG według opisów w sekcji 5. Nie używaj zdjęć stockowych.
- **Logotypy gmin, opinie, liczby:** placeholdery w nawiasach kwadratowych.
- **Herb gminy w podglądzie aplikacji:** neutralny okrągły placeholder z literą „G”.

## 11. Czego unikać

- Ścian tekstu w hero: tylko H1, podtytuł, dwa CTA, drobny tekst.
- Siatki 20 kafelków z ikonkami. Produkty są trzy, każdy ma własną sekcję.
- Obietnic „asystent złoży deklarację za Ciebie” i sugestii porady prawnej. Zdania ostrzegawcze z Części B muszą pozostać widoczne.
- Drugiego koloru akcentowego, gradientów tęczowych, efektu szkła, ilustracji 3D.
- Karuzel i sliderów. Wszystko jest widoczne po przewinięciu.
- Estetyki BIP i portali urzędowych: granat, czerwień, herby w nagłówku, paski EFRR.
- Fontów bez polskich znaków diakrytycznych.

## 12. Co ma zostać dostarczone

1. Działający, responsywny landing page zgodny z Częścią B (kod źródłowy).
2. Widoki projektowe (jeśli narzędzie je generuje): desktop 1440 px i mobile 390 px, wszystkie sekcje.
3. Lista tokenów kolorów i typografii użytych w projekcie.
4. Krótka notatka: co zostało uproszczone względem briefu i dlaczego.

## 13. Kryteria akceptacji

- Nowy odbiorca po 10 sekundach potrafi powiedzieć, czym jest produkt i ile kosztuje wejście.
- Czat w sekcji asystenta czyta się bez wysiłku, animacja nie męczy, pętla nie przeszkadza w czytaniu tekstu obok.
- Strona na 390 px nie ma przewijania poziomego, a wszystkie CTA są dostępne kciukiem.
- Kontrasty i klawiatura przechodzą test WCAG AA.
- Żaden nagłówek ani zdanie z Części B nie został zmieniony, pominięty ani sparafrazowany.

---

# CZĘŚĆ B — PEŁNY TEKST STRONY (użyj dosłownie)

---

## [META]

**Title:** W Dialogu — urząd, który odpowiada mieszkańcom

**Description:** Trzy produkty dla samorządu w jednej platformie: podatki i opłaty z asystentem AI, kontakt z mieszkańcem, partycypacja. Pilotaż 90 dni, bez przetargu. Sprawdź pakiety dla gminy Twojej wielkości.

---

## [NAWIGACJA]

Logo: **W Dialogu**

Menu: Podatki i Opłaty · Kontakt z Mieszkańcem · Partycypacja · Pakiety · Bezpieczeństwo · FAQ

Przycisk: **Umów prezentację**
Link tekstowy: Zaloguj się

---

## [HERO]

### Mniej telefonów do urzędu. Więcej załatwionych spraw.

W Dialogu to trzy produkty dla samorządu w jednej platformie: **podatki i opłaty**, które mieszkaniec wypełnia w rozmowie z asystentem, **kontakt z mieszkańcem** przez zgłoszenia, alerty i aplikację, oraz **partycypacja** od konsultacji po budżet obywatelski. Kupujesz to, co boli najbardziej. Resztę dokładasz, kiedy chcesz.

**[CTA główne]** Umów prezentację
**[CTA drugie, tekstowe]** Zobacz pakiety od 7 900 zł rocznie ↓

Drobny tekst pod przyciskami: Pilotaż 90 dni. Bez przetargu. Bez instalacji na serwerach urzędu.

---

## [PASEK ZAUFANIA]

*Zaufali nam:* `[logotypy gmin i miast]`

Cztery liczby do uzupełnienia:
- **[XX]** gmin i miast na platformie
- **[XX tys.]** zgłoszeń mieszkańców obsłużonych w terminie
- **[XX tys.]** deklaracji i ankiet wypełnionych online
- **[XX%]** pytań mieszkańców, na które odpowiada asystent bez udziału urzędnika

---

## [SEKCJA: PROBLEM]

### Trzy sprawy, które zajmują urzędowi najwięcej czasu

**W wydziale podatków.** Deklaracje przychodzą z błędami, każda wymaga wezwania, poprawki i ponownego przeliczenia. Mieszkańcy dzwonią z pytaniem „co mam tu wpisać?”. Raty wpływają po terminie.

**W sekretariacie.** Telefon dzwoni w kółko: kiedy wywóz śmieci, co ze zgłoszoną dziurą, do kogo z tym pismem. Zgłoszenia giną między wydziałami. Wójt dowiaduje się o problemach z Facebooka.

**U pełnomocnika ds. konsultacji.** Frekwencja niska, głosowanie budzi wątpliwości, a raport trzeba napisać ręcznie z setek opinii w trzech różnych plikach.

W Dialogu ma osobny produkt na każdą z tych trzech spraw. I jednego asystenta, który łączy je w całość.

---

## [SEKCJA WYRÓŻNIONA: ASYSTENT MIESZKAŃCA]

Etykieta: `SERCE PLATFORMY`

### Asystent Mieszkańca. Odpowiada za urząd, zanim zadzwoni telefon.

Czat na stronie urzędu i w aplikacji, który zna harmonogram odpadów, stawki podatkowe, status każdego zgłoszenia, terminy konsultacji i treść BIP-u. Odpowiada prostym językiem, podaje źródło, a trudną sprawę zamienia w zgłoszenie do właściwego wydziału. Działa w dzień, w nocy i w długi weekend.

**[Scena demo: okno czatu z trzema wymianami]**

> Mieszkaniec: Kiedy wywóz plastiku na Lipowej 12?
> Asystent: W Twoim sektorze plastik i metal odbieramy w piątek 25 września. Kolejny termin: 9 października. Chcesz przypomnienie SMS dzień wcześniej?

> Mieszkaniec: Co z moim zgłoszeniem 6552, ta dziura na Polnej?
> Asystent: Zgłoszenie jest w realizacji od 16 września. Odpowiada za nie Zarząd Dróg. Poinformuję Cię, gdy status zmieni się na „wykonano”.

> Mieszkaniec: Muszę złożyć deklarację na podatek od nieruchomości za firmę.
> Asystent: Pomogę wypełnić DN-1 krok po kroku. To pierwsza deklaracja na 2026 rok, czy korekta?

> Mieszkaniec: Gdzie mam zniżkę z Kartą Mieszkańca?
> Asystent: Dziś najbliżej Ciebie: basen miejski 30% i kino Grunwald 5 zł taniej. Pokaż kartę z aplikacji przy kasie. Pełną listę 38 partnerów masz w zakładce Karta.

Im więcej produktów W Dialogu ma Twój urząd, tym więcej pytań asystent zamyka sam. Zawsze wiadomo, skąd wziął odpowiedź, i zawsze można przejść do człowieka.

**[CTA]** Zobacz asystenta w akcji

---

## [SEKCJA: TRZY PRODUKTY — WPROWADZENIE]

### Jeden produkt na start. Trzy, kiedy zobaczysz efekt.

Każda linia ma swojego odbiorcę w urzędzie, własną stronę dla mieszkańców i własny zwrot z inwestycji. Wszystkie działają na wspólnej platformie: jednym panelu, jednej bazie mieszkańców, jednej aplikacji mobilnej i jednym asystencie.

`[Trzy duże kafelki prowadzące do sekcji poniżej: Podatki i Opłaty · Kontakt z Mieszkańcem · Partycypacja]`

---

## [SEKCJA: LINIA 1 — PODATKI I OPŁATY]

Etykieta: `DLA SKARBNIKA I WYDZIAŁU PODATKÓW`

### Podatki i Opłaty. Deklaracje bez błędów, raty na czas.

Mieszkaniec i przedsiębiorca nie wypełniają formularza. Rozmawiają z asystentem, który zadaje proste pytania, dobiera stawkę z uchwały Twojej rady i sam wypełnia urzędowy wzór. Do urzędu trafia deklaracja poprawnie wyliczona za pierwszym razem.

**Co jest w środku**

- **Asystent deklaracji podatkowych.** DN-1 i IN-1 dla podatku od nieruchomości, następnie rolny (DR-1, IR-1), leśny (DL-1, IL-1) i od środków transportowych (DT-1). Stawki, zaokrąglenia i załączniki zgodne z wzorami Ministerstwa Finansów.
- **Deklaracja śmieciowa z asystentem.** Najczęściej składana deklaracja w każdej gminie. Zmiana liczby osób, nowa nieruchomość, kompostownik, korekta. W kilka minut, bez wezwania.
- **Harmonogram odbioru odpadów.** Dla każdej ulicy i numeru budynku. Sektory, frakcje, wyjątki, przesunięcia świąteczne, punkty zbiórki na mapie. Najczęściej odwiedzana strona gminy wreszcie działa dobrze.
- **Przypomnienia o płatnościach.** SMS, e-mail i push przed terminem raty podatku i opłaty śmieciowej. Miękkie upomnienie po terminie, zanim ruszy formalna windykacja.
- **E-usługi podatkowe.** Zaświadczenie o niezaleganiu, zwrot nadpłaty, przeksięgowanie, indywidualny rachunek, pismo ogólne. Podpis Profilem Zaufanym, wysyłka przez ePUAP lub e-Doręczenia.
- **Asystent Mieszkańca** w zakresie podatków i odpadów.

**Co zyskuje urząd**

- Mniej wezwań i postępowań wyjaśniających, bo deklaracje przychodzą poprawne.
- Wyższa ściągalność, bo mieszkaniec dostaje przypomnienie, zanim zapomni.
- Mniej telefonów do wydziału, bo asystent odpowiada na „co mam tu wpisać?”.
- Część kosztów można rozliczyć w ramach systemu gospodarowania odpadami. `[potwierdzić z radcą]`

Ważne: asystent niczego nie składa w imieniu mieszkańca i nie udziela porad prawnych. Mieszkaniec sprawdza, podpisuje i wysyła sam.

**[CTA]** Zobacz, jak asystent wypełnia DN-1

---

## [SEKCJA: LINIA 2 — KONTAKT Z MIESZKAŃCEM]

Etykieta: `DLA SEKRETARZA I WÓJTA`

### Kontakt z Mieszkańcem. Urząd w telefonie, każde zgłoszenie z właścicielem.

Mieszkaniec zgłasza dziurę ze zdjęciem, dostaje alert o awarii wody, pokazuje Kartę Mieszkańca na basenie i widzi ogłoszenia urzędu w jednej aplikacji z herbem gminy. Zgłoszenie trafia automatycznie do właściwego wydziału, ma status i termin. Wójt dostaje w poniedziałek raport, co się działo i jak szybko urząd odpowiedział.

**Co jest w środku**

- **Centrum zgłoszeń.** Zdjęcie, punkt na mapie, kategoria. Automatyczne kierowanie do wydziału lub jednostki, statusy od przyjęcia po wykonanie, powiadomienia dla mieszkańca, statystyki czasu obsługi.
- **Alerty gminne.** Masowe SMS i push do zapisanych mieszkańców: awaria wody, wichura, zamknięta droga, zmiana terminu wywozu. Zapis przez stronę, aplikację i kod QR na słupie ogłoszeniowym.
- **Aplikacja mobilna.** Zgłoszenia, harmonogram odpadów, ogłoszenia, alerty, konsultacje i asystent w kieszeni. W barwach i z herbem Twojej gminy.
- **Ogłoszenia, wydarzenia i newsletter.** Kalendarz urzędu z push jednym kliknięciem, zapisy na warsztaty i spotkania z limitem miejsc, mailingi tematyczne.
- **Sołectwa i fundusz sołecki.** Strona każdego sołectwa, ogłoszenia sołtysa, terminy zebrań, głosowanie nad funduszem sołeckim, zadania na mapie. Sołtys ma prosty panel na telefonie.
- **Karta Mieszkańca.** Program zniżek i przywilejów dla osób, które płacą podatki w gminie: basen, komunikacja, kultura, lokalni przedsiębiorcy. Wniosek online z weryfikacją na podstawie konta mieszkańca, karta w aplikacji zamiast plastiku, panel dla partnerów, którzy sami dodają oferty. Mieszkaniec zameldowany gdzie indziej ma powód, żeby rozliczać PIT u Was.
- **Raport dla wójta.** Jedna strona co poniedziałek: zgłoszenia i czas ich obsługi w podziale na wydziały, alerty, aktywność mieszkańców, najczęstsze pytania do asystenta. Podsumowanie pisze AI.
- **Asystent Mieszkańca** w zakresie zgłoszeń, ogłoszeń i spraw ogólnych urzędu.

**Co zyskuje urząd**

- Sekretariat odbiera mniej telefonów, bo mieszkaniec sprawdza status sam.
- Żadne zgłoszenie nie ginie między wydziałami.
- Wójt wie, co się dzieje, bez logowania do panelu.
- Baza kontaktów do mieszkańców rośnie z każdym alertem i służy wszystkim produktom.
- Karta Mieszkańca przyciąga do aplikacji także tych, którzy nigdy nie zgłosili dziury, i daje argument za rozliczaniem PIT w gminie.

**[CTA]** Zobacz aplikację i Centrum zgłoszeń

---

## [SEKCJA: LINIA 3 — PARTYCYPACJA]

Etykieta: `DLA PEŁNOMOCNIKA DS. KONSULTACJI I KOORDYNATORA BO`

### Partycypacja. Konsultacje i głosowania bez skarg, raport w godzinę.

Konsultacje społeczne, ankiety, geoankiety, komentowanie dokumentów, budżet obywatelski i petycje w jednym miejscu, z weryfikacją uczestników, której nie podważy nikt na sesji rady. Na koniec asystent AI pisze projekt raportu z setek opinii, a Ty go redagujesz.

**Co jest w środku**

- **Konsultacje społeczne.** Pełny proces: harmonogram, etapy, spotkania, lokalizacja na mapie, załączniki, forum z moderacją. Publiczna strona z trwającymi, planowanymi i zakończonymi procesami.
- **Ankiety, geoankiety, komentowanie dokumentów.** Kreator z logiką pytań i szablonami. Weryfikacja kodem SMS, PESEL-em, adresem lub kontem mieszkańca. Blokada wielokrotnego głosu, ograniczenia wiekowe, wyniki na żywo.
- **Budżet obywatelski.** Zgłaszanie projektów, weryfikacja, głosowanie i mapa realizacji w tym samym ekosystemie co reszta platformy.
- **Konsultacje planistyczne.** Tryb dla planów ogólnych i miejscowych: geoankieta, uwagi do projektu przypięte do mapy i do fragmentów dokumentu, rejestr uwag do rozpatrzenia.
- **Propozycje konsultacji i petycje.** Mieszkańcy zgłaszają tematy, urząd przyjmuje lub odrzuca. Rejestr petycji zgodny z ustawą aktualizuje stronę publiczną sam.
- **Raport z konsultacji pisany przez AI.** Grupowanie opinii w tematy, liczby, cytaty, wnioski. Pełnomocnik poprawia i publikuje zamiast pisać od zera.

**Co zyskuje urząd**

- Wyższa frekwencja, bo uczestnictwo zajmuje trzy minuty na telefonie.
- Głosowanie, którego wyniku nikt nie podważy.
- Raport z konsultacji w godzinę zamiast w tydzień.
- Obowiązki ustawowe (petycje, konsultacje planistyczne) załatwione przy okazji.

**[CTA]** Zobacz kreator ankiet i weryfikację głosów

---

## [SEKCJA: WSPÓLNA PLATFORMA]

### Trzy produkty. Jedna platforma pod spodem.

Niezależnie od tego, od czego zaczniesz, dostajesz:

- **Centrum Dialogu** — publiczną stronę w Twojej domenie, z Twoim logo, kolorami i sekcją wójta lub burmistrza.
- **Jedno konto mieszkańca** do zgłoszeń, ankiet, deklaracji, zapisów i alertów.
- **Jeden panel dla urzędu** z rolami, jednostkami organizacyjnymi, kalendarzem całej instytucji i asystentem AI, który odpowiada pracownikom na pytania o obsługę systemu.
- **Jedną aplikację mobilną** z Twoim herbem.
- **Klauzule RODO, deklarację dostępności i treści prawne** gotowe do publikacji.
- **Przypisanego konsultanta** widocznego w panelu z imieniem, e-mailem i telefonem.

---

## [SEKCJA: PAKIETY]

### Pakiety według wielkości gminy, nie liczby funkcji

Cena zależy od liczby mieszkańców. Funkcje zależą od wybranych linii. Nie musisz niczego wyłączać, żeby było taniej.

| | **Start** | **Gmina** | **Miasto** |
|---|---|---|---|
| Dla kogo | gminy do 10 tys. mieszkańców | 10–50 tys. mieszkańców | powyżej 50 tys., miasta na prawach powiatu, związki gmin |
| Linie produktowe | 1 do wyboru | 2 do wyboru | wszystkie 3 |
| Asystent Mieszkańca | w zakresie wybranej linii | w zakresie wybranych linii | pełny, z wiedzą z BIP i strony urzędu |
| Aplikacja mobilna | wspólna aplikacja W Dialogu z profilem gminy | wspólna aplikacja z profilem gminy | własna aplikacja gminy w sklepach |
| Konta pracowników | 10 | 40 | bez limitu |
| SMS w cenie rocznie | 2 000 | 10 000 | 30 000 |
| Wdrożenie | zdalne, 2 tygodnie | zdalne + 1 dzień u Was, 4 tygodnie | projekt wdrożeniowy, 8–12 tygodni |
| Opieka | e-mail, odpowiedź do 2 dni roboczych | konsultant, do 1 dnia roboczego | konsultant dedykowany, do 4 godzin |
| **Rocznie, netto** | **od 7 900 zł** | **od 19 900 zł** | **od 49 000 zł, wycena indywidualna** |
| Wdrożenie, jednorazowo | 2 900 zł | 6 900 zł | od 19 000 zł |

Pod tabelą:
- Kolejna linia w Start: +4 900 zł rocznie. Trzecia linia w Gminie: +7 900 zł.
- Umowa na 24 miesiące: rabat 10%. Na 36 miesięcy: 15%. Stała cena na całą kadencję.
- Każdy pakiet mieści się poniżej progu zamówień publicznych. Kupujesz z rozeznania rynku, bez przetargu.

**Dodatki:** Przejrzysty budżet (prezentacja budżetu i mapa inwestycji) od 4 900 zł · Karta Mieszkańca dla pakietu Start (w Gminie i Mieście w cenie linii Kontakt z Mieszkańcem) od 4 900 zł · Kreator e-usług z katalogiem i 30 szablonami od 9 900 zł · Integracja z systemem podatkowym i płatnościami online: wycena · Własna aplikacja w sklepach dla Start i Gminy 6 900 zł

**[CTA]** Poproś o wycenę dla swojej gminy

---

## [SEKCJA: JAK KUPIĆ]

### Pilotaż 90 dni zamiast przetargu

1. **Rozmowa i wybór linii.** 45 minut online. Pokazujemy platformę na przykładzie Twojej gminy i wybieramy produkt, który boli najbardziej.
2. **Pilotaż.** Uruchamiamy wybraną linię w Twojej domenie za opłatę wdrożeniową. Szkolimy pracowników, wgrywamy ulice, obszary, harmonogramy i stawki. Mieszkańcy korzystają od pierwszego tygodnia.
3. **Decyzja.** Po 90 dniach dostajesz raport: ile zgłoszeń, ile deklaracji, ile pytań zamknął asystent. Podpisujesz umowę roczną albo kończysz bez zobowiązań. Dane eksportujemy na życzenie.

Bez instalacji na serwerach urzędu. Bez integracji na start. Bez uzależnienia od jednego dostawcy: dane są Twoje.

**[CTA]** Umów rozmowę o pilotażu

---

## [SEKCJA: BEZPIECZEŃSTWO I ZGODNOŚĆ]

### Dane mieszkańców pod kontrolą urzędu

- **RODO.** Umowa powierzenia, osobne klauzule dla każdego produktu, ukrywanie danych ankietowanych przed administratorami, haszowanie numerów PESEL.
- **Weryfikacja uczestników.** Kod SMS, PESEL, dane z adresem lub datą urodzenia, konto mieszkańca, blokada urządzenia, ograniczenia wiekowe.
- **Dostęp do panelu.** Weryfikacja dwuetapowa, lista dozwolonych adresów IP, role i uprawnienia, dziennik każdej operacji.
- **Asystent AI pod nadzorem.** Odpowiada tylko z danych urzędu, podaje źródło, nie liczy podatku i nie interpretuje prawa. Wyliczenia wykonuje silnik zgodny ze wzorami MF i uchwałami rady, testowany dla każdej gminy osobno.
- **Dostępność cyfrowa.** Kontrast, rozmiar tekstu, obsługa klawiaturą i czytnikiem ekranu, także w oknie asystenta. Generator deklaracji dostępności w panelu.
- **Hosting w Unii Europejskiej,** kopie zapasowe, eksport danych na żądanie.

---

## [SEKCJA: DARMOWE NARZĘDZIE]

Etykieta: `BEZPŁATNIE DLA KAŻDEGO URZĘDU`

### Deklaracja dostępności i skan strony urzędu. Za darmo.

Wpisz adres strony urzędu. Dostaniesz raport błędów dostępności cyfrowej i gotową deklarację dostępności do publikacji, zgodną z wymaganiami ustawy. Przegląd deklaracji jest obowiązkiem każdego urzędu do 31 marca. Zrób go w dziesięć minut.

**[Pole: adres strony urzędu] [Pole: e-mail służbowy] [Przycisk: Sprawdź stronę i pobierz deklarację]**

Drobny tekst: Raport i deklarację wysyłamy na e-mail. Bez zobowiązań.

---

## [SEKCJA: OPINIE — PLACEHOLDER]

### Co mówią urzędy

`[Trzy cytaty, po jednym na linię produktową: skarbnik gminy o deklaracjach i przypomnieniach, sekretarz o zgłoszeniach i telefonach, koordynator BO o głosowaniu i raporcie. Imię, nazwisko, stanowisko, gmina, liczba mieszkańców.]`

---

## [SEKCJA: FAQ]

### Najczęstsze pytania

**Od czego najlepiej zacząć?**
Od sprawy, która generuje najwięcej pracy. Gminy wiejskie zwykle zaczynają od Podatków i Opłat, bo deklaracja śmieciowa i harmonogram dotyczą każdego mieszkańca. Miasta zaczynają od Kontaktu z Mieszkańcem albo od Partycypacji, jeśli prowadzą budżet obywatelski.

**Czy muszę kupić wszystkie trzy linie?**
Nie. Pakiet Start to jedna linia. Kolejne dokładasz, kiedy zobaczysz efekt, bez nowego wdrożenia i bez nowej umowy o powierzeniu danych.

**Czy mogę kupić bez przetargu?**
Tak. Każdy pakiet mieści się poniżej progu stosowania ustawy o zamówieniach publicznych. Pilotaż za opłatę wdrożeniową pozwala sprawdzić produkt, zanim podpiszesz umowę roczną.

**Czy asystent AI składa deklarację za mieszkańca albo udziela porad?**
Nie. Asystent prowadzi rozmowę i wypełnia formularz. Podatek liczy silnik obliczeniowy zgodny ze wzorami MF i stawkami z Twojej uchwały. Mieszkaniec sprawdza, podpisuje i składa sam. Asystent nie interpretuje przepisów jako porada prawna.

**Skąd asystent wie, co odpowiedzieć mieszkańcowi?**
Tylko z danych Twojego urzędu: harmonogramów, stawek, zgłoszeń, ogłoszeń, konsultacji i treści BIP-u. Każda odpowiedź ma źródło. Gdy nie zna odpowiedzi, mówi to i zamienia pytanie w zgłoszenie do wydziału.

**Czy Karta Mieszkańca wymaga drukowania plastikowych kart?**
Nie. Karta działa w aplikacji mobilnej i jako kod na wydruku dla osób bez smartfona. Mieszkaniec składa wniosek online, urząd weryfikuje go na podstawie konta mieszkańca i pierwszej strony PIT, a partnerzy sprawdzają ważność jednym skanem. Plastik możesz dodać, jeśli chcesz, ale nie musisz.

**Czy przypomnienia o płatnościach wymagają integracji z naszym systemem podatkowym?**
Na start nie. Działają na podstawie terminów ustawowych i list wgranych z systemu. Integracja jest dodatkiem i pozwala wysyłać przypomnienia z rzeczywistych sald oraz pokazać mieszkańcowi jego rozliczenia.

**Co z danymi, jeśli zrezygnujemy?**
Eksportujemy wszystko w otwartych formatach i usuwamy dane w terminie z umowy powierzenia. Nie ma opłat za wyjście.

**Ile trwa wdrożenie?**
Start: dwa tygodnie zdalnie. Gmina: cztery tygodnie z jednym dniem szkolenia u Was. Miasto: projekt na 8–12 tygodni z dedykowanym konsultantem.

---

## [SEKCJA: CTA KOŃCOWE]

### Pokażemy W Dialogu na przykładzie Twojej gminy

Z Twoją mapą, Twoimi ulicami, Twoimi stawkami podatkowymi i pytaniami, które Twój sekretariat słyszy codziennie. 45 minut online. Po rozmowie dostajesz wycenę i plan pilotażu.

**[CTA główne]** Umów prezentację
**[CTA drugie]** `[e-mail]` · `[telefon]`

---

## [STOPKA]

**W Dialogu** — urząd, który odpowiada mieszkańcom

Produkty: Podatki i Opłaty · Kontakt z Mieszkańcem · Karta Mieszkańca · Partycypacja · Asystent Mieszkańca · Pakiety · Dodatki

Bezpłatnie: Generator deklaracji dostępności · Skan dostępności strony urzędu

Firma: O nas · Umów prezentację · Pomoc · Kontakt

Dokumenty: Regulamin · Polityka prywatności · Deklaracja dostępności · Klauzule informacyjne RODO · Umowa powierzenia (wzór)

`[rok]` © `[nazwa firmy]`
