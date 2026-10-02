import { Pill } from "lucide-react";
import styles from "../styles/styles";
import colors from "../constants/colors";

export default function EmptyState({ title, text }) {
  return (
    <div style={styles.emptyState}>
      <Pill size={32} color={colors.sage} style={{ opacity: 0.5 }} />
      <div style={styles.emptyTitle}>{title}</div>
      <div style={styles.emptyText}>{text}</div>
    </div>
  );
}
