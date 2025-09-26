# Low-Level Programming Blog

A comprehensive educational resource for low-level programming concepts, featuring an automated build system that converts JSON articles into beautifully formatted HTML guides.

## 🚀 Features

- **Automated Build System**: JSON-to-HTML conversion with error handling
- **Organized Content Structure**: Clean separation of source and generated content
- **Interactive Navigation**: Dynamic table of contents and section jumping
- **Syntax Highlighting**: Code examples with proper highlighting
- **Responsive Design**: Mobile-friendly layout with dark/light theme support
- **Comprehensive Validation**: JSON schema validation and error recovery

## 📁 Project Structure

```
lowlevel_blog/
├── articles/                    # 📝 JSON source files for articles
│   ├── TEMPLATE.md             # Article template and documentation
│   ├── memory-management-basics.json
│   ├── sockets-poll.json
│   └── struct-padding-alignment.json
├── build/                      # 🔨 Generated HTML guides (auto-created)
│   ├── Memory Management Basics/
│   ├── Sockets & Poll/
│   └── Struct Padding & Alignment/
├── style/                      # 🎨 Stylesheets
│   └── main.css
├── imgs/                       # 🖼️ Images and assets
│   └── favicon.png
├── build-system.js            # 🏗️ Main build automation
├── guide-generator.js         # 📄 HTML generation engine
├── guides-config.json         # ⚙️ Auto-generated configuration
├── index.html                 # 🏠 Main landing page
└── README.md                  # 📖 This file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (for running the build system)
- A text editor for creating JSON articles

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd lowlevel_blog
   ```

2. **Create a new article**:
   ```bash
   cp articles/TEMPLATE.md articles/my-new-article.json
   # Edit the JSON file with your content
   ```

3. **Build the guides**:
   ```bash
   node build-system.js
   ```

4. **Clean generated guides** (optional):
   ```bash
   node clean-guides.js
   ```

5. **Open in browser**:
   ```bash
   open index.html
   ```

## 📝 Writing Articles

### Article Structure

Articles are written in JSON format with the following structure:

```json
{
  "meta": {
    "title": "Your Article Title",
    "description": "Brief description of the article",
    "tags": ["tag1", "tag2", "tag3"],
    "difficulty": "beginner|intermediate|advanced",
    "lastUpdated": "2024-09-26"
  },
  "navigation": [
    {
      "title": "Section Title",
      "id": "section-id",
      "subsections": [
        {
          "title": "Subsection Title",
          "id": "subsection-id"
        }
      ]
    }
  ],
  "sections": [
    {
      "id": "section-id",
      "title": "Section Title",
      "content": "Your content here...",
      "subsections": [
        {
          "id": "subsection-id",
          "title": "Subsection Title",
          "content": "Subsection content..."
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

### Version 2.2.0
- [ ] Incremental builds (only process changed files)
- [ ] Article dependencies and cross-references
- [ ] Enhanced search functionality
- [ ] Performance metrics and analytics

### Version 2.3.0
- [ ] Multi-language support
- [ ] Interactive code examples
- [ ] Video embedding support
- [ ] Comment system integration

### Version 3.0.0
- [ ] Static site generator migration
- [ ] Content management interface
- [ ] Collaborative editing features
- [ ] Advanced theming system

---

**Happy coding and learning! 🚀**

*Built with ❤️ for the low-level programming community*