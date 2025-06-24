// Complete repository data for 1038lab
const repositories = [
    {
        name: "ComfyUI-RMBG",
        description: "A ComfyUI custom node designed for advanced image background removal and object, face, clothes, and fashion segmentation, utilizing multiple models including RMBG-2.0, INSPYRENET, BEN, BEN2, BiRefNet...",
        stars: 1081,
        forks: 44,
        language: "Python",
        topics: ["image-processing", "background-removal", "comfyui", "ai"],
        url: "https://github.com/1038lab/ComfyUI-RMBG",
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

// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filter-btn');

// State
let currentFilter = 'all';
let searchTerm = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    renderProjects();
    setupEventListeners();
    setupScrollEffects();
});

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
