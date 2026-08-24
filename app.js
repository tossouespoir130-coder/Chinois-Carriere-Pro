/**
 * Chinois Carrière Pro - Masterclass Scripts, Ticker, Carousel & FAQ
 */

document.addEventListener('DOMContentLoaded', () => {
    initTicker();
    initCarousel();
    initFaq();
    initQuickRegistration();
});

/* ==========================================================================
   1. Dynamic Hero Ticker Rotation (3.2s)
   ========================================================================== */
function initTicker() {
    const tickerItems = document.querySelectorAll('.ticker-content');
    if (!tickerItems.length) return;

    let currentIndex = 0;

    setInterval(() => {
        tickerItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % tickerItems.length;
        tickerItems[currentIndex].classList.add('active');
    }, 3200);
}

/* ==========================================================================
   2. Carousel Slider Logic (Durée doublée à 6.4s & Transition fluide)
   ========================================================================== */
function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const sliderTrack = document.getElementById('sliderTrack');

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    function next() {
        showSlide(currentSlide + 1);
    }

    function prev() {
        showSlide(currentSlide - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
        next();
        resetTimer();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prev();
        resetTimer();
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            resetTimer();
        });
    });

    function startTimer() {
        // Durée de 20 secondes par slide pour une lecture posée
        slideInterval = setInterval(next, 20000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    if (sliderTrack) {
        sliderTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderTrack.addEventListener('mouseleave', startTimer);
    }

    startTimer();
}

/* ==========================================================================
   3. FAQ Accordion Logic
   ========================================================================== */
function initFaq() {
    const faqCards = document.querySelectorAll('[data-faq]');

    faqCards.forEach(card => {
        const questionBtn = card.querySelector('.faq-question');
        const answer = card.querySelector('.faq-answer');

        if (card.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }

        questionBtn.addEventListener('click', () => {
            const isActive = card.classList.contains('active');

            // Close other cards
            faqCards.forEach(other => {
                other.classList.remove('active');
                const otherAnswer = other.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });

            // Toggle selected
            if (!isActive) {
                card.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/* ==========================================================================
   4. Quick Registration Modal & WhatsApp
   ========================================================================== */
window.openRegistrationModal = function() {
    const modal = document.getElementById('registrationModal');
    if (modal) modal.classList.add('open');
};

window.closeRegistrationModal = function() {
    const modal = document.getElementById('registrationModal');
    if (modal) modal.classList.remove('open');
};

function initQuickRegistration() {
    const modal = document.getElementById('registrationModal');
    const form = document.getElementById('quickRegisterForm');

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeRegistrationModal();
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('regName').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const profession = document.getElementById('regProfession').value.trim();

            const msg = encodeURIComponent(
                `*Bonjour Espoir Chinois (Chinois Carrière Pro)* 🇨🇳\n\n` +
                `Je souhaite réserver ma place pour la Masterclass :\n` +
                `👤 *Nom :* ${name}\n` +
                `📱 *WhatsApp :* ${phone}\n` +
                `💼 *Profession :* ${profession}\n\n` +
                `Merci de me confirmer mon inscription !`
            );

            // Redirection WhatsApp
            window.open(`https://wa.me/?text=${msg}`, '_blank');
            closeRegistrationModal();
            form.reset();
        });
    }
}
