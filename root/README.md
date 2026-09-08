# Terminsync (Web/PWA)

Läuft als Progressive Web App im Browser auf Android **und** iOS - keine
App-Stores, kein Xcode. Installierbar über "Zum Homescreen hinzufügen"
(iOS Safari) bzw. "App installieren" (Android Chrome).

## Architektur

- **Kein Server nötig.** Alles läuft im Browser.
- **Git-Sync im Browser** über [isomorphic-git](https://isomorphic-git.org/)
  - Das Repo wird in einem virtuellen Dateisystem gehalten (IndexedDB via
    LightningFS), nicht auf einer echten Festplatte.
  - Braucht einen **CORS-Proxy** vor GitHub (GitHub setzt keine CORS-Header
    auf den Git-Smart-HTTP-Endpunkten). Standardmäßig ist der öffentliche
    Proxy `https://cors.isomorphic-git.org` eingestellt - für den Robocup-
    Freundeskreis okay, für sensiblere Daten solltest du später einen
    eigenen Proxy hosten (siehe unten).
- **Kern-Logik** (ICS-Import, RRULE-Auflösung, Slot-Algorithmus) ist ein
  1:1-Port der Python-Version, verifiziert mit denselben Testdaten -
  identische Ergebnisse.
- **Identität statt Accounts**: Username wird beim ersten Start lokal
  (`localStorage`) gespeichert, keine Passwörter.

## Lokal starten (zum Testen)

```bash
cd public
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

Für eine echte PWA-Installation auf dem Handy muss die Seite über **HTTPS**
erreichbar sein (localhost zählt beim Testen auf demselben Gerät als
Ausnahme). Am einfachsten: auf GitHub Pages, Netlify oder Vercel
deployen - alle drei sind kostenlos für so ein Projekt.

## Nach Code-Änderungen neu bauen

```bash
npm install
npx esbuild src/app.js --bundle --outfile=public/bundle.js --platform=browser --format=esm
```

Danach den Inhalt von `public/` deployen (z.B. `git push` zu GitHub Pages).

## Ersteinrichtung in der App

1. App öffnen → Bildschirm "Mit Kalender-Repo verbinden": Repo-URL +
   Access Token eintragen (ein Teammitglied legt das Repo einmal an, alle
   anderen nutzen dieselben Zugangsdaten oder eigene Tokens mit
   Schreibrecht auf dasselbe Repo).
2. Username festlegen.
3. "Kalender importieren" → eigene `.ics`-Datei wählen.
4. "Mit Cloud syncen" → pusht die eigenen Termine.
5. Teilnehmer auswählen, Wochentag/Zeitraum/Uhrzeit eingeben, "Slots finden".

## Eigenen CORS-Proxy hosten (optional, für mehr Kontrolle)

Isomorphic-git bietet ein fertiges Proxy-Server-Paket
(`@isomorphic-git/cors-proxy`), das du z.B. auf einem Raspberry Pi oder
einem kleinen Cloud-Server laufen lassen kannst - dann trägst du dessen
URL statt des öffentlichen Proxys in den Einstellungen ein.

## Bekannte Einschränkungen

- **iOS-Speicher**: Safari kann den Speicher von PWAs, die länger nicht
  geöffnet wurden, unter Umständen leeren. Bei App-Start wird deshalb immer
  neu vom Git-Remote gepullt.
- **Merge-Konflikte**: pusht ein zweites Gerät gleichzeitig, schlägt der
  Push fehl (kein automatischer Merge). Die App zeigt dann eine
  Fehlermeldung - erneutes Syncen (pull) und nochmal pushen löst es meist,
  da jeder User seine eigene Datei bearbeitet und es damit selten zu
  echten Konflikten kommt.
- **Sicherheit bewusst minimal** (wie besprochen): Token liegt im
  Browser-Storage, jeder mit dem Token kann alle Kalender im Repo lesen
  und schreiben. Für einen kleinen, vertrauten Kreis (Team) ein
  akzeptabler Trade-off.
