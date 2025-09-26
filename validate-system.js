#!/usr/bin/env node

const fs = require('fs');

/**
 * Validate the JSON-to-HTML system
 */
function validateSystem() {
    console.log('🔍 Validating JSON-to-HTML Guide System...\n');
    
    const checks = [
        {
            name: 'Guide Configuration',
            check: () => fs.existsSync('./guides-config.json')
        },
        {
            name: 'JSON Guide Files',
            check: () => fs.existsSync('./struct-padding-alignment.json') && 
                         fs.existsSync('./sockets-poll.json')
        },
        {
            name: 'Generated HTML Files',
            check: () => fs.existsSync('./generated/struct-padding-alignment.html') && 
                         fs.existsSync('./generated/sockets-poll.html')
        },
        {
            name: 'Deployed Guide Files',
            check: () => fs.existsSync('./Struct Padding & Alignment - Learning Guide/index.html') && 
                         fs.existsSync('./Sockets & Poll - Learning Guide/index.html')
        },
        {
            name: 'Generator Engine',
            check: () => fs.existsSync('./guide-generator.js') && 
                         fs.existsSync('./generate-guides.js')
        },
        {
            name: 'Root Index Update',
            check: () => {
                const content = fs.readFileSync('./index.html', 'utf8');
                return content.includes('guides-config.json') && 
                       content.includes('guideData.meta.title');
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
        console.log('Your JSON-to-HTML guide generation system is ready to use.');
        
        // Load and display system info
        try {
            const config = JSON.parse(fs.readFileSync('./guides-config.json', 'utf8'));
            console.log(`\n📚 Current Guides: ${config.guides.length}`);
            config.guides.forEach(guide => {
                const guideData = JSON.parse(fs.readFileSync(guide.jsonFile, 'utf8'));
                console.log(`  • ${guideData.meta.title} (${guideData.meta.difficulty})`);
            });
        } catch (error) {
            console.log('\n⚠️  Could not load guide details');
        }
        
        console.log('\n🛠️  Quick Commands:');
        console.log('  node generate-guides.js  # Regenerate all guides');
        console.log('  python3 -m http.server 8000  # Start local server');
        
    } else {
        console.log('\n⚠️  System needs attention - some components are missing');
    }
}

// Run validation
validateSystem();