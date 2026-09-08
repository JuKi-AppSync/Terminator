// Kernlogik: aus mehreren Kalendern (bereits zu Zeitblöcken expandiert)
// gemeinsame freie Slots an einem bestimmten Wochentag finden.
// 1:1-Port der Python-Version in terminsync/availability.py.

const WEEKDAYS_DE = {
  montag: 0, dienstag: 1, mittwoch: 2, donnerstag: 3,
  freitag: 4, samstag: 5, sonntag: 6,
};

export function parseWeekday(value) {
  const v = String(value).trim().toLowerCase();
  if (v in WEEKDAYS_DE) return WEEKDAYS_DE[v];
  return parseInt(v, 10);
}

// Unser Schema ist Montag-basiert (0=Montag..6=Sonntag), JS Date.getDay()
// ist Sonntag-basiert (0=Sonntag..6=Samstag) - hier umrechnen.
function toJsWeekday(mondayBasedWeekday) {
  return (mondayBasedWeekday + 1) % 7;
}

function datesForWeekday(rangeStart, rangeEnd, weekday) {
  const jsWeekday = toJsWeekday(weekday);
  const dates = [];
  let current = new Date(rangeStart);
  const offset = (jsWeekday - current.getDay() + 7) % 7;
  current.setDate(current.getDate() + offset);

  while (current <= rangeEnd) {
    dates.push(new Date(current));
    current = new Date(current);
    current.setDate(current.getDate() + 7);
  }
  return dates;
}

function combineDateTime(date, hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}

function subtractBusy(windowStart, windowEnd, busy) {
  const relevant = busy
    .filter((b) => b.end > windowStart && b.start < windowEnd)
    .sort((a, b) => a.start - b.start);

  const merged = [];
  for (const b of relevant) {
    const start = new Date(Math.max(b.start, windowStart));
    const end = new Date(Math.min(b.end, windowEnd));
    if (merged.length && start <= merged[merged.length - 1][1]) {
      merged[merged.length - 1][1] = new Date(Math.max(merged[merged.length - 1][1], end));
    } else {
      merged.push([start, end]);
    }
  }

  const free = [];
  let cursor = windowStart;
  for (const [start, end] of merged) {
    if (start > cursor) free.push({ start: cursor, end: start });
    cursor = new Date(Math.max(cursor, end));
  }
  if (cursor < windowEnd) free.push({ start: cursor, end: windowEnd });

  return free;
}

export function findCommonFreeSlots(
  busyBlocks, weekday, rangeStartDate, rangeEndDate,
  dayStartTime, dayEndTime, minDurationMinutes = 30
) {
  const dates = datesForWeekday(rangeStartDate, rangeEndDate, weekday);
  const allFree = [];

  for (const d of dates) {
    const windowStart = combineDateTime(d, dayStartTime);
    const windowEnd = combineDateTime(d, dayEndTime);
    const freeSlots = subtractBusy(windowStart, windowEnd, busyBlocks);
    for (const s of freeSlots) {
      const durationMinutes = (s.end - s.start) / 60000;
      if (durationMinutes >= minDurationMinutes) {
        allFree.push({ ...s, durationMinutes });
      }
    }
  }
  return allFree;
}

const WEEKDAY_LABELS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

export function formatSlot(slot) {
  const pad = (n) => String(n).padStart(2, "0");
  const d = slot.start;
  const dateStr = `${WEEKDAY_LABELS[d.getDay()]} ${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  const startStr = `${pad(slot.start.getHours())}:${pad(slot.start.getMinutes())}`;
  const endStr = `${pad(slot.end.getHours())}:${pad(slot.end.getMinutes())}`;
  return `${dateStr}, ${startStr}–${endStr} (${Math.round(slot.durationMinutes)} min)`;
}
