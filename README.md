# Expense Sharing App 💸

Une application web dont **l’objectif principal est de gérer efficacement un budget personnel ou partagé**.  
En bonus, elle permettras de collaborer avec d’autres utilisateurs pour suivre les dépenses communes (colocataires, couples, amis).

---

## 🚀 Objectif du projet

- **Gestion de budget** : suivre les dépenses, catégoriser, équilibrer les comptes.  
- **Fonctionnalités collaboratives** : partager un budget ou des dépenses avec d’autres utilisateurs.  
- Calcul automatique des dettes et soldes entre utilisateurs si plusieurs personnes participent.  
- Interface frontend et API backend robustes et sécurisées.  
- Authentification complète avec JWT pour sécuriser les routes.  
- Export des données (CSV/PDF) et visualisation avec des graphiques.

---

## 🛠️ Tech Stack

- **Backend :** Node.js, Express  
- **Base de données :** PostgreSQL  
- **Sécurité :** JWT, bcrypt  
- **Frontend :** (à venir) React ou autre framework JS  
- **Tests :** unitaires et d’intégration  
- **Documentation :** Swagger  
- **Sans ORM** : SQL pur avec postgres  

---

## 🔧 Fonctionnalités prévues

### Gestion de budget 
- Créer, modifier et supprimer ses propres dépenses
- Catégoriser les dépenses (loyer, courses, loisirs…)  
- Visualiser les soldes et le budget restant  
- Export PDF/CSV  
- Graphiques par catégorie ou par utilisateur

### Fonctionnalités collaboratives 
- Créer des groupes d’utilisateurs (colocs, couples…)  
- Partager des dépenses entre membres  
- Calcul automatique des dettes et équilibrage des comptes  

### Authentification & sécurité
- Register / Login avec validation et hash des mots de passe  
- JWT pour sécuriser les routes  
- Middleware pour protéger les endpoints

### Bonus techniques
- Tests unitaires backend 
- Documentation API via Swagger  
- Frontend simple et réactif  

---

## 🗂️ Structure du projet

```text
expense-sharing-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── db/
│   │   └── utils/
│   ├── migrations/
│   ├── tests/
│   ├── .env.example
│   └── package.json
├── frontend/
├── docs/
└── README.md

```

## 🧱 Base de données (modélisation)

Le projet repose sur une base de données relationnelle PostgreSQL conçue pour gérer des dépenses personnelles et collaboratives.

### Tables principales

####  Users
Stocke les utilisateurs de l’application.

- `id` : identifiant unique  
- `username` : nom d’utilisateur  
- `email` : email unique  
- `password` : mot de passe hashé  
- `created_at` : date de création  

---

####  Groups
Représente un groupe de dépenses (colocation, couple, etc.).

- `id`  
- `name`  
- `created_by` → référence vers `users.id`  
- `created_at`  

---

####  Memberships
Table de liaison entre utilisateurs et groupes.

- `id`  
- `user_id` → référence vers `users.id`  
- `group_id` → référence vers `groups.id`  
- `role` (member, admin)  
- `created_at`  

 Un utilisateur peut appartenir à plusieurs groupes.

---

####  Expenses
Représente une dépense dans un groupe.

- `id`  
- `group_id` → référence vers `groups.id`  
- `paid_by` → référence vers `users.id`  
- `amount`  
- `description`  
- `created_at`  

---

####  Expense Splits
Permet de répartir une dépense entre plusieurs utilisateurs.

- `id`  
- `expense_id` → référence vers `expenses.id`  
- `user_id` → référence vers `users.id`  
- `amount`  

 Permet de calculer précisément qui doit combien à qui.

---

###  Relations clés

- Un **user** peut appartenir à plusieurs **groups**
- Un **group** contient plusieurs **expenses**
- Une **expense** est payée par un user
- Une **expense** est répartie via plusieurs **expense_splits**

---
