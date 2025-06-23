document.addEventListener('DOMContentLoaded', () => {
  console.log('Website loaded successfully.');

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 50,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Form submission handler
  const contactForm = document.querySelector('form');

  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
          alert(`Thank you, ${name}! Your message has been received.`);
          contactForm.reset();
      } else {
          alert('Please fill in all the required fields.');
      }
  });
});
