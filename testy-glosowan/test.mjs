// Test akceptacyjny makiety „Głosowania”.
// Uruchomienie:  node test.mjs   (wymaga playwright-core i Chromium; opcjonalnie CHROME=ścieżka/do/chrome)
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const url = 'file://' + path.join(here, 'index.html');
const launch = process.env.CHROME ? { executablePath: process.env.CHROME } : {};
const browser = await chromium.launch(launch);
let failures = 0;
const check = (name, ok, extra = '') => { console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`); if (!ok) failures++; };

for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(url + '#lista');
  await page.waitForSelector('tbody tr');
  await page.evaluate(() => localStorage.clear());
  await page.reload(); await page.waitForSelector('tbody tr');

  console.log(`\n== ${width}px ==`);
  check('brak błędów w konsoli', errors.length === 0, errors.join(' | '));
  const sw = await page.evaluate(() => ({ html: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  check('brak poziomego przewijania strony', sw.html <= width && sw.body <= width, JSON.stringify(sw));
  const tw = await page.evaluate(() => { const t = document.querySelector('.tablewrap'); return { client: t.clientWidth, scroll: t.scrollWidth, overflowX: getComputedStyle(t).overflowX }; });
  check('tabela przewija się we własnym kontenerze', tw.overflowX === 'auto' && tw.client <= width, JSON.stringify(tw));

  check('brak zakładek Nadchodzące/Trwające/Zakończone', await page.locator('[data-seg], .segments').count() === 0);
  check('brak selecta „Najbliższy miesiąc”', await page.locator('option', { hasText: 'Najbliższy miesiąc' }).count() === 0 && await page.locator('[data-range]').count() === 0);
  check('brak wyszukiwarki', await page.locator('input[type=search], #q').count() === 0);
  check('brak kolumny Kontakt', await page.locator('th', { hasText: /^Kontakt$/ }).count() === 0 && await page.locator('.contact').count() === 0);
  check('jest kolumna Akcja wyrównana do prawej', await page.locator('th.right', { hasText: 'Akcja' }).count() === 1);
  check('licznik w podtytule', /\d+ nadchodząc/.test(await page.locator('.pagehead p').innerText()));

  // filtr po dacie startu
  const all = await page.locator('tbody tr').count();
  check('domyślnie wszystkie nadchodzące (15)', all === 15, String(all));
  const dates = await page.locator('tbody .dates div:first-child').allInnerTexts();
  const parsed = dates.map(d => { const m = d.match(/(\d\d)\.(\d\d)\.(\d{4}) (\d\d):(\d\d)/); return `${m[3]}-${m[2]}-${m[1]}T${m[4]}:${m[5]}`; });
  check('domyślne sortowanie rosnąco po dacie „od”', parsed.every((d, i) => i === 0 || d >= parsed[i - 1]));
  await page.selectOption('#start-window', '7'); await page.waitForTimeout(100);
  const in7 = await page.locator('tbody tr').count();
  check('filtr „W ciągu 7 dni” zawęża listę', in7 > 0 && in7 < all, `${in7} z ${all}`);
  await page.selectOption('#start-window', '14'); await page.waitForTimeout(100);
  const in14 = await page.locator('tbody tr').count();
  check('filtr „W ciągu 14 dni” ≥ 7 dni', in14 >= in7 && in14 <= all, String(in14));
  await page.selectOption('#start-window', 'all'); await page.waitForTimeout(100);
  check('powrót do „Wszystkie nadchodzące”', await page.locator('tbody tr').count() === all);
  // pusty stan: przesuwamy wszystkie starty poza okno, żeby wymusić brak wyników
  await page.evaluate(() => { S.forEach(a => { a.start = '2027-06-01T00:00'; a.end = '2027-06-10T00:00'; }); });
  await page.selectOption('#start-window', '7'); await page.waitForTimeout(100);
  check('pusty stan przy braku wyników', await page.locator('.empty').count() === 1 && /Brak głosowań/.test(await page.locator('.empty h3').innerText()));
  await page.evaluate(() => { localStorage.clear(); }); await page.reload(); await page.waitForSelector('tbody tr');

  // kolumna Projekty: badge publikacji + popover
  const pubBadges = await page.locator('.badge.pub').allInnerTexts();
  check('badge publikacji w każdym wierszu', pubBadges.length === 15 && pubBadges.every(t => /^(Nieopublikowane|Opublikowane|Opublikowane do głosowania)$/.test(t.trim())));
  check('trzy warianty publikacji obecne', ['Nieopublikowane', 'Opublikowane', 'Opublikowane do głosowania'].every(v => pubBadges.some(t => t.trim() === v)));
  check('wiersze z „brak” mają ikonę informacji', await page.locator('tr:has(.badge.warn:has-text("brak")) .infobtn').count() > 0);
  const firstInfo = page.locator('.infobtn').first();
  await firstInfo.hover(); await page.waitForTimeout(150);
  const tipTextHover = await page.locator('#proj-tip').innerText();
  const fourStatuses = t => ['w weryfikacji formalnej', 'w weryfikacji merytorycznej', 'zaakceptowane merytorycznie', 'wybrane do głosowania'].every(k => t.includes(k));
  check('popover po hover z czterema statusami', await page.locator('#proj-tip').isVisible() && fourStatuses(tipTextHover));
  check('popover ma role="tooltip", ikona aria-describedby', await page.locator('#proj-tip[role="tooltip"]').count() === 1 && await firstInfo.getAttribute('aria-describedby') === 'proj-tip');
  const box = await page.locator('#proj-tip').boundingBox();
  check('popover nie wychodzi poza viewport', box.x >= 0 && box.x + box.width <= width && box.y >= 0 && box.y + box.height <= 900, JSON.stringify(box));
  await page.mouse.move(5, 5); await page.waitForTimeout(250);
  check('popover znika po zjechaniu kursorem', !(await page.locator('#proj-tip').isVisible()));
  const secondInfo = page.locator('.infobtn').nth(1);
  await secondInfo.focus(); await page.waitForTimeout(100);
  check('popover po fokusie z klawiatury', await page.locator('#proj-tip').isVisible() && fourStatuses(await page.locator('#proj-tip').innerText()));
  await page.keyboard.press('Escape'); await page.waitForTimeout(50);
  check('Esc zamyka popover', !(await page.locator('#proj-tip').isVisible()));
  await secondInfo.click(); await page.waitForTimeout(100);
  check('klik przypina popover', await page.locator('#proj-tip').isVisible());
  await page.mouse.move(5, 5); await page.waitForTimeout(250);
  check('przypięty popover nie znika po zjechaniu kursorem', await page.locator('#proj-tip').isVisible());
  await page.keyboard.press('Escape');

  // kolumna W bazie
  const upd = await page.locator('.cell-voters .upd').allInnerTexts();
  check('data aktualizacji pod liczbą osób', upd.length > 0 && upd.every(t => /^aktualizacja \d\d\.\d\d\.\d{4} \d\d:\d\d$/.test(t.trim())), upd[0]);
  check('badge „brak bazy” dla gmin bez bazy', await page.locator('.badge.warn', { hasText: 'brak bazy' }).count() > 0);
  check('brak skrótu „n/d”', (await page.locator('tbody').innerText()).includes('n/d') === false);

  // przyciski akcji w kolumnie Akcja
  const actionLabels = await page.locator('tbody td:last-child .btn').allInnerTexts();
  check('akcje w ostatniej kolumnie', actionLabels.length === 15 && actionLabels.every(t => /Test z klientem|Przypomnij|Wyślij ankietę|Otwórz|Rozbieżności|Przed startem|Wyślij ponownie|Wyślij poprawioną|Uruchom test/.test(t)));


  // kreator „Ustalenie” zamiast prostego dialogu wysyłki
  await page.evaluate(() => localStorage.clear()); await page.reload(); await page.waitForSelector('tbody tr');
  await page.click('tr:has-text("Lubawa") [data-act="send"]'); await page.waitForTimeout(200);
  check('„Wyślij ankietę” otwiera kreator ustalenia', page.url().includes('#ustalenie/') && /Ustalenie zasad/.test(await page.locator('h1').innerText()));
  check('kreator ma dwa tryby (poprzednie zasady / pusta ankieta)', await page.locator('input[name=mode]').count() === 2);
  check('nowy klient: tryb „poprzednie zasady” niedostępny', await page.locator('input[value=confirm_previous]').isDisabled() && await page.locator('input[value=new_survey]').isChecked());
  await page.goto(url + '#ustalenie/2101'); await page.waitForTimeout(200);
  check('stały klient: tryb „poprzednie zasady” domyślny, z tabelą zasad', await page.locator('input[value=confirm_previous]').isChecked() && await page.locator('.panel.inner table.answers tr').count() === 20);
  await page.click('[data-act="wiz-edit"]'); await page.waitForTimeout(150);
  check('edycja zasad przed wysyłką: formularz z polami', await page.locator('[data-form="wiz-edit"] .field').count() >= 20);
  await page.fill('#w-max_votes_total', '7'); await page.click('[data-form="wiz-edit"] button[type=submit]'); await page.waitForTimeout(150);
  check('zmiana opiekuna oznaczona w tabeli', await page.locator('.panel.inner tr.changed').count() >= 1);
  await page.click('[data-act="wiz-next"]'); await page.waitForTimeout(150);
  check('krok 2: pole e-mail i ważność linku', await page.locator('#wiz-email').count() === 1 && await page.locator('#wiz-expires').count() === 1);
  await page.fill('#wiz-email', 'bo@srem.pl'); await page.click('[data-form="wiz"] button[type=submit]'); await page.waitForTimeout(250);
  check('po wysyłce: karta klienta, status Wysłana, zasady wysłane do potwierdzenia', page.url().includes('#klient/2101') && /Wysłana/.test(await page.locator('.pagehead .badge').first().innerText()) && /Zasady wysłane do potwierdzenia/.test(await page.locator('[role=tabpanel] h2').first().innerText()));
  // widok klienta (potwierdzenie po stronie gminy)
  await page.goto(url + '#klient/2101/podglad'); await page.waitForTimeout(200);
  check('widok klienta: „Potwierdź zasady głosowania”, tabela, „Chcę wprowadzić zmiany”', /Potwierdź zasady/.test(await page.locator('.pubintro h1').innerText()) && await page.locator('table.answers tr').count() === 20 && await page.locator('[data-act="pub-edit"]').count() === 1);
  check('widok klienta: formularz osoby potwierdzającej z oświadczeniem', await page.locator('[data-form="pub-confirm"] input[required]').count() === 5);
  await page.fill('#pc-first', 'Marta'); await page.fill('#pc-last', 'Wiśniewska'); await page.fill('#pc-pos', 'Koordynatorka BO'); await page.fill('#pc-email', 'bo@srem.pl'); await page.check('[name=consent]');
  await page.click('[data-form="pub-confirm"] button[type=submit]'); await page.waitForTimeout(250);
  check('po potwierdzeniu: „Dziękujemy za potwierdzenie” i zablokowane zasady v1', /Dziękujemy/.test(await page.locator('.pubintro h1').innerText()) && /v1/.test(await page.locator('.public h2').first().innerText()));
  await page.goto(url + '#klient/2101/Klient'); await page.waitForTimeout(200);
  check('karta klienta po potwierdzeniu: odpowiedzi kanoniczne i zmiany względem 2025', /Odpowiedzi klienta/.test(await page.locator('[role=tabpanel] h2').first().innerText()) && await page.locator('table.diffs').count() === 1);
  await page.evaluate(() => localStorage.clear());

  check('brak błędów w konsoli po interakcjach', errors.length === 0, errors.join(' | '));
  await page.close();
}
await browser.close();
console.log(failures ? `\n${failures} testów nie przeszło` : '\nWszystkie testy przeszły');
process.exit(failures ? 1 : 0);
