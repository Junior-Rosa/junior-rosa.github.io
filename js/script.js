let projects = [];

// DOM Elements
const projectsContainer = document.getElementById('projects-container');
const projectSearch = document.getElementById('project-search');
const projectFilters = document.querySelectorAll('.project-filter');
const projectModal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const backToTop = document.getElementById('back-to-top');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

const typewriterEl = document.querySelector('.typewriter');
const text = "Desenvolvedor de Soluções";
let index = 0;

function typeText() {
    if (index < text.length) {
        typewriterEl.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 100); 
    }
}

typeText();

(function(){
    emailjs.init("dkrNsLfsiO-Xv3aFD"); 
})();


// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load projects from JSON
    fetch('data/projects.json')
        .then(res => res.json())
        .then(data => {
            projects = data;
            renderProjects(projects);
        })
        .catch(err => {
            console.error('Erro ao carregar projetos:', err);
            renderProjects([]);
        });

    const htmlElement = document.documentElement;

    if (localStorage.getItem('darkMode') === 'true') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-600"></i>';
    }
    
    // Smooth scrolling for anchor links (skip modal external links, they get their real href set later)
    document.querySelectorAll('a[href^="#"]:not(#modal-live-link):not(#modal-code-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });
});

// Render projects to the page
function renderProjects(projectsToRender) {
    projectsContainer.innerHTML = '';
    if (projectsToRender.length === 0) {
        const noProjects = document.createElement('div');
        noProjects.className = 'col-span-full flex flex-col items-center justify-center py-20 animate-pulse text-gray-600 dark:text-gray-300';
        noProjects.innerHTML = `
            <svg class="w-16 h-16 mb-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-xl font-medium">Nenhum projeto encontrado no momento.</p>
            <p class="text-sm mt-2 text-gray-500 dark:text-gray-400">Por favor, volte mais tarde ou entre em contato para saber mais.</p>
        `;
        projectsContainer.appendChild(noProjects);
        return;
    }

    projectsToRender.forEach(project => {
        const images = project.images || [];
        const thumb = images.length
            ? `<img src="${images[0]}" alt="${project.title}" class="w-full h-48 object-cover">`
            : `<div class="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"><i class="fas fa-image text-4xl"></i></div>`;

        const projectCard = document.createElement('div');
        projectCard.className = 'bg-white rounded-xl overflow-hidden shadow-md card-hover dark:bg-gray-800 dark:border dark:border-gray-700 flex flex-col min-h-[500px]';
        projectCard.innerHTML = `
    ${thumb}
    <div class="p-6 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">${project.title}</h3>
            <span class="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide dark:bg-indigo-900 dark:text-indigo-200">
                ${project.tags[0]}
            </span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
        <div class="flex flex-wrap gap-2 mb-4">
            ${project.technologies.slice(0, 3).map(tech =>
                `<span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full dark:bg-gray-700 dark:text-gray-200">${tech}</span>`
            ).join('')}
        </div>
        <button class="view-project-btn mt-auto w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                data-id="${project.id}">
            Detalhes do projeto
        </button>
    </div>`;
        projectsContainer.appendChild(projectCard);
    });
    
    // Add event listeners to view project buttons
    document.querySelectorAll('.view-project-btn').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = parseInt(button.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);
            openProjectModal(project);
        });
    });
}

// Open project modal with details
function openProjectModal(project) {
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;

    renderCarousel(project.images || []);

    // Set technologies
    const technologiesList = document.getElementById('modal-technologies');
    technologiesList.innerHTML = '';
    project.technologies.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        technologiesList.appendChild(li);
    });

    // Set details
    const detailsList = document.getElementById('modal-details');
    detailsList.innerHTML = '';
    project.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
    });

    // Set links (hide button when project has no public link, e.g. private repo)
    const liveLinkEl = document.getElementById('modal-live-link');
    if (project.liveLink) {
        liveLinkEl.href = project.liveLink;
        liveLinkEl.classList.remove('hidden');
        liveLinkEl.classList.add('inline-flex');
    } else {
        liveLinkEl.classList.add('hidden');
        liveLinkEl.classList.remove('inline-flex');
    }

    const codeLinkEl = document.getElementById('modal-code-link');
    if (project.codeLink) {
        codeLinkEl.href = project.codeLink;
        codeLinkEl.classList.remove('hidden');
        codeLinkEl.classList.add('inline-flex');
    } else {
        codeLinkEl.classList.add('hidden');
        codeLinkEl.classList.remove('inline-flex');
    }

    // Set tags
    const tagsContainer = document.querySelector('#project-modal .flex.flex-wrap.gap-2.mb-4');
    tagsContainer.innerHTML = '';
    project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full uppercase font-semibold tracking-wide dark:bg-indigo-900 dark:text-indigo-200';
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });

    // Show modal
    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Carousel state and rendering
let currentSlide = 0;

function renderCarousel(images) {
    currentSlide = 0;
    const track = document.getElementById('modal-carousel');
    const dots = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    track.innerHTML = '';
    dots.innerHTML = '';

    if (!images.length) {
        track.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500"><i class="fas fa-image text-4xl"></i></div>`;
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
        return;
    }

    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Screenshot ${i + 1}`;
        img.className = `carousel-slide absolute inset-0 w-full h-full object-contain cursor-zoom-in transition-opacity duration-300 ${i === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
        img.addEventListener('click', () => openLightbox(src));
        track.appendChild(img);
    });

    if (images.length > 1) {
        images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `w-2.5 h-2.5 rounded-full transition ${i === 0 ? 'bg-white' : 'bg-white/50'}`;
            dot.addEventListener('click', () => showSlide(i));
            dots.appendChild(dot);
        });
        prevBtn.classList.remove('hidden');
        prevBtn.classList.add('flex');
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('flex');
    } else {
        prevBtn.classList.add('hidden');
        prevBtn.classList.remove('flex');
        nextBtn.classList.add('hidden');
        nextBtn.classList.remove('flex');
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('#modal-carousel .carousel-slide');
    const dots = document.querySelectorAll('#carousel-dots button');
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((s, i) => {
        s.classList.toggle('opacity-100', i === currentSlide);
        s.classList.toggle('opacity-0', i !== currentSlide);
        s.classList.toggle('pointer-events-none', i !== currentSlide);
    });
    dots.forEach((d, i) => {
        d.classList.toggle('bg-white', i === currentSlide);
        d.classList.toggle('bg-white/50', i !== currentSlide);
    });
}

// Image lightbox (zoom)
const imageLightbox = document.getElementById('image-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
    lightboxImage.src = src;
    imageLightbox.classList.remove('hidden');
    imageLightbox.classList.add('flex');
}

function closeLightbox() {
    imageLightbox.classList.add('hidden');
    imageLightbox.classList.remove('flex');
}

lightboxClose.addEventListener('click', closeLightbox);
imageLightbox.addEventListener('click', (e) => {
    if (e.target === imageLightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Close project modal
function closeProjectModal() {
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Filter projects based on search and filter
function filterProjects() {
    const searchTerm = projectSearch.value.toLowerCase();
    const activeFilter = document.querySelector('.project-filter.bg-indigo-100')?.dataset.filter || 'all';
    
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm) || 
                             project.description.toLowerCase().includes(searchTerm) ||
                             project.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
        
        const matchesFilter = activeFilter === 'all' || project.tags.includes(activeFilter);
        
        return matchesSearch && matchesFilter;
    });
    
    renderProjects(filteredProjects);
}

// Event Listeners
projectSearch.addEventListener('input', filterProjects);

projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        projectFilters.forEach(f => f.classList.remove('bg-indigo-100', 'text-indigo-700', 'dark:bg-indigo-900', 'dark:text-indigo-100'));
        filter.classList.add('bg-indigo-100', 'text-indigo-700', 'dark:bg-indigo-900', 'dark:text-indigo-100');
        filterProjects();
    });
});

document.getElementById('current-year').textContent = new Date().getFullYear();

closeModal.addEventListener('click', closeProjectModal);

document.getElementById('carousel-prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.getElementById('carousel-next').addEventListener('click', () => showSlide(currentSlide + 1));

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Toggle dark mode
// function toggleDarkMode() {

//     const htmlElement = document.documentElement;
//     const tema = htmlElement.getAttribute('data-theme');
//     document.body.classList.toggle('dark-mode');
    
//     if (document.body.classList.contains('dark-mode')) {
//         localStorage.setItem('darkMode', 'true');
//         themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
//     } else {
//         localStorage.setItem('darkMode', 'false');
//         themeToggle.innerHTML = '<i class="fas fa-moon text-gray-600"></i>';
//     }
// }

function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {

        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('darkMode', 'false');
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-600"></i>';
    } else {
        // Alterna para modo escuro
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'true');
        themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    }
}

themeToggle.addEventListener('click', toggleDarkMode);
themeToggleMobile.addEventListener('click', toggleDarkMode);

// Mobile menu toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


function getFormattedTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}-${month}-${year} ${hour}:${minute}`;
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    document.getElementById('timestamp').value = getFormattedTimestamp();
    console.log('Form submitted:', contactForm);
    emailjs.sendForm('portfolio', 'template_5dbsos4', contactForm)
        .then(() => {
            contactForm.reset();
            formSuccess.classList.remove('hidden');
            setTimeout(() => formSuccess.classList.add('hidden'), 3000);
        }, (error) => {
            console.error('Erro ao enviar:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        });
});


// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});