export default{
  namespaced: true,
  state: {
    allFacts: [],
     searchQuery: "",
    selectedFilter: "all"
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
    async fetchFacts({ commit }, { limit = 10, max_length = 200 } = {}) {
      try {
        const res = await fetch(`https://catfact.ninja/facts?limit=${limit}&max_length=${max_length}`)
        const data = await res.json()
        const facts = Array.isArray(data.data) ? data.data : []

        const images = await Promise.all(
          facts.map(() =>
            fetch("https://api.thecatapi.com/v1/images/search")
              .then(res => res.json())
              .then(imgData => imgData[0]?.url || "")
          )
        )

        const factsWithImages = facts.map((fact, index) => ({
          id: Date.now() + index, 
          ...fact,
          image: images[index]
        }))

        commit('addFacts', factsWithImages)
      } catch (err) {
        console.error("Помилка завантаження фактів:", err)
        commit('addFacts', [])
      }
    },

  },
  getters: {
    getFactById: (state) => (id) => {
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
          filtered.sort((a,b)=> b.fact.length - a.fact.length)
          break
        case "short-first":
          filtered.sort((a,b)=> a.fact.length - b.fact.length)
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