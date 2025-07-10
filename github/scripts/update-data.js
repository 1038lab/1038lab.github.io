// Simple GitHub repository data update script
const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const GITHUB_ORG = '1038lab';
const API_URL = `https://api.github.com/users/${GITHUB_ORG}/repos?per_page=100&sort=stars&direction=desc`;
const DATA_FILE = path.join(process.cwd(), 'data', 'repositories.json');

// Get repository category based on name and topics
function getCategory(name, topics) {
  const lowerName = name.toLowerCase();
  const lowerTopics = topics.map(t => t.toLowerCase());

  if (lowerTopics.includes('tts') || lowerName.includes('tts')) return 'audio';
  if (lowerTopics.includes('image') || lowerName.includes('image')) return 'image';
  if (lowerName === '1038lab.github.io') return 'web';
  return 'ai';
}

// Get repository image based on category
function getImage(name, topics) {
  const images = {
    audio: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ai: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };

  const category = getCategory(name, topics);
  return images[category] || images.ai;
}

// Fetch GitHub repository data with safety checks
function fetchRepositories() {
  return new Promise((resolve, reject) => {
    console.log('Fetching repository data from GitHub API...');

    https.get(API_URL, {
      headers: {
        'User-Agent': 'GitHub-Update-Script',
        'Accept': 'application/vnd.github.v3+json'
      }
    }, (res) => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const repos = JSON.parse(data);
          console.log(`Retrieved ${repos.length} repositories`);

          // Safety check: ensure data is an array
          if (!Array.isArray(repos)) {
            console.error('API returned non-array data:', repos);
            reject(new Error('API returned invalid data format'));
            return;
          }

          // Safety check: ensure we have reasonable amount of data
          if (repos.length < 5) {
            console.error(`Only ${repos.length} repositories found, this seems too low`);
            reject(new Error('Insufficient repository data - possible API issue'));
            return;
          }

          resolve(repos);
        } catch (error) {
          console.error('Failed to parse JSON data:', error);
          console.error('Raw data preview:', data.substring(0, 200) + '...');
          reject(error);
        }
      });

    }).on('error', (error) => {
      console.error('Failed to fetch data:', error);
      reject(error);
    });
  });
}

// Process repository data with filtering and formatting
function processRepositories(repos) {
  console.log(`Processing ${repos.length} repositories`);

  // Filter out unwanted repositories
  const filteredRepos = repos.filter(repo =>
    !repo.name.startsWith('.') &&
    repo.name !== 'ComfyUI-Manager'
  );

  console.log(`After filtering: ${filteredRepos.length} repositories remain`);

  // Convert to our required format
  return filteredRepos.map(repo => ({
    name: repo.name,
    description: repo.description || '',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics || [],
    url: repo.html_url,
    has_pages: repo.has_pages,
    pages_url: repo.has_pages ? `https://1038lab.github.io/${repo.name}` : '',
    category: getCategory(repo.name, repo.topics || []),
    featured: repo.stargazers_count > 50, // Featured if more than 50 stars
    image: getImage(repo.name, repo.topics || [])
  }));
}

// Main function with comprehensive safety checks
async function main() {
  try {
    console.log('Starting repository data update...');

    // Create backup of existing data first
    let existingData = null;
    if (fs.existsSync(DATA_FILE)) {
      try {
        const backupContent = fs.readFileSync(DATA_FILE, 'utf8');
        existingData = JSON.parse(backupContent);

        // Create backup file
        const backupFile = DATA_FILE + '.backup';
        fs.writeFileSync(backupFile, backupContent);
        console.log('Created backup of existing data');
      } catch (error) {
        console.warn('Could not create backup:', error.message);
      }
    }

    // Fetch repository data
    const repos = await fetchRepositories();

    if (repos.length === 0) {
      console.error('No repository data retrieved');
      if (existingData) {
        console.log('Keeping existing data due to API failure');
        return;
      }
      process.exit(1);
    }

    // Process repository data
    const processedRepos = processRepositories(repos);

    // Safety check: ensure we have reasonable amount of processed data
    if (processedRepos.length < 5) {
      console.error(`Only ${processedRepos.length} repositories after processing`);
      if (existingData && existingData.repositories && existingData.repositories.length > processedRepos.length) {
        console.log('Keeping existing data - new data seems insufficient');
        return;
      }
    }

    // Create final data structure
    const finalData = {
      repositories: processedRepos,
      lastUpdated: new Date().toISOString()
    };

    // Ensure directory exists
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write data to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(finalData, null, 2));

    // Verify written data
    try {
      const verifyData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      if (!verifyData.repositories || verifyData.repositories.length !== processedRepos.length) {
        throw new Error('Data verification failed');
      }
    } catch (verifyError) {
      console.error('Data verification failed:', verifyError);
      // Restore backup if available
      const backupFile = DATA_FILE + '.backup';
      if (fs.existsSync(backupFile)) {
        fs.copyFileSync(backupFile, DATA_FILE);
        console.log('Restored backup due to verification failure');
      }
      process.exit(1);
    }

    console.log(`✅ Successfully updated data with ${processedRepos.length} repositories`);
    console.log(`📁 Data saved to: ${DATA_FILE}`);

  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

// Run script if called directly
if (require.main === module) {
  main();
}

