// Website content management configuration
const WEBSITE_CONFIG = {
    // Repositories to hide from the website
    hiddenRepositories: [
        '.github',
        'ComfyUI-Manager',
        // 'ComfyUI-Blip',  // Uncomment to hide this repository
        // Add more repository names to hide
    ],

    // Custom repository information (overrides GitHub API data)
    customRepositoryInfo: {
        'ComfyUI-RMBG': {
            description: 'Advanced AI background removal tool - supports multiple models including RMBG-2.0, INSPYRENET, BEN, etc.',
            category: 'image',
            featured: true, // Mark as featured project
            has_pages: true, // Explicitly mark as having GitHub Pages
            customImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'ComfyUI-OmniGen': {
            description: 'Powerful text-to-image generation and editing model - based on OmniGen technology',
            category: 'ai',
            featured: true,
            has_pages: false // Explicitly mark as not having Pages (if known)
        },
        'ComfyUI-SparkTTS': {
            description: 'Advanced text-to-speech system - leveraging large language models for natural speech generation',
            category: 'audio',
            featured: true,
            has_pages: false // Explicitly mark as not having Pages (if known)
        },
        // Add more custom information
        // To add Pages support for a repository, add: has_pages: true
    },

    // Site content settings
    siteContent: {
        heroTitle: 'AILab',
        heroSubtitle: 'Pioneering AI Innovation',
        heroDescription: 'We create intelligent solutions that transform industries through cutting-edge artificial intelligence and machine learning technologies.',

        projectsTitle: 'Our Projects',
        projectsSubtitle: 'Innovative AI solutions that push the boundaries of what\'s possible',

        aboutTitle: 'About AILab',
        aboutDescription: 'AILab stands at the forefront of artificial intelligence innovation, crafting revolutionary solutions that bridge the gap between imagination and reality.',

        // Social links
        githubUrl: 'https://github.com/1038lab',

        // Contact information
        email: '1038lab@gmail.com', // If available
        website: 'https://1038lab.github.io'
    },

    // Category settings
    categories: {
        'audio': {
            name: 'Audio Processing',
            description: 'Speech synthesis and text-to-speech technologies',
            color: 'blue'
        },
        'image': {
            name: 'Image Processing',
            description: 'Image processing and computer vision',
            color: 'green'
        },
        'ai': {
            name: 'AI & ML',
            description: 'Artificial intelligence and machine learning',
            color: 'purple'
        },
        'text': {
            name: 'Text Processing',
            description: 'Natural language processing and text analysis',
            color: 'indigo'
        },
        'workflow': {
            name: 'Workflow Tools',
            description: 'Automation and workflow management tools',
            color: 'pink'
        },
        'web': {
            name: 'Web & Tools',
            description: 'Website development and tools',
            color: 'gray'
        }
    },

    // API settings
    api: {
        githubOrg: '1038lab',
        cacheTimeout: 10 * 60 * 1000, // 10 minutes cache
        fallbackToStatic: true // Use static data when API fails
    }
};

// Export configuration (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEBSITE_CONFIG;
}
