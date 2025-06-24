// Example implementation of JSON-based data management
// This shows how to integrate JSON files with the current GitHub API approach

class DataManager {
    constructor() {
        this.repositories = [];
        this.news = [];
        this.config = {};
    }

    // Load data from multiple sources
    async loadAllData() {
        try {
            // Load JSON data first (for overrides and static content)
            await this.loadJSONData();
            
            // Load GitHub API data
            const apiData = await this.loadGitHubData();
            
            // Merge data sources
            this.repositories = this.mergeRepositoryData(apiData);
            
            console.log('Data loaded successfully:', {
                repositories: this.repositories.length,
                news: this.news.length
            });
            
            return {
                repositories: this.repositories,
                news: this.news,
                config: this.config
            };
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to current implementation
            return await this.loadFallbackData();
        }
    }

    // Load JSON configuration and overrides
    async loadJSONData() {
        try {
            // Load repository overrides
            const repoResponse = await fetch('/data/repositories.json');
            if (repoResponse.ok) {
                const repoData = await repoResponse.json();
                this.jsonRepositories = repoData.repositories || [];
                this.news = repoData.news || [];
                this.config = repoData.config || {};
            }
        } catch (error) {
            console.warn('JSON data not available, using API only:', error);
            this.jsonRepositories = [];
            this.news = [];
            this.config = {};
        }
    }

    // Load GitHub API data (existing implementation)
    async loadGitHubData() {
        const response = await fetch('https://api.github.com/orgs/1038lab/repos?per_page=100&sort=stars&direction=desc');
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter and format as before
        const hiddenRepos = this.config.hiddenRepositories || ['.github', 'ComfyUI-Manager'];
        return repos.filter(repo => 
            !repo.fork && 
            !hiddenRepos.includes(repo.name) && 
            !repo.archived
        );
    }

    // Merge JSON overrides with GitHub API data
    mergeRepositoryData(apiRepos) {
        return apiRepos.map(apiRepo => {
            // Find JSON override for this repository
            const jsonOverride = this.jsonRepositories.find(j => j.name === apiRepo.name);
            
            if (jsonOverride) {
                // Merge API data with JSON overrides
                return {
                    name: apiRepo.name,
                    description: jsonOverride.description || apiRepo.description,
                    stars: apiRepo.stargazers_count,
                    forks: apiRepo.forks_count,
                    language: apiRepo.language || 'Unknown',
                    topics: apiRepo.topics || [],
                    url: apiRepo.html_url,
                    has_pages: jsonOverride.has_pages || apiRepo.has_pages || false,
                    pages_url: jsonOverride.pages_url || (apiRepo.has_pages ? `https://1038lab.github.io/${apiRepo.name}` : null),
                    category: jsonOverride.category || this.categorizeRepo(apiRepo.name, apiRepo.topics),
                    image: jsonOverride.image || this.getRepoImage(apiRepo.name, apiRepo.topics),
                    featured: jsonOverride.featured || false
                };
            } else {
                // Use API data only
                return {
                    name: apiRepo.name,
                    description: apiRepo.description || 'No description available',
                    stars: apiRepo.stargazers_count,
                    forks: apiRepo.forks_count,
                    language: apiRepo.language || 'Unknown',
                    topics: apiRepo.topics || [],
                    url: apiRepo.html_url,
                    has_pages: apiRepo.has_pages || false,
                    pages_url: apiRepo.has_pages ? `https://1038lab.github.io/${apiRepo.name}` : null,
                    category: this.categorizeRepo(apiRepo.name, apiRepo.topics),
                    image: this.getRepoImage(apiRepo.name, apiRepo.topics),
                    featured: false
                };
            }
        });
    }

    // Fallback to current static data
    async loadFallbackData() {
        // Return current static repositories array
        return {
            repositories: staticRepositories, // From current script.js
            news: [],
            config: {}
        };
    }

    // Helper methods (same as current implementation)
    categorizeRepo(name, topics) {
        const nameUpper = name.toUpperCase();
        
        if (topics.includes('tts') || nameUpper.includes('TTS')) return 'audio';
        if (topics.includes('image-processing') || nameUpper.includes('RMBG') || nameUpper.includes('LBM')) return 'image';
        if (nameUpper.includes('GITHUB.IO') || topics.includes('website')) return 'web';
        if (topics.includes('text') || topics.includes('nlp')) return 'text';
        if (topics.includes('workflow') || topics.includes('automation')) return 'workflow';
        return 'ai';
    }

    getRepoImage(name, topics) {
        const defaultImages = {
            'audio': 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'image': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'ai': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'text': 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'workflow': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'web': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        };
        
        const category = this.categorizeRepo(name, topics);
        return defaultImages[category] || defaultImages['ai'];
    }

    // Validate JSON data structure
    validateData(data) {
        const errors = [];
        
        if (data.repositories) {
            data.repositories.forEach((repo, index) => {
                if (!repo.name) errors.push(`Repository ${index}: missing name`);
                if (!repo.description) errors.push(`Repository ${index}: missing description`);
                if (!repo.category) errors.push(`Repository ${index}: missing category`);
            });
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
}

// Usage example:
/*
// Replace current data loading with:
const dataManager = new DataManager();

document.addEventListener('DOMContentLoaded', async function () {
    showLoadingState();
    
    const data = await dataManager.loadAllData();
    repositories = data.repositories;
    
    updateHeroStats();
    renderProjects();
    renderNews();
    updateFilterButtons();
    setupEventListeners();
    setupScrollEffects();
});
*/

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
