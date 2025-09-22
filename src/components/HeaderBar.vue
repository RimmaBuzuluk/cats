<template>
  <header class="facts-header">
    <div class="header-left">
      <img src="@/img/Logo.png" alt="Logo" class="logo" />
    </div>

    <div class="header-right">
     <div class="theme-switch" @click="toggleTheme">
        <img
          v-if="!isDark"
          src="@/img/sun.png"
          alt="Light"
          class="theme-icon sun"
        />
        <img
          v-else
          src="@/img/Moon.png"
          alt="Dark"
          class="theme-icon moon"
        />
        <span class="toggle" :class="{ dark: isDark }"></span>
      </div>

      <div v-if="username" class="user-avatar">
        {{ username.charAt(0).toUpperCase() }}
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HeaderBar",
  props: {
    username: { type: String, default: "" }
  },
  computed: {
    ...mapGetters("theme", ["isDark"])
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('theme/toggleTheme')
    }
  }
}
</script>

<style scoped>
.facts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EBECFF;
  padding: 0 72px;
}

.header-right{
  display: flex;
  gap: 14px
}

.theme-switch {
  width: 80px;
  height: 37px;
  border-radius: 30px;
  background: #EBECFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: background 0.3s ease;
  padding: 0 8px; 
}

.theme-icon {
  width: 20px;
  height: 20px;
  z-index: 2;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.sun {
  right: 8px;
}

.moon {
  left: 8px; 
}

.toggle {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 31px;
  height: 31px;
  background: #888888;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 1;
}

.toggle.dark {
  left: 46px; /* 80 - 31 - 3 = 46 */
}


.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #636AF2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}
</style>
