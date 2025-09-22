<template>
    <div class="loader">
      <span v-for="n in 8" :key="n"></span>
    </div>
  </template>
  
  <style scoped lang="scss">
  .loader {
    position: relative;
    width: 80px;
    height: 80px;
    animation: spin 1.5s linear infinite;
  
    span {
      position: absolute;
      border-radius: 50%;
      transform-origin: 40px 40px;
    }
  
    span:nth-child(1) {
      width: 17px;
      height: 17px;
      top: 0;
      left: 50%;
      background: #6E72EC;
    }
  
    span:nth-child(2) {
      width: 14px;
      height: 14px;
      top: 15%;
      left: 75%;
      background: #8286f0;
    }
  
    span:nth-child(3) {
      width: 12px;
      height: 12px;
      top: 40%;
      left: 85%;
      background: #979af2;
    }
  
    span:nth-child(4) {
      width: 10px;
      height: 10px;
      top: 65%;
      left: 75%;
      background: #adaff5;
    }
  
    span:nth-child(5) {
      width: 8px;
      height: 8px;
      top: 80%;
      left: 50%;
      background: #c2c4f8;
    }
  
    span:nth-child(6) {
      width: 7px;
      height: 7px;
      top: 65%;
      left: 25%;
      background: #d9daff;
    }
  
    span:nth-child(7) {
      width: 6px;
      height: 6px;
      top: 40%;
      left: 15%;
      background: #b8bbff;
    }
  
    span:nth-child(8) {
      width: 5px;
      height: 5px;
      top: 15%;
      left: 25%;
      background: #a0a3ff;
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  