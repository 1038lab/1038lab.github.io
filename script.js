// Dynamic repositories array (will be populated from data/repositories.json)
let repositories = [];
let websiteConfig = {};

// Load website configuration
async function loadWebsiteConfig() {
    try {
        const response = await fetch('website-config.json');
        if (response.ok) {
            websiteConfig = await response.json();
            console.log('Website config loaded successfully');
        }
    } catch (error) {
        console.log('Using default config');
        websiteConfig = {
            categories: {
                displayNames: {
                    'ai': 'AI',
                    'audio': 'TTS',
                    'web': 'Web'
                }
            }
        };
    }
}

// Load repositories from JSON file (updated by GitHub Actions)
async function fetchGitHubRepos() {
    try {
        console.log('Loading repositories from data file...');
        const response = await fetch('data/repositories.json');

        if (!response.ok) {
            throw new Error(`Data file error: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Loaded ${data.repositories.length} repositories from data file`);

        // The data is already in our format, just return it
        return data.repositories;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        console.log('Falling back to GitHub API for local testing');

        try {
            const response = await fetch('https://api.github.com/orgs/1038lab/repos?per_page=100');
            if (response.ok) {
                const repos = await response.json();

                // Process the API data to match our format
                return repos
                    .filter(repo => !repo.fork && repo.name !== '.github')
                    .map(repo => ({
                        name: repo.name,
                        description: repo.description || '',
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        language: repo.language,
                        topics: repo.topics || [],
                        url: repo.html_url,
                        has_pages: repo.has_pages,
                        pages_url: repo.has_pages ? `https://1038lab.github.io/${repo.name}` : '',
                        category: categorizeRepo(repo.name, repo.topics || []),
                        featured: repo.stargazers_count > 50,
                        image: generateUniqueImage(repo.name)
                    }));
            }
        } catch (apiError) {
            console.error('GitHub API also failed:', apiError);
        }

        return [];
    }
}

// Categorize repository based on name and topics
function categorizeRepo(name, topics) {
    const nameAndTopics = (name + ' ' + topics.join(' ')).toLowerCase();

    if (nameAndTopics.includes('tts') || nameAndTopics.includes('text-to-speech') ||
        nameAndTopics.includes('sparktts') || nameAndTopics.includes('edgetts') ||
        nameAndTopics.includes('megatts') || nameAndTopics.includes('kokoro')) {
        return 'tts';
    }
    if (nameAndTopics.includes('image') || nameAndTopics.includes('rmbg') ||
        nameAndTopics.includes('background') || nameAndTopics.includes('lbm') ||
        nameAndTopics.includes('minimax') || nameAndTopics.includes('captioning') ||
        nameAndTopics.includes('img2txt') || nameAndTopics.includes('blip')) {
        return 'image';
    }
    if (nameAndTopics.includes('web') || nameAndTopics.includes('website') ||
        nameAndTopics.includes('github-pages')) {
        return 'web';
    }
    return 'ai'; // Default category for ComfyUI and other AI projects
}

// Generate unique image for each repository
function generateUniqueImage(repoName) {
    // Create a simple hash from the repo name
    let hash = 0;
    for (let i = 0; i < repoName.length; i++) {
        const char = repoName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Array of different Unsplash image IDs for variety
    const imageIds = [
        '1555949963-aa79dcee981c', // AI/Tech
        '1620712943543-bcc4688e7485', // Digital art
        '1589254065878-42c9da997008', // Audio/Sound
        '1677442136019-21780ecad995', // Neural networks
        '1507003211169-0a1dd7228f2d', // Voice/Speech
        '1558618666-fcd25c85cd64', // Lighting
        '1516280440614-37939bbacd81', // Audio waves
        '1485827404703-89b55fcc595e', // Code/Programming
        '1611162617474-5b21e879e113', // Video/Media
        '1460925895917-afdab827c52f', // Web development
        '1518709268805-4e9042af9f23', // Machine learning
        '1451187580459-43d4b3f05c65', // Data visualization
        '1504639725590-34d0984388bd', // Technology
        '1526374965343-dd52b1852190'  // Innovation
    ];

    const imageId = imageIds[Math.abs(hash) % imageIds.length];
    return `https://images.unsplash.com/photo-${imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
}

// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filter-btn');

// State
let currentFilter = 'all';
let searchTerm = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', async function () {
    // Show loading state
    showLoadingState();

    // Load website configuration first
    await loadWebsiteConfig();

    // Load repositories from GitHub API
    repositories = await fetchGitHubRepos();

    // Ensure all repositories have categories assigned and recategorize if needed
    repositories = repositories.map(repo => {
        // Always recategorize based on name and topics for consistency
        repo.category = categorizeRepo(repo.name, repo.topics || []);
        return repo;
    });

    console.log(`Processed ${repositories.length} repositories with categories`);

    // Update stats in hero section
    updateHeroStats();

    // Render projects and setup
    renderProjects();
    setupEventListeners();
    setupScrollEffects();
});

// Show loading state
function showLoadingState() {
    if (projectsGrid) {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p class="text-gray-600">Loading projects...</p>
            </div>
        `;
    }
}

// Update hero section stats with real data
function updateHeroStats() {
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0);
    const totalRepos = repositories.length;

    // Update project count
    const projectCountEl = document.querySelector('.text-3xl.font-bold.text-gray-900');
    if (projectCountEl && projectCountEl.textContent === '14') {
        projectCountEl.textContent = totalRepos.toString();
    }

    // Update stars count
    const statsElements = document.querySelectorAll('.text-3xl.font-bold.text-gray-900');
    if (statsElements.length >= 2) {
        const starsEl = statsElements[1];
        if (totalStars >= 1000) {
            starsEl.textContent = (totalStars / 1000).toFixed(1) + 'K+';
        } else {
            starsEl.textContent = totalStars.toString();
        }
    }
}

// Render projects
function renderProjects() {
    const filteredRepos = repositories.filter(repo => {
        const matchesFilter = currentFilter === 'all' || repo.category === currentFilter;
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
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

    projectsGrid.innerHTML = filteredRepos.map(repo => `
        <div class="project-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-category="${repo.category}">
            <div class="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                <img src="${repo.image}" alt="${repo.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div class="absolute top-4 right-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                        ${repo.language}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                    <h3 class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        <a href="${repo.url}" target="_blank">${repo.name}</a>
                    </h3>
                    <div class="flex items-center space-x-3 text-sm text-gray-500">
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            ${formatNumber(repo.stars)}
                        </span>
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                            ${formatNumber(repo.forks)}
                        </span>
                    </div>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">${repo.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${repo.topics.slice(0, 3).map(topic => `
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                            ${topic}
                        </span>
                    `).join('')}
                    ${repo.topics.length > 3 ? `<span class="text-xs text-gray-500">+${repo.topics.length - 3} more</span>` : ''}
                </div>
                <a href="${repo.url}" target="_blank" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm">
                    View Project
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                </a>
            </div>
        </div>
    `).join('');

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
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderProjects();
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            button.classList.remove('bg-gray-200', 'text-gray-700');
            button.classList.add('active', 'bg-primary-600', 'text-white');
            currentFilter = button.dataset.filter;
            renderProjects();
        });
    });

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
