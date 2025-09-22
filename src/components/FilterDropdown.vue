<template>
    <div class="dropdown-container" @click="toggleDropdown">
      <div class="dropdown-selected">
        {{ selectedLabel }}
        <svg 
          class="dropdown-icon" 
          :class="{ open: isOpen }"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <ul v-if="isOpen" class="dropdown-list">
        <li 
          v-for="option in options" 
          :key="option.value" 
          @click.stop="selectOption(option.value)"
          :class="{ active: option.value === modelValue }"
        >
          {{ option.label }}
          <svg v-if="option.value === modelValue" class="checkmark-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
  </svg>        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "FilterDropdown",
    props: {
      modelValue: { type: String, default: "all" }
    },
    emits: ["update:modelValue"],
    data() {
      return {
        isOpen: false,
        options: [
          { value: "all", label: "All facts" },
          { value: "long-first", label: "Show long ones first" },
          { value: "short-first", label: "Show short ones first" },
          { value: "short-only", label: "Short ones only" },
          { value: "long-only", label: "Long ones only" }
        ]
      };
    },
    computed: {
      selectedLabel() {
        const option = this.options.find(o => o.value === this.modelValue);
        return option ? option.label : "";
      }
    },
    mounted() {
      document.addEventListener("click", this.closeDropdownOutside);
    },
    beforeUnmount() {
      document.removeEventListener("click", this.closeDropdownOutside);
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(value) {
        this.$emit("update:modelValue", value);
        this.isOpen = false;
      },
      closeDropdownOutside(e) {
        if (!this.$el.contains(e.target)) this.isOpen = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .dropdown-container {
    position: relative;
    flex: 1;
    max-width: 300px;
    background-color: #EBECFF;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
  }

  body.dark-theme .dropdown-container {
    background-color: #4D4E69; 
    color: #E2E2E2;
  }


  
  .dropdown-selected {
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    background-color: #EBECFF;
  }

  body.dark-theme .dropdown-selected {
    background-color: #4D4E69; 
    color: #E2E2E2;
  }
  
  .dropdown-icon {
    width: 24px;
    height: 24px;
    color: #434343;
    transition: transform 0.3s ease;
  }

  body.dark-theme .dropdown-icon {
    background-color: #4D4E69; 
    color: #E2E2E2;
  }
  .dropdown-icon.open {
    transform: rotate(180deg);
  }
  
  .dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #EBECFF;
    margin-top: 6px;
    list-style: none;
    padding: 0;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  body.dark-theme .dropdown-list {
    background-color: #4D4E69; 
    color: #C6C6C6;
    font-weight: 400;
    line-height: 27px;
  }
  
  .dropdown-list li {
    padding: 12px 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .dropdown-list li.active {
    color: #6E72EC;
  }


  body.dark-theme   .dropdown-list li.active {
    color: #FFFFFF;
  }
  
  .checkmark-icon {
  width: 24px;
  height: 24px;
  color: #6E72EC;
  flex-shrink: 0;
  margin-left: 8px;
}

body.dark-theme   .checkmark-icon  {
    color: #FFFFFF;
  }
  </style>
  