<template>
  <div class="fact-container">
    <HeaderBar 
      :username="username" 
      @toggle-theme="toggleTheme" 
    />
    <div class="content-wrapper">

    <div class="buttons-row">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="logout-btn" @click="logout">Log out</button>
    </div>
    <div v-if="fact" class="fact-detail">
      <img :src="fact.image" alt="Cat" class="fact-image" />
      <h1 class="fact-text">{{ fact.fact }}</h1>
    </div>

    <div v-else class="loading">
      <p>Завантаження факту...</p>
    </div>
    </div>
    <FooterBar/>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue"
import FooterBar from "@/components/FooterBar.vue"


export default {
  name: 'FactPage',
  components: { HeaderBar, FooterBar },
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
  min-height: 100vh;
  flex: 1; 
  display: flex;
  flex-direction: column;
}

.content-wrapper{
width: 1200px;
  margin: 0 auto;
}


body.dark-theme .fact-container{
    background-color: #202020; 
  }

.buttons-row {
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    }

.back-btn,
.logout-btn {
  padding: 10px 20px;
  border: none;
  font-weight: 400;
  cursor: pointer;
  color: #434343;
}

.back-btn {
  background-color: white;
  line-height: 27px;
}

body.dark-theme .back-btn{
    background-color: #202020; 
    color: #D3D3D3;

  }

.logout-btn {
  background: #EBECFF;
  border-radius: 6px;
  padding: 12px 16px;
  width: 148px;
  box-sizing: border-box;
  text-align: left;
}


body.dark-theme .logout-btn{
    background-color: #313247; 
    color: #D3D3D3;

  }

.logout-btn:hover {
  background: #acadbf;
}

body.dark-theme .logout-btn:hover {
  background: #4c4e6c;
}

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

body.dark-theme .fact-text{
  color: #ffffff;

}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

@media (max-width: 1024px) {
  .content-wrapper {
    width: 95%; 
  }

  .fact-image {
    width: 100%;
    height: auto; 
  }

  .fact-text {
    font-size: 1.5rem;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .fact-text {
    font-size: 1.3rem;
  }

  .buttons-row {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    width: 100%;
    padding: 0 10px;
    height: 75vh;
  }

  .buttons-row {
    flex-direction: column;
    gap: 10px;
  }

  .back-btn,
  .logout-btn {
    width: 100%;
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
  }

  .fact-text {
    font-size: 1.2rem;
    padding: 0 5px;
  }

  .fact-image {
    width: 100%;
    height: auto;
  }
}
</style>
