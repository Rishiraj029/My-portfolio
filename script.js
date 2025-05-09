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

// Typewriter effect
const texts = [
  "DEVELOPER",
  "DATA SCIENTIST",
  "PROGRAMMER",
  "WEB DESIGNER"
];

let speed = 100;
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

// Sticky navbar
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
  }, { threshold: 0.5 });
  
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for navbar
        behavior: 'smooth'
      });
    }
  });
});

// Initialize
window.onload = function() {
  // Start typewriter effect
  typeWriter();
  
  // Animate skills when page loads
  animateSkills();
  
  // Re-initialize AOS for better control
  AOS.init({
    offset: 120,
    duration: 1000,
    once: true,
    mirror: false
  });
};
