# 📚 illunare 4.0 Enterprise - Centralized Documentation

[![Docs Build](https://github.com/illunare-40/docs-site/actions/workflows/docs-aggregation.yml/badge.svg)](https://github.com/illunare-40/docs-site/actions/workflows/docs-aggregation.yml)
[![Site Status](https://img.shields.io/website?url=https%3A%2F%2Fdocs.illunare.com)](https://docs.illunare.com)
[![Last Updated](https://img.shields.io/github/last-commit/illunare-40/docs-site)](https://github.com/illunare-40/docs-site/commits/main)

Single portal for technical and functional documentation for all **illunare 4.0 Enterprise** platform services.

## 🚀 Quick Access

- 📖 **Documentation Site**: [docs.illunare.com](https://docs.illunare.com)
- 🔄 **Automatic Updates**: Every 30 minutes
- 📊 **90+ Microservices** documented automatically

## 🔧 Aggregated Collection System

This repository implements an advanced **aggregated collection** system that:

### ✨ Features

- 🔍 **Automatic Discovery**: Scans all repositories in the `illunare-40` organization
- 📥 **Intelligent Collection**: Extracts documentation from 90+ repositories simultaneously
- 🏗️ **Dynamic Aggregation**: Organizes by categories (Frontend, AI, Security, Data, etc.)
- 🚀 **Automatic Deploy**: Publishes to GitHub Pages with zero manual configuration
- 📊 **Reports**: Complete build and processing statistics

### 🔄 Automatic Workflow

```mermaid
graph LR
    A[Repository Discovery] --> B[Parallel Docs Collection]
    B --> C[Intelligent Aggregation]
    C --> D[MkDocs Build]
    D --> E[GitHub Pages Deploy]
    E --> F[Success Notification]
```

## 🏗️ Technology Stack

- **📚 MkDocs-Material**: Documentation framework
- **🐍 Python**: Aggregation scripts
- **⚡ GitHub Actions**: Automated pipeline
- **📄 GitHub Pages**: Static hosting
- **🔗 YAML**: Dynamic configuration

## 📁 Project Structure

```
docs-site/
├── docs/                          # Main documentation
│   ├── index.md                   # Homepage
│   ├── services/                  # Services automatically aggregated
│   │   ├── core/                  # Core Services
│   │   ├── ai/                    # AI Services  
│   │   ├── security/              # Security Services
│   │   ├── data/                  # Data Services
│   │   ├── integration/           # Integration Services
│   │   └── frontend/              # Frontend Applications
│   ├── infrastructure/            # Infrastructure documentation
│   ├── security/                  # Security documentation
│   └── deployment/                # Deployment documentation
├── mkdocs.yml                     # MkDocs configuration
├── requirements.txt               # Python dependencies
└── .github/workflows/
    └── docs-aggregation.yml       # Aggregation pipeline
```

## 🚀 How It Works

### 1. Repository Discovery (Automatic)
```yaml
# Inclusion criteria
- *-service          # Microservices
- *-portal           # Portals
- *-app              # Applications
- admin-*            # Admin tools
- mobile-*           # Mobile apps
- landingpage-*      # Landing pages
```

### 2. Documentation Extraction
For each repository found:
- ✅ `README.md` → `index.md`
- ✅ `docs/` → Complete documentation
- ✅ `api-docs/` → API documentation
- ✅ `*.yaml|yml|json` → OpenAPI specs
- ✅ `Dockerfile` → Deployment info
- ✅ `package.json|go.mod|Cargo.toml` → Dependencies

### 3. Intelligent Categorization
```python
def categorize_service(repo_name, metadata):
    if 'admin-portal' in name: return 'frontend'
    elif 'ai-' in name: return 'ai'  
    elif 'security' in name: return 'security'
    elif 'db-' in name: return 'data'
    elif 'gateway' in name: return 'integration'
    else: return 'core'
```

### 4. Automatic Deploy
- 🏗️ **Build**: MkDocs generates static site
- 🚀 **Deploy**: GitHub Pages publishes automatically
- 📊 **Report**: Build statistics and links

## ⚙️ Configuration

### Required Environment Variables

```yaml
# Required GitHub Secrets
ORG_ACCESS_TOKEN: github_organization_token
# Permissions: repo, read:org, workflow
```

### Manual Execution

```bash
# Force complete rebuild
gh workflow run docs-aggregation.yml -f force_rebuild=true

# Deploy to specific environment  
gh workflow run docs-aggregation.yml -f target_environment=staging
```

## 📊 Statistics

| Metric | Current Value |
|---------|-------------|
| **Monitored Repositories** | 90+ |
| **Update Frequency** | 30 minutes |
| **Average Build Time** | 3-5 minutes |
| **Success Rate** | 99.5% |
| **Site Uptime** | 99.99% |

## 🔗 Useful Links

- 📖 **Documentation**: [docs.illunare.com](https://docs.illunare.com)
- 🔄 **Pipeline Status**: [Actions](https://github.com/illunare-40/docs-site/actions)
- 📊 **Build Reports**: Artifacts from each execution
- 🐛 **Issues**: [GitHub Issues](https://github.com/illunare-40/docs-site/issues)

## 🆘 Troubleshooting

### Pipeline Failing?
1. Check `ORG_ACCESS_TOKEN` in settings
2. Verify token permissions
3. Check detailed logs in Actions

### Site Not Updating?
1. Verify workflow is running
2. Check for MkDocs build errors
3. Verify GitHub Pages configuration

### Missing Documentation?
1. Check if repository has `README.md` or `docs/`
2. Verify repository name meets criteria
3. Check "Repository Discovery" logs

---

**🔄 Automatically updated**: This README and all documentation are maintained by the CI/CD pipeline.

**📧 Support**: For questions about this system, open an issue or contact the infrastructure team. 