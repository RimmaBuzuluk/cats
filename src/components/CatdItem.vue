<template>
   <div class="fact-card" @click="$emit('open', fact)">

      <div class="fact-image">
        <img :src="fact.image" alt="Cat" class="cat-photo" />
      </div>
      <div class="fact-content">
        <p>{{ fact.fact }}</p>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CardItem",
    props: {
      fact: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .fact-card {
    background: white;
    cursor: pointer;
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    gap:24px
  }

  .fact-card:hover{
    background:#EBECFF;
  }


  
  .cat-photo {
    width: 100%;
    height: 254px;
    object-fit: cover;
    border-radius: 6px;
  }  
  .fact-content p {
    margin: 16px;
    line-height: 22px;
  }

  </style>
  