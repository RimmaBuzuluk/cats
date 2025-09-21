<template>
  <div class="login-page">
    <HeaderBar :username="username" @toggle-theme="toggleTheme" />

    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Log in</h1>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Name</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              placeholder="Enter your name"
              :class="{ 'input-error': errorMsg }"
              @input="validateInput"

            >
            <p v-if="errorMsg" class="input-error-msg">{{ errorMsg }}</p>
          </div>

          <button type="submit" class="login-btn" :disabled="!username">
            Log in
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue"

export default {
  name: "LoginPage",
  components: { HeaderBar },
  data() {
    return {
      username: "",
      errorMsg: ""
    }
  },
  methods: {
  handleLogin() {
    if (!this.isValid) {
      this.errorMsg = "Enter your name";
      return;
    }

    this.errorMsg = "";

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", this.username);
    this.$router.push("/facts");
  },
  validateInput() {
    const regex = /^[A-Za-z]{3,15}$/;
    if (this.username && regex.test(this.username)) {
      this.errorMsg = "";
    }
  }
},
computed: {
  isValid() {
    const regex = /^[A-Za-z]{3,15}$/;
    return regex.test(this.username);
  }
}
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}

.login-card {
  padding: 40px 30px;
  border-radius: 16px;
  background: #ffffff;
  text-align: center;
}

.login-page {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.login-title {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 48px;
  color: #232323;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  line-height: 27px;
  font-weight: 500;
  color: #434343;
}

.form-group input {
  width: 410px;
  padding: 10.5px 16px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  background-color: #EBECFF;
  color: #434343;
  line-height: 27px;
  transition: border 0.3s ease;
}

.form-group input:focus {
  border: 1px solid #6E72EC;
}

/* Новий стиль при помилці */
.input-error {
  border: 1px solid #FF4646 !important;
}

.input-error-msg {
  color: #FF4646;
  font-family: Hind, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-top: 4px;
}

/* Кнопка без ефекту hover */
.login-btn {
  width: 224px;
  padding: 14px;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: white;
  background: #6E72EC;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }

  .login-title {
    font-size: 28px;
  }

  .form-group input {
    font-size: 14px;
  }

  .login-btn {
    font-size: 16px;
  }
}
</style>
