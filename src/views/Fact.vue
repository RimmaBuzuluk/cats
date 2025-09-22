<template>
  <div class="fact-container">
    <!-- Header -->
    <HeaderBar 
      :username="username" 
      @toggle-theme="toggleTheme" 
    />

    <!-- Buttons row -->
    <div class="buttons-row">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="logout-btn" @click="logout">Log out</button>
    </div>

    <!-- Fact detail -->
    <div v-if="fact" class="fact-detail">
      <img :src="fact.image" alt="Cat" class="fact-image" />
      <h1 class="fact-text">{{ fact.fact }}</h1>
    </div>

    <div v-else class="loading">
      <p>Завантаження факту...</p>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue"

export default {
  name: 'FactPage',
  components: { HeaderBar },
  computed: {
    fact() {
      return this.$store.getters["facts/getFactById"](this.$route.params.id)
    },
    username() {
      return localStorage.getItem('username') || "Користувач"
    }
  },
  methods: {
    checkAuth() {
      if (!localStorage.getItem('isAuthenticated')) {
        this.$router.push('/login')
      }
    },
    goBack() {
      this.$router.push('/facts')
    },
    logout() {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('username')
      this.$router.push('/login')
    },
    toggleTheme() {
      document.body.classList.toggle("dark-theme")
    }
  },
  mounted() {
    this.checkAuth()
    if (!this.fact) {
      this.$router.push('/facts')
    }
  }
}
</script>

<style scoped>
.fact-container {
  /* max-width: 1200px; */
  margin: 0 auto;
  /* padding: 20px; */
}

.buttons-row {
    max-width: 1200px;
    margin: 7px auto;
    display: flex;
    justify-content: space-between;
  /* margin: 20px 0; */
}

.back-btn,
.logout-btn {
  padding: 10px 20px;
  border: none;
  font-weight: 400;
  cursor: pointer;
  color: #434343;
  /* box-sizing: border-box d; */
}

.back-btn {
  background-color: white;
  /* margin: 17px 0; */
}

.back-btn:hover {
}

.logout-btn {
  background: #EBECFF;
  border-radius: 6px;
  padding: 12px 16px;
  width: 148px;
  box-sizing: border-box;
  text-align: left;
}

.logout-btn:hover {
  background: #ff5252;
}

/* Fact detail */
.fact-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  text-align: center;
}

.fact-image {
  width: 854px;
  height: 528px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 30px;
}

.fact-text {
  font-size: 2rem;
  color: #232323;
  max-width: 854px;
  line-height: 1.5;
}

/* Loading */
.loading {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

/* Responsive */
@media (max-width: 1024px) {
  .fact-image {
    width: 100%;
    height: auto;
  }

  .fact-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .buttons-row {
    flex-direction: column;
    gap: 15px;
  }

  .fact-text {
    font-size: 1.2rem;
  }
}
</style>
