#!/bin/bash

# ==============================================================================
# 🚀 illunare 4.0 Enterprise Documentation Server
# ==============================================================================
# This script sets up and serves the comprehensive documentation locally
# with all enterprise features and modern theme enabled.
# ==============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Banner
echo -e "${PURPLE}===============================================================================${NC}"
echo -e "${CYAN}🚀 illunare 4.0 Enterprise Platform - Documentation Server${NC}"
echo -e "${PURPLE}===============================================================================${NC}"
echo -e "${GREEN}📚 Comprehensive documentation for 175+ repositories${NC}"
echo -e "${GREEN}🎨 Modern Material Design theme with enterprise branding${NC}"
echo -e "${GREEN}🤖 AI/ML documentation with DeepSeek R1/R3 integration${NC}"
echo -e "${GREEN}🏭 Industrial connectivity (Profibus/Profinet) documentation${NC}"
echo -e "${GREEN}🚗 Automotive integration and compliance documentation${NC}"
echo -e "${GREEN}🇧🇷 Brazilian & LATAM compliance framework documentation${NC}"
echo -e "${PURPLE}===============================================================================${NC}"

# Check if we're in the right directory
if [ ! -f "mkdocs.yml" ]; then
    echo -e "${RED}❌ Error: mkdocs.yml not found. Please run this script from the docs-site directory.${NC}"
    exit 1
fi

# Check Python and pip
echo -e "${BLUE}🔍 Checking Python environment...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is required but not installed.${NC}"
    exit 1
fi

if ! command -v pip3 &> /dev/null; then
    echo -e "${RED}❌ pip3 is required but not installed.${NC}"
    exit 1
fi

# Install requirements if needed
echo -e "${BLUE}📦 Installing/updating documentation dependencies...${NC}"
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${YELLOW}⚠️  requirements.txt not found, installing basic MkDocs...${NC}"
    pip3 install mkdocs mkdocs-material
fi

# Check if docs directory exists
if [ ! -d "docs" ]; then
    echo -e "${YELLOW}📁 Creating docs directory structure...${NC}"
    mkdir -p docs
    
    # Create basic index if it doesn't exist
    if [ ! -f "docs/index.md" ]; then
        echo -e "${BLUE}📝 Creating basic documentation structure...${NC}"
        cat > docs/index.md << 'EOF'
# 🌟 illunare 4.0 Enterprise Platform

Welcome to the comprehensive documentation for the illunare 4.0 Enterprise Platform.

## 🚀 Quick Start

This documentation covers:
- 175+ microservices and repositories
- AI/ML integration with DeepSeek R1/R3
- Industrial connectivity (Profibus/Profinet)
- Automotive integration and compliance
- Brazilian & LATAM regulatory compliance
- Modern technology stack overview

## 📚 Navigation

Use the navigation menu to explore different sections of the documentation.
EOF
    fi
fi

# Function to serve documentation
serve_docs() {
    local port=${1:-8000}
    local host=${2:-127.0.0.1}
    
    echo -e "${PURPLE}===============================================================================${NC}"
    echo -e "${GREEN}🌐 Starting illunare 4.0 Documentation Server${NC}"
    echo -e "${PURPLE}===============================================================================${NC}"
    echo -e "${CYAN}📍 Server URL: http://${host}:${port}${NC}"
    echo -e "${CYAN}🔄 Hot-reload: Enabled (changes will auto-refresh)${NC}"
    echo -e "${CYAN}🎨 Theme: Material Design Enterprise Edition${NC}"
    echo -e "${CYAN}📊 Features: Mermaid diagrams, search, analytics${NC}"
    echo -e "${PURPLE}===============================================================================${NC}"
    echo -e "${YELLOW}💡 Press Ctrl+C to stop the server${NC}"
    echo -e "${PURPLE}===============================================================================${NC}"
    
    # Start MkDocs server
    mkdocs serve --dev-addr "${host}:${port}" --livereload
}

# Function to build static documentation
build_docs() {
    echo -e "${BLUE}🏗️  Building static documentation...${NC}"
    mkdocs build
    echo -e "${GREEN}✅ Static documentation built in 'site' directory${NC}"
}

# Function to validate documentation
validate_docs() {
    echo -e "${BLUE}🔍 Validating documentation structure...${NC}"
    
    # Check for required files
    local required_files=("mkdocs.yml" "docs/index.md")
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            echo -e "${RED}❌ Missing required file: $file${NC}"
            return 1
        fi
    done
    
    # Validate MkDocs configuration
    if mkdocs build --strict > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Documentation structure is valid${NC}"
        return 0
    else
        echo -e "${RED}❌ Documentation has validation errors${NC}"
        echo -e "${YELLOW}🔧 Running with detailed error output:${NC}"
        mkdocs build --strict
        return 1
    fi
}

# Function to show documentation statistics
show_stats() {
    echo -e "${BLUE}📊 Documentation Statistics:${NC}"
    echo -e "${GREEN}📁 Total pages: $(find docs -name '*.md' | wc -l)${NC}"
    echo -e "${GREEN}📝 Total words: $(find docs -name '*.md' -exec wc -w {} \; | awk '{sum+=$1} END {print sum}')${NC}"
    echo -e "${GREEN}📏 Total lines: $(find docs -name '*.md' -exec wc -l {} \; | awk '{sum+=$1} END {print sum}')${NC}"
    
    if [ -d "site" ]; then
        echo -e "${GREEN}💾 Built site size: $(du -sh site | cut -f1)${NC}"
    fi
}

# Function to clean build artifacts
clean_docs() {
    echo -e "${BLUE}🧹 Cleaning documentation build artifacts...${NC}"
    rm -rf site/
    echo -e "${GREEN}✅ Clean completed${NC}"
}

# Function to show help
show_help() {
    echo -e "${BLUE}📚 illunare 4.0 Documentation Server - Usage:${NC}"
    echo ""
    echo -e "${GREEN}./serve-docs.sh [command] [options]${NC}"
    echo ""
    echo -e "${YELLOW}Commands:${NC}"
    echo -e "  ${CYAN}serve [port] [host]${NC}    Serve documentation (default: localhost:8000)"
    echo -e "  ${CYAN}build${NC}                  Build static documentation"
    echo -e "  ${CYAN}validate${NC}               Validate documentation structure"
    echo -e "  ${CYAN}stats${NC}                  Show documentation statistics"
    echo -e "  ${CYAN}clean${NC}                  Clean build artifacts"
    echo -e "  ${CYAN}help${NC}                   Show this help message"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo -e "  ${GREEN}./serve-docs.sh${NC}                    # Serve on localhost:8000"
    echo -e "  ${GREEN}./serve-docs.sh serve 3000${NC}         # Serve on localhost:3000"
    echo -e "  ${GREEN}./serve-docs.sh serve 8080 0.0.0.0${NC} # Serve on all interfaces:8080"
    echo -e "  ${GREEN}./serve-docs.sh build${NC}              # Build static site"
    echo -e "  ${GREEN}./serve-docs.sh validate${NC}           # Validate docs"
}

# Parse command line arguments
case "${1:-serve}" in
    "serve")
        validate_docs && serve_docs "$2" "$3"
        ;;
    "build")
        validate_docs && build_docs
        ;;
    "validate")
        validate_docs
        ;;
    "stats")
        show_stats
        ;;
    "clean")
        clean_docs
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        show_help
        exit 1
        ;;
esac 