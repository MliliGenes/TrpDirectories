#!/usr/bin/env node

/**
 * Clean Guide Script - Remove Generated HTML Guides
 * 
 * This script removes all generated HTML guide directories from the build folder while preserving:
 * - JSON source files in articles/
 * - Build system files
 * - CSS and other assets
 * 
 * Usage: node clean-guides.js
 */

const fs = require('fs');
const path = require('path');

class GuidesCleaner {
    constructor() {
        this.guidesDir = path.join(__dirname, 'guides');
        this.configFile = path.join(__dirname, 'guides-config.json');
    }

    log(type, message, detail = '') {
        const timestamp = new Date().toLocaleTimeString();
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        
        console.log(`${icons[type]} [${timestamp}] ${message}${detail ? ` - ${detail}` : ''}`);
    }

    async cleanGuides() {
        console.log('🧹 Starting Guide Cleanup Process\n');
        
        try {
            // Check if guides directory exists
            if (!fs.existsSync(this.guidesDir)) {
                this.log('warning', 'Guides directory not found, nothing to clean');
                return true;
            }

            // Get list of guide directories
            const guideDirs = fs.readdirSync(this.guidesDir, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);

            if (guideDirs.length === 0) {
                this.log('info', 'No guide directories found to clean');
                return true;
            }

            this.log('info', `Found ${guideDirs.length} guide directories to remove:`);
            guideDirs.forEach(dir => {
                console.log(`   📁 ${dir}`);
            });
            console.log('');

            // Remove each guide directory
            let removedCount = 0;
            let errorCount = 0;

            for (const guideDir of guideDirs) {
                try {
                    const fullPath = path.join(this.guidesDir, guideDir);
                    await this.removeDirectory(fullPath);
                    this.log('success', `Removed guide: ${guideDir}`);
                    removedCount++;
                } catch (error) {
                    this.log('error', `Failed to remove guide: ${guideDir}`, error.message);
                    errorCount++;
                }
            }

            // Clean up guides-config.json
            await this.resetConfig();

            // Summary
            console.log('\n📊 Cleanup Summary:');
            console.log(`✅ Removed: ${removedCount} guide directories`);
            console.log(`❌ Errors: ${errorCount}`);
            console.log(`📄 Reset guides-config.json`);

            if (errorCount === 0) {
                console.log('\n🎉 Guide cleanup completed successfully!');
                console.log('💡 Run "node build-system.js" to regenerate guides from JSON sources');
            } else {
                console.log('\n⚠️  Cleanup completed with some errors');
            }

            return errorCount === 0;

        } catch (error) {
            this.log('error', 'Cleanup process failed', error.message);
            return false;
        }
    }

    async removeDirectory(dirPath) {
        return new Promise((resolve, reject) => {
            fs.rm(dirPath, { recursive: true, force: true }, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async resetConfig() {
        try {
            const emptyConfig = {
                guides: [],
                metadata: {
                    version: "2.1.0",
                    lastModified: new Date().toISOString(),
                    totalGuides: 0,
                    system: "Automated JSON-to-HTML guide generation",
                    description: "Guides cleared - ready for rebuild"
                }
            };

            fs.writeFileSync(this.configFile, JSON.stringify(emptyConfig, null, 2), 'utf8');
            this.log('success', 'Reset guides-config.json');
        } catch (error) {
            this.log('warning', 'Failed to reset guides-config.json', error.message);
        }
    }

    // Safety check to prevent accidental deletion of important files
    validateEnvironment() {
        const requiredFiles = ['build-system.js', 'guide-generator.js', 'articles'];
        const missingFiles = requiredFiles.filter(file => 
            !fs.existsSync(path.join(__dirname, file))
        );

        if (missingFiles.length > 0) {
            this.log('error', 'Environment validation failed');
            console.log('Missing required files/directories:');
            missingFiles.forEach(file => console.log(`   ❌ ${file}`));
            return false;
        }

        return true;
    }
}

// Main execution
async function main() {
    const cleaner = new GuidesCleaner();
    
    // Validate environment first
    if (!cleaner.validateEnvironment()) {
        console.log('\n❌ Cleanup aborted - invalid environment');
        process.exit(1);
    }

    // Run cleanup
    const success = await cleaner.cleanGuides();
    process.exit(success ? 0 : 1);
}

// Handle command line execution
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Unexpected error:', error);
        process.exit(1);
    });
}

module.exports = GuidesCleaner;