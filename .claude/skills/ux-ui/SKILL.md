---
name: ux-ui
description: >
  Projektowanie i ocena interfejsów (UX/UI): strony WWW, panele administracyjne,
  formularze, landingi, aplikacje webowe — z naciskiem na polski sektor publiczny
  (gminy, JST, e-partycypacja) i wymóg WCAG 2.1 AA. Workflow audytu, heurystyki,
  wzorce komponentów, typografia i kolor, tokeny light/dark, mikroteksty po polsku,
  skrypt kontrastu. UŻYJ ZAWSZE, gdy pojawia się: UX, UI, interfejs, użyteczność,
  dostępność, WCAG, audyt strony, "oceń / co poprawić w tym widoku", "zaprojektuj
  stronę / panel / formularz", makieta, mockup, wireframe, design system, tokeny,
  kolory, typografia, dark mode, responsywność, "wygląda źle", "nieczytelne",
  mikroteksty / komunikaty błędów — a także gdy użytkownik wrzuca zrzut ekranu lub
  plik HTML/CSS do ulepszenia albo prosi o nową stronę HTML. Stosuj przy każdym
  pisaniu front-endu (HTML/CSS/JS), nawet bez słowa "UX".
---

# UX/UI — projektowanie i ocena interfejsów

## Kontekst użytkownika

Użytkownik pracuje w **MediaPark (Olsztyn)** — firmie budującej platformy dla polskich
samorządów (PORTO ALEGRE: budżet obywatelski, konsultacje, deklaracje, sygnaliści).
Odbiorcy interfejsów to **mieszkańcy gmin w każdym wieku** oraz **urzędnicy** pracujący
w panelach administracyjnych po kilka godzin dziennie. Wynikają z tego dwie stałe:

1. **Dostępność to prawo, nie opcja.** Ustawa z 4 kwietnia 2019 o dostępności cyfrowej
   stron internetowych i aplikacji mobilnych podmiotów publicznych wymaga
   **WCAG 2.1 na poziomie AA**. Każdy widok, który projektujesz lub oceniasz, ma
   ten poziom spełniać — kontrast, klawiatura, fokus, etykiety, struktura nagłówków.
2. **Prostota wygrywa z efektem.** Mieszkaniec przychodzi raz w roku zagłosować,
   urzędnik klika to samo 200 razy dziennie. Pierwszy potrzebuje oczywistości,
   drugi — gęstości i skrótów. Zawsze ustal, dla kogo jest widok, zanim coś zaproponujesz.

Użytkownik pisze po polsku, zwięźle, iteracyjnie. Odpowiadaj po polsku, konkretnie,
bez wykładów o tym, czym jest UX. Kod → do pliku, nie do czatu.

## Tryby pracy

Rozpoznaj, w którym trybie jesteś, i zastosuj odpowiedni workflow:

| Sytuacja | Tryb | Co czytać |
|---|---|---|
| „Oceń / co poprawić / wygląda źle” + zrzut albo HTML | **Audyt** | `references/audyt.md` |
| „Zaprojektuj / zrób stronę / panel / formularz” | **Projekt** | `references/komponenty.md`, `references/typografia-kolor.md` |
| „Popraw kolory / czcionki / dark mode / tokeny” | **System wizualny** | `references/typografia-kolor.md`, `assets/tokens-starter.css` |
| „Jak nazwać przycisk / jaki komunikat / jaki tekst” | **Mikroteksty** | `references/tekst-ui.md` |
| „Czy to jest dostępne / WCAG / deklaracja dostępności” | **Dostępność** | `references/dostepnosc.md` |

Plik `references/heurystyki.md` to wspólny fundament — zaglądaj tam, gdy trzeba
uzasadnić rekomendację (Nielsen, Gestalt, prawa Fittsa/Hicka), nie żeby cytować
teorię dla ozdoby.

## Tryb Audyt — jak oceniać

Ocena „na oko” nie ma wartości dla użytkownika, bo sam widzi, że coś nie gra.
Wartość daje **nazwanie problemu, wskazanie przyczyny i konkretna poprawka**.

1. **Ustal cel widoku i użytkownika** (mieszkaniec? urzędnik? mobile? desktop?).
   Jeśli nie wynika z kontekstu — przyjmij najbardziej prawdopodobny i napisz to.
2. **Przejdź widok w kolejności, w jakiej czyta go człowiek**: nagłówek → główne
   zadanie → nawigacja → treść drugorzędna → stopka. Zapisuj, gdzie oko się gubi.
3. **Sprawdź twarde kryteria** (dają się zweryfikować, więc zaczynaj od nich):
   - kontrast tekstu i elementów UI — uruchom `scripts/contrast.py` na parach
     kolorów albo na całym pliku CSS (patrz niżej),
   - rozmiary celów dotykowych (min. 44×44 px na mobile, 24×24 px na desktop),
   - hierarchia nagłówków (jeden `h1`, bez przeskoków poziomów),
   - etykiety pól, komunikaty błędów, fokus klawiatury,
   - czytelność na 320 px szerokości (bez poziomego scrolla).
4. **Potem kryteria miękkie** wg heurystyk: widoczność stanu systemu, spójność,
   zapobieganie błędom, rozpoznawanie zamiast przypominania, estetyka minimalistyczna.
5. **Raportuj wg szablonu** z `references/audyt.md`: problemy uszeregowane wg
   wagi (blokujące → istotne → kosmetyczne), każdy z przyczyną i poprawką.
   Maksymalnie 10 pozycji — jeśli jest ich więcej, grupuj. Raport na 40 punktów
   nikt nie przeczyta.

Jeśli dostajesz **plik HTML/CSS**, nie ograniczaj się do raportu — zaproponuj
poprawiony plik (albo diff), bo to skraca użytkownikowi pętlę.

## Tryb Projekt — jak projektować

Zanim napiszesz pierwszą linię HTML, odpowiedz sobie na trzy pytania i zapisz
odpowiedzi w jednym akapicie na początku pracy:

- **Jedno główne zadanie widoku.** Strona głosowania ma jedno: oddać głos.
  Panel listy wniosków: znaleźć wniosek i przejść do jego obsługi. Wszystko inne
  jest drugorzędne i tak ma wyglądać.
- **Ścieżka najkrótsza.** Ile kliknięć/pól od wejścia do sukcesu? Każde dodatkowe
  pole w formularzu publicznym to realny odpływ użytkowników.
- **Stany.** Każdy widok z danymi ma stan: pusty, ładowanie, błąd, sukces, częściowy.
  Zaprojektuj je od razu — to one najczęściej wychodzą brzydko, bo nikt o nich nie pomyślał.

Potem buduj wg zasad z `references/komponenty.md` (formularze, tabele, nawigacja,
modale, karty, stany) i `references/typografia-kolor.md` (skala, siatka, tokeny).

### Domyślny język wizualny (gdy użytkownik nie podaje własnego)

Użytkownik ma wypracowany styl — zaczynaj od niego, zamiast wymyślać nowy:

- **Font:** Poppins (nagłówki i tekst), fallback `system-ui, sans-serif`.
  W plikach standalone wbuduj font (`@font-face` z base64 woff2) albo ładuj
  z Google Fonts z `font-display: swap`.
- **Kolory:** jasne tło (`#f3fafc`), biała powierzchnia, turkusowy akcent
  (`#2db3d2` / głębszy `#2f96b0`), ciemny atrament (`#2b323f`), przygaszony
  tekst (`#5b6668`). Tryb ciemny przez te same tokeny z innymi wartościami.
  Gotowe tokeny: `assets/tokens-starter.css` — skopiuj i modyfikuj.
- **Kształty:** promień 16 px dla kart, 50 px (pill) dla przycisków, miękkie
  cienie z domieszką koloru akcentu, gradient akcentu na CTA.
- **Layout:** kontener max 1180 px, siatka 8 px, dużo powietrza między sekcjami
  (min. 64 px na desktopie, 40 px na mobile).

Gdy gmina ma własny system identyfikacji (herb, kolory), **jej kolory wygrywają** —
ale przepuść je przez `scripts/contrast.py` i, jeśli nie przechodzą, zaproponuj
przyciemnioną/rozjaśnioną wersję na tekst, zachowując oryginał na duże płaszczyzny.

### Zawsze, niezależnie od stylu

- `lang="pl"`, semantyczny HTML (`header/nav/main/section/footer`, `button` a nie
  `div onclick`), jeden `h1`.
- Widoczny fokus (`:focus-visible`, obrys min. 2 px, kontrast 3:1 do tła).
- Link „Przejdź do treści” jako pierwszy element fokusowalny na stronach publicznych.
- Kontrast tekstu ≥ 4.5:1, dużego tekstu i elementów UI ≥ 3:1.
- Bez informacji przekazywanej **tylko** kolorem (status = kolor + ikona/tekst).
- `prefers-reduced-motion` respektowane; animacje ≤ 300 ms, nic nie miga.
- Formularze: etykieta zawsze widoczna (nie placeholder zamiast etykiety), błąd
  przy polu i w podsumowaniu, `autocomplete` na polach z danymi osobowymi.
- Mobile first: sprawdź w głowie 320 px, 768 px, 1280 px.

## Skrypt kontrastu

`scripts/contrast.py` liczy współczynnik kontrastu wg WCAG i ocenia AA/AAA:

```bash
# pojedyncza para: tekst na tle
python scripts/contrast.py "#5b6668" "#f3fafc"

# cały plik CSS: znajdzie zmienne --* i sprawdzi typowe pary (ink/bg, muted/bg, accent/bg, on-grad/accent...)
python scripts/contrast.py --css sciezka/do/plik.css

# własne pary z pliku CSS
python scripts/contrast.py --css plik.css --pair ink:bg --pair muted:surface
```

Uruchamiaj go zawsze, gdy proponujesz lub oceniasz kolory — wynik liczbowy jest
argumentem, którego użytkownik może użyć wobec klienta („to nie spełnia 4.5:1”),
a „wydaje mi się, że słaby kontrast” nie jest.

## Format odpowiedzi

- **Audyt** → szablon z `references/audyt.md`; krótkie wprowadzenie (2 zdania),
  potem lista problemów wg wagi, na końcu 3 najważniejsze rzeczy do zrobienia od razu.
- **Projekt** → jeden akapit założeń (użytkownik, zadanie, ścieżka), potem plik
  HTML/CSS zapisany na dysk, potem 3–5 punktów „na co zwróciłem uwagę / co możesz
  zmienić”. Bez opisywania każdej linii CSS.
- **Mikroteksty** → tabela: miejsce · obecny tekst · propozycja · dlaczego.
- Nie wyliczaj heurystyk z nazw dla ozdoby. „Użytkownik nie wie, czy głos się
  zapisał” jest lepsze niż „naruszenie heurystyki nr 1 Nielsena”.
- Gdy czegoś nie widzisz (np. zrzut nie pokazuje stanów hover/fokus), napisz to
  wprost i poproś o uzupełnienie zamiast zgadywać.

## Czego nie robić

- Nie proponuj przeprojektowania od zera, gdy proszono o ocenę — najpierw
  poprawki w istniejącej strukturze, redesign tylko gdy struktura jest przyczyną.
- Nie dodawaj bibliotek UI (Bootstrap, Tailwind, MUI) do prostych stron
  standalone — użytkownik pracuje na czystym HTML/CSS, a plik ma działać bez buildu.
- Nie stosuj szarego tekstu na szarym tle „bo elegancko”. Sprawdź kontrast.
- Nie chowaj kluczowych akcji w menu „⋯” ani pod ikonami bez podpisu na widokach
  dla mieszkańców. W panelach dla urzędników ikony z tooltipem są w porządku,
  ale najważniejsza akcja wiersza zawsze ma tekst.
- Nie pisz „zgodne z WCAG”, jeśli nie sprawdziłeś kontrastu, fokusu i etykiet.
  Napisz, co sprawdziłeś, a czego nie.
