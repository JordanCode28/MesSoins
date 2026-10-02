export const todayKey = (d = new Date()) => {
  const y   = d.getFullYear();
  const m   = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const MONTH_LABELS = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

export const WEEKDAY_LABELS = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];

export function dateRange(startDate, durationDays) {
  const start = new Date(startDate + "T00:00:00");
  const end   = new Date(start);
  end.setDate(end.getDate() + durationDays - 1);
  return { start, end };
}

export function isActiveOn(med, dateStr) {
  const { start, end } = dateRange(med.startDate, med.durationDays);
  const d = new Date(dateStr + "T00:00:00");
  return d >= start && d <= end;
}

export function dosesForDate(meds, dateStr) {
  const doses = [];
  meds.forEach((med) => {
    if (!isActiveOn(med, dateStr)) return;
    med.times.forEach((time) => {
      doses.push({ medId: med.id, time, key: `${med.id}__${time}` });
    });
  });
  return doses.sort((a, b) => a.time.localeCompare(b.time));
}

export function daysRemaining(med) {
  const { end } = dateRange(med.startDate, med.durationDays);
  const today   = new Date(todayKey() + "T00:00:00");
  return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
}
