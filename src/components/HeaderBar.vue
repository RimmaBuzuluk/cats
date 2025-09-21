<template>
    <header class="facts-header">
      <div class="header-left">
        <img src="@/img/Logo.png" alt="Logo" class="logo">
      </div>
      <div class="header-right">
        <div class="theme-switch" @click="$emit('toggle-theme')">
          <img src="@/img/sun.png" alt="Theme" class="theme-icon">
        </div>
        <div class="user-avatar">
          {{ username.charAt(0).toUpperCase() }}
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderBar',
    props: {
      username: {
        type: String,
        default: 'Користувач'
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
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .logo {
    width: 185px;
    height: auto;
    border-radius: 8px;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .theme-switch {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .theme-switch:hover {
    background: #e0e0e0;
    border-color: #667eea;
    transform: scale(1.05);
  }
  
  .theme-icon {
    width: 20px;
    height: 20px;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .user-avatar:hover {
    transform: scale(1.1);
  }
  </style>
  