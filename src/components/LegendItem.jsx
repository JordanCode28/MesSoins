import styles from "../styles/styles";
import colors from "../constants/colors";

export default function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={styles.legendDot(color)} />
      <span style={{ fontSize: 12, color: colors.inkSoft }}>{label}</span>
    </div>
  );
}
