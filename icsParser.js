// Liest .ics-Dateien (als Text) ein und wandelt sie in unser einheitliches
// CalendarEvent-Format um. RRULE bleibt als String erhalten (nicht
// aufgelöst) - genau wie im Python-Pendant, für kleine Git-Diffs.

import ICAL from "ical.js";

export function parseIcsToEvents(icsText) {
  const jcalData = ICAL.parse(icsText);
  const component = new ICAL.Component(jcalData);
  const vevents = component.getAllSubcomponents("vevent");

  return vevents.map((vevent, index) => {
    const event = new ICAL.Event(vevent);
    const rruleProp = vevent.getFirstProperty("rrule");
    return {
      id: event.uid || `evt-${index}`,
      title: event.summary || "Termin",
      start: event.startDate.toJSDate().toISOString(),
      end: event.endDate.toJSDate().toISOString(),
      rrule: rruleProp ? rruleProp.getFirstValue().toString() : null,
    };
  });
}
