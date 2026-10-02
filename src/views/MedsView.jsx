import { Plus } from "lucide-react";
import MedCard from "../components/MedCard";
import EmptyState from "../components/EmptyState";
import styles from "../styles/styles";

export default function MedsView({ meds, onAdd, onEdit, onDelete }) {
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Traitements</h2>
        <button onClick={onAdd} style={styles.addButton}>
          <Plus size={18} />
          <span>Ajouter</span>
        </button>
      </div>

      {meds.length === 0 ? (
        <EmptyState
          title="Aucun traitement enregistré"
          text="Ajoutez votre premier médicament pour démarrer les rappels."
        />
      ) : (
        meds.map((med) => (
          <MedCard
            key={med.id}
            med={med}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
