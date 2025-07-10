const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// GitHub API configuration
const GITHUB_ORG = '1038lab';
const GITHUB_API_URL = `https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&sort=stars&direction=desc`;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// File paths
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'repositories.json');
const CONFIG_FILE_PATH = path.join(process.cwd(), 'config.js');

// Get configuration
async function getConfig() {
  try {
    // Read config.js file content
    const configContent = await fs.readFile(CONFIG_FILE_PATH, 'utf8');
    
    // Extract configuration object
    const configMatch = configContent.match(/const WEBSITE_CONFIG = ({[\s\S]*?});/);
    if (!configMatch) {
      throw new Error('Failed to parse configuration file');
    }
    
    // Use eval to parse configuration object (in controlled environment)
    const configObj = eval(`(${configMatch[1]})`);
    return configObj;
  } catch (error) {
    console.error('Failed to read configuration file:', error);
    return {
      hiddenRepositories: ['.github'],
      customRepositoryInfo: {},
      categories: {}
    };
  }
}

// Fetch repository data
async function fetchRepositories() {
  try {
    console.log('Fetching repository data from GitHub API...');
    
    const response = await axios.get(GITHUB_API_URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });
    
    if (response.status !== 200) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch repository data:', error.message);
    return [];
  }
}

// Process repository data
async function processRepositories(repos, config) {
  const { hiddenRepositories, customRepositoryInfo } = config;
  
  // Filter hidden repositories
  const filteredRepos = repos.filter(repo => !hiddenRepositories.includes(repo.name));
  
  // Process repository data
  return filteredRepos.map(repo => {
    // Get custom information
    const customInfo = customRepositoryInfo[repo.name] || {};
    
    // Determine category
    const category = customInfo.category || categorizeRepo(repo.name, repo.topics || []);
    
    // Determine if has GitHub Pages
    const hasPages = detectGitHubPages(repo, customInfo);
    
    // Build repository object
    return {
      name: repo.name,
      description: customInfo.description || repo.description || '',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      url: repo.html_url,
      has_pages: hasPages,
      pages_url: hasPages ? `https://${GITHUB_ORG}.github.io/${repo.name}` : '',
      category: category,
      featured: !!customInfo.featured,
      image: customInfo.customImage || getRepoImage(repo.name, repo.topics || [])
    };
  });
}

// Categorize repository based on name and topics
function categorizeRepo(name, topics) {
  const lowerName = name.toLowerCase();
  const lowerTopics = topics.map(t => t.toLowerCase());
  
  if (lowerTopics.includes('tts') || lowerTopics.includes('text-to-speech') || lowerName.includes('tts')) {
    return 'audio';
  }
  
  if (lowerTopics.includes('image') || lowerName.includes('image') || lowerTopics.includes('background-removal')) {
    return 'image';
  }
  
  if (lowerTopics.includes('text') || lowerName.includes('text') || lowerTopics.includes('caption')) {
    return 'text';
  }
  
  if (lowerTopics.includes('workflow') || lowerName.includes('workflow')) {
    return 'workflow';
  }
  
  if (lowerName === '1038lab.github.io' || lowerTopics.includes('website')) {
    return 'web';
  }
  
  return 'ai'; // Default category
}

// Get repository image
function getRepoImage(name, topics) {
  // Default images by category
  const images = {
    default: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audio: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    text: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    workflow: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  
  const lowerName = name.toLowerCase();
  const lowerTopics = topics.map(t => t.toLowerCase());
  
  if (lowerTopics.includes('image') || lowerName.includes('image')) {
    return images.image;
  }
  
  if (lowerTopics.includes('tts') || lowerName.includes('tts')) {
    return images.audio;
  }
  
  if (lowerTopics.includes('text') || lowerName.includes('text')) {
    return images.text;
  }
  
  if (lowerTopics.includes('workflow') || lowerName.includes('workflow')) {
    return images.workflow;
  }
  
  if (lowerName === '1038lab.github.io' || lowerTopics.includes('website')) {
    return images.web;
  }
  
  return images.default;
}

// Detect if repository has GitHub Pages
function detectGitHubPages(repo, customInfo) {
  // Prioritize custom information
  if (customInfo.has_pages !== undefined) {
    return customInfo.has_pages;
  }
  
  // Use API response information
  return repo.has_pages === true;
}

// Update news data
function updateNewsData(existingData) {
  // If no existing data, create default news
  if (!existingData || !existingData.news || existingData.news.length === 0) {
    return [
      {
        title: "Website Auto-Update Feature Launched",
        description: "Our website now automatically updates repository data!",
        date: new Date().toISOString().split('T')[0],
        type: "announcement",
        url: `https://github.com/${GITHUB_ORG}`
      }
    ];
  }
  
  // Keep existing news data
  return existingData.news;
}

// Main function
async function main() {
  try {
    // Get configuration
    const config = await getConfig();
    console.log('Configuration loaded');
    
    // Get repository data
    const repos = await fetchRepositories();
    console.log(`Retrieved ${repos.length} repositories`);
    
    // Process repository data
    const processedRepos = await processRepositories(repos, config);
    console.log(`Processed ${processedRepos.length} repositories`);
    
    // Read existing data
    let existingData = {};
    try {
      existingData = await fs.readJson(DATA_FILE_PATH);
    } catch (error) {
      console.log('No existing data file found or invalid format, will create new file');
    }
    
    // Update news data
    const newsData = updateNewsData(existingData);
    
    // Build final data
    const finalData = {
      repositories: processedRepos,
      news: newsData,
      config: {
        hiddenRepositories: config.hiddenRepositories || [],
        categories: config.categories || {},
        contact: {
          email: 'contact@1038lab.com', // Can be retrieved from configuration
          github: `https://github.com/${GITHUB_ORG}`,
          sponsors: `https://github.com/sponsors/${GITHUB_ORG}`
        }
      },
      lastUpdated: new Date().toISOString()
    };
    
    // Ensure directory exists
    await fs.ensureDir(path.dirname(DATA_FILE_PATH));
    
    // Write data
    await fs.writeJson(DATA_FILE_PATH, finalData, { spaces: 2 });
    console.log(`Data updated and saved to ${DATA_FILE_PATH}`);
    
  } catch (error) {
    console.error('Error updating data:', error);
    process.exit(1);
  }
}

// Execute main function
main(); 
