// GitHub API configuration
const GITHUB_API_URL = 'https://api.github.com/orgs/1038lab/repos?per_page=100&sort=stars&direction=desc';

// Static fallback data (in case API fails)
const staticRepositories = [
    {
        name: "ComfyUI-RMBG",
        description: "A ComfyUI custom node designed for advanced image background removal and object, face, clothes, and fashion segmentation, utilizing multiple models including RMBG-2.0, INSPYRENET, BEN, BEN2, BiRefNet...",
        stars: 1081,
        forks: 44,
        language: "Python",
        topics: ["image-processing", "background-removal", "comfyui", "ai"],
        url: "https://github.com/1038lab/ComfyUI-RMBG",
        has_pages: true,
        pages_url: "https://1038lab.github.io/ComfyUI-RMBG",
        category: "image",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-OmniGen",
        description: "ComfyUI-OmniGen - A ComfyUI custom node implementation of OmniGen, a powerful text-to-image generation and editing model.",
        stars: 275,
        forks: 22,
        language: "Python",
        topics: ["text-to-image", "omnigen", "comfyui", "ai"],
        url: "https://github.com/1038lab/ComfyUI-OmniGen",
        category: "ai",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-SparkTTS",
        description: "ComfyUI-SparkTTS is a custom ComfyUI node implementation of SparkTTS, an advanced text-to-speech system that harnesses the power of large language models (LLMs) to generate highly accurate and natural-sounding speech.",
        stars: 105,
        forks: 10,
        language: "Python",
        topics: ["tts", "text-to-speech", "comfyui", "sparktts"],
        url: "https://github.com/1038lab/ComfyUI-SparkTTS",
        category: "tts",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-ReduxFineTune",
        description: "ComfyUI-ReduxFineTune is a custom node for ComfyUI that enables advanced style fine-tuning using the Flux Redux approach. It offers multiple unified fusion modes for precise and consistent control over style transfer.",
        stars: 53,
        forks: 3,
        language: "Python",
        topics: ["redux", "flux", "custom-nodes", "comfyui"],
        url: "https://github.com/1038lab/ComfyUI-ReduxFineTune",
        category: "ai",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-EdgeTTS",
        description: "ComfyUI-EdgeTTS is a powerful text-to-speech node for ComfyUI, leveraging Microsoft's Edge TTS capabilities. It enables seamless conversion of text into natural-sounding speech, supporting multiple languages and voices.",
        stars: 46,
        forks: 6,
        language: "Python",
        topics: ["tts", "edge-tts", "comfyui", "microsoft"],
        url: "https://github.com/1038lab/ComfyUI-EdgeTTS",
        category: "tts",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-LBM",
        description: "A ComfyUI custom node for Latent Bridge Matching (LBM), for fast image relighting processing.",
        stars: 46,
        forks: 1,
        language: "Python",
        topics: ["image-relighting", "lbm", "comfyui", "ai"],
        url: "https://github.com/1038lab/ComfyUI-LBM",
        category: "image",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-MegaTTS",
        description: "A ComfyUI custom node based on ByteDance MegaTTS3, enabling high-quality text-to-speech synthesis with voice cloning capabilities for both Chinese and English.",
        stars: 42,
        forks: 3,
        language: "Python",
        topics: ["tts", "megatts", "voice-cloning", "comfyui"],
        url: "https://github.com/1038lab/ComfyUI-MegaTTS",
        category: "tts",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-WildPromptor",
        description: "WildPromptor simplifies prompt creation, organization, and customization in ComfyUI, turning chaotic workflows into an efficient, intuitive process.",
        stars: 36,
        forks: 7,
        language: "Python",
        topics: ["prompt-engineering", "comfyui", "workflow", "ai"],
        url: "https://github.com/1038lab/ComfyUI-WildPromptor",
        category: "ai",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-MiniMax-Remover",
        description: "ComfyUI-MiniMax-Remover is a custom node for ComfyUI that enables fast and efficient object removal using minimax optimization. It works in two stages: first, it trains a remover with a simplified loss function, then applies advanced optimization techniques.",
        stars: 35,
        forks: 3,
        language: "Python",
        topics: ["python", "remover", "comfyui", "customnodes"],
        url: "https://github.com/1038lab/ComfyUI-MiniMax-Remover",
        category: "image",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-Pollinations",
        description: "pollinations API AI Generations - A ComfyUI custom node for accessing Pollinations AI generation services.",
        stars: 34,
        forks: 5,
        language: "Python",
        topics: ["pollinations", "ai-generation", "comfyui", "api"],
        url: "https://github.com/1038lab/ComfyUI-Pollinations",
        category: "ai",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-JoyCaption",
        description: "Joy Caption is a ComfyUI custom node powered by the LLaVA model for efficient, stylized image captioning. Caption Tools nodes handle batch image processing and automatic separation of caption text.",
        stars: 19,
        forks: 1,
        language: "Python",
        topics: ["image-captioning", "llava", "comfyui", "ai"],
        url: "https://github.com/1038lab/ComfyUI-JoyCaption",
        category: "ai",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-KokoroTTS",
        description: "ComfyUI-KokoroTTS: A text-to-speech model that utilizes the Kokoro TTS framework to convert text into natural-sounding speech. It supports multiple voices and languages.",
        stars: 12,
        forks: 2,
        language: "Python",
        topics: ["tts", "kokoro", "comfyui", "multilingual"],
        url: "https://github.com/1038lab/ComfyUI-KokoroTTS",
        category: "tts",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ComfyUI-Blip",
        description: "A lightweight and high-speed ComfyUI custom node for generating image captions using BLIP models. Optimized for both GPU and CPU environments to deliver fast and efficient caption generation.",
        stars: 4,
        forks: 1,
        language: "Python",
        topics: ["img2txt", "custom-nodes", "comfyui", "blip"],
        url: "https://github.com/1038lab/ComfyUI-Blip",
        category: "ai",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "1038lab.github.io",
        description: "Official website showcasing AILab's innovative AI solutions and ComfyUI custom nodes.",
        stars: 0,
        forks: 0,
        language: "HTML",
        topics: ["website", "portfolio", "github-pages"],
        url: "https://github.com/1038lab/1038lab.github.io",
        category: "web",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// Dynamic repositories array (will be populated from API)
let repositories = [];

// GitHub API functions
async function fetchGitHubRepos() {
    try {
        console.log('Fetching repositories from GitHub API...');
        const response = await fetch(GITHUB_API_URL);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();
        console.log(`Fetched ${repos.length} repositories from GitHub`);

        // Filter out unwanted repositories using config
        const hiddenRepos = WEBSITE_CONFIG.hiddenRepositories || [];
        const filteredRepos = repos.filter(repo =>
            !repo.fork &&
            !hiddenRepos.includes(repo.name) &&
            !repo.archived
        );

        console.log(`Filtered to ${filteredRepos.length} repositories`);

        // Convert to our format with custom overrides
        const formattedRepos = filteredRepos.map(repo => {
            const customInfo = WEBSITE_CONFIG.customRepositoryInfo[repo.name] || {};

            // Enhanced GitHub Pages detection
            const hasPages = detectGitHubPages(repo, customInfo);
            const pagesUrl = hasPages ? `https://1038lab.github.io/${repo.name}` : null;

            // Debug logging for Pages detection
            if (repo.name === 'ComfyUI-RMBG' || repo.has_pages || hasPages) {
                console.log(`Pages detection for ${repo.name}:`, {
                    api_has_pages: repo.has_pages,
                    homepage: repo.homepage,
                    custom_override: customInfo.has_pages,
                    final_has_pages: hasPages,
                    pages_url: pagesUrl
                });
            }

            return {
                name: repo.name,
                description: customInfo.description || repo.description || 'No description available',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language || 'Unknown',
                topics: repo.topics || [],
                url: repo.html_url,
                homepage: repo.homepage,
                has_pages: hasPages,
                pages_url: pagesUrl,
                category: customInfo.category || categorizeRepo(repo.name, repo.topics),
                image: customInfo.customImage || getRepoImage(repo.name, repo.topics),
                featured: customInfo.featured || false
            };
        });

        return formattedRepos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        console.log('Falling back to static data');
        return staticRepositories;
    }
}

// Categorize repository based on name and topics
function categorizeRepo(name, topics) {
    const nameUpper = name.toUpperCase();
    const topicsStr = topics.join(' ').toLowerCase();

    if (topics.includes('tts') || nameUpper.includes('TTS')) return 'tts';
    if (topics.includes('image-processing') || nameUpper.includes('RMBG') || nameUpper.includes('LBM') || nameUpper.includes('REMOVER')) return 'image';
    if (nameUpper.includes('GITHUB.IO') || topics.includes('website')) return 'web';
    return 'ai';
}

// Get appropriate image for repository
function getRepoImage(name, topics) {
    const imageMap = {
        'tts': [
            'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        'image': [
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        'ai': [
            'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        'web': [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    };

    const category = categorizeRepo(name, topics);
    const images = imageMap[category] || imageMap['ai'];

    // Use name hash to consistently assign same image to same repo
    const hash = name.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);

    return images[Math.abs(hash) % images.length];
}

// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const newsGrid = document.getElementById('news-grid');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filter-btn');

// State
let currentFilter = 'all';
let searchTerm = '';
let currentSort = 'stars';

// Initialize the page
document.addEventListener('DOMContentLoaded', async function () {
    // Show loading state
    showLoadingState();

    // Load repositories from GitHub API
    repositories = await fetchGitHubRepos();

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
                <p class="text-gray-600">Loading latest repositories...</p>
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
        projectCountEl.textContent = totalRepos;
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
    let filteredRepos = repositories.filter(repo => {
        const matchesFilter = currentFilter === 'all' || repo.category === currentFilter;
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    // Sort repositories
    filteredRepos.sort((a, b) => {
        switch (currentSort) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'forks':
                return b.forks - a.forks;
            case 'updated':
                return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
            case 'stars':
            default:
                return b.stars - a.stars;
        }
    });

    // Update project count
    const projectCountElement = document.getElementById('projectCount');
    if (projectCountElement) {
        projectCountElement.textContent = `Showing ${filteredRepos.length} of ${repositories.length} projects`;
    }

    // Update last updated time
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const now = new Date();
        lastUpdatedElement.innerHTML = `Last updated: <span class="font-medium">${now.toLocaleDateString()}</span>`;
    }

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
        <div class="project-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full" data-category="${repo.category}">
            <div class="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden cursor-pointer" onclick="window.open('${repo.pages_url || repo.url}', '_blank')">
                <img src="${repo.image}" alt="${repo.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div class="absolute top-4 right-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                        ${repo.language}
                    </span>
                </div>
                ${repo.pages_url ? `
                    <div class="absolute top-4 left-4">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"/>
                            </svg>
                            Live
                        </span>
                    </div>
                ` : ''}
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <div class="flex items-start justify-between mb-3">
                    <h3 class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors cursor-pointer" onclick="window.open('${repo.pages_url || repo.url}', '_blank')">
                        ${repo.name}
                    </h3>
                    <div class="flex items-center space-x-3 text-sm text-gray-500 flex-shrink-0">
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
                <p class="text-gray-600 text-sm mb-4 flex-grow">${repo.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${repo.topics.slice(0, 3).map(topic => `
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                            ${topic}
                        </span>
                    `).join('')}
                    ${repo.topics.length > 3 ? `<span class="text-xs text-gray-500">+${repo.topics.length - 3} more</span>` : ''}
                </div>
                <div class="flex justify-between items-center mt-auto">
                    ${repo.pages_url ? `
                        <a href="${repo.pages_url}" target="_blank" class="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"/>
                            </svg>
                            Live Demo
                        </a>
                    ` : '<div></div>'}
                    <a href="${repo.url}" target="_blank" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm">
                        View Repo
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                    </a>
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

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProjects();
        });
    }

    // Filter functionality is now handled by setupFilterEventListeners()

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href === '#') {
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
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

// Update filter buttons to show only categories with content
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

    // Re-setup filter event listeners
    setupFilterEventListeners();
}

// Get display name for category
function getCategoryDisplayName(category) {
    const categoryNames = {
        'ai': 'AI',
        'image': 'Image',
        'text': 'Text',
        'audio': 'Audio',
        'workflow': 'Workflow',
        'web': 'Web'
    };
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

// Setup filter event listeners
function setupFilterEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
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
}

// Render news/updates
function renderNews() {
    if (!newsGrid) return;

    // Generate recent updates based on repository data
    const recentUpdates = repositories
        .filter(repo => repo.featured) // Show only featured projects
        .slice(0, 3) // Limit to 3 items
        .map(repo => ({
            title: `${repo.name} Updated`,
            description: `Latest improvements and features added to ${repo.name}`,
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
            type: 'update',
            repo: repo.name,
            url: repo.url
        }));

    // Add some static news items
    const staticNews = [
        {
            title: 'New AI Model Integration',
            description: 'We\'ve integrated cutting-edge AI models across our ComfyUI ecosystem for enhanced performance.',
            date: new Date('2024-12-15'),
            type: 'announcement',
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
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full ${getNewsTypeColor(news.type)}"></div>
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${news.type}</span>
                </div>
                <span class="text-xs text-gray-400">${formatDate(news.date)}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${news.title}</h3>
            <p class="text-gray-600 text-sm mb-4">${news.description}</p>
            <a href="${news.url}" target="_blank" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm">
                Learn More
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            </a>
        </div>
    `).join('');
}

// Get color class for news type
function getNewsTypeColor(type) {
    switch (type) {
        case 'update': return 'bg-blue-500';
        case 'announcement': return 'bg-green-500';
        case 'milestone': return 'bg-purple-500';
        default: return 'bg-gray-500';
    }
}

// Format date for display
function formatDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

// Enhanced GitHub Pages detection
function detectGitHubPages(repo, customInfo) {
    // 1. Check custom override first (highest priority)
    if (customInfo.has_pages !== undefined) {
        return customInfo.has_pages;
    }

    // 2. Check GitHub API has_pages field
    if (repo.has_pages === true) {
        return true;
    }

    // 3. Check homepage field for github.io URLs
    if (repo.homepage && repo.homepage.includes('github.io')) {
        return true;
    }

    // 4. Known repositories with Pages (manual override)
    const knownPagesRepos = [
        'ComfyUI-RMBG',
        // Add more known repositories here
    ];

    if (knownPagesRepos.includes(repo.name)) {
        console.log(`Manual override: ${repo.name} is known to have Pages`);
        return true;
    }

    return false;
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}
