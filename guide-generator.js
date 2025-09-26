class GuideGenerator {
    constructor(jsonData) {
        this.guide = jsonData;
        this.syntaxMap = {
            'struct': 'keyword',
            'int': 'type',
            'char': 'type',
            'void': 'type',
            'while': 'keyword',
            'for': 'keyword',
            'if': 'keyword',
            'else': 'keyword',
            'return': 'keyword',
            'sizeof': 'keyword',
            '#include': 'preprocessor',
            'printf': 'function',
            'socket': 'function',
            'bind': 'function',
            'listen': 'function',
            'accept': 'function',
            'poll': 'function',
            'close': 'function',
            'recv': 'function',
            'htons': 'function',
            'NULL': 'variable',
            'AF_INET': 'variable',
            'SOCK_STREAM': 'variable',
            'POLLIN': 'variable',
            'POLLHUP': 'variable',
            'POLLERR': 'variable',
            'INADDR_ANY': 'variable'
        };
    }

    generateHTML() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="${this.guide.meta.favicon || '../../imgs/favicon.png'}" type="image/x-icon">
    <link rel="stylesheet" href="${this.guide.meta.stylesheet || '../../style/main.css'}">
    <title>${this.guide.meta.title} - Learning Guide</title>
</head>
<body>
    ${this.generateHeader()}
    ${this.generateNavigation()}
    ${this.generateMain()}
    ${this.generateFooter()}
    ${this.generateScript()}
</body>
</html>`;
    }

    generateHeader() {
        const authorInfo = this.guide.meta.author ? `<div class="author-info">By ${this.guide.meta.author}</div>` : '';
        
        return `    <header>
        <div class="container">
            <div class="header-content">
                <div class="header-title">
                    <h1>${this.guide.meta.title}</h1>
                    ${authorInfo}
                </div>
                <div class="header-nav">
                    <a href="../../" class="back-to-index">
                        Back to Index
                    </a>
                    <button class="theme-toggle" onclick="toggleTheme()">🌙 Dark Mode</button>
                </div>
            </div>
        </div>
    </header>`;
    }

    generateNavigation() {
        const navItems = this.guide.navigation.map(item => 
            `                <a class="guide-nav-item" href="#${item.id}" data-section="${item.sectionIndex}">${item.emoji} ${item.title}</a>`
        ).join('\n');

        return `    <nav>
        <div class="container">
            <div class="guide-nav-grid">
${navItems}
            </div>
        </div>
    </nav>`;
    }

    generateMain() {
        const sections = this.guide.sections.map(section => this.generateSection(section)).join('\n\n');
        return `    <main class="container">
${sections}
    </main>`;
    }

    generateSection(section) {
        const content = section.content.map(item => this.generateContent(item)).join('\n');
        
        return `        <section id="${section.id}">
            <div class="section-header">
                <div class="section-icon ${section.iconClass}">${section.emoji}</div>
                <h2 class="section-title">${section.title}</h2>
            </div>
            <div class="content">
${content}
            </div>
        </section>`;
    }

    generateContent(item) {
        switch (item.type) {
            case 'paragraph':
                return `                <p>${item.content}</p>`;
                
            case 'heading':
                return `                <h${item.level}>${item.content}</h${item.level}>`;
                
            case 'list':
                const tag = item.ordered ? 'ol' : 'ul';
                const startAttr = item.startFrom ? ` start="${item.startFrom}"` : '';
                const listItems = item.items.map(li => `                    <li>${li}</li>`).join('\n');
                return `                <${tag}${startAttr}>
${listItems}
                </${tag}>`;
                
            case 'codeblock':
                const code = item.withSyntaxHighlight ? this.applySyntaxHighlighting(item.code) : item.code;
                return `                <div class="code-block">
                    <pre>${code}</pre>
                </div>`;
                
            case 'actionbox':
                const boxClass = `${item.boxType || 'action'}-box`;
                const boxContent = item.content.map(c => this.generateContent(c)).join('\n');
                const title = item.title ? `<h4>${item.title}</h4>` : '';
                return `                <div class="${boxClass}">
${title ? '                    ' + title : ''}${boxContent}
                </div>`;
                
            default:
                return `                <p>Unknown content type: ${item.type}</p>`;
        }
    }

    applySyntaxHighlighting(code) {
        let highlighted = code;
        
        // Apply syntax highlighting
        Object.entries(this.syntaxMap).forEach(([keyword, className]) => {
            const regex = new RegExp(`\\\\b${keyword.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="${className}">${keyword}</span>`);
        });
        
        // Highlight numbers
        highlighted = highlighted.replace(/\\b\\d+\\b/g, '<span class="number">$&</span>');
        
        // Highlight strings
        highlighted = highlighted.replace(/"[^"]*"/g, '<span class="string">$&</span>');
        highlighted = highlighted.replace(/<[^>]*>/g, '<span class="string">$&</span>');
        
        // Highlight comments
        highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
        
        // Highlight operators
        highlighted = highlighted.replace(/[+\-*&|<>=!]+/g, '<span class="operator">$&</span>');
        
        // Highlight variable names (basic pattern)
        highlighted = highlighted.replace(/\\b[a-zA-Z_][a-zA-Z0-9_]*\\b(?![^<]*>)/g, (match) => {
            if (!this.syntaxMap[match] && !match.match(/^(span|class|string|number|comment|operator|keyword|type|function|variable|preprocessor)$/)) {
                return `<span class="variable">${match}</span>`;
            }
            return match;
        });
        
        return highlighted;
    }

    generateFooter() {
        return `    <footer>
        <div class="container">
            <p>${this.guide.footer?.message || 'Learning journey completed! 🎉'}</p>
            <div class="checkbox-item" style="justify-content: center; margin-top: 1rem;">
                <div class="checkbox" onclick="toggleComplete(this)"></div>
                <span>${this.guide.footer?.completionText || 'Mark this topic as mastered'}</span>
            </div>
        </div>
    </footer>`;
    }

    generateScript() {
        const guideId = this.guide.meta.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        return `    <script>
        // Theme toggle
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update button text
            updateThemeButton(newTheme);
        }

        // Update theme button text based on current theme
        function updateThemeButton(currentTheme) {
            const button = document.querySelector('.theme-toggle');
            if (currentTheme === 'dark') {
                button.innerHTML = '☀️ Light Mode';
            } else {
                button.innerHTML = '🌙 Dark Mode';
            }
        }

        // Load saved theme
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeButton(savedTheme);
        }

        // Initialize theme on page load
        document.addEventListener('DOMContentLoaded', loadTheme);

        // Section completion
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('completed');
                const completedSections = Array.from(document.querySelectorAll('.nav-item.completed'))
                    .map(el => el.getAttribute('data-section'));
                localStorage.setItem('completed-${guideId}', JSON.stringify(completedSections));
            });
        });

        // Load saved progress
        const savedProgress = localStorage.getItem('completed-${guideId}');
        if (savedProgress) {
            const completed = JSON.parse(savedProgress);
            completed.forEach(sectionNum => {
                const navItem = document.querySelector(\`[data-section="\${sectionNum}"]\`);
                if (navItem) navItem.classList.add('completed');
            });
        }

        // Checkbox functionality
        function toggleComplete(checkbox) {
            checkbox.classList.toggle('checked');
            if (checkbox.classList.contains('checked')) {
                checkbox.innerHTML = '✓';
                localStorage.setItem('mastered-${guideId}', 'true');
            } else {
                checkbox.innerHTML = '';
                localStorage.setItem('mastered-${guideId}', 'false');
            }
        }

        // Load mastery status
        const masteryStatus = localStorage.getItem('mastered-${guideId}');
        if (masteryStatus === 'true') {
            const masteryCheckbox = document.querySelector('footer .checkbox');
            if (masteryCheckbox) {
                masteryCheckbox.classList.add('checked');
                masteryCheckbox.innerHTML = '✓';
            }
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    </script>`;
    }
}

// Example usage:
// const generator = new GuideGenerator(jsonData);
// const html = generator.generateHTML();

// Node.js usage example:
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GuideGenerator;
}