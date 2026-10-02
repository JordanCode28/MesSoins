import { Check } from "lucide-react";
import styles from "../styles/styles";
import colors from "../constants/colors";

export default function DoseRow({ med, time, taken, onToggle }) {
  return (
    <div style={styles.doseRow(taken)}>
      <div style={styles.doseDot(med.color)} />

      <div style={{ flex: 1 }}>
        <div style={styles.doseTime}>{time}</div>
        <div style={styles.doseName}>{med.name}</div>
        <div style={styles.doseDosage}>{med.dosage}</div>
      </div>

      <button
        onClick={onToggle}
        style={styles.checkButton(taken)}
        aria-label={taken ? "Marquer comme non pris" : "Marquer comme pris"}
      >
        <Check size={20} color={taken ? colors.cream : colors.line} />
      </button>
    </div>
  );
}
