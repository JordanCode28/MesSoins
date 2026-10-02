import { todayKey } from "./dateUtils";
import colors from "../constants/colors";

const SEED_MEDS = [
  {
    id: "m1",
    name: "Amoxicilline",
    dosage: "500 mg",
    times: ["08:00", "14:00", "20:00"],
    startDate: todayKey(),
    durationDays: 7,
    notes: "À prendre avec un grand verre d'eau, pendant ou après le repas.",
    color: colors.sage,
  },
  {
    id: "m2",
    name: "Vitamine D",
    dosage: "1 comprimé",
    times: ["08:00"],
    startDate: todayKey(),
    durationDays: 30,
    notes: "Le matin, avec le petit-déjeuner.",
    color: colors.coral,
  },
];

export function loadData() {
  try {
    const rawMeds = localStorage.getItem("mesSoins_meds");
    const rawLog  = localStorage.getItem("mesSoins_log");
    return {
      meds: rawMeds ? JSON.parse(rawMeds) : SEED_MEDS,
      log:  rawLog  ? JSON.parse(rawLog)  : {},
    };
  } catch {
    return { meds: SEED_MEDS, log: {} };
  }
}

export function saveMeds(meds) {
  try {
    localStorage.setItem("mesSoins_meds", JSON.stringify(meds));
  } catch (e) {
    console.error("Erreur de sauvegarde des médicaments", e);
  }
}

export function saveLog(log) {
  try {
    localStorage.setItem("mesSoins_log", JSON.stringify(log));
  } catch (e) {
    console.error("Erreur de sauvegarde du suivi", e);
  }
}
