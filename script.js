// Animation du logo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé');
    // Récupération des éléments
    const logoContainer = document.getElementById('logo-container');
    const main = document.querySelector('main');
    const nav = document.querySelector('.site-nav');
    
    console.log('Éléments récupérés:', { logoContainer, main, nav });
    
    // Cacher le contenu initialement
    if (main) main.classList.add('hidden');
    if (nav) nav.classList.add('hidden');
    
    // Animation après 1 seconde
    setTimeout(function() {
        if (logoContainer) {
            console.log('Démarrage animation logo');
            // Ajouter la classe shrink pour déclencher l'animation
            logoContainer.classList.add('shrink');
            
            // Cacher le logo et montrer le contenu après l'animation
            setTimeout(function() {
                if (logoContainer) logoContainer.style.display = 'none';
                if (main) main.classList.remove('hidden');
                if (nav) nav.classList.remove('hidden');
                document.body.classList.remove('logo-anim');
                console.log('Animation logo terminée');
            }, 1000); // Attendre que l'animation soit terminée
        }
    }, 1000);
});

// Gestion des animations au scroll
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.explication, .explication h2, .explication p, section:nth-of-type(2) article .fixed, section:nth-of-type(2) article .content, .contact-zone, .contact-zone h2, .contact-content-wrapper, .contact-infos, .contact-form');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    
    // Si l'élément est visible dans la fenêtre
    if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
      if (!element.classList.contains('visible')) {
        console.log('Élément visible:', element.className);
        element.classList.add('visible');
      }
    } else {
      if (element.classList.contains('visible')) {
        console.log('Élément masqué:', element.className);
        element.classList.remove('visible');
      }
    }
  });
}

// Ajouter l'écouteur d'événement pour le scroll
window.addEventListener('scroll', () => {
  console.log('Scroll détecté');
  handleScrollAnimations();
});

// Déclencher une première fois pour les éléments déjà visibles
handleScrollAnimations();

// Gestion du bouton retour en haut
const scrollToTopButton = document.querySelector('.scroll-to-top');
console.log('Bouton retour en haut:', scrollToTopButton);

// Afficher/masquer le bouton selon le scroll
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    if (!scrollToTopButton.classList.contains('visible')) {
      console.log('Afficher bouton retour en haut');
      scrollToTopButton.classList.add('visible');
    }
  } else {
    if (scrollToTopButton.classList.contains('visible')) {
      console.log('Masquer bouton retour en haut');
      scrollToTopButton.classList.remove('visible');
    }
  }
});

// Animation de retour en haut
scrollToTopButton.addEventListener('click', () => {
  console.log('Clic sur bouton retour en haut');
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
