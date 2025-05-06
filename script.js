import gsap from 'https://cdn.skypack.dev/gsap@3.12.2';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap@3.12.2/ScrollTrigger';

// Détection mobile
const isMobile = window.matchMedia('(max-width: 600px)').matches;

if (!CSS.supports('animation-timeline: view()') && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  // Set up all the scroll animations with ScrollTrigger instead.
  // Blanket styles
  gsap.set('.fixed', {
    position: 'fixed',
    inset: 0 });

  gsap.set('.static', {
    position: 'absolute',
    inset: 0,
    zIndex: 6 });

  // First section
  gsap.set('section:first-of-type .fixed', {
    transformOrigin: '50% 0%' });

  gsap.to('section:first-of-type .fixed', {
    scale: '0.35 0.5',
    yPercent: -10,
    scrollTrigger: {
      scrub: 0.5,
      trigger: 'section:first-of-type',
      start: 'top top',
      end: 'bottom 50%' } });


  gsap.to('section:first-of-type .fixed', {
    opacity: 0,
    scrollTrigger: {
      scrub: 0.5,
      trigger: 'section:first-of-type',
      start: 'top top',
      end: 'bottom 75%' } });


  // The second section with image scaling down, etc.
  gsap.set('section:nth-of-type(2) article:first-of-type .fixed', {
    clipPath: 'ellipse(220% 200% at 50% 300%)',
    zIndex: 3 });

  gsap.to('section:nth-of-type(2) article:first-of-type .fixed', {
    clipPath: 'ellipse(220% 200% at 50% 175%)',
    scrollTrigger: {
      scrub: 0.5,
      trigger: 'section:nth-of-type(2) article:first-of-type',
      start: 'top bottom',
      end: 'top top' } });


  gsap.from('section:nth-of-type(2) article:first-of-type img', {
    scale: 5,
    scrollTrigger: {
      scrub: 0.5,
      trigger: 'section:nth-of-type(2) article:first-of-type',
      start: 'top bottom',
      end: 'top top' } });



  gsap.set('.loud-wrap', {
    clipPath: 'inset(0 0 0 0)',
    mask: 'linear-gradient(white 50%, transparent) 0 100% / 100% 200% no-repeat' });

  gsap.set('.text-wrap', {
    position: 'sticky',
    bottom: '4rem',
    transformOrigin: '50% 0' });

  gsap.from('section:nth-of-type(2) article:first-of-type h2', {
    yPercent: 100,
    scrollTrigger: {
      scrub: 0.5,
      trigger: 'section:nth-of-type(2) article:first-of-type',
      start: 'top 50%',
      end: 'top 0%' } });


  gsap.to('section:nth-of-type(2) article:first-of-type .loud-wrap', {
    maskPosition: '0 0',
    scrollTrigger: {
      scrub: 0.5,
      trigger: 'section:nth-of-type(2) article:first-of-type',
      start: 'top 50%',
      end: 'top 0%' } });


  // Blur the text on exit
  gsap.to('section:nth-of-type(2) article:first-of-type .text-wrap', {
    filter: 'blur(4rem)',
    opacity: 0,
    scrollTrigger: {
      scrub: 0.5,
      trigger: 'section:nth-of-type(2) article:first-of-type',
      start: 'bottom 60%',
      end: 'bottom 25%' } });



  


  // Animate the text blocks
  const LINES = document.querySelectorAll('.text-blocks p');
  LINES.forEach((LINE, index) => {
    gsap.from(LINE, {
      yPercent: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: 'section:nth-of-type(2) article:nth-of-type(3)',
        scrub: 0.5,
        start: `top -=${90 + index * 10}%`,
        end: `top -=${100 + index * 10}%` } });


  });
  gsap.to('.text-blocks', {
    opacity: 0,
    scrollTrigger: {
      trigger: 'section:nth-of-type(2) article:nth-of-type(3)',
      scrub: 0.5,
      start: 'bottom 130%',
      end: 'bottom 110%' } });


  gsap.to('.filler h2', {
    opacity: 0,
    filter: 'blur(4rem)',
    scrollTrigger: {
      trigger: 'section:nth-of-type(2) article:nth-of-type(3)',
      scrub: 0.5,
      start: 'bottom 55%',
      end: 'bottom 30%' } });

}

window.addEventListener('scroll', function() {
    const finalBloc = document.querySelector('.final-bloc');
    if (!finalBloc) return;
    // Affiche la page blanche quand on est à la fin du scroll
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        finalBloc.classList.add('show');
    } else {
        finalBloc.classList.remove('show');
    }
});

let triggersKilled = false;
window.addEventListener('scroll', function() {
    const explication = document.querySelector('.explication-contact');
    if (!explication) return;
    const rect = explication.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0 && !triggersKilled) {
        // On est sur la section explication-contact, on tue tous les triggers
        if (ScrollTrigger && ScrollTrigger.getAll) {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            triggersKilled = true;
        }
    }
});

// --- Animations scroll et effets spéciaux ---
if (!isMobile) {
  // Place ici tout le code d'animation/scroll qui ne doit PAS s'exécuter sur mobile
  // (exemple : GSAP, ScrollTrigger, scroll events, etc.)

  window.addEventListener('scroll', function() {
      const explication = document.querySelector('.explication-contact');
      if (!explication) return;
      const rect = explication.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
          // On est sur la section explication-contact, on passe tous les .fixed en static
          document.querySelectorAll('.fixed').forEach(el => {
              el.style.position = 'static';
              el.style.zIndex = '1';
          });
      }
  });
}

// --- Animation du logo d'intro (toujours active) ---
window.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('logo-anim');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
        const logoContainer = document.getElementById('logo-container');
        if (logoContainer) logoContainer.classList.add('shrink');
        setTimeout(function() {
            if (logoContainer) logoContainer.style.display = 'none';
            document.querySelector('.site-nav').classList.remove('hidden');
            document.querySelector('main').classList.remove('hidden');
            document.body.style.overflow = '';
            document.body.classList.remove('logo-anim');
        }, 1000);
    }, 800);

    // Empêche le rechargement du formulaire de contact et affiche un message
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message !');
            contactForm.reset();
        });
    }
});

