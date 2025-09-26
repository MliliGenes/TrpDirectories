#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const GuideGenerator = require('./guide-generator.js');

/**
 * Configuration
 */
const CONFIG = {
    articlesDir: './articles',
    guidesDir: './guides',
    configFile: './guides-config.json',
    schemaFile: './guides-schema.json'
};

/**
 * Utilities
 */
class BuildSystem {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.successes = [];
    }

    log(type, message, details = null) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = { timestamp, message, details };
        
        switch (type) {
            case 'error':
                this.errors.push(entry);
                console.error(`❌ [${timestamp}] ${message}`);
                if (details) console.error(`   Details: ${details}`);
                break;
            case 'warn':
                this.warnings.push(entry);
                console.warn(`⚠️  [${timestamp}] ${message}`);
                if (details) console.warn(`   Details: ${details}`);
                break;
            case 'success':
                this.successes.push(entry);
                console.log(`✅ [${timestamp}] ${message}`);
                break;
            case 'info':
                console.log(`ℹ️  [${timestamp}] ${message}`);
                break;
        }
    }

    /**
     * Create directory with error handling
     */
    ensureDir(dirPath) {
        try {
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                this.log('success', `Created directory: ${dirPath}`);
            }
            return true;
        } catch (error) {
            this.log('error', `Failed to create directory: ${dirPath}`, error.message);
            return false;
        }
    }

    /**
     * Sanitize filename for directory creation (URL-safe)
     */
    sanitizeFilename(title) {
        return title
            .toLowerCase()                           // Convert to lowercase
            .replace(/[^a-z0-9\s\-]/g, '')          // Remove special chars, keep spaces and hyphens
            .replace(/\s+/g, '-')                   // Replace spaces with hyphens
            .replace(/-+/g, '-')                    // Replace multiple hyphens with single
            .replace(/^-|-$/g, '')                  // Remove leading/trailing hyphens
            .trim();
    }

    /**
     * Validate JSON article against schema
     */
    validateArticle(articleData, filename) {
        const required = ['meta', 'navigation', 'sections'];
        const metaRequired = ['title', 'description', 'difficulty'];
        
        // Check top-level structure
        for (const field of required) {
            if (!articleData[field]) {
                this.log('error', `Missing required field '${field}' in ${filename}`);
                return false;
            }
        }

        // Check meta fields
        for (const field of metaRequired) {
            if (!articleData.meta[field]) {
                this.log('error', `Missing required meta field '${field}' in ${filename}`);
                return false;
            }
        }

        // Validate difficulty
        const validDifficulties = ['beginner', 'intermediate', 'advanced'];
        if (!validDifficulties.includes(articleData.meta.difficulty)) {
            this.log('error', `Invalid difficulty '${articleData.meta.difficulty}' in ${filename}. Must be: ${validDifficulties.join(', ')}`);
            return false;
        }

        // Check sections and navigation consistency
        if (articleData.navigation.length !== articleData.sections.length) {
            this.log('warn', `Navigation items (${articleData.navigation.length}) don't match sections (${articleData.sections.length}) in ${filename}`);
        }

        return true;
    }

    /**
     * Discover all JSON articles in articles directory
     */
    discoverArticles() {
        try {
            if (!fs.existsSync(CONFIG.articlesDir)) {
                this.log('error', `Articles directory not found: ${CONFIG.articlesDir}`);
                return [];
            }

            const files = fs.readdirSync(CONFIG.articlesDir)
                .filter(file => file.endsWith('.json'))
                .map(file => path.join(CONFIG.articlesDir, file));

            this.log('info', `Found ${files.length} article(s): ${files.map(f => path.basename(f)).join(', ')}`);
            return files;
        } catch (error) {
            this.log('error', `Failed to read articles directory`, error.message);
            return [];
        }
    }

    /**
     * Load and validate JSON article
     */
    loadArticle(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const articleData = JSON.parse(content);
            const filename = path.basename(filePath);

            if (!this.validateArticle(articleData, filename)) {
                return null;
            }

            this.log('success', `Loaded article: ${articleData.meta.title}`);
            return {
                data: articleData,
                filename: filename,
                filePath: filePath
            };
        } catch (error) {
            this.log('error', `Failed to load article: ${filePath}`, error.message);
            return null;
        }
    }

    /**
     * Generate HTML from article data
     */
    generateHTML(article) {
        try {
            const generator = new GuideGenerator(article.data);
            const html = generator.generateHTML();
            
            this.log('success', `Generated HTML for: ${article.data.meta.title}`);
            return html;
        } catch (error) {
            this.log('error', `Failed to generate HTML for: ${article.filename}`, error.message);
            return null;
        }
    }

    /**
     * Create guide directory and save HTML
     */
    deployGuide(article, html) {
        try {
            const title = this.sanitizeFilename(article.data.meta.title);
            const guideDir = path.join(CONFIG.guidesDir, title);
            
            // Create guide directory
            if (!this.ensureDir(guideDir)) {
                return null;
            }

            // Write HTML file
            const htmlPath = path.join(guideDir, 'index.html');
            fs.writeFileSync(htmlPath, html, 'utf8');
            
            this.log('success', `Deployed guide: ${htmlPath}`);
            
            return {
                title: article.data.meta.title,
                path: `${path.relative('.', guideDir)}/`,
                htmlPath: htmlPath,
                ...article.data.meta
            };
        } catch (error) {
            this.log('error', `Failed to deploy guide for: ${article.filename}`, error.message);
            return null;
        }
    }

    /**
     * Generate guides configuration
     */
    generateConfig(deployedGuides) {
        try {
            const config = {
                guides: deployedGuides.map((guide, index) => ({
                    id: guide.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    title: guide.title,
                    path: guide.path,
                    description: guide.description,
                    author: guide.author,
                    tags: guide.tags || [],
                    difficulty: guide.difficulty,
                    lastUpdated: guide.lastUpdated || new Date().toISOString().split('T')[0]
                })),
                metadata: {
                    version: "2.1.0",
                    lastModified: new Date().toISOString(),
                    totalGuides: deployedGuides.length,
                    system: "Automated JSON-to-HTML guide generation",
                    description: "Dynamically built from articles directory"
                }
            };

            fs.writeFileSync(CONFIG.configFile, JSON.stringify(config, null, 2), 'utf8');
            this.log('success', `Generated configuration: ${CONFIG.configFile}`);
            return true;
        } catch (error) {
            this.log('error', `Failed to generate configuration`, error.message);
            return false;
        }
    }

    /**
     * Clean up old generated files
     */
    cleanup() {
        try {
            // Clean guides directory
            if (fs.existsSync(CONFIG.guidesDir)) {
                const files = fs.readdirSync(CONFIG.guidesDir);
                files.forEach(file => {
                    fs.unlinkSync(path.join(CONFIG.guidesDir, file));
                });
                this.log('info', `Cleaned ${files.length} files from guides directory`);
            }
            return true;
        } catch (error) {
            this.log('warn', `Cleanup failed`, error.message);
            return false;
        }
    }

    /**
     * Main build process
     */
    async build() {
        console.log('🚀 Starting Automated Guide Build System\n');
        
        // Ensure guides directory exists
        this.ensureDir(CONFIG.guidesDir);
        
        // Discovery phase
        this.log('info', 'Phase 1: Discovering articles...');
        const articleFiles = this.discoverArticles();
        
        if (articleFiles.length === 0) {
            this.log('error', 'No articles found to build');
            return this.printSummary();
        }

        // Loading phase
        this.log('info', 'Phase 2: Loading and validating articles...');
        const articles = [];
        for (const filePath of articleFiles) {
            const article = this.loadArticle(filePath);
            if (article) articles.push(article);
        }

        if (articles.length === 0) {
            this.log('error', 'No valid articles found');
            return this.printSummary();
        }

        // Generation phase
        this.log('info', 'Phase 3: Generating HTML content...');
        const deployedGuides = [];
        
        for (const article of articles) {
            const html = this.generateHTML(article);
            if (html) {
                const deployed = this.deployGuide(article, html);
                if (deployed) deployedGuides.push(deployed);
            }
        }

        // Configuration phase
        this.log('info', 'Phase 4: Updating system configuration...');
        this.generateConfig(deployedGuides);

        return this.printSummary();
    }

    /**
     * Print build summary
     */
    printSummary() {
        console.log('\n📊 Build Summary:');
        console.log(`✅ Successes: ${this.successes.length}`);
        console.log(`⚠️  Warnings: ${this.warnings.length}`);
        console.log(`❌ Errors: ${this.errors.length}`);
        
        if (this.errors.length > 0) {
            console.log('\n❌ Build completed with errors:');
            this.errors.forEach(error => {
                console.log(`  • ${error.message}`);
            });
            return false;
        } else if (this.warnings.length > 0) {
            console.log('\n⚠️  Build completed with warnings');
            return true;
        } else {
            console.log('\n🎉 Build completed successfully!');
            console.log('\n📝 Next steps:');
            console.log('  • Visit your blog to see the generated guides');
            console.log('  • Add new JSON files to ./articles/ directory');
            console.log('  • Run this script again to rebuild');
            return true;
        }
    }
}

/**
 * CLI Interface
 */
async function main() {
    const buildSystem = new BuildSystem();
    
    try {
        const success = await buildSystem.build();
        process.exit(success ? 0 : 1);
    } catch (error) {
        console.error('💥 Fatal build error:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { BuildSystem, CONFIG };