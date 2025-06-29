// Carousel variables
let currentSlide = 0;
let totalSlides = 4;
let slideInterval = null;
let slidesToShow = getSlidesToShow();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Photo Gallery Modal
let currentModalIndex = 0;
let modalImages = [];

function openModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // Get all gallery images for navigation
    const galleryItems = document.querySelectorAll('.gallery-item');
    modalImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            caption: '' // We don't need captions for navigation
        };
    });
    
    // Find current image index - use more robust matching
    currentModalIndex = modalImages.findIndex(img => {
        // Normalize URLs for comparison
        const normalizedSrc = decodeURIComponent(img.src);
        const normalizedImageSrc = decodeURIComponent(imageSrc);
        return normalizedSrc === normalizedImageSrc || 
               normalizedSrc.endsWith(imageSrc) || 
               imageSrc.endsWith(normalizedSrc);
    });
    
    // Fallback: if not found, set to 0
    if (currentModalIndex === -1) {
        currentModalIndex = 0;
    }
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    
    // Always hide captions in the larger view for cleaner presentation
    modalCaption.style.display = 'none';
    
    // Force ALL images to be large in modal view
    modalImg.classList.add('modal-image-no-caption');
    
    // SUPER AGGRESSIVE styling to ensure large size
    modalImg.style.maxWidth = '99vw !important';
    modalImg.style.maxHeight = '99vh !important';
    modalImg.style.width = 'auto !important';
    modalImg.style.height = 'auto !important';
    modalImg.style.objectFit = 'contain !important';
    
    // Force the styles again after a short delay to ensure they stick
    setTimeout(() => {
        modalImg.style.maxWidth = '99vw';
        modalImg.style.maxHeight = '99vh';
        modalImg.style.width = 'auto';
        modalImg.style.height = 'auto';
        modalImg.style.objectFit = 'contain';
    }, 100);
    
    // Update navigation buttons
    updateModalNavigation();
    
    // Add touch listeners for mobile swipe
    addModalTouchListeners();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Remove touch listeners when modal closes
    removeModalTouchListeners();
}

function nextModalImage() {
    if (modalImages.length > 0) {
        currentModalIndex = (currentModalIndex + 1) % modalImages.length;
        const modalImg = document.getElementById('modalImage');
        const currentImage = modalImages[currentModalIndex];
        
        if (currentImage) {
            modalImg.src = currentImage.src;
            
            // Force ALL images to be large in modal view
            modalImg.classList.add('modal-image-no-caption');
            
            // SUPER AGGRESSIVE styling to ensure large size
            modalImg.style.maxWidth = '99vw !important';
            modalImg.style.maxHeight = '99vh !important';
            modalImg.style.width = 'auto !important';
            modalImg.style.height = 'auto !important';
            modalImg.style.objectFit = 'contain !important';
            
            // Force the styles again after a short delay to ensure they stick
            setTimeout(() => {
                modalImg.style.maxWidth = '99vw';
                modalImg.style.maxHeight = '99vh';
                modalImg.style.width = 'auto';
                modalImg.style.height = 'auto';
                modalImg.style.objectFit = 'contain';
            }, 100);
            
            updateModalNavigation();
        }
    }
}

function prevModalImage() {
    if (modalImages.length > 0) {
        currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
        const modalImg = document.getElementById('modalImage');
        const currentImage = modalImages[currentModalIndex];
        
        if (currentImage) {
            modalImg.src = currentImage.src;
            
            // Force ALL images to be large in modal view
            modalImg.classList.add('modal-image-no-caption');
            
            // SUPER AGGRESSIVE styling to ensure large size
            modalImg.style.maxWidth = '99vw !important';
            modalImg.style.maxHeight = '99vh !important';
            modalImg.style.width = 'auto !important';
            modalImg.style.height = 'auto !important';
            modalImg.style.objectFit = 'contain !important';
            
            // Force the styles again after a short delay to ensure they stick
            setTimeout(() => {
                modalImg.style.maxWidth = '99vw';
                modalImg.style.maxHeight = '99vh';
                modalImg.style.width = 'auto';
                modalImg.style.height = 'auto';
                modalImg.style.objectFit = 'contain';
            }, 100);
            
            updateModalNavigation();
        }
    }
}

function updateModalNavigation() {
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    if (prevBtn && nextBtn) {
        // Show/hide buttons based on image count
        if (modalImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }
}

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    } else if (event.key === 'ArrowRight') {
        nextModalImage();
    } else if (event.key === 'ArrowLeft') {
        prevModalImage();
    }
});

// Touch/Swipe functionality for photo gallery modal
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function handleModalTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleModalTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleModalSwipe();
}

function handleModalSwipe() {
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    
    // Minimum swipe distance to trigger navigation
    const minSwipeDistance = 50;
    
    // Check if it's a horizontal swipe (more horizontal than vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
            // Swipe left - go to next image
            nextModalImage();
        } else {
            // Swipe right - go to previous image
            prevModalImage();
        }
    }
}

// Add touch event listeners to modal when it opens
function addModalTouchListeners() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.addEventListener('touchstart', handleModalTouchStart, { passive: true });
        modal.addEventListener('touchend', handleModalTouchEnd, { passive: true });
        modalImg.addEventListener('touchstart', handleModalTouchStart, { passive: true });
        modalImg.addEventListener('touchend', handleModalTouchEnd, { passive: true });
    }
}

// Remove touch event listeners when modal closes
function removeModalTouchListeners() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.removeEventListener('touchstart', handleModalTouchStart);
        modal.removeEventListener('touchend', handleModalTouchEnd);
        modalImg.removeEventListener('touchstart', handleModalTouchStart);
        modalImg.removeEventListener('touchend', handleModalTouchEnd);
    }
}

// Reviews Carousel Functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.review-card');
    
    if (!track || slides.length === 0) return;
    
    totalSlides = slides.length;
    
    // Set initial position
    updateCarousel();
    updateDots();
    
    // Start auto-play
    startAutoPlay();
    
    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            moveCarousel('next');
        } else if (endX - startX > 50) {
            moveCarousel('prev');
        }
    });
}

function moveCarousel(direction) {
    const maxSlide = totalSlides - slidesToShow;
    if (direction === 'next') {
        currentSlide = Math.min(currentSlide + 1, maxSlide);
    } else {
        currentSlide = Math.max(currentSlide - 1, 0);
    }
    updateCarousel();
    updateDots();
    stopAutoPlay();
    startAutoPlay();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex - 1;
    updateCarousel();
    updateDots();
    stopAutoPlay();
    startAutoPlay();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const slideWidth = 100 / slidesToShow;
    track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(() => {
        moveCarousel('next');
    }, 5000);
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Load reviews from JSON file
async function loadReviewsFromJSON() {
    try {
        console.log('Loading reviews from JSON...');
        const response = await fetch('reviews.json');
        if (!response.ok) {
            throw new Error('Failed to load reviews');
        }
        const data = await response.json();
        
        console.log('Reviews loaded:', data.reviews);
        
        if (data.reviews && data.reviews.length > 0) {
            updateReviewsCarouselFromJSON(data.reviews);
            totalSlides = data.reviews.length;
            console.log('Total slides:', totalSlides);
        }
    } catch (error) {
        console.log('Error loading reviews from JSON:', error.message);
        // Load fallback reviews if JSON fails
        loadFallbackReviews();
    }
}

function updateReviewsCarouselFromJSON(reviews) {
    const carouselTrack = document.querySelector('.carousel-track');
    if (!carouselTrack) {
        console.log('Carousel track not found!');
        return;
    }
    
    console.log('Updating carousel with', reviews.length, 'reviews');
    
    // Clear existing reviews
    carouselTrack.innerHTML = '';
    
    // Add reviews from JSON
    reviews.forEach((review, index) => {
        const reviewCard = createReviewCardFromJSON(review);
        carouselTrack.appendChild(reviewCard);
        console.log('Added review card', index + 1);
    });
    
    // Update carousel dots
    updateCarouselDots(reviews.length);
    
    // Reinitialize carousel
    initCarousel();
}

function createReviewCardFromJSON(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    // Generate stars based on rating
    const stars = generateStars(review.rating);
    
    card.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="reviewer-details">
                    <h4>${review.name}</h4>
                    <div class="review-stars">
                        ${stars}
                    </div>
                </div>
            </div>
            <div class="review-date">${review.date}</div>
        </div>
        <div class="review-content">
            <p>"${review.content}"</p>
        </div>
        <div class="review-highlight">
            <i class="fas fa-quote-left"></i>
            <span>${review.highlight}</span>
        </div>
    `;
    
    return card;
}

function loadFallbackReviews() {
    console.log('Loading fallback reviews...');
    // Simple fallback reviews if JSON fails
    const fallbackReviews = [
        {
            name: "Dehit",
            date: "May 2025",
            rating: 5,
            content: "Really an amazing place to stay in West Maui, you can view spectacular sunsets right from your balcony while enjoying your meal.",
            highlight: "Spectacular sunsets from the balcony"
        }
    ];
    
    updateReviewsCarouselFromJSON(fallbackReviews);
}

function updateCarouselDots(count) {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxSlide = Math.max(1, count - slidesToShow + 1);
    for (let i = 1; i <= maxSlide; i++) {
        const dot = document.createElement('span');
        dot.className = i === 1 ? 'dot active' : 'dot';
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function getSlidesToShow() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

window.addEventListener('resize', () => {
    slidesToShow = getSlidesToShow();
    updateCarousel();
    updateDots();
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Load reviews from JSON file first
    loadReviewsFromJSON().then(() => {
        // Initialize carousel after reviews are loaded
        console.log('Initializing carousel...');
        initCarousel();
        
        // Add carousel navigation event listeners
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => moveCarousel('prev'));
            console.log('Added prev button listener');
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => moveCarousel('next'));
            console.log('Added next button listener');
        }
        
        // Pause auto-play on hover
        const carousel = document.querySelector('.reviews-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
            console.log('Added hover listeners');
        }
    }).catch(error => {
        console.log('Error in initialization:', error);
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let Netlify handle the form submission
            // After a short delay, redirect to success page
            setTimeout(function() {
                window.location.href = '/success.html';
            }, 1000);
        });
    }
});