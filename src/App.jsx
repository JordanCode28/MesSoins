import { useState, useEffect, useMemo } from "react";
import { Pill } from "lucide-react";

import Header        from "./components/Header";
import NavBar        from "./components/NavBar";
import MedFormModal  from "./components/MedFormModal";
import TodayView     from "./views/TodayView";
import MedsView      from "./views/MedsView";
import HistoryView   from "./views/HistoryView";

import { loadData, saveMeds, saveLog } from "./utils/storageUtils";
import { requestNotificationPermission, showNotification, getNotifPermission } from "./utils/notifUtils";
import { todayKey, dosesForDate, isActiveOn } from "./utils/dateUtils";
import styles  from "./styles/styles";
import colors  from "./constants/colors";

export default function App() {
  
  const [meds,   setMeds]   = useState(() => loadData().meds);
  const [log,    setLog]    = useState(() => loadData().log);
  const [loaded] = useState(true);
  const [view,        setView]        = useState("today");
  const [showForm,    setShowForm]    = useState(false);
  const [editingMed,  setEditingMed]  = useState(null);
  const [notifPerm,   setNotifPerm]   = useState(getNotifPermission());
  const [notifEnabled,setNotifEnabled]= useState(false);
  const [historyMonth,setHistoryMonth]= useState(new Date());

  // ── Load from localStorage on mount ──
 // useEffect(() => {
  //  const { meds: m, log: l } = loadData();
   // setMeds(m);
  //  setLog(l);
  //  setLoaded(true);
 // }, []); 

  // ── Sauvegarder les données dès qu'elles sont modifiées ────
  useEffect(() => { if (loaded) saveMeds(meds); }, [meds, loaded]);
  useEffect(() => { if (loaded) saveLog(log);   }, [log,  loaded]);

  // ── Vérificateur de notifications (toutes les 30 secondes) ───
  useEffect(() => {
    if (!notifEnabled) return;
    const interval = setInterval(() => {
      const now         = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const today       = todayKey();
      meds.forEach((med) => {
        if (!isActiveOn(med, today)) return;
        med.times.forEach((time) => {
          if (time === currentTime && !log[`${today}__${med.id}__${time}`]) {
            showNotification("💊 C'est l'heure du traitement", `${med.name} — ${med.dosage}`);
          }
        });
      });
    }, 30_000);
    return () => clearInterval(interval);
  }, [notifEnabled, meds, log]);

  // ── Gestionnaires ───
  const handleToggleNotif = async () => {
    if (notifEnabled) {
      setNotifEnabled(false);
      return;
    }
    const perm = await requestNotificationPermission();
    setNotifPerm(perm);
    if (perm === "granted") {
      setNotifEnabled(true);
      showNotification("Rappels activés", "Vous recevrez une notification à chaque prise prévue.");
    }
  };

  const toggleDose = (dateStr, medId, time) => {
    const key = `${dateStr}__${medId}__${time}`;
    setLog((prev) => {
      const next = { ...prev };
      next[key] ? delete next[key] : (next[key] = { takenAt: new Date().toISOString() });
      return next;
    });
  };

  const addOrUpdateMed = (med) => {
    setMeds((prev) =>
      editingMed ? prev.map((m) => (m.id === med.id ? med : m)) : [...prev, med]
    );
    setShowForm(false);
    setEditingMed(null);
  };

  const deleteMed = (id) => setMeds((prev) => prev.filter((m) => m.id !== id));

  const openAdd  = ()    => { setEditingMed(null); setShowForm(true); };
  const openEdit = (med) => { setEditingMed(med);  setShowForm(true); };

  // ── Données dérivées ───
  const today      = todayKey();
  const todayDoses = useMemo(() => dosesForDate(meds, today), [meds, today]);
  const takenCount = todayDoses.filter((d) => log[`${today}__${d.medId}__${d.time}`]).length;

  // ── Écran de chargement ───
  if (!loaded) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingPill}>
          <Pill size={28} color={colors.sage} />
        </div>
        <p style={{ color: colors.inkSoft, marginTop: 16, fontFamily: "Inter, sans-serif" }}>
          Chargement…
        </p>
      </div>
    );
  }

  // ── Le Rendu ───
  return (
    <div style={styles.app}>
      <Header notifEnabled={notifEnabled} onToggleNotif={handleToggleNotif} />

      <main style={styles.main}>
        {view === "today" && (
          <TodayView
            meds={meds}
            doses={todayDoses}
            log={log}
            today={today}
            takenCount={takenCount}
            toggleDose={toggleDose}
            notifPermission={notifPerm}
            notifEnabled={notifEnabled}
            onEnableNotif={handleToggleNotif}
          />
        )}
        {view === "meds" && (
          <MedsView
            meds={meds}
            onAdd={openAdd}
            onEdit={openEdit}
            onDelete={deleteMed}
          />
        )}
        {view === "history" && (
          <HistoryView
            meds={meds}
            log={log}
            month={historyMonth}
            setMonth={setHistoryMonth}
          />
        )}
      </main>

      <NavBar view={view} setView={setView} />

      {showForm && (
        <MedFormModal
          med={editingMed}
          onSave={addOrUpdateMed}
          onClose={() => { setShowForm(false); setEditingMed(null); }}
        />
      )}
    </div>
  );
}
