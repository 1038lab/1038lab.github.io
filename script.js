// Global variables for data
let repositories = [];
let websiteConfig = {};

// Load data from JSON files
async function loadData() {
    try {
        // Load repositories data
        const repoResponse = await fetch('./data/repositories.json');
        if (!repoResponse.ok) {
            throw new Error(`Failed to load repositories: ${repoResponse.status}`);
        }
        const repoData = await repoResponse.json();
        repositories = repoData.repositories || [];

        // Load website config
        const configResponse = await fetch('./website-config.json');
        if (!configResponse.ok) {
            throw new Error(`Failed to load config: ${configResponse.status}`);
        }
        websiteConfig = await configResponse.json();

        // Filter repositories based on config
        repositories = filterRepositories(repositories);

        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        return false;
    }
}

// Filter repositories based on website config
function filterRepositories(repos) {
    const config = websiteConfig.repositories || {};
    const hiddenRepos = config.hiddenRepos || [];
    const filters = config.filters || {};

    return repos.filter(repo => {
        // Skip hidden repositories
        if (hiddenRepos.includes(repo.name)) {
            return false;
        }

        // Skip forks if configured
        if (filters.hideForks && repo.fork) {
            return false;
        }

        // Skip repositories with insufficient stars
        if (filters.minimumStars && repo.stars < filters.minimumStars) {
            return false;
        }

        return true;
    });
}

// DOM elements - will be initialized after DOM loads
let projectsGrid;
let searchInput;

// State
let currentFilter = 'all';
let searchTerm = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', async function () {
    // Initialize DOM elements
    projectsGrid = document.getElementById('projects-grid');
    searchInput = document.getElementById('search');

    const dataLoaded = await loadData();
    if (dataLoaded) {
        updateFilterButtons();
        renderProjects();
        setupEventListeners();
        setupScrollEffects();
    } else {
        // Show error message if data loading fails
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-gray-400 text-6xl mb-4">⚠️</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Failed to load projects</h3>
                    <p class="text-gray-600">Please try refreshing the page.</p>
                </div>
            `;
        }
    }
});

// Update filter buttons based on available categories
function updateFilterButtons() {
    let filterContainer = document.querySelector('div.flex.flex-wrap.gap-2');
    if (!filterContainer) {
        // Try alternative selector
        filterContainer = document.querySelector('.flex-wrap');
        if (!filterContainer) {
            return;
        }
    }

    // Get unique categories from repositories
    const categories = [...new Set(repositories.map(repo => repo.category))].filter(Boolean);

    // Get category display names from config
    const categoryDisplayNames = websiteConfig.categories?.displayNames || {};
    const categoryOrder = websiteConfig.categories?.order || [];

    // Sort categories according to config order
    const sortedCategories = [...categories].sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    // Create "All" button
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active px-4 py-2 rounded-lg bg-primary-600 text-white text-sm sm:text-base';
    allButton.setAttribute('data-filter', 'all');
    allButton.textContent = 'All';

    // Clear existing filter buttons and add new ones
    filterContainer.innerHTML = '';
    filterContainer.appendChild(allButton);

    // Add category buttons
    sortedCategories.forEach(category => {
        const displayName = categoryDisplayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
        const button = document.createElement('button');
        button.className = 'filter-btn px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm sm:text-base';
        button.setAttribute('data-filter', category);
        button.textContent = displayName;
        filterContainer.appendChild(button);
    });
}

// Render projects
function renderProjects() {
    if (!projectsGrid) {
        return;
    }

    const filteredRepos = repositories.filter(repo => {
        const matchesFilter = currentFilter === 'all' || repo.category === currentFilter;
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())));
        return matchesFilter && matchesSearch;
    });

    if (filteredRepos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredRepos.map(repo => {
        const displayConfig = websiteConfig.display || {};
        const maxTopics = displayConfig.maxTopicsDisplay || 3;
        const topics = repo.topics || [];
        const language = repo.language || 'Unknown';
        const description = repo.description || 'No description available';

        // Determine the link destination - prefer GitHub Pages if available
        const projectLink = repo.has_pages && repo.pages_url ? repo.pages_url : repo.url;
        const repoLink = repo.url; // Always link to repository for "View Project"

        return `
        <div class="project-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-category="${repo.category}">
            <div class="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                <img src="${repo.image}" alt="${repo.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div class="absolute top-4 right-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                        ${language}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                    <h3 class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        <a href="${projectLink}" target="_blank">${repo.name}</a>
                    </h3>
                    ${displayConfig.showStarCount !== false || displayConfig.showForkCount !== false ? `
                    <div class="flex items-center space-x-3 text-sm text-gray-500">
                        ${displayConfig.showStarCount !== false ? `
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            ${formatNumber(repo.stars)}
                        </span>
                        ` : ''}
                        ${displayConfig.showForkCount !== false ? `
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            ${formatNumber(repo.forks)}
                        </span>
                        ` : ''}
                    </div>
                    ` : ''}
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">${description}</p>
                ${displayConfig.showTopics !== false && topics.length > 0 ? `
                <div class="flex flex-wrap gap-2 mb-4">
                    ${topics.slice(0, maxTopics).map(topic => `
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                            ${topic}
                        </span>
                    `).join('')}
                    ${topics.length > maxTopics ? `<span class="text-xs text-gray-500">+${topics.length - maxTopics} more</span>` : ''}
                </div>
                ` : ''}
                <a href="${repoLink}" target="_blank" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm">
                    View Project
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                </a>
            </div>
        </div>
        `;
    }).join('');

    // Add animation to cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            renderProjects();
        });
    }

    // Filter functionality - use event delegation for dynamically created buttons
    let filterContainer = document.querySelector('div.flex.flex-wrap.gap-2');
    if (!filterContainer) {
        filterContainer = document.querySelector('.flex-wrap');
    }
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const allFilterButtons = filterContainer.querySelectorAll('.filter-btn');
                allFilterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                });
                e.target.classList.remove('bg-gray-200', 'text-gray-700');
                e.target.classList.add('active', 'bg-primary-600', 'text-white');
                currentFilter = e.target.dataset.filter;
                renderProjects();
            }
        });
    }

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
}

// Setup scroll effects
function setupScrollEffects() {
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}
