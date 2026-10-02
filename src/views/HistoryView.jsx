import { ChevronLeft, ChevronRight } from "lucide-react";
import LegendItem from "../components/LegendItem";
import styles from "../styles/styles";
import colors from "../constants/colors";
import { todayKey, MONTH_LABELS, WEEKDAY_LABELS, dosesForDate } from "../utils/dateUtils";

export default function HistoryView({ meds, log, month, setMonth }) {
  const year        = month.getFullYear();
  const m           = month.getMonth();
  const firstDay    = new Date(year, m, 1);
  const lastDay     = new Date(year, m + 1, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth  = lastDay.getDate();

  const goPrev = () => setMonth(new Date(year, m - 1, 1));
  const goNext = () => setMonth(new Date(year, m + 1, 1));

  const getDayStatus = (day) => {
    const dateStr = `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const doses   = dosesForDate(meds, dateStr);
    if (doses.length === 0) return null;
    const taken   = doses.filter((d) => log[`${dateStr}__${d.medId}__${d.time}`]).length;
    if (taken === 0)             return "none";
    if (taken === doses.length)  return "all";
    return "partial";
  };

  const isFuture = (day) => {
    const dateStr = `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return dateStr > todayKey();
  };

  const getCellColors = (day) => {
    const status = getDayStatus(day);
    const future = isFuture(day);
    if (future || !status) return { bg: "transparent", text: colors.ink };
    if (status === "all")     return { bg: colors.sage,  text: colors.cream };
    if (status === "partial") return { bg: colors.coral, text: colors.cream };
    return { bg: colors.line, text: colors.ink };
  };

  const cells = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <h2 style={styles.sectionTitle}>Suivi de l'observance</h2>

      <div style={{ ...styles.calendarCard, marginTop: 16 }}>
        {/* Month navigation */}
        <div style={styles.calendarHeader}>
          <button onClick={goPrev} style={styles.iconButton} aria-label="Mois précédent">
            <ChevronLeft size={18} color={colors.sageDark} />
          </button>
          <div style={styles.calendarMonth}>
            {MONTH_LABELS[m]} {year}
          </div>
          <button onClick={goNext} style={styles.iconButton} aria-label="Mois suivant">
            <ChevronRight size={18} color={colors.sageDark} />
          </button>
        </div>

        {/* Grid */}
        <div style={styles.calendarGrid}>
          {WEEKDAY_LABELS.map((w) => (
            <div key={w} style={styles.calendarWeekday}>{w}</div>
          ))}
          {cells.map((day, idx) => {
            if (day === null) return <div key={idx} />;
            const { bg, text } = getCellColors(day);
            const isToday = `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` === todayKey();
            return (
              <div key={idx} style={styles.calendarCell(bg, text, isToday)}>
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={styles.legend}>
          <LegendItem color={colors.sage}  label="Tout pris" />
          <LegendItem color={colors.coral} label="Partiel"   />
          <LegendItem color={colors.line}  label="Rien pris" />
        </div>
      </div>
    </div>
  );
}
