<template>
    <div class="search-container">
      <svg 
        class="search-icon" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" 
        />
      </svg>
      
      <input 
        type="text" 
        class="search-input" 
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchInput",
    props: {
      modelValue: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "Search facts here"
      }
    },
    emits: ["update:modelValue"]
  }
  </script>
  
  <style scoped>
  .search-container {
    flex: 1;
    max-width: 373px;
    padding: 12px 16px;
    background-color: #EBECFF;
    border-radius: 6px;
    display: flex;
    align-items: center;
  }

  body.dark-theme .search-container{
    background-color: #4D4E69; 
    color: #E2E2E2;
  }
  
  .search-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: #434343;
    margin-right: 9px;
  }

  body.dark-theme .search-icon{
    color: #E2E2E2;
  }
  
  .search-input {
    width: 100%;
    border: none;
    box-sizing: border-box;
    background-color: #EBECFF;
    color: #A9A9A9;
  }

  body.dark-theme .search-input {
    background-color: #4D4E69; 
    color: #E2E2E2;
  }
  
  .search-input::placeholder {
    color: #A9A9A9;
  }

  body.dark-theme .search-input::placeholder {
    background-color: #4D4E69; 
    color: #E2E2E2;
  }
  
  .search-input:focus {
    outline: none;
  }
  </style>
  