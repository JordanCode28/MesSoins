import { Pill, Bell, BellOff } from "lucide-react";
import styles from "../styles/styles";
import colors from "../constants/colors";

export default function Header({ notifEnabled, onToggleNotif }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>

        <div style={styles.brand}>
          <div style={styles.brandMark}>
            <Pill size={20} color={colors.cream} />
          </div>
          <div>
            <div style={styles.brandTitle}>Mes Soins</div>
            <div style={styles.brandSubtitle}>
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </div>
          </div>
        </div>

        <button
          onClick={onToggleNotif}
          style={styles.notifButton(notifEnabled)}
          aria-label={notifEnabled ? "Désactiver les rappels" : "Activer les rappels"}
        >
          {notifEnabled ? <Bell size={18} /> : <BellOff size={18} />}
          <span>{notifEnabled ? "Rappels actifs" : "Activer les rappels"}</span>
        </button>

      </div>
    </header>
  );
}
