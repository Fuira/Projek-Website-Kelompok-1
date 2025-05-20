// DOM Elements
document.addEventListener('DOMContentLoaded', function () {
  // Navigation and Menu Elements
  const body = document.body;
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMobileBtn = document.querySelector('.close-mobile');
  const userBtn = document.querySelector('.user-btn');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  // Auth Modal Elements
  const authModal = document.getElementById('auth-modal');
  const authClose = document.querySelector('.auth-close');
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');

  // Toast Element
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // ===== Mobile Menu Functionality =====
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMobileBtn) {
    closeMobileBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ===== Auth Modal Functionality =====
  // Open auth modal
  window.openAuthModal = function (type) {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (type === 'login') {
      activateLoginTab();
    } else if (type === 'signup') {
      activateSignupTab();
    }
  };

  // Close auth modal
  if (authClose) {
    authClose.addEventListener('click', () => {
      authModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Tab switching in auth modal
  function activateLoginTab() {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  }

  function activateSignupTab() {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  }

  if (loginTab) {
    loginTab.addEventListener('click', activateLoginTab);
  }

  if (signupTab) {
    signupTab.addEventListener('click', activateSignupTab);
  }

  if (switchToSignup) {
    switchToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      activateSignupTab();
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      activateLoginTab();
    });
  }

  // Handle form submissions
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      // Here you would normally send this data to your server
      console.log('Login attempt:', { email, password });

      // Show success message
      showToast('Login successful!');

      // Close the modal
      authModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      // Here you would normally send this data to your server
      console.log('Signup attempt:', { name, email, password });

      // Show success message
      showToast('Account created successfully!');

      // Close the modal
      authModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // ===== Toast Notification Function =====
  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Close mobile menu if it's open
          if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
          }

          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== Add fixed class to header on scroll =====
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== Initialize the page =====
  // Start with carousel functionality
  updateCarousel();

  // Initialize auth modal tabs
  activateLoginTab();

  // Show welcome toast
  setTimeout(() => {
    showToast('Welcome to Classica Harmonia!');
  }, 1000);
});

function searchContent() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const composers = document.querySelectorAll(".composer-card h3");
  const pieces = document.querySelectorAll(".piece-card h3");

  let found = false;

  composers.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    card.parentElement.style.display = cardText.includes(input) ? "block" : "none";
    if (cardText.includes(input)) found = true;
  });

  pieces.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    card.parentElement.style.display = cardText.includes(input) ? "block" : "none";
    if (cardText.includes(input)) found = true;
  });

  if (!found) {
    alert("No results found!");
  }
}