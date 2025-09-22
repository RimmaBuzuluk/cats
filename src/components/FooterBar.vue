<template>
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-logo">
          <img src="@/img/Logo-white.png" alt="Logo" />
        </div>
          <div class="footer-menus">
          <div class="menu">
            <h4>Built for catlovers</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div class="menu">
            <h4>Social</h4>
            <ul class="social-list">
              
              <li>
                <a href="#"><img src="@/img/icons/instagrum.png" alt="Twitter" /></a>
              </li>
              <li>
                <a href="#"><img src="@/img/icons/facebook.png" alt="Facebook" /></a>
              </li>
              <li>
                <a href="#"><img src="@/img/icons/youtub.png" alt="Instagram" /></a>
              </li>
              <li>
                <a href="#"><img src="@/img/icons/x.png" alt="LinkedIn" /></a>
              </li>
            </ul>
          </div>
        </div>

      </div>
  
      <div class="footer-divider"></div>
        <div class="footer-bottom">
        <div class="left">© cats.com inc. All rights reserved.</div>
        <div class="right">
          <span>English</span>
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterBar"
  };
  </script>
  
  <style scoped>
  .footer {
    background: #121212;
    color: #fff;
    height: 255px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 60px;
  }
  
  /* 1 рядок */
  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .footer-logo img {
    width: 185px;
    height: auto;
  }
  
  .footer-menus {
    display: flex;
    gap: 60px;
  }
  
  .menu h4 {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
  
  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu ul li {
    margin-bottom: 6px;
  }
  
  .menu ul li a {
    color: #ffffff;
    text-decoration: none;
    font-size: 14px;
  }
  
  .menu ul li a:hover {
    color: #fff;
  }

  .social-list{
    display: flex;
    gap: 24px;
  }
  
  .social-icons {
    display: flex;
    gap: 12px;
    margin-top: 10px;
  }
  
  .social-icons a {
    color: #ccc;
    font-size: 16px;
  }
  
  .social-icons a:hover {
    color: #fff;
  }
  
  /* 2 рядок */
  .footer-divider {
    height: 1px;
    background: #8E8E8E;
    margin: 20px 0;
  }
  
  /* 3 рядок */
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }
  
  .footer-bottom .right {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  </style>
  