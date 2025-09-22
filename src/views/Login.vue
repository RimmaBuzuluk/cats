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
.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.login-container {
  flex: 1; 
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  width: 100%;
}

body.dark-theme .login-container {
  background-color: #202020;
}

.login-card {
  padding: 40px 30px;
  border-radius: 16px;
  background: #ffffff;
  text-align: center;
  width: 100%;
  max-width: 450px;
  box-sizing: border-box;
}

body.dark-theme .login-card {
  background-color: #202020;
}

.login-title {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 48px;
  color: #232323;
}

body.dark-theme .login-title  {
  color: #DCDCDC;
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

body.dark-theme .form-group label {
  color: #ffffff;
}

.form-group input {
  width: 100%; 
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

body.dark-theme input {
  background-color: #4D4E69;
  color: #ffffff;
}

.form-group input:focus {
  border: 1px solid #6E72EC;
}

body.dark-theme .form-group input:focus {
  border: 1px solid #8588EF;
}

.form-group input::placeholder {
  color: #A9A9A9;
}

body.dark-theme .form-group input::placeholder {
  color: #C4C4C4;
}

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

.login-btn {
  width: 100%;
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

body.dark-theme .login-btn {
  background: #8588EF;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .login-card {
    padding: 35px 20px;
  }

  .login-title {
    font-size: 22px;
  }

  .login-btn {
    font-size: 16px;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 15px;
    border-radius: 12px;
  }

  .login-title {
    font-size: 20px;
    margin-bottom: 36px;
  }

  .form-group input {
    font-size: 14px;
    padding: 10px 12px;
  }

  .login-btn {
    font-size: 14px;
    padding: 10px;
  }
}

</style>
