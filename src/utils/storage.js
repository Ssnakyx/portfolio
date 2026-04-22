// Gestion du stockage des projets en localStorage

const PROJECTS_STORAGE_KEY = "portfolio_projects"

// Projets par défaut (initial) - Synchronisés avec content.js
const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Projet Forum",
    subtitle: "Forum Montagne",
    category: "DÉVELOPPEMENT",
    year: "2023",
    description:
      "Un forum collaboratif pour les passionnés de montagne avec partage de photos, cartes interactives et avis d'utilisateurs.",
    technologies: ["HTML", "CSS", "Go", "Collaboration"],
    url: "https://github.com/B1-Info-23-24/projet-forum-erwan-lucas-hamed-tom",
    details: {
      longDescription:
        "Forum collaboratif conçu pour les passionnés de montagne. Partage de photos, cartes interactives et avis d'utilisateurs.",
      date: "Octobre 2023 - Décembre 2023",
      role: "Développeur full-stack",
      challenges: "Intégration des cartes interactives et gestion des uploads de photos.",
      solutions: "Go pour le backend et mise en place d'un système de cache.",
      status: "Terminé",
    },
  },
  {
    id: 2,
    title: "Hackathon B2",
    subtitle: "Hackathon Campus",
    category: "DÉVELOPPEMENT",
    year: "2023",
    description:
      "Projet développé lors d'un hackathon de 48h, démontrant un développement rapide et innovant en équipe.",
    technologies: ["Innovation", "Agile", "Équipe"],
    url: "https://github.com/Tokennn/Hackaton-B2",
    details: {
      longDescription:
        "Projet développé dans le cadre d'un hackathon de 48 heures pour améliorer la vie étudiante sur le campus.",
      date: "Mars 2023",
      role: "Développeur principal et chef d'équipe",
      challenges: "Délai extrêmement court et technologies nouvelles pour certains membres.",
      solutions: "Approche agile simplifiée avec répartition efficace des tâches.",
      status: "Terminé",
    },
  },
  {
    id: 3,
    title: "HangMan Web",
    subtitle: "Jeu du Pendu",
    category: "DÉVELOPPEMENT",
    year: "2023",
    description:
      "Version web du jeu du Pendu avec interface responsive, accessible depuis n'importe quel navigateur.",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/Ssnakyx/HangMan_Web",
    details: {
      longDescription:
        "Version web du jeu du Pendu accessible à tous via un navigateur, avec stockage local des scores.",
      date: "Mars 2023 - Avril 2023",
      role: "Développeur web principal",
      challenges: "Adapter le jeu pour les appareils mobiles et les interactions tactiles.",
      solutions: "Design responsive et stockage local pour les scores.",
      status: "Terminé",
    },
  },
  {
    id: 4,
    title: "PokeHamed",
    subtitle: "App Pokémon",
    category: "DÉVELOPPEMENT",
    year: "2022",
    description:
      "Application Pokémon complète avec Pokédex, simulateur de combat et système de gestion de collection.",
    technologies: ["Java", "API", "Base de données"],
    url: "https://github.com/Ssnakyx/PokeHamed",
    details: {
      longDescription:
        "Application complète sur le thème de Pokémon avec Pokédex, simulateur de combat et gestion de collection.",
      date: "Septembre 2022 - Décembre 2022",
      role: "Développeur principal",
      challenges: "Reproduire les mécaniques de combat et gérer une grande quantité de données.",
      solutions: "Utilisation de PokéAPI avec cache local et moteur de règles personnalisé.",
      status: "Terminé",
    },
  },
  {
    id: 5,
    title: "MC Server",
    subtitle: "Serveur Minecraft",
    category: "SYSTÈMES",
    year: "2022",
    description:
      "Serveur Minecraft personnalisé avec plugins custom et outils de configuration avancés.",
    technologies: ["Java", "Réseaux", "Plugins"],
    url: "https://github.com/Ssnakyx/MinecraftServer",
    details: {
      longDescription:
        "Suite d'outils et de plugins personnalisés pour améliorer l'expérience de jeu sur serveurs Minecraft.",
      date: "Juin 2022 - Présent",
      role: "Développeur de plugins et administrateur serveur",
      challenges: "Optimiser les performances tout en ajoutant des fonctionnalités.",
      solutions: "Mise en cache, traitement asynchrone et système modulaire.",
      status: "En cours",
    },
  },
]

export const storageService = {
  // Récupère tous les projets
  getProjects() {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY)
      if (!stored) {
        // Première utilisation : initialiser avec projets par défaut
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS))
        return DEFAULT_PROJECTS
      }
      return JSON.parse(stored)
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error)
      return DEFAULT_PROJECTS
    }
  },

  // Ajoute un nouveau projet
  addProject(project) {
    const projects = this.getProjects()
    const newProject = {
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      ...project
    }
    projects.push(newProject)
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects))
    return newProject
  },

  // Met à jour un projet
  updateProject(id, updatedProject) {
    const projects = this.getProjects()
    const index = projects.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error(`Projet avec l'ID ${id} non trouvé`)
    }
    projects[index] = { ...projects[index], ...updatedProject, id }
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects))
    return projects[index]
  },

  // Récupère un projet par ID
  getProject(id) {
    const projects = this.getProjects()
    return projects.find(p => p.id === id)
  },

  // Supprime un projet
  deleteProject(id) {
    const projects = this.getProjects()
    const filtered = projects.filter(p => p.id !== id)
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filtered))
  },

  // Exporte les projets (pour sauvegarde)
  exportProjects() {
    const projects = this.getProjects()
    return JSON.stringify(projects, null, 2)
  },

  // Importe les projets (depuis sauvegarde)
  importProjects(jsonString) {
    try {
      const projects = JSON.parse(jsonString)
      if (!Array.isArray(projects)) {
        throw new Error("Format invalide")
      }
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Réinitialise aux projets par défaut
  resetToDefault() {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS))
  }
}
