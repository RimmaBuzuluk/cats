export default {
  namespaced: true,
  state: {
    allFacts: [],
    searchQuery: "",
    selectedFilter: "all",
    localImages: [
      require("@/img/cat_imgs/cat1.png"),
      require("@/img/cat_imgs/cat2.png"),
      require("@/img/cat_imgs/cat3.png"),
      require("@/img/cat_imgs/cat4.png"),
      require("@/img/cat_imgs/cat5.png"),
      require("@/img/cat_imgs/cat6.png"),
      require("@/img/cat_imgs/cat7.png"),
      require("@/img/cat_imgs/cat8.png"),
      require("@/img/cat_imgs/cat9.png"),
    ]
  },
  mutations: {
    setFacts(state, facts) {
      state.allFacts = facts
    },
    addFacts(state, facts) {
      state.allFacts = [...state.allFacts, ...facts]
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    },
    setFilter(state, filter) {
      state.selectedFilter = filter
    }
  },
  actions: {
    async fetchFacts({ state, commit }, { limit = 10, max_length = 200, page = 1 } = {}) {
      try {
        const res = await fetch(
          `https://catfact.ninja/facts?limit=${limit}&max_length=${max_length}&page=${page}`
        )
        const data = await res.json()
        const facts = Array.isArray(data.data) ? data.data : []
  
        const factsWithImages = facts.map((fact, index) => {
          const imgIndex = (state.allFacts.length + index) % state.localImages.length
          return {
            id: Date.now() + state.allFacts.length + index,
            ...fact,
            image: state.localImages[imgIndex]
          }
        })
  
        commit("addFacts", factsWithImages)
      } catch (err) {
        console.error("Помилка завантаження фактів:", err)
        commit("addFacts", [])
      }
    }
  },
  getters: {
    getFactById: state => id => {
      return state.allFacts.find(f => f.id === parseInt(id))
    },
    filteredFacts(state) {
      let filtered = [...state.allFacts]

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(f => f.fact.toLowerCase().includes(query))
      }

      switch (state.selectedFilter) {
        case "long-first":
          filtered.sort((a, b) => b.fact.length - a.fact.length)
          break
        case "short-first":
          filtered.sort((a, b) => a.fact.length - b.fact.length)
          break
        case "short-only":
          filtered = filtered.filter(f => f.fact.length < 100)
          break
        case "long-only":
          filtered = filtered.filter(f => f.fact.length >= 100)
          break
      }

      return filtered
    }
  }
}
