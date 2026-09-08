import { Buffer } from "buffer";
window.Buffer = Buffer;

import { getConfig, saveConfig, isConfigured } from "./config.js";
import { getLocalUsername, setLocalUsername } from "./userRegistry.js";
import { pullOnStartup, pushChanges } from "./gitSync.js";
import { loadUserCalendar, saveUserCalendar, listKnownUsers } from "./jsonStore.js";
import { expandEvents } from "./expand.js";
import { findCommonFreeSlots, parseWeekday, formatSlot } from "./availability.js";
import { parseIcsToEvents } from "./icsParser.js";

const $ = (id) => document.getElementById(id);
const screens = ["setup", "onboarding", "settings", "main"];

function showScreen(name) {
  for (const s of screens) {
    $(`screen-${s}`).classList.toggle("hidden", s !== name);
  }
}

function setSyncStatus(text, state) {
  const el = $("syncStatus");
  el.textContent = text;
  el.dataset.state = state || "";
}

async function refreshUserList() {
  const users = await listKnownUsers();
  const container = $("userList");
  container.innerHTML = "";

  if (users.length === 0) {
    container.innerHTML = '<p class="hint">Noch keine Teilnehmer gefunden – erst synchronisieren.</p>';
    return;
  }

  for (const username of users) {
    const wrapper = document.createElement("label");
    wrapper.className = "user-item";
    wrapper.innerHTML = `<input type="checkbox" value="${username}" /> ${username}`;
    container.appendChild(wrapper);
  }
}

async function syncPull() {
  setSyncStatus("Synchronisiere …");
  const result = await pullOnStartup((msg) => setSyncStatus(msg));
  if (result.ok) {
    setSyncStatus("Zuletzt synchronisiert: " + new Date().toLocaleTimeString("de-DE"), "ok");
  } else {
    setSyncStatus("Sync fehlgeschlagen: " + result.reason, "error");
  }
  await refreshUserList();
}

async function syncPush() {
  const username = getLocalUsername();
  setSyncStatus("Sende Änderungen …");
  const result = await pushChanges("Termine aktualisiert von " + username, username);
  if (result.ok) {
    setSyncStatus(result.reason || "Erfolgreich synchronisiert.", "ok");
  } else {
    setSyncStatus("Push fehlgeschlagen: " + result.reason, "error");
  }
}

async function handleIcsImport(file) {
  const username = getLocalUsername();
  const text = await file.text();
  const events = parseIcsToEvents(text);
  await saveUserCalendar(username, events);
  setSyncStatus(`${events.length} Termine importiert für ${username}. Nicht vergessen zu syncen!`, "ok");
  await refreshUserList();
}

async function handleFindSlots() {
  const weekday = parseWeekday($("weekdaySelect").value);
  const fromDate = new Date($("fromDate").value);
  const toDate = new Date($("toDate").value);
  const startTime = $("startTime").value;
  const endTime = $("endTime").value;

  const selectedUsers = [...document.querySelectorAll("#userList input[type=checkbox]:checked")]
    .map((cb) => cb.value);

  const resultsEl = $("results");

  if (!$("fromDate").value || !$("toDate").value) {
    resultsEl.innerHTML = '<p class="empty">Bitte Zeitraum (Von/Bis) angeben.</p>';
    return;
  }
  if (selectedUsers.length === 0) {
    resultsEl.innerHTML = '<p class="empty">Bitte mindestens einen Teilnehmer auswählen.</p>';
    return;
  }

  // Zeitfenster leicht ausweiten, damit expandEvents auch Events erfasst,
  // die kurz vor 00:00 des ersten Tages beginnen.
  const rangeStartDt = new Date(fromDate);
  const rangeEndDt = new Date(toDate);
  rangeEndDt.setHours(23, 59, 59, 999);

  let allBusy = [];
  for (const username of selectedUsers) {
    const events = await loadUserCalendar(username);
    allBusy = allBusy.concat(expandEvents(events, username, rangeStartDt, rangeEndDt));
  }

  const slots = findCommonFreeSlots(allBusy, weekday, fromDate, toDate, startTime, endTime);

  if (slots.length === 0) {
    resultsEl.innerHTML = '<p class="empty">Keine gemeinsamen freien Slots gefunden.</p>';
  } else {
    resultsEl.innerHTML = slots.map((s) => `<div class="slot">${formatSlot(s)}</div>`).join("");
  }
}

function wireEvents() {
  $("setupSaveBtn").addEventListener("click", async () => {
    const remoteUrl = $("setupRemoteUrl").value.trim();
    const token = $("setupToken").value.trim();
    if (!remoteUrl || !token) return;
    saveConfig({ ...getConfig(), remoteUrl, token });
    await routeToInitialScreen();
  });

  $("onboardingSaveBtn").addEventListener("click", async () => {
    const name = $("onboardingName").value.trim();
    if (!name) return;
    setLocalUsername(name);
    await routeToInitialScreen();
  });

  $("settingsBtn").addEventListener("click", () => {
    const cfg = getConfig();
    $("settingsRemoteUrl").value = cfg.remoteUrl || "";
    $("settingsToken").value = cfg.token || "";
    $("settingsName").value = getLocalUsername() || "";
    showScreen("settings");
  });
  $("settingsBackBtn").addEventListener("click", () => showScreen("main"));
  $("settingsSaveBtn").addEventListener("click", () => {
    saveConfig({ ...getConfig(), remoteUrl: $("settingsRemoteUrl").value.trim(), token: $("settingsToken").value.trim() });
    if ($("settingsName").value.trim()) setLocalUsername($("settingsName").value.trim());
    showScreen("main");
  });

  $("importBtn").addEventListener("click", () => $("importFile").click());
  $("importFile").addEventListener("change", (e) => {
    if (e.target.files[0]) handleIcsImport(e.target.files[0]);
  });

  $("pushBtn").addEventListener("click", syncPush);
  $("findSlotsBtn").addEventListener("click", handleFindSlots);
}

async function routeToInitialScreen() {
  if (!isConfigured()) {
    showScreen("setup");
    return;
  }
  if (!getLocalUsername()) {
    showScreen("onboarding");
    return;
  }
  showScreen("main");
  await syncPull();
}

async function init() {
  wireEvents();
  await routeToInitialScreen();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
}

init();
