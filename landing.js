
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.header__toggle');
    const nav = document.querySelector('.header__nav');

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('active');

            // Optional: Animate the hamburger into an "X"
            toggleBtn.classList.toggle('is-open');
        });

        // Close menu when a link is clicked
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggleBtn.classList.remove('is-open');
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--active');
            }
        });
    });

    // Apply this to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    /* --- ROI Calculator Logic --- */
    const spendInput = document.getElementById('spendInput');
    const roasInput = document.getElementById('roasInput');
    const spendValue = document.getElementById('spendValue');
    const roasValue = document.getElementById('roasValue');
    const currentRevEl = document.getElementById('currentRevenue');
    const projectedRevEl = document.getElementById('projectedRevenue');

    if (spendInput && roasInput) {
        function updateCalculator() {
            const spend = parseFloat(spendInput.value);
            const roas = parseFloat(roasInput.value);

            // Format Display Values
            spendValue.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(spend);
            roasValue.textContent = roas.toFixed(1) + 'x';

            // Calculations
            const currentRevenue = spend * roas;
            // Assuming 30% improvement with GrowthMarketer
            const projectedRevenue = currentRevenue * 1.30;

            currentRevEl.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(currentRevenue);
            projectedRevEl.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(projectedRevenue);
        }

        spendInput.addEventListener('input', updateCalculator);
        roasInput.addEventListener('input', updateCalculator);

        // Initialize
        updateCalculator();
    }
});
