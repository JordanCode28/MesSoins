import { Bell } from "lucide-react";
import DoseRow from "../components/DoseRow";
import EmptyState from "../components/EmptyState";
import styles from "../styles/styles";

export default function TodayView({
  meds, doses, log, today,
  takenCount, toggleDose,
  notifPermission, notifEnabled, onEnableNotif,
}) {
  const total = doses.length;
  const pct   = total > 0 ? Math.round((takenCount / total) * 100) : 0;

  const medById = (id) => meds.find((m) => m.id === id);

  return (
    <div>
      {/* Progress card */}
      <div style={styles.progressCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div style={styles.progressLabel}>Prises du jour</div>
            <div style={styles.progressNumbers}>
              {takenCount}
              <span style={{ color: "#8C8378", fontSize: 20 }}> / {total}</span>
            </div>
          </div>
          <div style={styles.progressRing(pct)}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#4F6B58" }}>{pct}%</span>
          </div>
        </div>
        {total === 0 && (
          <p style={{ marginTop: 12, color: "#8C8378", fontSize: 14 }}>
            Aucun médicament prévu aujourd'hui. Profitez de cette journée tranquille.
          </p>
        )}
      </div>

      {/* Notification bannieres */}
      {!notifEnabled && notifPermission !== "denied" && total > 0 && (
        <button onClick={onEnableNotif} style={styles.notifBanner}>
          <Bell size={16} />
          <span>Activer les rappels pour ne plus oublier une prise</span>
        </button>
      )}
      {notifPermission === "denied" && (
        <div style={styles.notifBannerDenied}>
          Les notifications sont bloquées dans ce navigateur. Autorisez-les dans les réglages du site.
        </div>
      )}

      {/* Dose list */}
      <div style={{ marginTop: 24 }}>
        {doses.length === 0 ? (
          <EmptyState
            title="Rien à prendre aujourd'hui"
            text="Ajoutez un traitement dans l'onglet « Traitements » pour commencer le suivi."
          />
        ) : (
          doses.map((dose) => {
            const med   = medById(dose.medId);
            if (!med) return null;
            const taken = !!log[`${today}__${dose.medId}__${dose.time}`];
            return (
              <DoseRow
                key={dose.key}
                med={med}
                time={dose.time}
                taken={taken}
                onToggle={() => toggleDose(today, dose.medId, dose.time)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
