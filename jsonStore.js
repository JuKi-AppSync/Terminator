// Speichert/liest Kalenderdaten pro User als JSON im Git-Repo (virtuelles
// Dateisystem). Format ist bewusst identisch zur Python-Version, damit
// beide Welten (falls du doch mal beides parallel nutzt) kompatibel bleiben:
//
// { "user": "alice", "events": [ {id, title, start, end, rrule} ] }

import { readFile, writeFile, listFiles } from "./gitSync.js";

export function userCalendarPath(username) {
  return `data/users/${username}.json`;
}

export async function loadUserCalendar(username) {
  const raw = await readFile(userCalendarPath(username));
  if (!raw) return [];
  const data = JSON.parse(raw);
  return data.events || [];
}

export async function saveUserCalendar(username, events) {
  const sorted = [...events].sort((a, b) => a.id.localeCompare(b.id));
  const data = { user: username, events: sorted };
  await writeFile(userCalendarPath(username), JSON.stringify(data, null, 2) + "\n");
}

export async function listKnownUsers() {
  const files = await listFiles("data/users");
  return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, "")).sort();
}
