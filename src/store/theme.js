export default {
  namespaced: true,
  state: {
    theme: "light"
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme
      document.body.classList.toggle("dark-theme", theme === "dark")
    }
  },
  actions: {
    initTheme({ commit }) {
      const savedTheme = localStorage.getItem("theme")

      if (savedTheme) {
        commit("SET_THEME", savedTheme)
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        commit("SET_THEME", prefersDark ? "dark" : "light")
      }
    },
    toggleTheme({ state, commit }) {
      const newTheme = state.theme === "dark" ? "light" : "dark"
      commit("SET_THEME", newTheme)
      localStorage.setItem("theme", newTheme)
    }
  },
  getters: {
    isDark: state => state.theme === "dark",
    theme: state => state.theme
  }
}
