# --DEPRECATED-- JSON-to-HTML Guide Generator

**⚠️ DEPRECATED: This documentation is outdated. Please refer to the main README.md and use build-system.js instead.**

This system allows you to generate your learning guide HTML files from structured JSON data, making it easier to maintain and create new guides.

## 📁 Files Created

### Core Files
- **`guides-schema.json`** - JSON schema defining the structure
- **`guide-generator.js`** - JavaScript class for HTML generation
- **`generate-guides.js`** - Node.js script to generate guides

### Example JSON Guides
- **`struct-padding-alignment.json`** - Struct padding guide data
- **`sockets-poll.json`** - Sockets & Poll guide data

## 🛠️ Usage

### Method 1: Node.js Script
```bash
# Generate all guides
node generate-guides.js

# This will create:
# - generated/struct-padding-alignment.html
# - generated/sockets-poll.html
```

### Method 2: Browser/Manual
```javascript
// Load JSON data
const jsonData = await fetch('struct-padding-alignment.json').then(r => r.json());

// Create generator
const generator = new GuideGenerator(jsonData);

// Generate HTML
const html = generator.generateHTML();

// Use the HTML (save to file, display in browser, etc.)
```

## 📋 JSON Structure

### Basic Guide Structure
```json
{
  "meta": {
    "title": "Guide Title",
    "description": "Guide description",
    "tags": ["tag1", "tag2"],
    "difficulty": "beginner|intermediate|advanced",
    "lastUpdated": "2024-09-26"
  },
  "navigation": [
    {"id": "hook", "emoji": "🎯", "title": "The Hook", "sectionIndex": 0}
  ],
  "sections": [
    {
      "id": "hook",
      "title": "THE HOOK", 
      "emoji": "🎯",
      "iconClass": "hook",
      "content": [...]
    }
  ]
}
```

### Content Types

#### Paragraph
```json
{
  "type": "paragraph",
  "content": "Your text here",
  "html": true  // Optional: allows HTML tags
}
```

#### Heading
```json
{
  "type": "heading",
  "level": 3,
  "content": "Heading text"
}
```

#### List
```json
{
  "type": "list",
  "ordered": false,  // true for <ol>, false for <ul>
  "items": ["Item 1", "Item 2"],
  "startFrom": 2  // Optional: for ordered lists
}
```

#### Code Block
```json
{
  "type": "codeblock",
  "language": "c",
  "code": "int main() {\\n    return 0;\\n}",
  "withSyntaxHighlight": true
}
```

#### Action/Warning/Tip Box
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

## 🎨 Features

### Automatic Syntax Highlighting
The generator automatically applies syntax highlighting to C code blocks:
- **Keywords**: `struct`, `while`, `for`, `if`
- **Types**: `int`, `char`, `void`
- **Functions**: `printf`, `socket`, `bind`
- **Variables**: Identifiers and constants
- **Comments**: `// comment text`
- **Strings**: `"string content"`
- **Numbers**: `123`, `0x456`

### Responsive Design
Generated HTML includes:
- Mobile-responsive navigation
- Dark/light theme support
- Progress tracking
- Smooth scrolling
- Local storage persistence

### Consistent Styling
All generated guides use the centralized CSS system:
- Unified theme variables
- Consistent component styling
- Proper code block formatting
- Responsive breakpoints

## 🔧 Customization

### Adding New Content Types
Extend the `generateContent()` method in `guide-generator.js`:

```javascript
case 'mycustomtype':
    return `<div class="custom-class">${item.content}</div>`;
```

### Modifying Syntax Highlighting
Update the `syntaxMap` in the GuideGenerator constructor:

```javascript
this.syntaxMap = {
    'myKeyword': 'keyword',
    'myFunction': 'function'
    // ...
};
```

### Custom Styling
The generated HTML references `../style/main.css`, so all your existing styles apply automatically.

## 💡 Benefits

1. **Maintainability**: Edit content in JSON instead of HTML
2. **Consistency**: Automatic structure and styling
3. **Reusability**: Same generator for all guides
4. **Validation**: JSON schema ensures correct structure
5. **Version Control**: Cleaner diffs with JSON
6. **Automation**: Script can regenerate all guides at once

## 🚀 Next Steps

1. Convert existing guides to JSON format
2. Create new guides using JSON structure
3. Set up build process to auto-generate HTML
4. Extend schema for new content types as needed

## 📝 Example Workflow

1. **Create new guide**: Write JSON following the schema
2. **Generate HTML**: Run `node generate-guides.js`
3. **Review output**: Check generated HTML in browser
4. **Deploy**: Copy generated files to your guide directories
5. **Iterate**: Modify JSON and regenerate as needed

This system gives you the flexibility to manage your guides as structured data while maintaining the rich, interactive HTML experience you've built!