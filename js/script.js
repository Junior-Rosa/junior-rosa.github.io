const projects = [
    // {
    //     id: 1,
    //     title: "E-commerce Platform",
    //     description: "A full-featured e-commerce platform with product listings, cart functionality, and secure checkout.",
    //     image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    //     tags: ["web", "react", "node"],
    //     technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    //     details: ["Responsive design", "User authentication", "Product search and filtering", "Order tracking"],
    //     liveLink: "https://example-ecommerce.com",
    //     codeLink: "https://github.com/example/ecommerce"
    // },
    // {
    //     id: 2,
    //     title: "Task Management App",
    //     description: "A productivity app for managing tasks with drag-and-drop functionality and team collaboration features.",
    //     image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    //     tags: ["web", "mobile", "react"],
    //     technologies: ["React Native", "Firebase", "Redux"],
    //     details: ["Cross-platform (iOS & Android)", "Real-time updates", "Task categorization", "Due date reminders"],
    //     liveLink: "https://example-taskapp.com",
    //     codeLink: "https://github.com/example/taskapp"
    // },
    // {
    //     id: 3,
    //     title: "Weather API Service",
    //     description: "A RESTful API that provides weather data for locations worldwide with historical data access.",
    //     image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    //     tags: ["api", "node"],
    //     technologies: ["Node.js", "Express", "MongoDB", "Redis"],
    //     details: ["Geolocation support", "Caching for performance", "Rate limiting", "JSON responses"],
    //     liveLink: "https://api.example-weather.com",
    //     codeLink: "https://github.com/example/weather-api"
    // },
    // {
    //     id: 4,
    //     title: "Social Media Dashboard",
    //     description: "Analytics dashboard for social media managers to track performance across multiple platforms.",
    //     image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    //     tags: ["web", "react"],
    //     technologies: ["React", "Chart.js", "Twitter API", "Instagram API"],
    //     details: ["Data visualization", "Custom date ranges", "Export reports", "Multi-account support"],
    //     liveLink: "https://example-social-dashboard.com",
    //     codeLink: "https://github.com/example/social-dashboard"
    // },
    // {
    //     id: 5,
    //     title: "Fitness Tracker Mobile App",
    //     description: "Mobile application for tracking workouts, nutrition, and progress with personalized recommendations.",
    //     image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    //     tags: ["mobile", "react"],
    //     technologies: ["React Native", "Firebase", "Apple HealthKit", "Google Fit API"],
    //     details: ["Workout logging", "Nutrition tracking", "Progress photos", "Community challenges"],
    //     liveLink: "https://example-fitnesstracker.com",
    //     codeLink: "https://github.com/example/fitness-tracker"
    // },
    // {
    //     id: 6,
    //     title: "Document Management API",
    //     description: "Backend service for uploading, storing, and managing documents with role-based access control.",
    //     image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    //     tags: ["api", "node"],
    //     technologies: ["Node.js", "AWS S3", "JWT Authentication", "PostgreSQL"],
    //     details: ["File versioning", "Metadata storage", "PDF preview generation", "Audit logging"],
    //     liveLink: "https://api.example-docs.com",
    //     codeLink: "https://github.com/example/doc-management"
    // }
];

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
    // Load projects
    renderProjects(projects);
    const htmlElement = document.documentElement;

    if (localStorage.getItem('darkMode') === 'true') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-600"></i>';
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
        const projectCard = document.createElement('div');
        projectCard.className = 'bg-white rounded-xl overflow-hidden shadow-md card-hover dark:bg-gray-800 dark:border dark:border-gray-700';
        projectCard.className = 'bg-white rounded-xl overflow-hidden shadow-md card-hover dark:bg-gray-800 dark:border dark:border-gray-700 flex flex-col min-h-[500px]';
        projectCard.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
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
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-image').alt = project.title;
    document.getElementById('modal-description').textContent = project.description;
    
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
    
    // Set links
    document.getElementById('modal-live-link').href = project.liveLink;
    document.getElementById('modal-code-link').href = project.codeLink;
    
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

closeModal.addEventListener('click', closeProjectModal);

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