<template>
  <div class="facts-container">
    <HeaderBar 
      :username="username" 
      @toggle-theme="toggleTheme" 
    />

    <div class="main-content">
      <h1 class="main-title">Facts About Cats To Share With Kids!</h1>
      
      <div class="controls-row">
        <SearchInput 
          v-model="searchQuery" 
          placeholder="Search facts here"
          @input="filterFacts"
        />
        
        <FilterDropdown 
          v-model="selectedFilter" 
          @update:modelValue="filterFacts"
        />
      </div>
    </div>

    <div class="facts-grid">
      <CardItem
        v-for="fact in facts" 
        :key="fact.id"
        :fact="fact"
        @open="goToFact(fact)"
      />
    </div>

    <div v-if="loading" class="no-facts">
      <p>Факти завантажуються...</p>
    </div>
  </div>
</template>

<script>
import CardItem from "@/components/CatdItem.vue"
import HeaderBar from "@/components/HeaderBar.vue"
import SearchInput from "@/components/SearchInput.vue"
import FilterDropdown from "@/components/FilterDropdown.vue"

export default {
  name: "FactsPage",
  components: { CardItem, HeaderBar, SearchInput, FilterDropdown },
  data() {
    return {
      username: localStorage.getItem("username") || "Користувач",
      searchQuery: "",
      selectedFilter: "all",
      facts: [],
      loading: true
    }
  },
  methods: {
    checkAuth() {
      if (!localStorage.getItem("isAuthenticated")) {
        this.$router.push("/login")
      }
    },
    async loadFacts() {
      await this.$store.dispatch('fetchFacts')
      this.facts = this.$store.state.allFacts
      this.filterFacts()
    },
    goToFact(fact) {
      this.$router.push({ name: 'fact', params: { id: fact.id } })
    },
    toggleTheme() {
      document.body.classList.toggle("dark-theme")
    },
    filterFacts() {
      let filtered = [...this.facts]

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(fact =>
          fact.fact.toLowerCase().includes(query)
        )
      }

      // Фільтри по довжині
      switch (this.selectedFilter) {
        case "long-first":
          filtered.sort((a, b) => b.length - a.length)
          break
        case "short-first":
          filtered.sort((a, b) => a.length - b.length)
          break
        case "short-only":
          filtered = filtered.filter(fact => fact.length < 100)
          break
        case "long-only":
          filtered = filtered.filter(fact => fact.length >= 100)
          break
      }

      this.facts = filtered
    },

  },
  created() {
  this.checkAuth()
  this.$store.dispatch('fetchFacts').then(() => {
    this.facts = this.$store.state.allFacts
    this.filterFacts()
  })
}
}
</script>



<style scoped>
.facts-container {
  min-height: 100vh;
  background: #ffffff;
}


.main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 72px;
}

.main-title {
  text-align: center;
  color: #232323;
  font-size: 54px;
  margin: 57px 0 32px 0;
  font-weight: 700;
  line-height: 56px;
}

.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  gap: 20px;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 31px;
  row-gap: 40px;
  max-width: 1296px;
  margin: 0 auto;
}


/* Responsive design */
@media (max-width: 768px) {
  .facts-container {
    padding: 15px;
  }
  
  .facts-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
    padding: 20px;
  }
  
  .header-left {
    justify-content: center;
  }
  
  .main-content {
    padding: 0 20px;
  }
  
  .main-title {
    font-size: 2rem;
    margin: 30px 0 20px 0;
  }
  
  .controls-row {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .search-container {
    max-width: none;
  }
  
  .dropdown-container {
    min-width: auto;
  }
  
  .header-right {
    justify-content: center;
  }
  
  .facts-header h1 {
    font-size: 1.8rem;
  }
  
  .facts-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .fact-card {
    padding: 20px;
  }
}

.cat-photo {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}


@media (max-width: 480px) {
  .facts-header h1 {
    font-size: 1.5rem;
  }
  
  .fact-content h3 {
    font-size: 1.1rem;
  }
  
  .cat-emoji {
    font-size: 2.5rem;
  }
}
</style>
