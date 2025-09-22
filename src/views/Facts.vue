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
        v-for="fact in paginatedFacts"
        :key="fact.id"
        :fact="fact"
        @open="goToFact(fact)"
      />
    </div>

    <div v-if="hasMoreFacts" class="load-more-container">
      <button class="load-more-btn" @click="loadMore">Load more facts</button>
    </div>

    <div v-if="loading" class="no-facts">
      <p>Факти завантажуються...</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex"
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
      itemsPerPage: 10,
      loading: true,
      currentPage: 0
    }
  },
  computed: {
  ...mapState("facts", ["searchQuery", "selectedFilter"]),
  ...mapGetters("facts", ["filteredFacts"]),
  paginatedFacts() {
    const facts = this.filteredFacts || []
    return facts.slice(0, (this.currentPage + 1) * this.itemsPerPage)
  },
  hasMoreFacts() {
    return this.paginatedFacts.length < (this.filteredFacts || []).length
  }
},
methods: {
  ...mapMutations("facts", ["setSearchQuery", "setFilter"]),

  setSearch(query) {
    this.setSearchQuery(query)
    this.currentPage = 0
  },
  setFilterOption(filter) {
    this.setFilter(filter)
    this.currentPage = 0
  },
  async loadMore() {
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
    await this.$store.dispatch("facts/fetchFacts", { limit: this.itemsPerPage })
    this.loading = false
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

.no-facts {
  text-align: center;
  margin-top: 50px;
  color: #666;
}

/* Responsive */
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
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }
}
</style>
