#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const GuideGenerator = require('./guide-generator.js');

/**
 * Generate HTML from JSON guide data
 */
function generateGuideFromJson(jsonFilePath, outputPath) {
    try {
        // Read JSON data
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        
        // Create generator instance
        const generator = new GuideGenerator(jsonData);
        
        // Generate HTML
        const html = generator.generateHTML();
        
        // Write to output file
        fs.writeFileSync(outputPath, html, 'utf8');
        
        console.log(`✅ Generated: ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`❌ Error generating ${outputPath}:`, error.message);
        return false;
    }
}

/**
 * Copy generated files to their guide directories
 */
function deployGeneratedFiles() {
    const deployments = [
        {
            source: './generated/struct-padding-alignment.html',
            target: './Struct Padding & Alignment - Learning Guide/index.html'
        },
        {
            source: './generated/sockets-poll.html', 
            target: './Sockets & Poll - Learning Guide/index.html'
        }
    ];
    
    console.log('📁 Deploying generated files to guide directories...\n');
    
    let deployCount = 0;
    deployments.forEach(deployment => {
        try {
            if (fs.existsSync(deployment.source)) {
                fs.copyFileSync(deployment.source, deployment.target);
                console.log(`✅ Deployed: ${deployment.target}`);
                deployCount++;
            } else {
                console.log(`⚠️  Source not found: ${deployment.source}`);
            }
        } catch (error) {
            console.error(`❌ Failed to deploy ${deployment.target}:`, error.message);
        }
    });
    
    return deployCount;
}

/**
 * Main function
 */
function main() {
    const guides = [
        {
            json: './struct-padding-alignment.json',
            output: './generated/struct-padding-alignment.html'
        },
        {
            json: './sockets-poll.json',
            output: './generated/sockets-poll.html'
        }
    ];
    
    // Create output directory
    const outputDir = './generated';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('🚀 Generating HTML guides from JSON...\n');
    
    let successCount = 0;
    guides.forEach(guide => {
        if (generateGuideFromJson(guide.json, guide.output)) {
            successCount++;
        }
    });
    
    console.log(`\n✨ Generated ${successCount}/${guides.length} guides successfully!`);
    
    if (successCount === guides.length) {
        // Auto-deploy generated files
        const deployCount = deployGeneratedFiles();
        console.log(`\n� Deployed ${deployCount}/${guides.length} guides to their directories!`);
        
        console.log('\n🎉 System ready! Your guides are now generated from JSON and deployed.');
        console.log('\n📝 Next steps:');
        console.log('• Visit http://localhost:8000 to view your blog');
        console.log('• Edit JSON files and re-run this script to update guides');
        console.log('• Add new JSON guide files and update guides-config.json');
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { generateGuideFromJson };