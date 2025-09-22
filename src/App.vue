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
  font-family: 'Hind', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #434343;
  background-color: white;
  height: 100%;
  margin: 0;
}


#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

body.dark-theme body {
  background-color: #202020; 
  color: #ffffff;

}

</style>
