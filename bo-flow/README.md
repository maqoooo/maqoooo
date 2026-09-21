# bo-flow — projektowanie przepływu weryfikacji projektów BO

Narzędzie dla urzędów: samodzielne zaprojektowanie przebiegu weryfikacji projektu
budżetu obywatelskiego bez rysowania diagramów.

| Plik | Co to jest |
|------|-----------|
| `KONCEPCJA.md` | Opis rozwiązania — co zbieramy, w jakiej kolejności, jak działa |
| `kreator-weryfikacji-koncowej.html` | Działający prototyp kreatora (jeden plik, bez zależności) |

## Jak uruchomić

Otwórz `kreator-weryfikacji-koncowej.html` w przeglądarce. Przycisk
**„Wczytaj wzorzec (Szczecin)"** wypełnia wywiad danymi z SBO 2027 — dobry punkt
wyjścia do oceny narzędzia.

## Miejsce w łańcuchu

```
wywiad z urzędem → kreator → JSON → generator.html → mapa procesu
```

Kreator produkuje JSON w formacie, który `generator.html` renderuje bez zmian
(`meta` + `etapy[]` z `role` / `kroki` / `przejscia`). Przycisk **Eksport JSON**
pobiera plik, który wkleja się wprost do ekranu wczytywania generatora.

Zakres prototypu: etap **weryfikacji końcowej** — najtrudniejszy, więc celowo pierwszy.
