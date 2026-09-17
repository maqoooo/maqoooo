# Heurystyki i prawa — fundament do uzasadnień

Nie cytuj tego użytkownikowi jako teorii. Używaj, gdy trzeba **uzasadnić** rekomendację
albo gdy nie wiesz, co jest nie tak z widokiem, a „coś nie gra”.

## 10 heurystyk Nielsena — w wersji użytecznej

| # | Heurystyka | Pytanie do widoku | Typowa wpadka w panelach/BO |
|---|---|---|---|
| 1 | Widoczność stanu systemu | Czy użytkownik wie, co się dzieje i gdzie jest? | Brak spinnera po „Wyślij”; brak informacji, w której edycji BO pracuję |
| 2 | Zgodność ze światem użytkownika | Czy słowa i pojęcia są jego, nie nasze? | „Encja”, „rekord”, „status W/JO” bez wyjaśnienia dla mieszkańca |
| 3 | Kontrola i wolność | Czy da się cofnąć, anulować, wyjść? | Modal bez „Anuluj”; usuwanie bez potwierdzenia i bez cofnięcia |
| 4 | Spójność i standardy | Czy to samo wygląda i działa tak samo? | Trzy style przycisku primary; „Zapisz” raz na górze, raz na dole |
| 5 | Zapobieganie błędom | Czy trudno się pomylić? | Data jako wolny tekst; PESEL bez maski; brak walidacji na bieżąco |
| 6 | Rozpoznawanie zamiast przypominania | Czy wszystko potrzebne jest na ekranie? | Kod obszaru zamiast nazwy; wymóg pamiętania numeru wniosku |
| 7 | Elastyczność i efektywność | Czy zaawansowany użytkownik ma skróty? | Brak akcji masowych, brak zapamiętanych filtrów, brak sortowania kolumn |
| 8 | Estetyka i minimalizm | Czy każdy element zasługuje na miejsce? | Pięć kolorów akcentu, ikony-ozdobniki, boksy „informacyjne” bez informacji |
| 9 | Pomoc w rozpoznaniu i naprawie błędów | Czy błąd mówi, co zrobić? | „Wystąpił błąd”; czerwona ramka bez tekstu |
| 10 | Pomoc i dokumentacja | Czy pomoc jest tam, gdzie problem? | FAQ w innym miejscu niż formularz; brak podpowiedzi przy trudnym polu |

## Prawa i efekty — kiedy je stosować

**Prawo Fittsa** — czas dotarcia do celu zależy od odległości i rozmiaru.
→ Główny przycisk duży i blisko miejsca, gdzie użytkownik kończy czytać/wypełniać.
→ Na mobile: akcja na dole (kciuk), min. 44×44 px.

**Prawo Hicka** — czas decyzji rośnie z liczbą opcji.
→ Menu do 7 pozycji; w formularzu publicznym jeden krok na ekran, jeśli pól > 8.
→ Jedna akcja primary na widok. Reszta — secondary/tertiary.

**Prawo Millera (7±2)** — pojemność pamięci roboczej.
→ Grupuj pola formularza w sekcje po 3–5. Numery (PESEL, konto) formatuj w grupy.

**Prawo Jakoba** — użytkownicy spędzają większość czasu na innych stronach.
→ Nie wymyślaj nowego wzorca nawigacji, koszyka, logowania. Konwencja > oryginalność.

**Prawo Tesler (złożoność zachowana)** — złożoność nie znika, tylko się przenosi.
→ Przenoś ją na system (domyślne wartości, autouzupełnianie, wykrywanie gminy
z adresu), nie na użytkownika.

**Efekt estetyki-użyteczności** — ładne uchodzi za działające.
→ Dopracowanie odstępów i typografii realnie zwiększa zaufanie do strony urzędu.
Ale nie zamaskuje zepsutego procesu.

**Postel (bądź liberalny w przyjmowaniu)** — przyjmuj różne formaty wejścia.
→ Telefon ze spacjami i bez, kod pocztowy z kreską i bez, wielkość liter w e-mailu.
Normalizuj po stronie systemu, nie odrzucaj.

**Efekt pozycji (primacy/recency)** — pamiętamy pierwsze i ostatnie.
→ Najważniejsze pozycje nawigacji na początku i na końcu listy.

**Seria von Restorff** — element odmienny zapada w pamięć.
→ Dlatego primary button ma być jedyny w swoim kolorze na widoku. Gdy wszystko
jest turkusowe, nic nie jest ważne.

## Zasady Gestalt — do układu

- **Bliskość**: elementy blisko siebie = jedna grupa. Odstęp między polami w sekcji
  (12–16 px) musi być wyraźnie mniejszy niż między sekcjami (32–48 px).
- **Podobieństwo**: podobny wygląd = podobna funkcja. Wszystkie linki wyglądają
  jak linki; nic, co nie jest linkiem, nie wygląda jak link.
- **Wspólny obszar**: ramka/tło grupuje silniej niż sama bliskość. Karta = jednostka.
- **Ciągłość**: wyrównuj do siatki; oko podąża za linią. Rozjechane lewe krawędzie
  to najczęstszy powód wrażenia „niechlujności”.
- **Domknięcie**: nie trzeba rysować całej ramki — wystarczy sugestia (cień, tło).
- **Figura/tło**: modal wymaga przyciemnienia tła; treść ma się od niego odcinać.

## Hierarchia wizualna — kolejność narzędzi

Gdy widok jest „płaski” i nic się nie wyróżnia, wprowadzaj hierarchię w tej kolejności
(od najtańszej do najbardziej inwazyjnej):

1. **Odstępy** — więcej powietrza wokół ważnego.
2. **Rozmiar** — nagłówek wyraźnie większy (skala 1.25–1.333).
3. **Waga** — bold tylko dla 1–2 poziomów; nie wszystko semibold.
4. **Kolor** — atrament vs przygaszony; akcent tylko dla akcji.
5. **Tło / karta** — wyodrębnienie obszaru.
6. **Ruch / cień** — ostatnia deska ratunku.

Jeśli sięgasz po punkt 4–6, a 1–3 nie są zrobione, cofnij się.
