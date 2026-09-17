# Audyt UX — szablon raportu i kryteria

## Szablon raportu

Używaj tej struktury. Krótko — użytkownik pokaże to klientowi lub wklei do zadania.

```
# Audyt UX: [nazwa widoku / strony]

**Dla kogo:** [mieszkaniec / urzędnik / obaj] · **Urządzenie:** [mobile / desktop / oba]
**Cel widoku:** [jedno zdanie — co użytkownik ma tu zrobić]
**Ogólna ocena:** [2–3 zdania: co działa, co blokuje]

## Blokujące (użytkownik nie kończy zadania lub naruszenie WCAG A/AA)
1. **[Problem]** — [gdzie]. Przyczyna: [...]. Poprawka: [...].

## Istotne (utrudnia, spowalnia, myli)
2. ...

## Kosmetyczne (spójność, estetyka)
3. ...

## Do zrobienia od razu
- [3 rzeczy o największym stosunku efekt/koszt]

## Czego nie sprawdziłem
- [np. stany hover/fokus — brak na zrzucie; zachowanie na 320 px; czytnik ekranu]
```

Wagi:
- **Blokujące** — brak możliwości ukończenia zadania (np. przycisk „Głosuj” niewidoczny
  na mobile, formularz bez informacji o błędzie), kontrast poniżej 3:1, brak obsługi
  klawiatury, brak etykiet pól. Wszystko, co narusza WCAG A lub AA, ląduje tutaj —
  dla podmiotu publicznego to ryzyko prawne.
- **Istotne** — zadanie da się wykonać, ale z wysiłkiem: niejasne nazwy, zbyt wiele
  kroków, brak potwierdzenia, mylące ułożenie, słaba hierarchia.
- **Kosmetyczne** — niespójne odstępy, promienie, ikony, kolory; drobne literówki.

## Lista kontrolna — twarde kryteria (sprawdź zawsze)

### Struktura i semantyka
- [ ] Jeden `h1`, nagłówki bez przeskoków (h2 → h4).
- [ ] `header / nav / main / footer`, listy jako `ul/ol`, przyciski jako `button`.
- [ ] `lang="pl"` na `html`; `title` opisujący stronę.
- [ ] Link „Przejdź do treści” (skip link) na stronach publicznych.

### Kontrast i kolor
- [ ] Tekst normalny ≥ 4.5:1, tekst duży (≥ 24 px lub ≥ 19 px bold) ≥ 3:1.
- [ ] Elementy UI (obramowanie pola, ikona, obrys fokusu) ≥ 3:1 do tła.
- [ ] Placeholder również ≥ 4.5:1 (najczęstsza wpadka — domyślny szary ma ~2.5:1).
- [ ] Status/błąd/sukces nie tylko kolorem — ikona lub tekst obok.
- Narzędzie: `scripts/contrast.py`.

### Klawiatura i fokus
- [ ] Każdy interaktywny element osiągalny Tabem, w logicznej kolejności.
- [ ] Fokus widoczny (`:focus-visible`), nie usunięty przez `outline: none` bez zamiennika.
- [ ] Modale: fokus wchodzi do modala, Esc zamyka, fokus wraca do wyzwalacza.
- [ ] Brak pułapek fokusu (np. osadzone widżety, mapy).

### Formularze
- [ ] Widoczna etykieta powiązana z polem (`label for` / `aria-labelledby`).
- [ ] Wymagane pola oznaczone, a znaczenie oznaczenia wyjaśnione raz na górze.
- [ ] Błąd: przy polu + tekst mówiący, co poprawić (nie „Błąd”), `aria-describedby`.
- [ ] `autocomplete` (name, email, tel, postal-code, street-address).
- [ ] Typ pola dobrany (`type="email"`, `inputmode="numeric"` dla PESEL/kodu).
- [ ] Po wysłaniu: jednoznaczne potwierdzenie i co dalej.

### Mobile
- [ ] Bez poziomego scrolla na 320 px.
- [ ] Cele dotykowe ≥ 44×44 px, odstęp między nimi ≥ 8 px.
- [ ] Tekst bazowy ≥ 16 px; nie blokować zoomu (`user-scalable=no` = błąd).
- [ ] Sticky elementy nie zasłaniają treści na małych ekranach.

### Treść i mikroteksty
- [ ] Przyciski nazwane czasownikiem + obiekt („Oddaj głos”, nie „OK”/„Wyślij”).
- [ ] Komunikaty w języku użytkownika, bez kodów i żargonu („Nie znaleziono wniosku
  o tym numerze”, nie „Error 404: entity not found”).
- [ ] Puste stany mówią, co zrobić („Nie masz jeszcze wniosków. Dodaj pierwszy.”).

## Lista kontrolna — kryteria miękkie (heurystyki w praktyce)

Pytania, które zadajesz sobie patrząc na widok. Szczegóły w `heurystyki.md`.

- **Czy w 5 sekund wiem, gdzie jestem i co mogę zrobić?** (widoczność stanu, hierarchia)
- **Czy główna akcja jest jedna i najbardziej widoczna?** (jeden primary button na widok)
- **Czy użytkownik wie, co się stało po kliknięciu?** (feedback: toast, zmiana stanu, przejście)
- **Czy da się cofnąć / poprawić bez utraty danych?** (zapobieganie błędom, kontrola)
- **Czy to samo wygląda tak samo wszędzie?** (spójność przycisków, odstępów, nazw)
- **Czy trzeba coś pamiętać między ekranami?** (rozpoznawanie > przypominanie:
  pokazuj kontekst — nazwę gminy, edycji, wybranego projektu)
- **Czy każdy element na ekranie na coś zasługuje?** (minimalizm: usuń dekoracje,
  które nie niosą informacji; zredukuj liczbę kolorów i wag fontu)
- **Czy urzędnik przy 200. powtórzeniu nie zwariuje?** (skróty, domyślne wartości,
  zapamiętane filtry, akcje masowe, sortowanie)

## Audyt ze zrzutu ekranu vs. z kodu

**Zrzut ekranu**: możesz ocenić hierarchię, układ, kolor (kontrast tylko szacunkowo —
zaznacz to), treść, spójność. Nie możesz: fokusu, klawiatury, struktury nagłówków,
etykiet, zachowania responsywnego. Wypisz to w „Czego nie sprawdziłem” i poproś
o HTML lub link, jeśli potrzebna jest pełna ocena dostępności.

**Kod HTML/CSS**: sprawdź wszystko z listy twardej. Uruchom skrypt kontrastu na CSS.
Przeczytaj strukturę nagłówków (`grep -o '<h[1-6]'`), etykiety (`<label`, `aria-label`),
fokus (`outline`, `:focus`). Zaproponuj poprawiony plik, nie tylko raport.
