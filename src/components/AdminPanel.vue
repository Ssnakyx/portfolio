<template>
  <div class="admin-wrapper">
    <!-- Mode connecté -->
    <div v-if="isAuthenticated" class="admin-panel">
      <div class="admin-header">
        <div class="admin-title">
          <h1>🔐 Panel Administrateur</h1>
          <p>Gestion des projets du portfolio</p>
        </div>
        <button @click="logout" class="btn-logout">Se déconnecter</button>
      </div>

      <!-- Tabs -->
      <div class="admin-tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="{ active: activeTab === tab }"
          class="tab-button"
        >
          {{ tab === "list" ? "📋 Projets" : "➕ Nouveau" }}
        </button>
      </div>

      <!-- Contenu Tabs -->
      <div class="admin-content">
        <!-- Liste des projets -->
        <div v-if="activeTab === 'list'" class="projects-list">
          <div v-if="projects.length === 0" class="empty-state">
            Aucun projet pour le moment.
          </div>

          <div v-for="project in projects" :key="project.id" class="project-card">
            <div class="project-header">
              <div>
                <h3>{{ project.title }}</h3>
                <p class="project-subtitle">{{ project.subtitle }}</p>
              </div>
              <div class="project-actions">
                <button @click="editProject(project)" class="btn-edit" title="Modifier">✏️</button>
                <button @click="deleteProject(project.id)" class="btn-delete" title="Supprimer">🗑️</button>
              </div>
            </div>
            <div class="project-meta">
              <span class="badge category">{{ project.category }}</span>
              <span class="badge year">{{ project.year }}</span>
              <span v-if="project.url" class="badge">
                <a :href="project.url" target="_blank">GitHub</a>
              </span>
            </div>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-techs">
              <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Formulaire Add/Edit -->
        <div v-if="activeTab === 'create'" class="form-section">
          <h2>{{ isEditing ? `Modifier: ${formData.title}` : "Ajouter un nouveau projet" }}</h2>

          <div class="form-group">
            <label>Titre du projet *</label>
            <input v-model="formData.title" type="text" placeholder="Ex: Projet Forum" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Sous-titre *</label>
              <input v-model="formData.subtitle" type="text" placeholder="Ex: Forum Montagne" />
            </div>
            <div class="form-group">
              <label>Année *</label>
              <input v-model="formData.year" type="text" placeholder="2024" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Catégorie *</label>
              <input v-model="formData.category" type="text" placeholder="Ex: DÉVELOPPEMENT" />
            </div>
            <div class="form-group">
              <label>URL (GitHub) *</label>
              <input v-model="formData.url" type="url" placeholder="https://github.com/..." />
            </div>
          </div>

          <div class="form-group">
            <label>Description courte *</label>
            <textarea v-model="formData.description" placeholder="Description visible dans la liste" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Technologies (séparées par des virgules) *</label>
            <input
              v-model="formData.technologiesInput"
              type="text"
              placeholder="HTML, CSS, JavaScript, Vue.js"
            />
          </div>

          <div class="form-section-nested">
            <h3>📝 Détails du projet</h3>

            <div class="form-group">
              <label>Description longue</label>
              <textarea v-model="formData.details.longDescription" rows="4"></textarea>
            </div>

            <div class="form-group">
              <label>Période de développement</label>
              <input v-model="formData.details.date" type="text" placeholder="Ex: Janvier 2024 - Février 2024" />
            </div>

            <div class="form-group">
              <label>Mon rôle</label>
              <input v-model="formData.details.role" type="text" placeholder="Ex: Développeur full-stack" />
            </div>

            <div class="form-group">
              <label>Défis rencontrés</label>
              <textarea v-model="formData.details.challenges" rows="2"></textarea>
            </div>

            <div class="form-group">
              <label>Solutions apportées</label>
              <textarea v-model="formData.details.solutions" rows="2"></textarea>
            </div>

            <div class="form-group">
              <label>Statut</label>
              <select v-model="formData.details.status">
                <option>Terminé</option>
                <option>En cours</option>
                <option>En pause</option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button @click="resetForm" class="btn-secondary">Réinitialiser</button>
            <button @click="saveProject" class="btn-primary">{{ isEditing ? "Mettre à jour" : "Ajouter le projet" }}</button>
          </div>
        </div>
      </div>

      <!-- Section Données -->
      <div class="admin-data-section">
        <h3>💾 Gestion des données</h3>
        <div class="data-actions">
          <button @click="downloadBackup" class="btn-secondary">📥 Télécharger sauvegarde</button>
          <button @click="triggerImport" class="btn-secondary">📤 Importer sauvegarde</button>
          <button @click="resetAll" class="btn-danger">⚠️ Réinitialiser</button>
          <input
            ref="importInput"
            type="file"
            accept=".json"
            style="display: none"
            @change="handleFileImport"
          />
        </div>
      </div>
    </div>

    <!-- Mode déconnecté (Connexion) -->
    <div v-else class="admin-login">
      <div class="login-box">
        <h1>🔐 Admin Panel</h1>
        <p>Connectez-vous pour gérer vos projets</p>

        <div class="form-group">
          <label>Mot de passe admin</label>
          <input
            v-model="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            @keyup.enter="handleLogin"
          />
        </div>

        <div v-if="loginError" class="error-message">{{ loginError }}</div>

        <button @click="handleLogin" class="btn-primary">Se connecter</button>

        <button @click="goBack" class="btn-secondary">← Retour au portfolio</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { authService } from "../utils/auth"
import { storageService } from "../utils/storage"

const isAuthenticated = ref(false)
const password = ref("")
const loginError = ref("")
const activeTab = ref("list")
const tabs = ["list", "create"]

const projects = ref([])
const isEditing = ref(false)
const editingId = ref(null)

const importInput = ref(null)

const formData = ref({
  title: "",
  subtitle: "",
  category: "DÉVELOPPEMENT",
  year: new Date().getFullYear().toString(),
  description: "",
  technologies: [],
  technologiesInput: "",
  url: "",
  details: {
    longDescription: "",
    date: "",
    role: "",
    challenges: "",
    solutions: "",
    status: "Terminé",
  },
})

onMounted(() => {
  isAuthenticated.value = authService.isAuthenticated()
  if (isAuthenticated.value) {
    loadProjects()
  }
})

const handleLogin = () => {
  loginError.value = ""
  const result = authService.login(password.value)
  if (result.success) {
    isAuthenticated.value = true
    password.value = ""
    loadProjects()
  } else {
    loginError.value = result.error
  }
}

const logout = () => {
  authService.logout()
  isAuthenticated.value = false
  resetForm()
}

const goBack = () => {
  window.location.href = "/#"
}

const loadProjects = () => {
  projects.value = storageService.getProjects()
  resetForm()
}

const resetForm = () => {
  formData.value = {
    title: "",
    subtitle: "",
    category: "DÉVELOPPEMENT",
    year: new Date().getFullYear().toString(),
    description: "",
    technologies: [],
    technologiesInput: "",
    url: "",
    details: {
      longDescription: "",
      date: "",
      role: "",
      challenges: "",
      solutions: "",
      status: "Terminé",
    },
  }
  isEditing.value = false
  editingId.value = null
}

const editProject = (project) => {
  formData.value = {
    title: project.title,
    subtitle: project.subtitle,
    category: project.category,
    year: project.year,
    description: project.description,
    technologies: project.technologies,
    technologiesInput: project.technologies.join(", "),
    url: project.url,
    details: { ...project.details },
  }
  isEditing.value = true
  editingId.value = project.id
  activeTab.value = "create"
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const saveProject = () => {
  // Validation
  if (!formData.value.title || !formData.value.subtitle || !formData.value.category) {
    alert("Veuillez remplir tous les champs obligatoires (*)")
    return
  }

  const technologiesArray = formData.value.technologiesInput
    .split(",")
    .map(t => t.trim())
    .filter(t => t)

  const projectData = {
    title: formData.value.title,
    subtitle: formData.value.subtitle,
    category: formData.value.category,
    year: formData.value.year,
    description: formData.value.description,
    technologies: technologiesArray,
    url: formData.value.url,
    details: formData.value.details,
  }

  try {
    if (isEditing.value) {
      storageService.updateProject(editingId.value, projectData)
      alert("✅ Projet mis à jour avec succès!")
    } else {
      storageService.addProject(projectData)
      alert("✅ Projet ajouté avec succès!")
    }
    loadProjects()
    activeTab.value = "list"
  } catch (error) {
    alert("❌ Erreur: " + error.message)
  }
}

const deleteProject = (id) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) {
    storageService.deleteProject(id)
    loadProjects()
    alert("✅ Projet supprimé")
  }
}

const downloadBackup = () => {
  const data = storageService.exportProjects()
  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `portfolio-backup-${new Date().getTime()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const triggerImport = () => {
  importInput.value?.click()
}

const handleFileImport = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result
    const result = storageService.importProjects(content)
    if (result.success) {
      alert("✅ Sauvegarde importée avec succès!")
      loadProjects()
    } else {
      alert("❌ Erreur d'importation: " + result.error)
    }
  }
  reader.readAsText(file)
  importInput.value.value = ""
}

const resetAll = () => {
  if (confirm("⚠️ Êtes-vous VRAIMENT sûr? Cela réinitialisera tous les projets.")) {
    storageService.resetToDefault()
    loadProjects()
    alert("✅ Réinitialisé aux projets par défaut")
  }
}
</script>

<style scoped>
.admin-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
}

.admin-panel {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(100, 200, 255, 0.3);
}

.admin-title h1 {
  color: #64c8ff;
  font-size: 28px;
  margin: 0 0 5px 0;
}

.admin-title p {
  color: #999;
  margin: 0;
  font-size: 14px;
}

.btn-logout {
  padding: 10px 20px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-logout:hover {
  transform: translateY(-2px);
}

.admin-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.tab-button {
  padding: 12px 20px;
  background: rgba(100, 200, 255, 0.1);
  color: #64c8ff;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.tab-button:hover {
  background: rgba(100, 200, 255, 0.2);
}

.tab-button.active {
  background: rgba(100, 200, 255, 0.3);
  border-color: #64c8ff;
}

.admin-content {
  background: rgba(20, 20, 35, 0.6);
  border: 1px solid rgba(100, 200, 255, 0.2);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
}

.projects-list {
  display: grid;
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(100, 200, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s;
}

.project-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(100, 200, 255, 0.3);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.project-header h3 {
  color: #64c8ff;
  margin: 0 0 5px 0;
  font-size: 18px;
}

.project-subtitle {
  color: #999;
  margin: 0;
  font-size: 14px;
}

.project-actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid rgba(100, 200, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: rgba(100, 200, 255, 0.2);
  border-color: #64c8ff;
}

.btn-delete:hover {
  background: rgba(255, 107, 107, 0.2);
  border-color: #ff6b6b;
}

.project-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  background: rgba(100, 200, 255, 0.15);
  color: #64c8ff;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.badge.category {
  background: rgba(255, 182, 77, 0.15);
  color: #ffb64d;
}

.badge.year {
  background: rgba(129, 199, 132, 0.15);
  color: #81c784;
}

.badge a {
  color: inherit;
  text-decoration: none;
}

.project-description {
  color: #ccc;
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.4;
}

.project-techs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tech-tag {
  display: inline-block;
  padding: 3px 6px;
  background: rgba(129, 199, 132, 0.1);
  color: #81c784;
  border-radius: 3px;
  font-size: 12px;
}

.form-section {
}

.form-section h2 {
  color: #64c8ff;
  margin-bottom: 20px;
  font-size: 20px;
}

.form-section-nested {
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid #64c8ff;
  padding: 20px;
  margin: 20px 0;
  border-radius: 6px;
}

.form-section-nested h3 {
  color: #64c8ff;
  margin: 0 0 15px 0;
  font-size: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #64c8ff;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(100, 200, 255, 0.2);
  border-radius: 6px;
  color: #fff;
  font-family: inherit;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #64c8ff;
  background: rgba(100, 200, 255, 0.05);
  box-shadow: 0 0 0 3px rgba(100, 200, 255, 0.1);
}

.form-group textarea {
  resize: vertical;
  font-family: "Monaco", "Courier New", monospace;
  font-size: 13px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(100, 200, 255, 0.1);
}

.btn-primary {
  padding: 12px 30px;
  background: linear-gradient(135deg, #64c8ff 0%, #3da5d9 100%);
  color: #0f0f1e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(100, 200, 255, 0.3);
}

.btn-secondary {
  padding: 10px 20px;
  background: rgba(100, 200, 255, 0.15);
  color: #64c8ff;
  border: 1px solid #64c8ff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: rgba(100, 200, 255, 0.25);
}

.btn-danger {
  padding: 10px 20px;
  background: rgba(255, 107, 107, 0.15);
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-danger:hover {
  background: rgba(255, 107, 107, 0.25);
}

.admin-data-section {
  background: rgba(20, 20, 35, 0.6);
  border: 1px solid rgba(100, 200, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.admin-data-section h3 {
  color: #64c8ff;
  margin: 0 0 15px 0;
}

.data-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-box {
  background: rgba(20, 20, 35, 0.8);
  border: 2px solid rgba(100, 200, 255, 0.3);
  border-radius: 12px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.login-box h1 {
  color: #64c8ff;
  margin: 0 0 10px 0;
  font-size: 24px;
}

.login-box p {
  color: #999;
  margin-bottom: 30px;
}

.login-box .form-group {
  text-align: left;
}

.error-message {
  background: rgba(255, 107, 107, 0.15);
  color: #ff6b6b;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
}

.login-box .btn-primary {
  width: 100%;
  margin-bottom: 10px;
}

.login-box .btn-secondary {
  width: 100%;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    gap: 15px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .admin-content {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .data-actions {
    flex-direction: column;
  }

  .data-actions button {
    width: 100%;
  }

  .project-header {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
