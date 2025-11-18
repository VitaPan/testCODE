$(document).ready(function () {
    $('.hero-slider').slick({
        arrows: true,
        prevArrow: $('.hero-slider__arrow--prev'),
        nextArrow: $('.hero-slider__arrow--next'),
        infinite: true,
        speed: 400,
        fade: true,
        cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        autoplay: false,
        pauseOnHover: true,
        adaptiveHeight: true,
        waitForAnimate: true,
        useCSS: true,
        useTransform: true,

        responsive: [
        {
            breakpoint: 767,
            settings: {
                arrows: false,
            }
        }
    ]
    });

    Fancybox.bind("[data-fancybox]", {});
});

document.addEventListener('DOMContentLoaded', function() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(initMap);
    } else {
        console.error('Yandex Maps not loaded');
    }
});

function initMap() {
    const myMap = new ymaps.Map('map', {
        center: [55.028894, 82.926493],
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    });

    const myPlacemark = new ymaps.Placemark([55.028894, 82.926493], {
            iconContent: 'Депутатская улица, 46',
            balloonContent: 'Школа программирования CoDe'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../assets/placemark.svg',
            iconImageSize: [60, 68],
            iconImageOffset: [-30, -68],
        });

    myMap.geoObjects.add(myPlacemark);
}

function initModal() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.js-open-modal')) {
            Fancybox.show([{
                src: '#callback-modal',
                type: 'inline'
            }]);
        }
    });

    const modalForm = document.querySelector('.modal__form');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Форма отправлена:');
            Fancybox.close();
            this.reset();
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    initModal();
});

function initSmoothScroll() {
    document.addEventListener('click', function(e) {
        const headerLink = e.target.closest('.header__nav-link');
        const footerLink = e.target.closest('.footer__menu-link');
        const link = headerLink || footerLink;
        
        if (link && link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            if (typeof Fancybox !== 'undefined' && Fancybox.getInstance()) {
                Fancybox.close();
            }
        }
    });
}

function initMobileMenu() {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const overlay = document.querySelector('.mobile-overlay');
    const body = document.body;
    
    if (!burger || !nav || !overlay) return;
    
    function openMenu() {
        nav.classList.add('header__nav--open');
        overlay.classList.add('active');
        burger.classList.add('header__burger--active');
        body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        nav.classList.remove('header__nav--open');
        overlay.classList.remove('active');
        burger.classList.remove('header__burger--active');
        body.style.overflow = '';
    }
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (nav.classList.contains('header__nav--open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    overlay.addEventListener('click', closeMenu);
    
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});