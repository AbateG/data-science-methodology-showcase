// Interactive JavaScript for CRISP-DM Presentation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeTabSystem();
    initializeScrollEffects();
    initializeAnimations();
    initializeMetricsAnimation();
});

// Navigation highlighting and smooth scrolling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Tab system for methodology details
function initializeTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);

            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Scroll-triggered animations and effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    document.querySelectorAll('.overview-card, .technical-card, .impact-card, .segment, .phase, .infra-item, .evaluation-item').forEach(card => {
        observer.observe(card);
    });
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .metric-counter {
            animation: countUp 2s ease-out forwards;
        }

        @keyframes countUp {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Add animation classes to elements
    document.querySelectorAll('.metric').forEach((metric, index) => {
        setTimeout(() => {
            metric.classList.add('metric-counter');
        }, index * 200);
    });
}

// Animated metrics counting
function initializeMetricsAnimation() {
    const metrics = document.querySelectorAll('.metric-value');

    metrics.forEach(metric => {
        const targetValue = metric.textContent;
        const isPercentage = targetValue.includes('%');
        const isRatio = targetValue.includes(':');
        const hasDollar = targetValue.includes('$');
        const hasDecimal = targetValue.includes('.');

        let numericValue;
        if (isRatio) {
            numericValue = parseFloat(targetValue.split(':')[0]);
        } else if (hasDollar) {
            numericValue = parseFloat(targetValue.replace(/[$,M]/g, ''));
        } else {
            numericValue = parseFloat(targetValue.replace(/[^\d.]/g, ''));
        }

        if (!isNaN(numericValue)) {
            animateValue(metric, 0, numericValue, 2000, targetValue);
        }
    });
}

function animateValue(element, start, end, duration, originalFormat) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = start + (end - start) * easeOutQuart;

        // Format the value based on original format
        let displayValue;
        if (originalFormat.includes('$')) {
            if (originalFormat.includes('M')) {
                displayValue = `$${currentValue.toFixed(1)}M`;
            } else {
                displayValue = `$${Math.round(currentValue)}`;
            }
        } else if (originalFormat.includes(':')) {
            displayValue = `${currentValue.toFixed(1)}:1`;
        } else if (originalFormat.includes('%')) {
            displayValue = `${currentValue.toFixed(1)}%`;
        } else if (originalFormat.includes('.')) {
            displayValue = currentValue.toFixed(3);
        } else {
            displayValue = Math.round(currentValue);
        }

        element.textContent = displayValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = originalFormat; // Ensure final value matches exactly
        }
    }

    requestAnimationFrame(update);
}

// Phase circle hover effects
function initializePhaseEffects() {
    const phaseCircles = document.querySelectorAll('.phase-circle');

    phaseCircles.forEach(circle => {
        circle.addEventListener('mouseenter', () => {
            // Add glow effect
            circle.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
        });

        circle.addEventListener('mouseleave', () => {
            circle.style.boxShadow = '';
        });
    });
}

// Feature bar animations
function initializeFeatureBars() {
    const featureBars = document.querySelectorAll('.feature-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueElement = entry.target.querySelector('.feature-value');
                valueElement.style.width = valueElement.getAttribute('style').split(':')[1];
            }
        });
    }, { threshold: 0.5 });

    featureBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Performance table highlighting
function initializeTableEffects() {
    const tableRows = document.querySelectorAll('.performance-table tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
        });

        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTabSystem();
    initializeScrollEffects();
    initializeAnimations();
    initializeMetricsAnimation();
    initializePhaseEffects();
    initializeFeatureBars();
    initializeTableEffects();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();

        const sections = Array.from(document.querySelectorAll('.section'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });

        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            let targetIndex;

            if (e.key === 'ArrowUp' && currentIndex > 0) {
                targetIndex = currentIndex - 1;
            } else if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                targetIndex = currentIndex + 1;
            }

            if (targetIndex !== undefined) {
                const targetSection = sections[targetIndex];
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Update navigation highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}, 10));

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const sections = Array.from(document.querySelectorAll('.section'));
    const currentSection = sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
    });

    if (currentSection) {
        const currentIndex = sections.indexOf(currentSection);
        let targetIndex;

        if (touchEndY > touchStartY + swipeThreshold && currentIndex > 0) {
            // Swipe down - go to previous section
            targetIndex = currentIndex - 1;
        } else if (touchStartY > touchEndY + swipeThreshold && currentIndex < sections.length - 1) {
            // Swipe up - go to next section
            targetIndex = currentIndex + 1;
        }

        if (targetIndex !== undefined) {
            const targetSection = sections[targetIndex];
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}
