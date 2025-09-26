# Makefile for TrpDirectories Blog System
# Author: sel-mlil
# Description: Build system for static blog with JSON guides

# Variables
NODE = node
GUIDE_GENERATOR = guide-generator.js
BUILD_SYSTEM = build-system.js
CLEAN_SYSTEM = clean-guides.js
VALIDATE_SYSTEM = validate-system.js
GUIDES_DIR = guides
ARTICLES_DIR = articles
OUTPUT_DIR = guides

# Colors for output
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

# Default target
.PHONY: all re clean help

# Build all guides and validate the system
all: build
	@echo "$(GREEN)✅ Build complete! All guides processed successfully.$(NC)"

# Rebuild everything from scratch
re: clean all
	@echo "$(GREEN)🔄 Full rebuild complete!$(NC)"

# Clean generated files and temporary data
clean:
	@echo "$(YELLOW)🧹 Cleaning generated files...$(NC)"
	@if [ -f "$(CLEAN_SYSTEM)" ]; then \
		$(NODE) $(CLEAN_SYSTEM); \
	else \
		echo "$(YELLOW)⚠️  Clean script not found, performing basic cleanup...$(NC)"; \
		rm -rf $(OUTPUT_DIR)/*.html; \
		rm -rf $(OUTPUT_DIR)/temp_*; \
	fi
	@echo "$(GREEN)✨ Cleanup complete!$(NC)"

# Validate the guide system and JSON files
validate:
	@echo "$(YELLOW)🔍 Validating guide system...$(NC)"
	@if [ -f "$(VALIDATE_SYSTEM)" ]; then \
		$(NODE) $(VALIDATE_SYSTEM); \
	else \
		echo "$(RED)❌ Validation script not found!$(NC)"; \
		exit 1; \
	fi

# Build guides from JSON articles
build: validate
	@echo "$(YELLOW)🏗️  Building guides...$(NC)"
	@if [ -f "$(BUILD_SYSTEM)" ]; then \
		$(NODE) $(BUILD_SYSTEM); \
	elif [ -f "$(GUIDE_GENERATOR)" ]; then \
		$(NODE) $(GUIDE_GENERATOR); \
	else \
		echo "$(RED)❌ No build script found!$(NC)"; \
		exit 1; \
	fi

# Development server (if available)
serve:
	@echo "$(YELLOW)🚀 Starting development server...$(NC)"
	@if command -v python3 >/dev/null 2>&1; then \
		echo "$(GREEN)Starting Python HTTP server on http://localhost:8000$(NC)"; \
		python3 -m http.server 8000; \
	elif command -v python >/dev/null 2>&1; then \
		echo "$(GREEN)Starting Python HTTP server on http://localhost:8000$(NC)"; \
		python -m SimpleHTTPServer 8000; \
	else \
		echo "$(RED)❌ Python not found. Please install Python or use another HTTP server.$(NC)"; \
		exit 1; \
	fi

# Watch for changes (requires entr or inotify-tools)
watch:
	@echo "$(YELLOW)👀 Watching for changes...$(NC)"
	@if command -v entr >/dev/null 2>&1; then \
		find $(ARTICLES_DIR) -name "*.json" | entr -r make build; \
	elif command -v inotifywait >/dev/null 2>&1; then \
		while true; do \
			inotifywait -e modify,create,delete -r $(ARTICLES_DIR); \
			make build; \
		done; \
	else \
		echo "$(RED)❌ Neither 'entr' nor 'inotifywait' found. Please install one for file watching.$(NC)"; \
		echo "$(YELLOW)💡 Install with: sudo apt install entr (or inotify-tools)$(NC)"; \
		exit 1; \
	fi

# Show help information
help:
	@echo "$(GREEN)TrpDirectories Blog Build System$(NC)"
	@echo ""
	@echo "Available targets:"
	@echo "  $(YELLOW)all$(NC)      - Validate and build all guides (default)"
	@echo "  $(YELLOW)re$(NC)       - Clean and rebuild everything from scratch"
	@echo "  $(YELLOW)clean$(NC)    - Remove generated files and temporary data"
	@echo "  $(YELLOW)validate$(NC) - Check JSON guide files for errors"
	@echo "  $(YELLOW)build$(NC)    - Generate HTML guides from JSON articles"
	@echo "  $(YELLOW)serve$(NC)    - Start local development server on port 8000"
	@echo "  $(YELLOW)watch$(NC)    - Watch for file changes and auto-rebuild"
	@echo "  $(YELLOW)help$(NC)     - Show this help message"
	@echo ""
	@echo "Examples:"
	@echo "  make all     # Build everything"
	@echo "  make re      # Full clean rebuild"
	@echo "  make clean   # Clean generated files"
	@echo "  make serve   # Start dev server"
	@echo ""
	@echo "$(GREEN)Happy coding! 🚀$(NC)"