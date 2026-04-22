// Configuration du panel admin

export const adminConfig = {
  // Titre du panel
  panelTitle: "Panel Administrateur",
  
  // Durée de la session en millisecondes (24h)
  sessionExpiryTime: 24 * 60 * 60 * 1000,
  
  // Messages
  messages: {
    unauthorized: "Non autorisé. Veuillez vous connecter.",
    wrongPassword: "Mot de passe incorrect.",
    projectAdded: "✅ Projet ajouté avec succès!",
    projectUpdated: "✅ Projet mis à jour avec succès!",
    projectDeleted: "✅ Projet supprimé",
    projectDeleteConfirm: "Êtes-vous sûr de vouloir supprimer ce projet?",
    importSuccess: "✅ Sauvegarde importée avec succès!",
    importError: "❌ Erreur d'importation:",
    resetConfirm: "⚠️ Êtes-vous VRAIMENT sûr? Cela réinitialisera tous les projets.",
    resetSuccess: "✅ Réinitialisé aux projets par défaut",
  },
  
  // Catégories de projets suggestions
  categories: [
    "DÉVELOPPEMENT",
    "DESIGN",
    "JEUX",
    "SYSTÈMES",
    "AUTRE"
  ],
  
  // Statuts de projets
  statuses: [
    "Terminé",
    "En cours",
    "En pause",
    "Abandonné"
  ]
}
