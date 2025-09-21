<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  font-family: 'Hind', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #434343;
}

/* #app {
  min-height: 100vh;
} */

/* Dark theme styles */
/* body.dark-theme {
  background-color: #1a1a1a;
  color: #ffffff;
}

body.dark-theme .facts-container {
  background: #1a1a1a;
}

body.dark-theme .facts-header {
  background-color: #2d2d2d;
  color: #ffffff;
}

body.dark-theme .facts-header h1 {
  color: #ffffff;
}

body.dark-theme .fact-card {
  background: #2d2d2d;
  color: #ffffff;
}

body.dark-theme .fact-card h3 {
  color: #ffffff;
}

body.dark-theme .fact-card p {
  color: #cccccc;
}

body.dark-theme .theme-switch {
  background: #404040;
}

body.dark-theme .theme-switch:hover {
  background: #505050;
}

body.dark-theme .main-title {
  color: #ffffff;
}

body.dark-theme .search-input {
  background: #2d2d2d;
  border-color: #404040;
  color: #ffffff;
}

body.dark-theme .search-input:focus {
  border-color: #667eea;
}

body.dark-theme .dropdown {
  background: #2d2d2d;
  border-color: #404040;
  color: #ffffff;
}

body.dark-theme .dropdown:focus {
  border-color: #667eea;
}

body.dark-theme .loading-spinner {
  border-color: #404040;
  border-top-color: #667eea;
}

body.dark-theme .error-message {
  color: #ff8a8a;
}

body.dark-theme .retry-btn {
  background: #667eea;
}

body.dark-theme .retry-btn:hover {
  background: #5a6fd8;
}

body.dark-theme .main-title {
  color: #ffffff;
}

body.dark-theme .search-input {
  background: #2d2d2d;
  border-color: #404040;
  color: #ffffff;
}

body.dark-theme .search-input:focus {
  border-color: #667eea;
}

body.dark-theme .dropdown {
  background: #2d2d2d;
  border-color: #404040;
  color: #ffffff;
}

body.dark-theme .dropdown:focus {
  border-color: #667eea;
}

body.dark-theme .loading-spinner {
  border-color: #404040;
  border-top-color: #667eea;
}

body.dark-theme .error-message {
  color: #ff8a8a;
}

body.dark-theme .retry-btn {
  background: #667eea;
}

body.dark-theme .retry-btn:hover {
  background: #5a6fd8;
} */
</style>
