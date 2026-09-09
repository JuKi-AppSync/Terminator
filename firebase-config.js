// Hier eure Firebase-Projektkonfiguration eintragen (aus der Firebase-
// Konsole: Projekteinstellungen → Deine Apps → SDK-Setup und Konfiguration).
//
// Das ist KEIN Geheimnis - der apiKey schützt bei Firebase nichts, der
// eigentliche Zugriffsschutz läuft über Login + Firestore-Regeln (siehe
// README). Diese Datei kann also bedenkenlos mit im (auch öffentlichen)
// Website-Repo liegen.
//
// Lässt du das Objekt leer (null), fragt die App die Konfiguration beim
// ersten Start wie bisher manuell ab.

window.TERMINSYNC_FIREBASE_CONFIG = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_PROJEKT.firebaseapp.com",
  projectId: "DEIN_PROJEKT",
  appId: "DEINE_APP_ID",
};
