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

## Sync-Backend wählen: Git oder Firebase

Beim ersten Start (oder später in den Einstellungen) wählst du, wie die
Termine synchronisiert werden. Beide Wege benutzen dieselbe App und
dieselbe Oberfläche - nur der Datenkanal dahinter ist anders.

### Option A: Privates Git-Repo
Siehe oben - Repo-URL + Access Token.

### Option B: Firebase (Firestore)
1. Auf https://console.firebase.google.com ein neues Projekt anlegen (kostenlos).
2. Im Projekt: "Firestore Database" aktivieren, **im Testmodus** starten
   (offene Regeln - passt zum "Sicherheit ist erstmal egal"-Ansatz, den wir
   für den Git-Token auch gefahren haben). Für einen etwas geschützteren
   Stand später: Firestore-Regeln so einschränken, dass nur bestimmte
   Projekt-IDs/Domains schreiben dürfen.
3. Projekteinstellungen (Zahnrad oben links) → "Deine Apps" → Web-App
   hinzufügen (</> Symbol) → einen Namen vergeben → Firebase zeigt dir ein
   `firebaseConfig`-Objekt wie:
   ```js
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     appId: "...",
   };
   ```
4. Genau dieses Objekt (inklusive geschweifter Klammern) in der App unter
   "Firebase-Konfiguration" einfügen - die App versteht sowohl echtes JSON
   als auch dieses unquoted-Keys-Format direkt aus der Konsole.

   **Komfort-Alternative, damit das nicht jedes Teammitglied manuell tippen
   muss:** trag die Config stattdessen einmal in `public/firebase-config.js`
   ein (liegt im Website-Repo, siehe Beispiel-Datei) - das Feld in der App
   füllt sich dann beim Wählen von "Firebase" automatisch. Das ist
   unbedenklich im Repo, da der `apiKey` bei Firebase kein Geheimnis ist -
   der eigentliche Zugriffsschutz läuft über Login + Firestore-Regeln
   (siehe "Zugriff einschränken" unten).
5. Fertig - kein Access Token, kein CORS-Proxy nötig. Jeder `writeFile()`
   in der App landet sofort in Firestore, ein manueller "Sync"-Klick ist
   bei Firebase nicht mehr zwingend nötig (der Button bleibt trotzdem
   sichtbar und bestätigt nur, dass alles synchron ist).

**Wichtig:** Der `apiKey` in der Firebase-Web-Konfiguration ist by design
kein Geheimnis (Firebase schützt Daten über Firestore-Regeln, nicht über
den Key) - anders als der Git-Token, der Schreibrechte auf dein GitHub-Konto
gibt. Trotzdem: mit offenen Testmodus-Regeln kann jeder mit der Projekt-ID
lesen/schreiben, das ist für einen kleinen Teamkreis okay.

### Zugriff einschränken (empfohlen)

Damit nicht jeder mit dem App-Link auf eure Termine zugreifen kann:

1. Firebase-Konsole → Authentication → Sign-in method → "E-Mail/Passwort" aktivieren.
2. Im Tab "Users" für jedes Teammitglied (oder ein gemeinsames Team-Konto) eine E-Mail + Passwort anlegen.
3. Firestore → Regeln, ersetzen durch:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
4. Veröffentlichen. Die App zeigt jetzt automatisch einen Login-Screen, bevor man an die Daten kommt.

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
