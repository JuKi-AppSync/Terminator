// Wandelt gespeicherte CalendarEvents (die eine RRULE haben können) in
// konkrete belegte Zeitblöcke für einen bestimmten Zeitraum um.

import { RRule } from "rrule";

export function expandEvents(events, username, rangeStart, rangeEnd) {
  const blocks = [];

  for (const event of events) {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const durationMs = end - start;

    if (!event.rrule) {
      if (end > rangeStart && start < rangeEnd) {
        blocks.push({ start, end, user: username, title: event.title });
      }
      continue;
    }

    const options = RRule.parseString(event.rrule);
    options.dtstart = start;
    const rule = new RRule(options);

    const searchStart = new Date(rangeStart.getTime() - durationMs);
    const occurrences = rule.between(searchStart, rangeEnd, true);
    for (const occStart of occurrences) {
      const occEnd = new Date(occStart.getTime() + durationMs);
      if (occEnd > rangeStart && occStart < rangeEnd) {
        blocks.push({ start: occStart, end: occEnd, user: username, title: event.title });
      }
    }
  }

  return blocks.sort((a, b) => a.start - b.start);
}
