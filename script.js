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

        // For local testing, try to fetch from GitHub API directly
        try {
            const apiResponse = await fetch('https://api.github.com/orgs/1038lab/repos?per_page=100&sort=stars&direction=desc');
            if (apiResponse.ok) {
                const repos = await apiResponse.json();
                console.log(`Loaded ${repos.length} repositories from GitHub API`);

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

        // Final fallback - minimal static data
        console.log('Using minimal fallback data');
        return [
            {
                name: "ComfyUI-RMBG",
                description: "Background removal ComfyUI node",
                stars: 1081,
                forks: 44,
                language: "Python",
                topics: ["comfyui", "ai"],
                url: "https://github.com/1038lab/ComfyUI-RMBG",
                has_pages: true,
                pages_url: "https://1038lab.github.io/ComfyUI-RMBG",
                category: "ai",
                featured: true,
                image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
        ];
    }
}

// Categorize repository based on name and topics (only used for dynamic categorization)
function categorizeRepo(name, topics) {
    const nameUpper = name.toUpperCase();

    if (topics.includes('tts') || nameUpper.includes('TTS')) return 'tts';
    if (topics.includes('image-processing') || nameUpper.includes('RMBG') || nameUpper.includes('LBM') || nameUpper.includes('REMOVER')) return 'image';
    if (nameUpper.includes('GITHUB.IO') || topics.includes('website')) return 'web';
    return 'ai';
}

// Generate unique image for each repository (for fallback only)
function generateUniqueImage(repoName) {
    // Different image IDs for variety
    const imageIds = [
        '1620712943543-bcc4688e7485',
        '1677442136019-21780ecad995',
        '1485827404703-89b55fcc595e',
        '1589254065878-42c9da997008',
        '1507003211169-0a1dd7228f2d',
        '1516280440614-37939bbacd81',
        '1555949963-aa79dcee981c',
        '1558618666-fcd25c85cd64',
        '1551288049-bebda4e38f71',
        '1460925895917-afdab827c52f'
    ];

    // Use repo name to consistently pick same image
    const hash = repoName.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);

    const imageId = imageIds[Math.abs(hash) % imageIds.length];
    return `https://images.unsplash.com/photo-${imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
}

// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const newsGrid = document.getElementById('news-grid');
const searchInput = document.getElementById('search');

// State
let currentFilter = 'all';
let searchTerm = '';
let currentSort = 'stars';

// Initialize the page
document.addEventListener('DOMContentLoaded', async function () {
    // Show loading state
    showLoadingState();

    // Load website configuration first
    await loadWebsiteConfig();

    // Load repositories from GitHub API
    repositories = await fetchGitHubRepos();

    // Ensure all repositories have categories assigned
    repositories = repositories.map(repo => {
        if (!repo.category) {
            repo.category = categorizeRepo(repo.name, repo.topics || []);
        }
        return repo;
    });

    console.log(`Processed ${repositories.length} repositories with categories`);

    // Update stats in hero section
    updateHeroStats();

    // Render projects and setup
    renderProjects();
    renderNews();
    updateFilterButtons();
    setupEventListeners();
    setupScrollEffects();
});

// Show loading state while fetching data
function showLoadingState() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-12">
            <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p class="text-gray-600">Loading projects...</p>
            </div>
        </div>
    `;
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
    console.log(`Rendering projects. Total repositories: ${repositories.length}, Current filter: ${currentFilter}`);

    if (!projectsGrid) {
        console.error('Projects grid element not found!');
        return;
    }

    let filteredRepos = repositories.filter(repo => {
        const matchesFilter = currentFilter === 'all' || repo.category === currentFilter;
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())));
        return matchesFilter && matchesSearch;
    });

    console.log(`Filtered repositories: ${filteredRepos.length}`);

    // Sort repositories
    filteredRepos.sort((a, b) => {
        switch (currentSort) {
            case 'stars':
                return b.stars - a.stars;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'updated':
                return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
            default:
                return b.stars - a.stars;
        }
    });

    if (filteredRepos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-gray-500 text-lg">No projects found matching your criteria.</div>
                <p class="text-gray-400 mt-2">Try adjusting your search or filter settings.</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredRepos.map(repo => `
        <div class="project-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="relative h-48 overflow-hidden">
                <img src="${repo.image}" alt="${repo.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                        ${getCategoryDisplayName(repo.category)}
                    </span>
                </div>
                ${repo.featured ? '<div class="absolute top-4 right-4"><span class="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded">FEATURED</span></div>' : ''}
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                    <h3 class="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        ${repo.name}
                    </h3>
                    <div class="flex items-center space-x-3 text-sm text-gray-500">
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            ${repo.stars}
                        </span>
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            ${repo.forks}
                        </span>
                    </div>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">${repo.description}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        ${repo.language ? `<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">${repo.language}</span>` : ''}
                        ${repo.topics.slice(0, 2).map(topic =>
        `<span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">${topic}</span>`
    ).join('')}
                    </div>
                    <div class="flex space-x-2">
                        ${repo.has_pages && repo.pages_url ?
            `<a href="${repo.pages_url}" target="_blank" class="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors">
                                View Project
                            </a>` : ''
        }
                        <a href="${repo.url}" target="_blank" class="px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded hover:bg-gray-700 transition-colors">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add animation to cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Get display name for category
function getCategoryDisplayName(category) {
    // Use config if available, otherwise use defaults
    const categoryNames = websiteConfig.categories?.displayNames || {
        'ai': 'AI',
        'audio': 'TTS',
        'web': 'Web'
    };
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

// Update filter buttons based on available categories
function updateFilterButtons() {
    const filterButtonsContainer = document.querySelector('.flex.flex-wrap.gap-2.justify-center.md\\:justify-start');
    if (!filterButtonsContainer) return;

    // Get available categories from repositories
    const availableCategories = [...new Set(repositories.map(repo => repo.category))];

    // Create filter buttons HTML
    const filterButtonsHTML = `
        <button class="filter-btn active px-4 py-2 rounded-lg bg-primary-600 text-white text-sm sm:text-base transition-colors" data-filter="all">All</button>
        ${availableCategories.map(category => `
            <button class="filter-btn px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm sm:text-base transition-colors" data-filter="${category}">
                ${getCategoryDisplayName(category)}
            </button>
        `).join('')}
    `;

    filterButtonsContainer.innerHTML = filterButtonsHTML;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('filter-btn')) {
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-primary-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });

            e.target.classList.add('active', 'bg-primary-600', 'text-white');
            e.target.classList.remove('bg-gray-200', 'text-gray-700');

            // Update filter and re-render
            currentFilter = e.target.dataset.filter;
            renderProjects();
        }
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            searchTerm = e.target.value;
            renderProjects();
        });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function (e) {
            currentSort = e.target.value;
            renderProjects();
        });
    }
}

// Render news section
function renderNews() {
    if (!newsGrid) return;

    // Generate recent repository updates as news
    const recentUpdates = repositories
        .filter(repo => repo.stars > 10)
        .slice(0, 3)
        .map(repo => ({
            title: `${repo.name} reaches ${repo.stars} stars!`,
            description: `Our ${repo.name} project continues to grow with ${repo.stars} stars and ${repo.forks} forks.`,
            date: new Date(),
            type: 'update',
            url: repo.url
        }));

    // Static news items
    const staticNews = [
        {
            title: 'New ComfyUI Nodes Released',
            description: 'We have released several new ComfyUI custom nodes for advanced AI workflows.',
            date: new Date('2024-12-15'),
            type: 'release',
            url: 'https://github.com/1038lab'
        },
        {
            title: 'Community Milestone',
            description: 'Our projects have reached over 1,000 stars! Thank you for your continued support.',
            date: new Date('2024-12-10'),
            type: 'milestone',
            url: 'https://github.com/1038lab'
        }
    ];

    const allNews = [...recentUpdates, ...staticNews]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6); // Show max 6 news items

    newsGrid.innerHTML = allNews.map(news => `
        <article class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-3">
                <span class="px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                    ${news.type.charAt(0).toUpperCase() + news.type.slice(1)}
                </span>
                <time class="text-sm text-gray-500">
                    ${news.date.toLocaleDateString()}
                </time>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
                <a href="${news.url}" target="_blank" class="hover:text-primary-600 transition-colors">
                    ${news.title}
                </a>
            </h3>
            <p class="text-gray-600 text-sm">${news.description}</p>
        </article>
    `).join('');
}

// Setup scroll effects
function setupScrollEffects() {
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

    // Header background on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-sm');
            } else {
                header.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-sm');
            }
        });
    }
}
