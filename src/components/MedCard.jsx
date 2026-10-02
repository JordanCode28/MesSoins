import { Trash2 } from "lucide-react";
import styles from "../styles/styles";
import colors from "../constants/colors";
import { daysRemaining } from "../utils/dateUtils";

// Simple pencil SVG (lucide-react older versions may not include it)
function PencilIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke={colors.inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export default function MedCard({ med, onEdit, onDelete }) {
  const remaining = daysRemaining(med);

  const remainingLabel =
    remaining > 0  ? `${remaining} jour${remaining > 1 ? "s" : ""} restant${remaining > 1 ? "s" : ""}` :
    remaining === 0 ? "Dernier jour" :
                     "Traitement terminé";

  return (
    <div style={styles.medCard}>
      <div style={styles.medCardInner}>
        <div style={styles.medColorBar(med.color)} />

        <div style={styles.medCardContent}>
          <div style={styles.medCardRow}>
            <div>
              <div style={styles.medName}>{med.name}</div>
              <div style={styles.medDosage}>{med.dosage}</div>
            </div>
            <div style={styles.medActions}>
              <button onClick={() => onEdit(med)} style={styles.iconButton} aria-label="Modifier">
                <PencilIcon />
              </button>
              <button onClick={() => onDelete(med.id)} style={styles.iconButton} aria-label="Supprimer">
                <Trash2 size={16} color={colors.coral} />
              </button>
            </div>
          </div>

          <div style={styles.medTimes}>
            {med.times.map((t) => (
              <span key={t} style={styles.timeTag}>{t}</span>
            ))}
          </div>

          <div style={styles.medMeta}>{remainingLabel}</div>

          {med.notes && <div style={styles.medNotes}>{med.notes}</div>}
        </div>
      </div>
    </div>
  );
}
