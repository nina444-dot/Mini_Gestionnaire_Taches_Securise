# 🐉 Gestionnaire de Tâches Fullstack (React + Node + MySQL)

### 🔐 Authentification & Sécurité
* **Inscription & Connexion** : Système complet de gestion d'utilisateurs.
* **Sécurité JWT** : Utilisation de JSON Web Tokens pour protéger les routes du backend.

### 📋 Gestion des Tâches (CRUD)
* **Affichage Dynamique** : Récupération automatique des tâches de l'utilisateur au chargement.
* **Ajout en temps réel** : Création de tâches avec enregistrement immédiat en base de données.
* **Suppression Permanente** : Retrait définitif des tâches via des requêtes API `DELETE`.
* **Filtrage** : Tri des tâches par statut (Toutes, Terminées, À faire).

## 🛠️ Stack Technique

* **Frontend** : React.js (Vite), Axios
* **Backend** : Node.js
* **Base de données** : MySQL
* **API** : Avec protection par Middleware.

### Installation du Backend
* Ouvrez un terminal dans le dossier `backend/`.
* Installez les dépendances : `npm install`
* Lancez le serveur : `npm run dev`
Le serveur tourne par défaut sur le port **5000**.

### Installation du Frontend (Client)
* Ouvrez un nouveau terminal dans le dossier `client/`.
* Installez les dépendances : `npm install`
L'application sera accessible sur **http://localhost:5173**.
