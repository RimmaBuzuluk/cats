<template>
  <div class="facts-container">
    <HeaderBar 
      :username="username" 
      @toggle-theme="toggleTheme" 
    />

    <div v-if="loading" class="loading-wrapper">
      <LoadingItem />
    </div>

    <div v-else>
      <div class="main-content">
        <h1 class="main-title">Facts About Cats To Share With Kids!</h1>
        
        <div class="controls-row">
          <SearchInput 
            :modelValue="searchQuery"
            @update:modelValue="setSearch"
          />
          <FilterDropdown 
            :modelValue="selectedFilter"
            @update:modelValue="setFilterOption"
          />
        </div>
      </div>

      <div class="facts-grid">
        <CardItem
          v-for="fact in filteredFacts"
          :key="fact.id"
          :fact="fact"
          @open="goToFact(fact)"
        />
      </div>

      <div v-if="hasMoreFacts" class="load-more-container">
        <button class="load-more-btn" @click="loadMore" :disabled="loading">
          {{ loading ? "Loading..." : "Load more facts" }}
        </button>
      </div>
    </div>

    <FooterBar/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex"
import CardItem from "@/components/CatdItem.vue"
import HeaderBar from "@/components/HeaderBar.vue"
import SearchInput from "@/components/SearchInput.vue"
import FilterDropdown from "@/components/FilterDropdown.vue"
import FooterBar from "@/components/FooterBar.vue"
import LoadingItem from "@/components/loadingItem.vue"


export default {
  name: "FactsPage",
  components: { CardItem, HeaderBar, SearchInput, FilterDropdown, FooterBar, LoadingItem },
  data() {
    return {
      username: localStorage.getItem("username") || "Користувач",
      itemsPerPage: 10,
      loading: false,
      currentPage: 0,
      totalPages: 5 
    }
  },
  computed: {
    ...mapState("facts", ["searchQuery", "selectedFilter", "allFacts"]),
    ...mapGetters("facts", ["filteredFacts"]),
    hasMoreFacts() {
      return this.currentPage < this.totalPages
    }
  },
  methods: {
    ...mapMutations("facts", ["setSearchQuery", "setFilter"]),

    setSearch(query) {
      this.setSearchQuery(query)
    },
    setFilterOption(filter) {
      this.setFilter(filter)
    },

    async loadMore() {
      if (this.loading) return
      this.loading = true
      this.currentPage++

      await this.$store.dispatch("facts/fetchFacts", { limit: this.itemsPerPage })
      this.loading = false
    },

    goToFact(fact) {
      this.$router.push({ name: "fact", params: { id: fact.id } })
    },
    toggleTheme() {
      document.body.classList.toggle("dark-theme")
    },
    checkAuth() {
      if (!localStorage.getItem("isAuthenticated")) {
        this.$router.push("/login")
      }
    }
  },
  async created() {
    this.checkAuth()
    this.loading = true
    this.currentPage = 1
    await this.$store.dispatch("facts/fetchFacts", { limit: this.itemsPerPage })
    this.loading = false
  }
}
</script>


<style scoped>
.facts-container {
  min-height: 100vh;
  background: #ffffff;
  flex: 1; 
  display: flex;
  flex-direction: column;
}


body.dark-theme .facts-container {
  background-color: #202020; 
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

body.dark-theme .main-title {
  color: #DCDCDC; 
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

.load-more-container {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.load-more-btn {
  padding: 15px 91px;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  color: #6E72EC;
  background: white;
  border: 1px solid #6E72EC;
  border-radius: 10px;
  cursor: pointer;
}

.load-more-btn:hover {
  background: #5a63d8;
  color: white;
}


body.dark-theme .load-more-btn {
  background-color: #202020; 
}


.no-facts {
  text-align: center;
  margin-top: 50px;
  color: #666;
}

.loading-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

@media (max-width: 1024px) {
  .main-content {
    padding: 0 40px;
  }

  .facts-grid {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    row-gap: 30px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 0 20px;
  }

  .controls-row {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .facts-grid {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 20px;
  }

  .load-more-btn {
    width: 100%;
    padding: 12px 0;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
    margin: 40px 0 24px 0;
    line-height: 1.3;
  }

  .controls-row {
    gap: 10px;
  }
}
</style>
