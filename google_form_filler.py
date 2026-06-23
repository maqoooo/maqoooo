"""
Skrypt automatycznie wypełnia formularz Google Forms na podstawie danych z pliku JSON.

Jak używać:
1. Uzupełnij FORM_ID i FIELD_MAP poniżej (instrukcja w README).
2. Przygotuj plik answers.json z danymi (przykład w answers_example.json).
3. Uruchom: python google_form_filler.py
   lub z własnym plikiem: python google_form_filler.py --data moje_dane.json

Jak znaleźć entry ID pól formularza:
  - Otwórz formularz w przeglądarce.
  - Kliknij prawym na pole > "Zbadaj element" (F12).
  - Szukaj atrybutu name="entry.XXXXXXXXX" lub użyj trybu wstępnego wypełniania:
    Formularz > ⋮ > "Pobierz wstępnie wypełniony link", wypełnij jedno pole,
    skopiuj URL — zawiera entry.XXXXXXXXX=wartość.
"""

import argparse
import json
import sys
import time
import urllib.parse
from pathlib import Path

import requests

# ── Konfiguracja ──────────────────────────────────────────────────────────────

# ID formularza Google — z URL: https://docs.google.com/forms/d/<FORM_ID>/viewform
FORM_ID = "WKLEJ_TUTAJ_ID_FORMULARZA"

# Mapowanie: klucz z JSON → entry ID pola w formularzu (bez "entry.")
# Przykład: {"imie": "123456789", "email": "987654321"}
FIELD_MAP: dict[str, str] = {
    "imie":    "ENTRY_ID_1",
    "email":   "ENTRY_ID_2",
    "wiek":    "ENTRY_ID_3",
    "opinia":  "ENTRY_ID_4",
}

# Opcjonalne: opóźnienie między kolejnymi zgłoszeniami (sekundy)
DELAY_BETWEEN_SUBMISSIONS = 1.0

# ── Logika skryptu ────────────────────────────────────────────────────────────

SUBMIT_URL = f"https://docs.google.com/forms/d/{FORM_ID}/formResponse"

HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Referer": f"https://docs.google.com/forms/d/{FORM_ID}/viewform",
}


def build_payload(record: dict) -> dict:
    payload = {}
    missing = []
    for field_key, entry_id in FIELD_MAP.items():
        value = record.get(field_key)
        if value is None:
            missing.append(field_key)
            continue
        payload[f"entry.{entry_id}"] = str(value)
    if missing:
        print(f"  [warn] Brakujące pola w rekordzie: {missing}")
    return payload


def submit(record: dict, dry_run: bool = False) -> bool:
    payload = build_payload(record)
    if not payload:
        print("  [błąd] Pusty payload — pomijam rekord.")
        return False

    if dry_run:
        encoded = urllib.parse.urlencode(payload)
        print(f"  [dry-run] URL: {SUBMIT_URL}?{encoded}")
        return True

    try:
        response = requests.post(SUBMIT_URL, data=payload, headers=HEADERS, timeout=10)
        # Google Forms zawsze zwraca 200 po przekierowaniu (lub 302 bez follow)
        if response.status_code in (200, 302):
            return True
        print(f"  [błąd] HTTP {response.status_code}")
        return False
    except requests.RequestException as exc:
        print(f"  [błąd] {exc}")
        return False


def load_records(path: Path) -> list[dict]:
    with path.open(encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict):
        return [data]
    if isinstance(data, list):
        return data
    raise ValueError("Plik JSON musi zawierać obiekt {} lub tablicę [{}].")


def main():
    parser = argparse.ArgumentParser(description="Auto-wypełniacz formularzy Google Forms")
    parser.add_argument("--data", default="answers.json", help="Ścieżka do pliku JSON z danymi")
    parser.add_argument("--dry-run", action="store_true", help="Pokaż URL-e bez wysyłania")
    args = parser.parse_args()

    if FORM_ID == "WKLEJ_TUTAJ_ID_FORMULARZA":
        print("[błąd] Ustaw FORM_ID w pliku google_form_filler.py przed uruchomieniem.")
        sys.exit(1)

    data_path = Path(args.data)
    if not data_path.exists():
        print(f"[błąd] Nie znaleziono pliku: {data_path}")
        sys.exit(1)

    records = load_records(data_path)
    print(f"Załadowano {len(records)} rekord(ów) z {data_path}\n")

    ok = 0
    for i, record in enumerate(records, 1):
        print(f"[{i}/{len(records)}] Wysyłam: {record}")
        success = submit(record, dry_run=args.dry_run)
        if success:
            print("  [ok] Zgłoszono pomyślnie.")
            ok += 1
        if i < len(records):
            time.sleep(DELAY_BETWEEN_SUBMISSIONS)

    print(f"\nGotowe: {ok}/{len(records)} zgłoszeń zakończonych sukcesem.")


if __name__ == "__main__":
    main()
