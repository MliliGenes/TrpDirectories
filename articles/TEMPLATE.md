# Article Template

Use this template to create new learning guide articles. Save as `your-article-title.json` in the `articles/` directory.

```json
{
  "meta": {
    "title": "Your Article Title",
    "description": "Brief description of what this guide covers",
    "author": "Your Name",
    "tags": ["tag1", "tag2", "programming"],
    "difficulty": "beginner|intermediate|advanced",
    "lastUpdated": "2024-09-26"
  },
  "navigation": [
    {"id": "hook", "emoji": "🎯", "title": "The Hook", "sectionIndex": 0},
    {"id": "mechanics", "emoji": "⚙️", "title": "How It Works", "sectionIndex": 1},
    {"id": "examples", "emoji": "🌍", "title": "Real Examples", "sectionIndex": 2},
    {"id": "practice", "emoji": "🛠️", "title": "Do This Now", "sectionIndex": 3},
    {"id": "warnings", "emoji": "⚠️", "title": "Avoid These", "sectionIndex": 4},
    {"id": "connections", "emoji": "🔗", "title": "Connections", "sectionIndex": 5},
    {"id": "test", "emoji": "🎯", "title": "Test Yourself", "sectionIndex": 6},
    {"id": "growth", "emoji": "📈", "title": "Level Up", "sectionIndex": 7}
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
  "footer": {
    "message": "Learning journey completed! 🎉",
    "completionText": "Mark this topic as mastered"
  }
}
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
  "language": "c",
  "code": "int main() {\\n    return 0;\\n}",
  "withSyntaxHighlight": true
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