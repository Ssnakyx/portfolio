// Gestion simple de l'authentification admin
// ⚠️ IMPORTANT: En production, utiliser une vraie authentification côté serveur!

// Récupérer le mot de passe depuis les variables d'environnement (fichier .env)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123"
const SESSION_DURATION = parseInt(import.meta.env.VITE_SESSION_DURATION || "24", 10)
const ADMIN_TOKEN_KEY = "admin_token"
const TOKEN_EXPIRY = SESSION_DURATION * 60 * 60 * 1000 // Convertir les heures en ms

export const authService = {
  // Vérifie si l'utilisateur est connecté
  isAuthenticated() {
    const token = sessionStorage.getItem(ADMIN_TOKEN_KEY)
    if (!token) return false
    
    const { timestamp } = JSON.parse(token)
    const now = Date.now()
    
    if (now - timestamp > TOKEN_EXPIRY) {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY)
      return false
    }
    
    return true
  },

  // Connexion admin
  login(password) {
    if (password !== ADMIN_PASSWORD) {
      return { success: false, error: "Mot de passe incorrect" }
    }
    
    const token = {
      authenticated: true,
      timestamp: Date.now(),
      hash: Math.random().toString(36).substr(2, 9)
    }
    
    sessionStorage.setItem(ADMIN_TOKEN_KEY, JSON.stringify(token))
    return { success: true }
  },

  // Déconnexion
  logout() {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
  }
}
