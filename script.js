// Hamburger menu functionality
function hamburg() {
  const navbar = document.querySelector('.dropdown');
  navbar.style.transform = 'translateY(0)';
  document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
}

function cancel() {
  const navbar = document.querySelector('.dropdown');
  navbar.style.transform = 'translateY(-100vh)';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function closeMenu() {
  cancel(); // Close the menu when clicking on a link
}

// Typewriter effect with adjusted timing for mobile
const texts = [
  "DEVELOPER",
  "DATA SCIENTIST",
  "PROGRAMMER",
  "WEB DESIGNER"
];

// Detect if mobile device for typewriter speed adjustment
const isMobile = window.innerWidth <= 768;
let speed = isMobile ? 150 : 100; // Slower typing on mobile

const textElements = document.querySelector('.typewriter-text');
let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
  if (characterIndex < texts[textIndex].length) {
    textElements.innerHTML += texts[textIndex].charAt(characterIndex);
    characterIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(eraseText, 1000);
  }
}

function eraseText() {
  if (textElements.innerHTML.length > 0) {
    textElements.innerHTML = textElements.innerHTML.slice(0, -1);
    setTimeout(eraseText, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    characterIndex = 0;
    setTimeout(typeWriter, 500);
  }
}

// Sticky navbar with responsive adjustments
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
  
  // Show/hide scroll to top button
  const scrollTop = document.querySelector('.scroll-top');
  if (window.scrollY > 300) {
    scrollTop.classList.add('active');
  } else {
    scrollTop.classList.remove('active');
  }
});

// Skill progress animation
function animateSkills() {
  const skillsSection = document.getElementById('skills');
  const skillProgressBars = document.querySelectorAll('.progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillProgressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 }); // Lower threshold for mobile
  
  observer.observe(skillsSection);
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, let's just show an alert
      alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
      
      // Reset the form
      contactForm.reset();
    });
  }
});

// Smooth scrolling for anchor links with mobile adjustments
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Adjust offset based on screen size
      const offset = window.innerWidth <= 768 ? 50 : 70;
      
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

// Responsive image loading
function loadResponsiveImages() {
  if (window.innerWidth <= 768) {
    // Optional: You could load smaller images for mobile if needed
    // const profileImages = document.querySelectorAll('.profile-image');
    // profileImages.forEach(img => {
    //   const mobileSrc = img.getAttribute('data-mobile-src');
    //   if (mobileSrc) img.src = mobileSrc;
    // });
  }
}

// Fix AOS animation issues on mobile
function adjustAOSForMobile() {
  if (window.innerWidth <= 768) {
    // Shorter durations on mobile
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => {
      el.setAttribute('data-aos-duration', '800');
      
      // Remove delays on mobile for better performance
      if (el.hasAttribute('data-aos-delay') && parseInt(el.getAttribute('data-aos-delay')) > 300) {
        el.setAttribute('data-aos-delay', '300');
      }
    });
  }
}

// Initialize
window.onload = function() {
  // Start typewriter effect
  typeWriter();
  
  // Animate skills when page loads
  animateSkills();
  
  // Handle responsive images
  loadResponsiveImages();
  
  // Adjust AOS for mobile
  adjustAOSForMobile();
  
  // Re-initialize AOS with better mobile settings
  AOS.init({
    offset: window.innerWidth <= 768 ? 50 : 120,
    duration: window.innerWidth <= 768 ? 800 : 1000,
    once: true,
    mirror: false,
    disable: window.innerWidth <= 480 ? 'phone' : false
  });
};

// Handle window resize
window.addEventListener('resize', function() {
  // Update is-mobile detection
  const wasMobile = speed > 100;
  const isMobileNow = window.innerWidth <= 768;
  
  if (wasMobile !== isMobileNow) {
    // Update typewriter speed if device type changed
    speed = isMobileNow ? 150 : 100;
    
    // Refresh AOS
    AOS.refresh();
  }
});
