// Test script to check GitHub API Pages detection
// This script will help us understand why Pages detection isn't working properly

async function testGitHubPagesDetection() {
    console.log('🔍 Testing GitHub Pages Detection...\n');
    
    try {
        // Test with specific repositories we know have Pages
        const testRepos = [
            'ComfyUI-RMBG',  // We know this has Pages
            'ComfyUI-OmniGen',
            'ComfyUI-SparkTTS'
        ];
        
        console.log('📡 Fetching organization repositories...');
        const orgResponse = await fetch('https://api.github.com/orgs/1038lab/repos?per_page=100&sort=stars&direction=desc');
        
        if (!orgResponse.ok) {
            throw new Error(`GitHub API error: ${orgResponse.status}`);
        }
        
        const allRepos = await orgResponse.json();
        console.log(`✅ Fetched ${allRepos.length} repositories\n`);
        
        // Check each test repository
        for (const repoName of testRepos) {
            const repo = allRepos.find(r => r.name === repoName);
            
            if (repo) {
                console.log(`🔍 Checking ${repoName}:`);
                console.log(`   has_pages: ${repo.has_pages}`);
                console.log(`   homepage: ${repo.homepage || 'null'}`);
                
                // Test if the Pages URL actually works
                const pagesUrl = `https://1038lab.github.io/${repoName}`;
                console.log(`   Testing Pages URL: ${pagesUrl}`);
                
                try {
                    const pagesResponse = await fetch(pagesUrl, { method: 'HEAD' });
                    console.log(`   Pages URL status: ${pagesResponse.status} ${pagesResponse.statusText}`);
                    
                    if (pagesResponse.ok) {
                        console.log(`   ✅ Pages URL is accessible`);
                    } else {
                        console.log(`   ❌ Pages URL is not accessible`);
                    }
                } catch (error) {
                    console.log(`   ❌ Error testing Pages URL: ${error.message}`);
                }
                
                console.log(''); // Empty line for readability
            } else {
                console.log(`❌ Repository ${repoName} not found in API response\n`);
            }
        }
        
        // Check all repositories for Pages
        console.log('📊 Summary of all repositories with Pages info:');
        console.log('Repository Name | has_pages | homepage | Predicted Pages URL');
        console.log(''.padEnd(80, '-'));
        
        allRepos.forEach(repo => {
            const pagesUrl = repo.has_pages ? `https://1038lab.github.io/${repo.name}` : 'N/A';
            const homepage = repo.homepage || 'null';
            
            console.log(`${repo.name.padEnd(20)} | ${String(repo.has_pages).padEnd(9)} | ${homepage.padEnd(15)} | ${pagesUrl}`);
        });
        
        // Count repositories with Pages
        const reposWithPages = allRepos.filter(repo => repo.has_pages);
        console.log(`\n📈 Total repositories with has_pages=true: ${reposWithPages.length}`);
        
        if (reposWithPages.length > 0) {
            console.log('Repositories with Pages enabled:');
            reposWithPages.forEach(repo => {
                console.log(`  - ${repo.name}: https://1038lab.github.io/${repo.name}`);
            });
        }
        
    } catch (error) {
        console.error('❌ Error testing GitHub Pages detection:', error);
    }
}

// Run the test if this script is executed directly
if (typeof window === 'undefined') {
    // Node.js environment
    testGitHubPagesDetection();
} else {
    // Browser environment - expose function globally
    window.testGitHubPagesDetection = testGitHubPagesDetection;
    console.log('🔧 GitHub Pages detection test function loaded. Run testGitHubPagesDetection() in console.');
}

// Alternative: Test individual repository
async function testSingleRepo(repoName) {
    console.log(`🔍 Testing single repository: ${repoName}`);
    
    try {
        const response = await fetch(`https://api.github.com/repos/1038lab/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repo = await response.json();
        
        console.log('Repository details:');
        console.log(`  Name: ${repo.name}`);
        console.log(`  has_pages: ${repo.has_pages}`);
        console.log(`  homepage: ${repo.homepage || 'null'}`);
        console.log(`  default_branch: ${repo.default_branch}`);
        
        // Test Pages URL
        const pagesUrl = `https://1038lab.github.io/${repoName}`;
        console.log(`\n🌐 Testing Pages URL: ${pagesUrl}`);
        
        const pagesResponse = await fetch(pagesUrl, { method: 'HEAD' });
        console.log(`Pages URL status: ${pagesResponse.status} ${pagesResponse.statusText}`);
        
        return {
            name: repo.name,
            has_pages: repo.has_pages,
            homepage: repo.homepage,
            pages_accessible: pagesResponse.ok,
            pages_url: pagesUrl
        };
        
    } catch (error) {
        console.error(`❌ Error testing ${repoName}:`, error);
        return null;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testGitHubPagesDetection, testSingleRepo };
}
