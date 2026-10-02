#  Mes Soins

Application web personnelle de suivi de traitements médicaux.  
Conçue pour aider à ne jamais oublier une prise de médicament grâce à des rappels, une checklist quotidienne et un historique visuel.

---

##  Fonctionnalités

- **Vue quotidienne** — liste des médicaments à prendre dans la journée avec les heures de prise
- **Checklist** — cocher chaque prise au fur et à mesure
- **Rappels navigateur** — notifications automatiques à l'heure prévue
- **Gestion des traitements** — ajouter, modifier et supprimer un médicament
- **Historique** — calendrier mensuel coloré pour visualiser l'observance
- **Persistance** — les données sont sauvegardées localement dans le navigateur

---

##  Stack technique

| Outil | Rôle |
|---|---|
| [React](https://react.dev) | Framework UI |
| [Vite](https://vitejs.dev) | Bundler et serveur de développement |
| [lucide-react](https://lucide.dev) | Icônes |
| [ESLint](https://eslint.org) | Linting et qualité du code |
| `localStorage` | Stockage des données côté navigateur |

---

##  Installation

### Prérequis

- [Node.js](https://nodejs.org) v18 ou supérieur
- npm v9 ou supérieur

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/JordanCode28/mes-soins.git
cd mes-soins

# 2. Installer les dépendances
npm install

# 3. Lancer en local
npm run dev
```

L'app est accessible sur [http://localhost:5173](http://localhost:5173).

---

##  Structure du projet

```
src/
├── constants/
│   └── colors.js          # Palette de couleurs
├── utils/
│   ├── dateUtils.js        # Calculs de dates et de doses
│   ├── storageUtils.js     # Lecture / écriture localStorage
│   └── notifUtils.js       # Gestion des notifications navigateur
├── components/
│   ├── Header.jsx          # En-tête avec bouton de rappels
│   ├── NavBar.jsx          # Barre de navigation
│   ├── DoseRow.jsx         # Ligne d'une prise (checklist)
│   ├── MedCard.jsx         # Carte d'un médicament
│   ├── MedFormModal.jsx    # Formulaire ajout / modification
│   ├── EmptyState.jsx      # Écran vide
│   └── LegendItem.jsx      # Légende du calendrier
├── views/
│   ├── TodayView.jsx       # Page "Aujourd'hui"
│   ├── MedsView.jsx        # Page "Traitements"
│   └── HistoryView.jsx     # Page "Suivi"
├── styles/
│   └── styles.js           # Tous les styles inline centralisés
├── App.jsx                 # Composant racine et logique principale
└── main.jsx                # Point d'entrée Vite
```

---

##  Déploiement

Le projet est déployable gratuitement sur [Vercel](https://vercel.com).

```bash
# Build de production
npm run build
```

Ensuite, connecte ton dépôt GitHub à Vercel — il détecte automatiquement Vite et configure le déploiement.

---

##  Scripts disponibles

```bash
npm run dev      # Lance le serveur de développement
npm run build    # Génère le build de production dans dist/
npm run preview  # Prévisualise le build en local
npm run lint     # Vérifie la qualité du code avec ESLint
```

---

##  Notes

- Les données sont stockées uniquement dans le navigateur (`localStorage`). Changer de navigateur ou d'appareil ne transfère pas les données.
- Les notifications nécessitent une autorisation explicite de l'utilisateur.

---

*Projet personnel — développé avec Coeur*