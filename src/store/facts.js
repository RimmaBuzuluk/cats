import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allFacts: []
  },
  mutations: {
    setFacts(state, facts) {
      state.allFacts = facts
    }
  },
  actions: {
    async fetchFacts({ commit }, { limit = 10, max_length = 200 } = {}) {
      try {
        const res = await fetch(`https://catfact.ninja/facts?limit=${limit}&max_length=${max_length}`)
        const data = await res.json()
        const facts = data.data || data

        // Додаємо картинки котиків
        const images = await Promise.all(
          facts.map(() =>
            fetch("https://api.thecatapi.com/v1/images/search")
              .then(res => res.json())
              .then(imgData => imgData[0]?.url || "")
          )
        )

        const factsWithImages = facts.map((fact, index) => ({
          id: index,   // створюємо локальний id
          ...fact,
          image: images[index]
        }))

        commit('setFacts', factsWithImages)
      } catch (err) {
        console.error("Помилка завантаження фактів:", err)
      }
    }
  },
  getters: {
    getFactById: (state) => (id) => {
      return state.allFacts.find(f => f.id === parseInt(id))
    }
  }
})
