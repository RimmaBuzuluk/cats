<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>🐱 Котики</h1>
        <p>Вітаємо на сайті з фактами про котиків!</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Ім'я користувача:</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required
            placeholder="Введіть ваше ім'я"
          >
        </div>
        
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            placeholder="Введіть пароль"
          >
        </div>
        
        <button type="submit" class="login-btn" :disabled="!username || !password">
          Увійти
        </button>
      </form>
      
      <div class="demo-credentials">
        <p><strong>Демо дані:</strong></p>
        <p>Логін: <code>admin</code></p>
        <p>Пароль: <code>password</code></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // Проста перевірка для демо
      if (this.username === 'admin' && this.password === 'password') {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('username', this.username)
        this.$router.push('/facts')
      } else {
        alert('Невірний логін або пароль!')
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-header h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.login-header p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-bottom: 20px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.demo-credentials {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.demo-credentials p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}

.demo-credentials code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

/* Responsive design */
@media (max-width: 768px) {
  .login-container {
    padding: 10px;
  }
  
  .login-card {
    padding: 30px 20px;
  }
  
  .login-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .login-header h1 {
    font-size: 1.8rem;
  }
  
  .login-header p {
    font-size: 1rem;
  }
}
</style>
