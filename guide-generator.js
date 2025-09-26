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
    
    <!-- CodeMirror CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/darcula.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/default.min.css">
    
    <!-- CodeMirror JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/clike/clike.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/shell/shell.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/css/css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/htmlmixed/htmlmixed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/xml/xml.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/selection/active-line.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js"></script>
    
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
                const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
                const language = item.language || 'c'; // Default to 'c' for better syntax highlighting
                if (!item.language) {
                    console.warn(`Warning: Codeblock missing 'language' field, defaulting to 'c'`);
                }
                return `                <div class="code-block" data-language="${language}">
                    <textarea id="${codeId}" class="codemirror-code">${item.code}</textarea>
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

        // Initialize CodeMirror for all code blocks
        let initAttempts = 0;
        const maxAttempts = 50; // Max 5 seconds of retries
        
        function initializeCodeMirror() {
            initAttempts++;
            
            // Check if CodeMirror is loaded
            if (typeof CodeMirror === 'undefined') {
                if (initAttempts >= maxAttempts) {
                    console.error('Failed to load CodeMirror after', maxAttempts, 'attempts. Using fallback styling.');
                    // Fallback: Style textareas as basic code blocks
                    document.querySelectorAll('.codemirror-code').forEach(textarea => {
                        textarea.style.fontFamily = 'Monaco, Menlo, "Ubuntu Mono", monospace';
                        textarea.style.fontSize = '14px';
                        textarea.style.lineHeight = '1.5';
                        textarea.style.padding = '10px';
                        textarea.style.border = '1px solid var(--border)';
                        textarea.style.borderRadius = '4px';
                        textarea.style.background = 'var(--code-bg)';
                        textarea.style.color = 'var(--code-text)';
                        textarea.style.resize = 'none';
                        textarea.style.minHeight = '100px';
                        textarea.readOnly = true;
                    });
                    return;
                }
                console.warn('CodeMirror not loaded, retrying in 100ms... (attempt', initAttempts, '/', maxAttempts, ')');
                setTimeout(initializeCodeMirror, 100);
                return;
            }
            
            const codeTextareas = document.querySelectorAll('.codemirror-code');
            console.log('Initializing CodeMirror for', codeTextareas.length, 'code blocks');
            
            codeTextareas.forEach(textarea => {
                const codeBlock = textarea.closest('.code-block');
                const language = codeBlock.dataset.language;
                
                // Map language to CodeMirror mode
                let mode = 'text';
                switch(language) {
                    case 'c':
                    case 'cpp':
                    case 'c++':
                        mode = 'text/x-csrc';
                        break;
                    case 'javascript':
                    case 'js':
                        mode = 'javascript';
                        break;
                    case 'bash':
                    case 'shell':
                    case 'sh':
                        mode = 'shell';
                        break;
                    case 'css':
                        mode = 'css';
                        break;
                    case 'html':
                        mode = 'htmlmixed';
                        break;
                    case 'json':
                        mode = 'application/json';
                        break;
                    default:
                        mode = 'text';
                }
                
                // Use custom theme that respects CSS variables
                const cmTheme = 'default'; // We'll override with CSS
                
                try {
                    const editor = CodeMirror.fromTextArea(textarea, {
                        mode: mode,
                        theme: cmTheme,
                        lineNumbers: true,
                        readOnly: 'nocursor',  // Disable cursor and selection
                        lineWrapping: true,    // Enable line wrapping to avoid horizontal scroll
                        scrollbarStyle: 'null', // Remove scrollbars
                        viewportMargin: Infinity, // Show all content without scrolling
                        matchBrackets: false,  // Disable bracket matching highlights
                        styleActiveLine: false, // Disable active line highlighting
                        indentUnit: 4,
                        tabSize: 4
                    });
                    
                    // Store editor reference for theme switching
                    textarea.codeMirrorInstance = editor;
                    
                    // Auto-refresh editor size and ensure no scrollbars
                    setTimeout(() => {
                        editor.refresh();
                        editor.setSize(null, 'auto'); // Auto-height based on content
                    }, 100);
                    
                    console.log('CodeMirror initialized for language:', language, 'mode:', mode);
                } catch (error) {
                    console.error('Failed to initialize CodeMirror for textarea:', error);
                }
            });
        }
        
        // CodeMirror themes are handled by CSS variables, no need to update programmatically
        
        // Initialize CodeMirror when DOM and scripts are fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Wait a bit more for all scripts to load
                setTimeout(initializeCodeMirror, 200);
            });
        } else {
            // Document already loaded, wait for scripts
            setTimeout(initializeCodeMirror, 200);
        }
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