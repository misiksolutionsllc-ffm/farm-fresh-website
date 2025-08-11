        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const toggle = document.querySelector('.navbar-toggle');
        const menu = document.querySelector('.navbar-menu');
        
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Scroll animation
        function animateOnScroll() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);


    const sections = document.querySelectorAll('.parallax-section');
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const maxRem = 3 / rem;
  
    sections.forEach(section => {
      const content = section.querySelector('.parallax-content');
      if (!content) return;
  
      // Mouse
      section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
  
        const x = ((offsetX / rect.width) - 0.5) * maxRem * 2;
        const y = ((offsetY / rect.height) - 0.5) * maxRem * 2;
  
        content.style.transform = `translate(${x}rem, ${y}rem)`;
      });
  
      section.addEventListener('mouseleave', () => {
        content.style.transform = 'translate(0, 0)';
      });
    });
  
    // Gyroscope (Device Orientation)
    function enableGyroParallax() {
      window.addEventListener('deviceorientation', (event) => {
        const gamma = event.gamma || 0;
        const beta = event.beta || 0;
  
        const x = (gamma / 45) * maxRem;
        const y = (beta / 45) * maxRem;
  
        sections.forEach(section => {
          const content = section.querySelector('.parallax-content');
          if (content) {
            content.style.transform = `translate(${x}rem, ${y}rem)`;
          }
        });
      });
    }
  
    const motionButton = document.getElementById('enable-motion-btn');
  
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      // iOS 13+
      motionButton.style.display = 'block';
  
      motionButton.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              enableGyroParallax();
              motionButton.remove();
            } else {
              alert("Permission denied for motion effect.");
            }
          })
          .catch(console.error);
      });
    } else if ('DeviceOrientationEvent' in window) {
      // Android or old iOS
      enableGyroParallax();
    }

    // document.addEventListener("DOMContentLoaded", () => {
    //   const tabs = document.querySelectorAll('.how-tab');
    //   const panels = document.querySelectorAll('.how-panel');
    
    //   tabs.forEach(tab => {
    //     tab.addEventListener('click', () => {
    //       tabs.forEach(t => t.classList.remove('active'));
    //       tab.classList.add('active');
    
    //       const targetId = tab.getAttribute('data-target');
    //       panels.forEach(panel => {
    //         panel.classList.toggle('hidden', panel.id !== targetId);
    //       });
    //     });
    //   });
    // });
    
    // document.querySelectorAll('.accordion-icon').forEach(icon => {
    //   icon.addEventListener('click', () => {
    //     const accordion = icon.closest('.accordion');
    //     accordion.classList.toggle('active');
    //   });
    // });
    
// // Диаграмма контур
// const ctx = document.getElementById('marketChart').getContext('2d');
// const chartCanvas = document.getElementById('marketChart');
// if (window.innerWidth <= 320) {
//   chartCanvas.height = 163;
// } 

// chartCanvas.style.display = 'block';
// const marketChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
//     datasets: [{
//       label: 'Market Value ($B)',
//       data: [10.7, 12.5, 15.2, 18.7, 22.3, 27.8],
//       backgroundColor: 'transparent',
//       borderColor: 'white',
//       borderWidth: 2,
//       borderRadius: 10,
//       borderSkipped: false
//     }]
//   },
//   options: {
//     plugins: {
//       legend: { display: false },
//       datalabels: {
//         anchor: 'center',
//         align: 'center',
//         color: '#fff',
//         font: {
//           weight: 'bold'
//         },
//         rotation: function(context) {
//           return window.innerWidth < 576 ? -90 : 0;
//         },
//         formatter: value => `$${value}B`
//       },
//       tooltip: {
//         backgroundColor: 'rgba(0,0,0,0.7)',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//         padding: 10
//       }
//     },
//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: { color: '#fff', font: { weight: '600' } }
//       },
//       y: {
//         grid: { display: false },
//         ticks: { display: false }
//       }
//     }
//   },
//   plugins: [ChartDataLabels]
// });