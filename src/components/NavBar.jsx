import { Clock, Pill, Calendar } from "lucide-react";
import styles from "../styles/styles";

export default function NavBar({ view, setView }) {
  return (
    <nav style={styles.nav}>
      <NavButton active={view === "today"}   onClick={() => setView("today")}   icon={<Clock size={20} />}    label="Aujourd'hui" />
      <NavButton active={view === "meds"}    onClick={() => setView("meds")}    icon={<Pill size={20} />}     label="Traitements" />
      <NavButton active={view === "history"} onClick={() => setView("history")} icon={<Calendar size={20} />} label="Suivi" />
    </nav>
  );
}

function NavButton({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} style={styles.navButton(active)}>
      <div style={styles.navIconWrap(active)}>{icon}</div>
      <span style={{ fontSize: 12, fontWeight: active ? 600 : 400 }}>{label}</span>
    </button>
  );
}
