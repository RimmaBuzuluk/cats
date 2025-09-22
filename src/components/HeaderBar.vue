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

body.dark-theme .facts-header {
  background-color: #1A1B43; 
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

body.dark-theme .theme-switch {
  background-color: #000000; 
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

@media (max-width: 1024px) {
  .facts-header {
    padding: 0 40px;
  }

  .theme-switch {
    width: 70px;
    height: 32px;
  }

  .toggle {
    width: 27px;
    height: 27px;
    top: 2px;
  }

  .toggle.dark {
    left: 41px; /* 70 - 27 - 2 */
  }

  .theme-icon {
    width: 18px;
    height: 18px;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .facts-header {
    padding: 0 20px;
  }

  .theme-switch {
    width: 60px;
    height: 28px;
  }

  .toggle {
    width: 24px;
    height: 24px;
    top: 2px;
  }

  .toggle.dark {
    left: 34px; /* 60 - 24 - 2 */
  }

  .theme-icon {
    width: 16px;
    height: 16px;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .facts-header {
    padding: 0 12px;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .header-left {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .theme-switch {
    width: 50px;
    height: 24px;
  }

  .toggle {
    width: 20px;
    height: 20px;
    top: 2px;
  }

  .toggle.dark {
    left: 28px; /* 50 - 20 - 2 */
  }

  .theme-icon {
    width: 14px;
    height: 14px;
  }

  .user-avatar {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
}
</style>
