import { useState } from "react";
import { Plus, X } from "lucide-react";
import styles from "../styles/styles";
import colors from "../constants/colors";
import { todayKey } from "../utils/dateUtils";

const COLOR_OPTIONS = [
  colors.sage,
  colors.coral,
  "#6E8FA8",
  "#B98AC4",
  "#D4A24E",
];

export default function MedFormModal({ med, onSave, onClose }) {
  const [name,         setName]         = useState(med?.name         || "");
  const [dosage,       setDosage]       = useState(med?.dosage       || "");
  const [times,        setTimes]        = useState(med?.times?.length ? med.times : ["08:00"]);
  const [startDate,    setStartDate]    = useState(med?.startDate    || todayKey());
  const [durationDays, setDurationDays] = useState(med?.durationDays || 7);
  const [notes,        setNotes]        = useState(med?.notes        || "");
  const [color,        setColor]        = useState(med?.color        || colors.sage);

  const updateTime = (idx, value) =>
    setTimes((prev) => prev.map((t, i) => (i === idx ? value : t)));

  const addTime    = () => setTimes((prev) => [...prev, "08:00"]);
  const removeTime = (idx) => setTimes((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id:          med?.id || `m_${Date.now()}`,
      name:        name.trim(),
      dosage:      dosage.trim(),
      times:       times.filter(Boolean),
      startDate,
      durationDays: Number(durationDays) || 1,
      notes:       notes.trim(),
      color,
    });
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>
            {med ? "Modifier le traitement" : "Nouveau traitement"}
          </h3>
          <button onClick={onClose} style={styles.iconButton} aria-label="Fermer">
            <X size={20} color={colors.inkSoft} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          <label style={styles.label}>
            Nom du médicament
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex. Amoxicilline"
              required
            />
          </label>

          <label style={styles.label}>
            Dosage
            <input
              style={styles.input}
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="ex. 500 mg, 1 comprimé"
            />
          </label>

          <div style={styles.label}>
            Heures de prise
            {times.map((time, idx) => (
              <div key={idx} style={styles.inputRow}>
                <input
                  type="time"
                  style={{ ...styles.input, flex: 1 }}
                  value={time}
                  onChange={(e) => updateTime(idx, e.target.value)}
                />
                {times.length > 1 && (
                  <button type="button" onClick={() => removeTime(idx)} style={styles.iconButton}>
                    <X size={16} color={colors.coral} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addTime} style={styles.addTimeButton}>
              <Plus size={14} /> Ajouter une heure
            </button>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <label style={{ ...styles.label, flex: 1 }}>
              Date de début
              <input
                type="date"
                style={styles.input}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label style={{ ...styles.label, flex: 1 }}>
              Durée (jours)
              <input
                type="number"
                min="1"
                style={styles.input}
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
              />
            </label>
          </div>

          <label style={styles.label}>
            Notes (optionnel)
            <textarea
              style={{ ...styles.input, minHeight: 70, resize: "vertical" }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ex. à prendre avec un repas"
            />
          </label>

          <div style={styles.label}>
            Couleur
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: c,
                    border: color === c ? `2px solid ${colors.ink}` : "2px solid transparent",
                    cursor: "pointer",
                  }}
                  aria-label={`Couleur ${c}`}
                />
              ))}
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            {med ? "Enregistrer les modifications" : "Ajouter le traitement"}
          </button>

        </form>
      </div>
    </div>
  );
}
