# Article Template & Content Guide

Use this comprehensive template to create new learning guide articles. This template includes all available section types, content formats, and examples.

**Two ways to create articles:**
1. **Visual JSON Builder**: Use `json-builder.html` for interactive guide creation
2. **Manual Creation**: Copy and modify this JSON template

Save completed articles as `your-article-title.json` in the `articles/` directory.

## Complete Article Structure

```json
{
  "meta": {
    "title": "Your Comprehensive Guide Title",
    "description": "Detailed description of what this guide covers and who it's for",
    "author": "Your Name or Handle",
    "tags": ["primary-topic", "secondary-concept", "programming-language", "difficulty-level"],
    "difficulty": "beginner|intermediate|advanced",
    "lastUpdated": "2024-09-26"
  },
  "navigation": [
    {"id": "hook", "emoji": "🎯", "title": "The Hook", "sectionIndex": 0},
    {"id": "concept", "emoji": "💡", "title": "Core Concepts", "sectionIndex": 1},
    {"id": "mechanics", "emoji": "⚙️", "title": "How It Works", "sectionIndex": 2},
    {"id": "examples", "emoji": "🌍", "title": "Real Examples", "sectionIndex": 3},
    {"id": "practice", "emoji": "🛠️", "title": "Hands-On Practice", "sectionIndex": 4},
    {"id": "debugging", "emoji": "🐛", "title": "Debugging & Troubleshooting", "sectionIndex": 5},
    {"id": "performance", "emoji": "🚀", "title": "Performance & Optimization", "sectionIndex": 6},
    {"id": "security", "emoji": "🔒", "title": "Security Considerations", "sectionIndex": 7},
    {"id": "patterns", "emoji": "🏗️", "title": "Design Patterns", "sectionIndex": 8},
    {"id": "tools", "emoji": "🔧", "title": "Tools & Utilities", "sectionIndex": 9},
    {"id": "bestpractices", "emoji": "✨", "title": "Best Practices", "sectionIndex": 10},
    {"id": "warnings", "emoji": "⚠️", "title": "Common Pitfalls", "sectionIndex": 11},
    {"id": "advanced", "emoji": "🎓", "title": "Advanced Topics", "sectionIndex": 12},
    {"id": "test", "emoji": "🎯", "title": "Test Yourself", "sectionIndex": 13},
    {"id": "growth", "emoji": "📈", "title": "Next Steps", "sectionIndex": 14}
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
          "content": "<strong>What is this?</strong><br>Brief explanation of the concept.",
          "html": true
        },
        {
          "type": "paragraph", 
          "content": "<strong>Why care?</strong><br>Why this topic matters.",
          "html": true
        },
        {
          "type": "paragraph",
          "content": "<strong>Mental model:</strong><br>Easy-to-understand analogy.",
          "html": true
        }
      ]
    },
    {
      "id": "mechanics",
      "title": "HOW IT WORKS",
      "emoji": "⚙️",
      "iconClass": "mechanics",
      "content": [
        {
          "type": "heading",
          "level": 3,
          "content": "Core mechanics"
        },
        {
          "type": "list",
          "items": [
            "<strong>Key concept 1:</strong> Explanation",
            "<strong>Key concept 2:</strong> Explanation"
          ]
        }
      ]
    },
    {
      "id": "examples",
      "title": "REAL EXAMPLES",
      "emoji": "🌍", 
      "iconClass": "examples",
      "content": [
        {
          "type": "heading",
          "level": 3,
          "content": "Basic example"
        },
        {
          "type": "codeblock",
          "language": "c",
          "code": "// Your code example here\\nint main() {\\n    return 0;\\n}"
        }
      ]
    },
    {
      "id": "practice",
      "title": "DO THIS NOW",
      "emoji": "🛠️",
      "iconClass": "practice", 
      "content": [
        {
          "type": "actionbox",
          "boxType": "action",
          "content": [
            {
              "type": "list",
              "ordered": true,
              "items": ["Step 1: Do this", "Step 2: Do that"]
            },
            {
              "type": "paragraph",
              "content": "<strong>What to look for:</strong> Expected results.<br><strong>Quick win:</strong> Immediate benefit.",
              "html": true
            }
          ]
        }
      ]
    },
    {
      "id": "warnings",
      "title": "AVOID THESE",
      "emoji": "⚠️",
      "iconClass": "warnings",
      "content": [
        {
          "type": "actionbox",
          "boxType": "warning",
          "content": [
            {
              "type": "list",
              "items": [
                "<strong>Common mistake 1</strong> → How to avoid it",
                "<strong>Common mistake 2</strong> → How to avoid it"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "connections",
      "title": "CONNECTIONS", 
      "emoji": "🔗",
      "iconClass": "connections",
      "content": [
        {
          "type": "list",
          "items": [
            "<strong>Prerequisites:</strong> What you need to know first",
            "<strong>Related concepts:</strong> Connected topics",
            "<strong>Next steps:</strong> Where to go from here"
          ]
        }
      ]
    },
    {
      "id": "test",
      "title": "TEST YOURSELF",
      "emoji": "🎯",
      "iconClass": "test",
      "content": [
        {
          "type": "list", 
          "ordered": true,
          "items": [
            "Question 1?",
            "Question 2?",
            "Question 3?"
          ]
        },
        {
          "type": "paragraph",
          "content": "<strong>Success criteria:</strong> How to know you've mastered it.<br><strong>Review triggers:</strong> When to revisit this topic.",
          "html": true
        }
      ]
    },
    {
      "id": "growth",
      "title": "LEVEL UP",
      "emoji": "📈",
      "iconClass": "growth", 
      "content": [
        {
          "type": "list",
          "items": [
            "<strong>This week:</strong> Immediate next steps",
            "<strong>This month:</strong> Medium-term goals", 
            "<strong>Long term:</strong> Advanced mastery goals"
          ]
        }
      ]
    }
  ],
  ]
}
```

## Quick Reference Tables

### Content Types Summary

| Type | Purpose | Required Fields | Optional Fields | Example Use |
|------|---------|----------------|----------------|-------------|
| **paragraph** | Basic text content | `content` | `html` | Main explanatory text |
| **heading** | Section titles | `level`, `content` | - | Organize content hierarchy |
| **list** | Bulleted/numbered items | `items` | `ordered` | Step-by-step instructions |
| **codeblock** | Syntax-highlighted code | `language`, `code` | - | Programming examples |
| **quote** | Blockquotes with attribution | `content` | `author` | Expert insights, citations |

### Section Icon Classes Reference

| Icon Class | Emoji | Color | Purpose | When to Use |
|------------|-------|--------|---------|-------------|
| **hook** | 🎯 | Orange (#f59e0b) | Attention grabbers | Introduction, motivation |
| **concept** | 💡 | Indigo (#6366f1) | Core concepts | Fundamental principles |
| **mechanics** | ⚙️ | Blue (#3b82f6) | Technical explanations | How things work internally |
| **examples** | 🌍 | Green (#10b981) | Code demonstrations | Practical implementations |
| **practice** | 🛠️ | Red (#ef4444) | Hands-on exercises | Interactive learning |
| **theory** | 📚 | Purple (#8b5cf6) | Theoretical background | Academic foundations |
| **debugging** | 🐛 | Red (#ef4444) | Troubleshooting | Error analysis, solutions |
| **performance** | 🚀 | Orange (#f59e0b) | Optimization tips | Speed, efficiency |
| **architecture** | 🏗️ | Slate (#64748b) | System design | Structural concepts |
| **security** | 🔒 | Dark Red (#dc2626) | Security considerations | Vulnerabilities, protection |
| **optimization** | ⚡ | Green (#059669) | Performance tuning | Efficiency improvements |
| **patterns** | 🎨 | Violet (#7c3aed) | Design patterns | Best practice templates |
| **tools** | 🔧 | Cyan (#0891b2) | Development utilities | Helpful software/commands |
| **bestpractices** | ✨ | Green (#16a34a) | Recommended approaches | Industry standards |
| **troubleshooting** | 🔍 | Orange-Red (#ea580c) | Problem-solving | Diagnostic strategies |
| **advanced** | 🎓 | Dark Red (#991b1b) | Expert topics | Deep technical content |
| **warnings** | ⚠️ | Orange (#f59e0b) | Common pitfalls | Mistakes to avoid |
| **connections** | 🔗 | Purple (#8b5cf6) | Related topics | Prerequisites, next steps |
| **test** | 🎯 | Cyan (#06b6d4) | Knowledge assessment | Self-evaluation |
| **growth** | 📈 | Green (#10b981) | Learning progression | Future learning path |

### Supported Programming Languages

| Language | Identifier | Language | Identifier | Language | Identifier |
|----------|------------|----------|------------|----------|------------|
| C | `c` | Python | `python` | Bash | `bash` |
| C++ | `cpp` | JavaScript | `javascript` | Shell | `shell` |
| Java | `java` | TypeScript | `typescript` | CSS | `css` |
| Rust | `rust` | HTML | `html` | SCSS | `scss` |
| Go | `go` | JSON | `json` | SQL | `sql` |
| Swift | `swift` | XML | `xml` | YAML | `yaml` |
| Kotlin | `kotlin` | Markdown | `markdown` | Dockerfile | `dockerfile` |
| PHP | `php` | Assembly | `assembly` | Makefile | `makefile` |

## Detailed Content Types Reference

### 1. Paragraph
Basic text content with optional HTML formatting.
```json
{
  "type": "paragraph",
  "content": "Your text content here with <strong>HTML formatting</strong> if needed",
  "html": true  // Optional: enables HTML tags, defaults to false
}
```

### 2. Heading
Structured headings for content organization.
```json
{
  "type": "heading",
  "level": 3,  // 2, 3, or 4 (H2, H3, H4)
  "content": "Your Heading Text"
}
```

### 3. List
Bulleted or numbered lists with multiple items.
```json
{
  "type": "list",
  "ordered": false,  // true for numbered lists, false for bullets
  "items": [
    "First item with <strong>HTML</strong> if needed",
    "Second item with details",
    "Third item with examples"
  ]
}
```

### 4. Code Block
Syntax-highlighted code examples with 20+ language support.
```json
{
  "type": "codeblock",
  "language": "c",  // Required: c, javascript, python, bash, css, html, json, etc.
  "code": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}"
}
```

**Supported Languages:** c, cpp, javascript, python, bash, shell, css, html, json, sql, yaml, xml, markdown, diff, dockerfile, makefile, assembly, rust, go, java, kotlin, swift, php, ruby, perl, lua, r, matlab, typescript, scss, less, vue, jsx, tsx

### 5. Quote
Blockquotes with optional author attribution.
```json
{
  "type": "quote",
  "content": "The quote text that provides insight or wisdom",
  "author": "Author Name"  // Optional: attribution
}
```

## Complete Icon Classes & Colors

### Core Learning Structure
- **`hook`** 🎯 (Orange #f59e0b) - Attention grabbers, introductions
- **`concept`** 💡 (Indigo #6366f1) - Core concepts, fundamental principles
- **`mechanics`** ⚙️ (Blue #3b82f6) - How it works, technical explanations
- **`examples`** 🌍 (Green #10b981) - Code examples, demonstrations
- **`practice`** 🛠️ (Red #ef4444) - Hands-on exercises, activities

### Advanced Topics
- **`theory`** 📚 (Purple #8b5cf6) - Theoretical background, academic concepts
- **`debugging`** 🐛 (Red #ef4444) - Troubleshooting, error analysis
- **`performance`** 🚀 (Orange #f59e0b) - Optimization, efficiency tips
- **`architecture`** 🏗️ (Slate #64748b) - System design, structural concepts
- **`security`** 🔒 (Dark Red #dc2626) - Security considerations, vulnerabilities
- **`optimization`** ⚡ (Green #059669) - Performance tuning, efficiency
- **`patterns`** 🎨 (Violet #7c3aed) - Design patterns, best practices
- **`tools`** 🔧 (Cyan #0891b2) - Development tools, utilities
- **`bestpractices`** ✨ (Green #16a34a) - Recommended approaches, standards
- **`troubleshooting`** 🔍 (Orange-Red #ea580c) - Problem-solving strategies
- **`advanced`** 🎓 (Dark Red #991b1b) - Expert-level topics, deep dives

### Assessment & Growth
- **`warnings`** ⚠️ (Orange #f59e0b) - Pitfalls, common mistakes
- **`connections`** 🔗 (Purple #8b5cf6) - Related topics, prerequisites
- **`test`** 🎯 (Cyan #06b6d4) - Self-assessment, knowledge checks
- **`growth`** 📈 (Green #10b981) - Next steps, learning progression

## JSON Builder Usage

**Recommended Workflow:**
1. Open `json-builder.html` in your browser
2. Use the visual interface to select section types and content
3. Preview your JSON structure in real-time
4. Export completed JSON to `articles/` directory
5. Run `make all` to generate the HTML guide

**Advanced Features:**
- **Tag Autocomplete:** Start typing to see suggested tags
- **Icon Color Preview:** Visual selection shows actual section colors
- **Content Validation:** Real-time structure checking
- **Import/Export:** Edit existing guides seamlessly
```

## Content Types Reference

### Paragraph
```json
{
  "type": "paragraph",
  "content": "Your text content here",
  "html": true  // Optional: allows HTML tags
}
```

### Heading
```json
{
  "type": "heading", 
  "level": 3,
  "content": "Heading text"
}
```

### List
```json
{
  "type": "list",
  "ordered": false,  // true for numbered lists
  "items": ["Item 1", "Item 2"],
  "startFrom": 2  // Optional: for numbered lists
}
```

### Code Block
```json
{
  "type": "codeblock",
  "language": "c", // Required: c, javascript, bash, css, html, json, etc.
  "code": "int main() {\\n    return 0;\\n}",
  "withSyntaxHighlight": true // Optional: defaults to true
}
```

### Action/Warning/Tip Box
```json
{
  "type": "actionbox",
  "boxType": "action|warning|tip",
  "title": "Optional title",
  "content": [
    // Array of other content types
  ]
}
```

## Icon Classes Available
- `hook` (yellow) - For introductory content
- `mechanics` (blue) - For technical explanations  
- `examples` (green) - For code examples
- `practice` (red) - For hands-on exercises
- `warnings` (orange) - For pitfalls and warnings
- `connections` (purple) - For related topics
- `test` (cyan) - For self-assessment
- `growth` (green) - For learning progression