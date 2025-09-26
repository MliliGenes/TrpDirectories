#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Validate the TrpDirectories Blog System
 */
function validateSystem() {
    console.log('🔍 Validating TrpDirectories Blog System...\n');
    
    const checks = [
        {
            name: 'Guide Configuration',
            check: () => fs.existsSync('./guides-config.json')
        },
        {
            name: 'Articles Directory',
            check: () => fs.existsSync('./articles') && fs.statSync('./articles').isDirectory()
        },
        {
            name: 'JSON Article Files',
            check: () => {
                const articlesDir = './articles';
                if (!fs.existsSync(articlesDir)) return false;
                const files = fs.readdirSync(articlesDir);
                const jsonFiles = files.filter(f => f.endsWith('.json'));
                return jsonFiles.length > 0;
            }
        },
        {
            name: 'Guides Directory',
            check: () => fs.existsSync('./guides') && fs.statSync('./guides').isDirectory()
        },
        {
            name: 'Generated Guide Structures',
            check: () => {
                try {
                    const config = JSON.parse(fs.readFileSync('./guides-config.json', 'utf8'));
                    return config.guides.every(guide => 
                        fs.existsSync(guide.path) && 
                        fs.existsSync(path.join(guide.path, 'index.html'))
                    );
                } catch {
                    return false;
                }
            }
        },
        {
            name: 'Build System Scripts',
            check: () => fs.existsSync('./guide-generator.js') || 
                         fs.existsSync('./build-system.js')
        },
        {
            name: 'JSON Builder Interface',
            check: () => fs.existsSync('./json-builder.html')
        },
        {
            name: 'Main Index Page',
            check: () => {
                if (!fs.existsSync('./index.html')) return false;
                const content = fs.readFileSync('./index.html', 'utf8');
                return content.includes('guides-config.json');
            }
        },
        {
            name: 'Styling System',
            check: () => fs.existsSync('./style') && 
                         fs.existsSync('./style/main.css')
        },
        {
            name: 'JSON Schema Validation',
            check: () => {
                try {
                    const articlesDir = './articles';
                    if (!fs.existsSync(articlesDir)) return false;
                    const files = fs.readdirSync(articlesDir);
                    const jsonFiles = files.filter(f => f.endsWith('.json') && !f.includes('('));
                    
                    return jsonFiles.every(file => {
                        try {
                            const content = JSON.parse(fs.readFileSync(path.join(articlesDir, file), 'utf8'));
                            return content.meta && content.navigation && content.sections;
                        } catch {
                            return false;
                        }
                    });
                } catch {
                    return false;
                }
            }
        }
    ];
    
    let passCount = 0;
    checks.forEach(check => {
        const result = check.check();
        console.log(`${result ? '✅' : '❌'} ${check.name}`);
        if (result) passCount++;
    });
    
    console.log(`\n📊 System Status: ${passCount}/${checks.length} checks passed`);
    
    if (passCount === checks.length) {
        console.log('\n🎉 System fully operational!');
        console.log('Your TrpDirectories blog system is ready to use.');
        
        // Load and display system info
        try {
            const config = JSON.parse(fs.readFileSync('./guides-config.json', 'utf8'));
            console.log(`\n📚 Active Guides: ${config.guides.length}`);
            
            // Count articles
            const articlesDir = './articles';
            const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json') && !f.includes('('));
            console.log(`📄 JSON Articles: ${articleFiles.length}`);
            
            // Show guide details
            config.guides.forEach(guide => {
                console.log(`  • ${guide.title} (${guide.difficulty}) - ${guide.author}`);
            });
            
            // Show articles not yet built as guides
            const builtGuides = config.guides.map(g => g.id);
            const unbuiltArticles = articleFiles.filter(file => {
                const baseName = path.basename(file, '.json').replace(/[-\s]/g, '---');
                return !builtGuides.includes(baseName);
            });
            
            if (unbuiltArticles.length > 0) {
                console.log(`\n📋 Articles ready for guide generation: ${unbuiltArticles.length}`);
                unbuiltArticles.forEach(file => {
                    try {
                        const content = JSON.parse(fs.readFileSync(path.join(articlesDir, file), 'utf8'));
                        console.log(`  • ${content.meta.title} (${content.meta.difficulty})`);
                    } catch {
                        console.log(`  • ${file} (parsing error)`);
                    }
                });
            }
            
        } catch (error) {
            console.log('\n⚠️  Could not load detailed system information');
        }
        
        console.log('\n🛠️  Available Commands:');
        console.log('  make all             # Build all guides');
        console.log('  make serve           # Start development server');
        console.log('  make clean           # Clean generated files');
        console.log('  node guide-generator.js  # Generate guides from JSON');
        
    } else {
        console.log('\n⚠️  System needs attention - some components are missing');
        console.log('\n🔧 Troubleshooting:');
        console.log('  - Ensure all JSON articles are in ./articles/ directory');
        console.log('  - Run build system to generate missing guide structures');
        console.log('  - Check that guides-config.json is properly formatted');
    }
}

// Run validation
validateSystem();