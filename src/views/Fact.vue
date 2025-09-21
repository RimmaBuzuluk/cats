<template>
  <div class="fact-container">
    <header class="fact-header">
      <button @click="goBack" class="back-btn">← Назад до фактів</button>
      <div class="user-info">
        <span>Привіт, {{ username }}!</span>
        <button @click="logout" class="logout-btn">Вийти</button>
      </div>
    </header>

    <div v-if="fact" class="fact-detail">
      <div class="fact-hero">
        <div class="fact-image">
          <img 
            :src="fact.imageUrl" 
            :alt="fact.title"
            class="hero-cat-image"
            @error="handleImageError"
          />
        </div>
        <h1>{{ fact.title }}</h1>
        <div class="fact-category">{{ fact.category }}</div>
      </div>

      <div class="fact-content">
        <div class="fact-description">
          <h2>Детальний опис</h2>
          <p>{{ fact.fullDescription }}</p>
        </div>

        <div class="fact-additional">
          <h3>Цікаві деталі</h3>
          <ul>
            <li v-for="detail in fact.additionalDetails" :key="detail">
              {{ detail }}
            </li>
          </ul>
        </div>

        <div class="fact-stats">
          <div class="stat-item">
            <span class="stat-label">Категорія:</span>
            <span class="stat-value">{{ fact.category }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">ID факту:</span>
            <span class="stat-value">#{{ fact.id }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <p>Завантаження факту...</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FactPage',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      username: '',
    }
  },
  computed: {
    fact() {
      return this.storeState.allFacts.find(f => f.id === parseInt(this.id))
    }
  },
  async mounted() {
    this.checkAuth()


  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    checkAuth() {
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      if (!isAuthenticated) {
        this.$router.push('/login')
      }
    },
    logout() {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('username')
      this.$router.push('/login')
    },
    goBack() {
      this.$router.push('/facts')
    },
  }
}
</script>

<style scoped>
.fact-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.fact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.back-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #5a6fd8;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info span {
  color: #666;
  font-weight: 500;
}

.logout-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.logout-btn:hover {
  background: #ff5252;
}

.fact-detail {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.fact-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  text-align: center;
}

.fact-image {
  margin-bottom: 20px;
  height: 300px;
  overflow: hidden;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
}

.hero-cat-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fact-hero h1 {
  font-size: 2.5rem;
  margin: 0 0 15px 0;
  line-height: 1.3;
}

.fact-category {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 20px;
  border-radius: 25px;
  display: inline-block;
  font-weight: 500;
  font-size: 1.1rem;
}

.fact-content {
  padding: 40px;
}

.fact-description h2 {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 1.8rem;
}

.fact-description p {
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  margin: 0 0 30px 0;
}

.fact-additional {
  margin: 40px 0;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 15px;
}

.fact-additional h3 {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
}

.fact-additional ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fact-additional li {
  color: #666;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
  position: relative;
  padding-left: 25px;
}

.fact-additional li:last-child {
  border-bottom: none;
}

.fact-additional li:before {
  content: "🐾";
  position: absolute;
  left: 0;
  top: 10px;
}

.fact-stats {
  display: flex;
  gap: 30px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #e9ecef;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-label {
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-value {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 1.1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .fact-container {
    padding: 15px;
  }
  
  .fact-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
    padding: 20px;
  }
  
  .fact-hero {
    padding: 40px 20px;
  }
  
  .fact-hero h1 {
    font-size: 2rem;
  }
  
  .fact-emoji {
    font-size: 3rem;
  }
  
  .fact-content {
    padding: 30px 20px;
  }
  
  .fact-stats {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .fact-hero h1 {
    font-size: 1.6rem;
  }
  
  .fact-emoji {
    font-size: 2.5rem;
  }
  
  .fact-description h2 {
    font-size: 1.5rem;
  }
  
  .fact-additional {
    padding: 20px;
  }
}
</style>
