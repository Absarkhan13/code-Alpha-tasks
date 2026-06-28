document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    let visibleItems = Array.from(galleryItems); 
   
   filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            visibleItems = [];

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    visibleItems.push(item); 
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

   
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
           
            if (!item.classList.contains('hide')) {
                
                currentIndex = visibleItems.indexOf(item);
                showLightbox();
            }
        });
    });

    function showLightbox() {
        const imgSrc = visibleItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
    }

    function hideLightbox() {
        lightbox.classList.remove('active');
    }

   
    function showNext() {
        currentIndex++;
        
        if (currentIndex >= visibleItems.length) {
            currentIndex = 0;
        }
        showLightbox();
    }

    function showPrev() {
        currentIndex--;
     
        if (currentIndex < 0) {
            currentIndex = visibleItems.length - 1;
        }
        showLightbox();
    }

    
    closeBtn.addEventListener('click', hideLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });

   
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') hideLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});