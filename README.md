# TrpDirectories - Low-Level Programming Blog

A comprehensive educational resource for low-level programming concepts, featuring an automated build system that converts JSON articles into beautifully formatted HTML guides, plus an interactive JSON Builder for easy content creation.

## 🚀 Features

- **Interactive JSON Builder**: Visual interface for creating structured learning guides
- **Automated Build System**: JSON-to-HTML conversion with comprehensive error handling
- **Makefile Integration**: Simple build targets (`make all`, `make re`, `make clean`)
- **Organized Content Structure**: Clean separation of source articles and generated guides
- **Dynamic Navigation**: Auto-generated table of contents with section jumping
- **Advanced Syntax Highlighting**: CodeMirror-powered code examples with 20+ languages
- **Responsive Design**: Mobile-first layout with persistent dark/light theme toggle
- **Comprehensive Validation**: JSON schema validation and system integrity checks
- **Tag System**: Categorized content with visual tag indicators

## 📁 Project Structure

```text
lowlevel_blog/
├── articles/                           # 📝 JSON source files for articles
│   ├── TEMPLATE.md                    # Article template and documentation
│   ├── sockets-poll.json              # Advanced networking guide
│   ├── struct-padding-alignment.json  # Memory alignment guide
│   └── x86cpu-16-bit-real-mode.json  # CPU architecture guide
├── guides/                            # 🔨 Generated HTML guides (auto-created)
│   ├── sockets-poll/
│   │   └── index.html
│   ├── struct-padding-alignment/
│   │   └── index.html
│   └── x86-cpu-16-bit-real-mode/
│       └── index.html
├── style/                             # 🎨 Stylesheets and theming
│   ├── main.css                       # Main styling with theme system
│   └── json-builder.css              # JSON Builder specific styles
├── imgs/                              # 🖼️ Images and assets
│   └── favicon.png
├── json-builder.html                  # 🛠️ Interactive guide creator
├── index.html                        # � Main landing page
├── Makefile                          # 🏗️ Build system automation
├── build-system.js                   # 📄 HTML generation engine
├── guide-generator.js                # � Legacy guide generator
├── validate-system.js                # ✅ System validation and health check
├── clean-guides.js                   # 🧹 Cleanup automation
├── guides-config.json                # ⚙️ Auto-generated configuration
├── guides-schema.json                # 📋 JSON validation schema
└── README.md                         # 📖 This comprehensive guide
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (for running the build system and validation)
- Python 3 (optional, for development server)
- A modern web browser (for the JSON Builder interface)

### Quick Start

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd lowlevel_blog
   ```

2. **Validate system integrity**:

   ```bash
   make validate
   # or: node validate-system.js
   ```

3. **Create content using JSON Builder** (Recommended):

   ```bash
   make serve
   # Open http://localhost:8000/json-builder.html in browser
   # Use the visual interface to create guides
   ```

4. **Or create manually**:

   ```bash
   cp articles/TEMPLATE.md articles/my-new-article.json
   # Edit the JSON file following the schema
   ```

5. **Build all guides**:

   ```bash
   make all
   # or: node build-system.js
   ```

6. **Start development server**:

   ```bash
   make serve
   # Open http://localhost:8000 in browser
   ```

### Build System Commands

The project includes a comprehensive Makefile for easy development:

```bash
make all      # Validate and build all guides (default)
make re       # Clean rebuild from scratch  
make clean    # Remove generated files
make serve    # Start development server on port 8000
make validate # Check system integrity
make watch    # Auto-rebuild on file changes (requires entr)
make help     # Show all available commands
```

## 🎨 JSON Builder Interface

The JSON Builder (`json-builder.html`) provides a visual interface for creating structured learning guides without manual JSON editing.

### Features

- **Visual Form Builder**: Step-by-step guide creation
- **Real-time Preview**: See JSON structure as you build
- **Content Type Support**: Paragraph, heading, code blocks, lists, quotes
- **Icon Class Selection**: Color-coded visual selection for section types
- **Tag System**: Auto-complete tag suggestions with categories
- **Import/Export**: Load existing guides for editing
- **Theme Integration**: Consistent light/dark theme support
- **Validation**: Real-time structure validation

### Content Types Available

- **Paragraph**: Rich text content with HTML support
- **Heading**: Structured headings (H2, H3, H4) with proper hierarchy  
- **Code Block**: Syntax-highlighted code with 20+ language support
- **List**: Ordered/unordered lists with multiple items
- **Quote**: Blockquotes with optional author attribution

### Using the JSON Builder

1. Open `json-builder.html` in your browser (or use `make serve`)
2. Fill in guide metadata (title, description, author, difficulty)
3. Add tags using the autocomplete system
4. Create sections with appropriate icons and content
5. Add multiple content items per section as needed
6. Preview the generated JSON in real-time
7. Export the completed JSON to the `articles/` directory
8. Run `make all` to build the HTML guide

## 📝 Manual Article Creation

### Article Structure

For advanced users or automated workflows, articles use this JSON structure:

```json
{
  "meta": {
    "title": "Your Article Title",
    "description": "Brief description of the article",  
    "author": "Your Name",
    "tags": ["networking", "c programming", "systems"],
    "difficulty": "beginner|intermediate|advanced",
    "lastUpdated": "2024-09-26"
  },
  "navigation": [
    {
      "id": "hook",
      "emoji": "🎯", 
      "title": "The Hook",
      "sectionIndex": 0
    },
    {
      "id": "mechanics",
      "emoji": "⚙️",
      "title": "How It Works", 
      "sectionIndex": 1
    }
  ],
  "sections": [
    {
      "id": "hook",
      "title": "THE HOOK",
      "emoji": "🎯",
      "iconClass": "hook",
      "content": [
        {
          "type": "paragraph",
          "content": "Opening paragraph explaining the concept...",
          "html": true
        },
        {
          "type": "codeblock",
          "language": "c", 
          "code": "int main() {\n    printf(\"Hello World!\\n\");\n    return 0;\n}"
        },
        {
          "type": "list",
          "ordered": false,
          "items": ["Key point 1", "Key point 2", "Key point 3"]
        }
      ]
    }
  ]
}
```

### Content Features

- **Code Blocks**: CodeMirror-powered syntax highlighting with language specification (required)
- **Syntax Highlighting**: Supports C, C++, JavaScript, bash, CSS, HTML, JSON, and more
- **Interactive Navigation**: Auto-generated table of contents
- **Cross-references**: Link between sections using anchor IDs
- **Language Field**: All codeblocks must include a `language` field for proper syntax highlighting

### Example Content Types

See `articles/TEMPLATE.md` for comprehensive examples of:
- Code examples with syntax highlighting
- Mathematical explanations
- Step-by-step tutorials
- Memory diagrams and visualizations
- Performance comparisons
- Best practices sections

## 🏗️ Build System

The automated build system (`build-system.js`) processes your JSON articles through several phases:

### Build Phases

1. **Discovery**: Scans the `articles/` directory for JSON files
2. **Validation**: Validates JSON structure and required fields
3. **Generation**: Converts JSON to HTML using the template engine
4. **Deployment**: Creates guide directories and writes HTML files
5. **Configuration**: Updates `guides-config.json` with metadata

### Build Features

- **Error Handling**: Comprehensive error recovery and logging
- **Directory Management**: Automatic creation of guide directories
- **Schema Validation**: Ensures article structure consistency
- **Progress Tracking**: Detailed build progress and statistics
- **Incremental Builds**: Only processes changed articles (future feature)

### Running the Build

```bash
# Build all articles
node build-system.js

# Validate system integrity
node validate-system.js
```

### Build Output

```
🚀 Starting Automated Guide Build System

ℹ️  Phase 1: Discovering articles...
ℹ️  Found 3 article(s): memory-management-basics.json, sockets-poll.json, struct-padding-alignment.json

ℹ️  Phase 2: Loading and validating articles...
✅ Loaded article: Memory Management Basics
✅ Loaded article: Sockets & Poll
✅ Loaded article: Struct Padding & Alignment

ℹ️  Phase 3: Generating HTML content...
✅ Generated HTML for: Memory Management Basics
✅ Deployed guide: build/Memory Management Basics/index.html

📊 Build Summary:
✅ Successes: 10
⚠️  Warnings: 0
❌ Errors: 0

🎉 Build completed successfully!
```

## 🎨 Theming and Styling

The blog includes a responsive CSS framework with:

- **Dark/Light Theme Toggle**: User preference persistence
- **Syntax Highlighting**: Code blocks with language-specific coloring
- **Responsive Design**: Mobile-first approach
- **Typography**: Optimized reading experience
- **Interactive Elements**: Hover effects and smooth transitions

## 📊 Configuration

The `guides-config.json` file is automatically generated and contains:

```json
{
  "guides": [
    {
      "id": "article-slug",
      "title": "Article Title",
      "path": "./build/Article Title/",
      "description": "Article description",
      "tags": ["tag1", "tag2"],
      "difficulty": "intermediate",
      "lastUpdated": "2024-09-26"
    }
  ],
  "metadata": {
    "version": "2.1.0",
    "lastModified": "2025-09-26T01:45:07.899Z",
    "totalGuides": 3
  }
}
```

## 🔧 Development

### Adding New Features

1. **Article Template Updates**: Modify `articles/TEMPLATE.md`
2. **HTML Generation**: Update `guide-generator.js`
3. **Build Process**: Enhance `build-system.js`
4. **Styling**: Edit `style/main.css`

### Validation

The system includes comprehensive validation:

- **JSON Schema**: Validates article structure
- **Required Fields**: Ensures all necessary data is present
- **File System**: Checks directory permissions and disk space
- **Content Integrity**: Validates navigation matches sections

### Error Recovery

The build system includes robust error handling:

- **Graceful Degradation**: Continues building other articles if one fails
- **Detailed Logging**: Comprehensive error messages and suggestions
- **Automatic Retry**: Retries failed operations with exponential backoff

## 🧹 Maintenance & Cleanup

### Clean Generated Guides

Remove all generated HTML guide directories while preserving JSON source files:

```bash
node clean-guides.js
```

**What it does:**
- Removes all directories in `build/` folder
- Resets `guides-config.json` to empty state  
- Preserves all JSON source files in `articles/`
- Includes safety checks to prevent accidental deletion

**Use cases:**
- Clean slate rebuild of all guides
- Testing build system changes
- Removing guides with outdated structure
- Disk space cleanup during development

**Example output:**
```
🧹 Starting Guide Cleanup Process

ℹ️  Found 2 guide directories to remove:
   📁 Sockets & Poll  
   📁 Struct Padding & Alignment

✅ Removed guide: Sockets & Poll
✅ Removed guide: Struct Padding & Alignment
✅ Reset guides-config.json

📊 Cleanup Summary:
✅ Removed: 2 guide directories
❌ Errors: 0
📄 Reset guides-config.json

🎉 Guide cleanup completed successfully!
💡 Run "node build-system.js" to regenerate guides from JSON sources
```
- **State Recovery**: Maintains build state across interruptions

## 📚 Content Topics

Current guides cover:

- **Memory Management**: malloc, free, memory safety in C
- **Network Programming**: Sockets, poll(), I/O multiplexing
- **Data Structures**: Struct padding, alignment, memory layout
- **System Programming**: Low-level concepts and optimization

### Planned Topics

- **Process Management**: fork(), exec(), signal handling
- **File Systems**: inodes, file descriptors, system calls
- **Concurrent Programming**: threads, mutexes, race conditions
- **Assembly Language**: x86-64 basics, calling conventions
- **Debugging**: GDB, valgrind, memory leak detection

## 🤝 Contributing

### Adding Articles

1. Create a new JSON file in `articles/` following the template
2. Run the build system to generate HTML
3. Test the generated guide in a browser
4. Submit a pull request

### Improving the Build System

1. Fork the repository
2. Create a feature branch
3. Implement your improvements
4. Add tests if applicable
5. Submit a pull request with detailed description

### Content Guidelines

- **Accuracy**: Ensure technical correctness
- **Clarity**: Write for your target difficulty level
- **Examples**: Include practical code examples
- **Testing**: Verify all code examples work
- **Attribution**: Credit sources and references

## 📄 License

This project is open source. Feel free to use, modify, and distribute according to your needs.

## 🆘 Support

For issues, questions, or contributions:

1. **Check Documentation**: Review this README and `articles/TEMPLATE.md`
2. **Build System Issues**: Run `node validate-system.js` for diagnostics
3. **Content Questions**: Refer to existing articles for examples
4. **Bug Reports**: Include build output and error messages

## 🎯 Roadmap

### Version 2.2.0 (Next Release)

- [ ] Enhanced JSON Builder with preview mode
- [ ] Incremental builds (only process changed files)
- [ ] Article dependencies and cross-references
- [ ] Advanced search functionality with filtering
- [ ] Performance metrics and build analytics

### Version 2.3.0 (Future)

- [ ] Multi-language content support
- [ ] Interactive code examples with live execution
- [ ] Video embedding and multimedia support
- [ ] Comment system integration
- [ ] Advanced tag categorization and filtering

### Version 3.0.0 (Long-term Vision)

- [ ] Static site generator migration (Gatsby/Next.js)
- [ ] Full-featured content management interface
- [ ] Collaborative editing and review system
- [ ] Advanced theming and customization
- [ ] Plugin architecture for extensibility

## 📊 Current Status

✅ **Completed Features:**
- Interactive JSON Builder with visual interface
- Makefile-based build system with multiple targets
- Comprehensive validation and error handling
- Responsive design with theme persistence
- Advanced syntax highlighting (CodeMirror)
- Tag system with visual indicators

🚧 **In Development:**
- Enhanced content type support
- Improved mobile responsiveness
- Performance optimizations

---

## Happy Coding and Learning! 🚀

*Built with ❤️ for the low-level programming community*