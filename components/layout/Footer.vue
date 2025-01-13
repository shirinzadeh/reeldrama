// components/layout/Footer.vue
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>About ReelShort</h3>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Cookie Preferences</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Help Center</h3>
        <ul>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Support</a></li>
          <li><a href="#">Device Status</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2024 ReelShort. All Rights Reserved.</p>
      <div class="social-links">
        <a href="#" class="social-link">Facebook</a>
        <a href="#" class="social-link">Twitter</a>
        <a href="#" class="social-link">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #141414;
  color: #fff;
  padding: 3rem 2rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #999;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section ul li a:hover {
  color: #fff;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  color: #999;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #999;
  text-decoration: none;
  transition: color 0.2s;
}

.social-link:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1rem 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>