/**
 * ============================================================================
 * 🌟 illunare 4.0 Enterprise Platform - Advanced JavaScript Features
 * ============================================================================
 */

// ============================================================================
// 🎯 Enterprise Configuration & Constants
// ============================================================================

const ILLUNARE_CONFIG = {
  platform: {
    name: "illunare 4.0 Enterprise Platform",
    version: "4.0.0",
    buildDate: "2025-01-28",
    environment: "production"
  },
  features: {
    aiEnabled: true,
    quantumReady: true,
    hotReloading: true,
    industrialConnectivity: true,
    automotiveIntegration: true,
    brazilianCompliance: true,
    realTimeAnalytics: true,
    enterpriseSecurity: true
  },
  repositories: {
    totalCount: 90,
    categories: [
      { name: "Frontend Applications", count: 7, icon: "🎨" },
      { name: "AI & Machine Learning", count: 10, icon: "🤖" },
      { name: "Security Services", count: 8, icon: "🔐" },
      { name: "Data & Analytics", count: 12, icon: "📊" },
      { name: "Industrial & Automotive", count: 8, icon: "🏭" },
      { name: "Brazilian Compliance", count: 10, icon: "🇧🇷" },
      { name: "Hot Reloading & Elixir", count: 5, icon: "🔥" },
      { name: "DevOps & Infrastructure", count: 15, icon: "🚀" },
      { name: "Business Services", count: 12, icon: "💼" },
      { name: "Integration & Connectivity", count: 8, icon: "🔗" }
    ]
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)"
    }
  }
};

// ============================================================================
// 🚀 Enterprise Initialization & Document Ready
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log(`%c🌟 ${ILLUNARE_CONFIG.platform.name} v${ILLUNARE_CONFIG.platform.version}`, 
    'background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 16px;');
  
  initializeEnterpriseFeatures();
  initializePerformanceMonitoring();
  initializeAccessibilityEnhancements();
  initializeAdvancedAnimations();
  initializeInteractiveElements();
  initializeThemeSystem();
  initializeAnalytics();
  
  console.log('✅ illunare 4.0 Enterprise Platform initialized successfully');
});

// ============================================================================
// 🎨 Advanced Theme System & Visual Enhancements
// ============================================================================

function initializeThemeSystem() {
  const themeToggle = document.querySelector('[data-md-color-scheme]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Enhanced theme switching with smooth transitions
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.style.transition = 'all 0.3s ease-in-out';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }
  
  // Auto-detect system theme changes
  prefersDark.addEventListener('change', function(e) {
    if (e.matches) {
      document.documentElement.setAttribute('data-md-color-scheme', 'slate');
    } else {
      document.documentElement.setAttribute('data-md-color-scheme', 'default');
    }
  });
  
  // Apply enterprise branding effects
  applyEnterpriseBranding();
}

function applyEnterpriseBranding() {
  // Add gradient text effects to headings
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(heading => {
    if (heading.textContent.includes('illunare') || heading.textContent.includes('Enterprise')) {
      heading.classList.add('text-gradient');
    }
  });
  
  // Enhance repository tables with interactive elements
  enhanceRepositoryTables();
  
  // Add floating animations to special elements
  const logos = document.querySelectorAll('img[alt*="illunare"]');
  logos.forEach(logo => {
    logo.classList.add('float-animation');
  });
}

// ============================================================================
// 📊 Interactive Repository Management
// ============================================================================

function enhanceRepositoryTables() {
  const tables = document.querySelectorAll('table');
  
  tables.forEach(table => {
    // Add hover effects for table rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.1)';
      });
      
      row.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
    
    // Add status indicators
    addStatusIndicators(table);
    
    // Add sorting functionality
    addTableSorting(table);
  });
}

function addStatusIndicators(table) {
  const statusCells = table.querySelectorAll('td');
  statusCells.forEach(cell => {
    const text = cell.textContent.toLowerCase();
    
    if (text.includes('✅ active') || text.includes('active')) {
      const badge = document.createElement('span');
      badge.className = 'status-active';
      badge.textContent = 'Active';
      badge.style.marginLeft = '8px';
      cell.appendChild(badge);
    } else if (text.includes('🔄 development') || text.includes('development')) {
      const badge = document.createElement('span');
      badge.className = 'status-development';
      badge.textContent = 'Development';
      badge.style.marginLeft = '8px';
      cell.appendChild(badge);
    }
  });
}

function addTableSorting(table) {
  const headers = table.querySelectorAll('thead th');
  headers.forEach((header, index) => {
    header.style.cursor = 'pointer';
    header.style.userSelect = 'none';
    header.style.position = 'relative';
    
    // Add sort indicator
    const sortIcon = document.createElement('span');
    sortIcon.style.marginLeft = '8px';
    sortIcon.style.opacity = '0.5';
    sortIcon.textContent = '⇅';
    header.appendChild(sortIcon);
    
    header.addEventListener('click', () => sortTable(table, index));
  });
}

function sortTable(table, columnIndex) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  
  rows.sort((a, b) => {
    const aValue = a.cells[columnIndex].textContent.trim();
    const bValue = b.cells[columnIndex].textContent.trim();
    
    return aValue.localeCompare(bValue, undefined, { numeric: true });
  });
  
  // Clear tbody and append sorted rows
  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));
  
  // Add animation
  rows.forEach((row, index) => {
    row.style.animation = `fadeInUp 0.3s ease-out ${index * 0.05}s both`;
  });
}

// ============================================================================
// ✨ Advanced Animations & Interactive Elements
// ============================================================================

function initializeAdvancedAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll('.grid.cards > .card, .admonition, table, .mermaid');
  animatedElements.forEach(element => {
    element.classList.add('animate-on-scroll');
    observer.observe(element);
  });
  
  // Add CSS for scroll animations
  addScrollAnimationStyles();
}

function addScrollAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .pulse-glow {
      animation: pulseGlow 2s ease-in-out infinite;
    }
    
    @keyframes pulseGlow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
      }
      50% {
        box-shadow: 0 0 40px rgba(79, 70, 229, 0.6);
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================================================
// 🤖 AI-Enhanced Interactive Features
// ============================================================================

function initializeInteractiveElements() {
  // Enhanced code copy functionality
  enhanceCodeBlocks();
  
  // Interactive repository cards
  createInteractiveRepositoryCards();
  
  // Advanced search enhancements
  enhanceSearchFunctionality();
  
  // Add enterprise tooltips
  addEnterpriseTooltips();
}

function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    
    // Add language label
    const lang = block.className.match(/language-(\w+)/);
    if (lang) {
      const label = document.createElement('div');
      label.className = 'code-language-label';
      label.textContent = lang[1].toUpperCase();
      label.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        backdrop-filter: blur(4px);
      `;
      pre.style.position = 'relative';
      pre.appendChild(label);
    }
    
    // Add line numbers
    addLineNumbers(block);
  });
}

function addLineNumbers(codeBlock) {
  const lines = codeBlock.textContent.split('\n');
  const lineNumbersContainer = document.createElement('div');
  lineNumbersContainer.className = 'line-numbers';
  
  lines.forEach((_, index) => {
    const lineNumber = document.createElement('span');
    lineNumber.textContent = index + 1;
    lineNumbersContainer.appendChild(lineNumber);
  });
  
  lineNumbersContainer.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    padding: 1.5rem 0.5rem;
    background: rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    line-height: 1.5;
    user-select: none;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  `;
  
  codeBlock.parentElement.style.paddingLeft = '3rem';
  codeBlock.parentElement.appendChild(lineNumbersContainer);
}

// ============================================================================
// 📊 Performance Monitoring & Analytics
// ============================================================================

function initializePerformanceMonitoring() {
  // Monitor page load performance
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log(`📊 Page load time: ${loadTime}ms`);
    
    // Send to analytics if configured
    if (window.gtag) {
      gtag('event', 'page_load_time', {
        event_category: 'Performance',
        event_label: 'Load Time',
        value: loadTime
      });
    }
  });
  
  // Monitor user interactions
  trackUserEngagement();
}

function trackUserEngagement() {
  let scrollDepth = 0;
  let maxScrollDepth = 0;
  
  window.addEventListener('scroll', throttle(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollDepth = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
      
      // Track milestone scroll depths
      if ([25, 50, 75, 90].includes(maxScrollDepth)) {
        console.log(`📊 Scroll depth: ${maxScrollDepth}%`);
        
        if (window.gtag) {
          gtag('event', 'scroll_depth', {
            event_category: 'Engagement',
            event_label: `${maxScrollDepth}%`,
            value: maxScrollDepth
          });
        }
      }
    }
  }, 250));
}

// ============================================================================
// ♿ Accessibility Enhancements
// ============================================================================

function initializeAccessibilityEnhancements() {
  // Add skip links
  addSkipLinks();
  
  // Enhance keyboard navigation
  enhanceKeyboardNavigation();
  
  // Add ARIA labels and descriptions
  addAriaEnhancements();
  
  // Focus management
  manageFocus();
}

function addSkipLinks() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -100px;
    left: 6px;
    background: #4f46e5;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    z-index: 10000;
    transition: top 0.3s ease;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content id
  const mainContent = document.querySelector('.md-content__inner');
  if (mainContent) {
    mainContent.id = 'main-content';
  }
}

function enhanceKeyboardNavigation() {
  // Add visual focus indicators
  const style = document.createElement('style');
  style.textContent = `
    .md-tabs__link:focus,
    .md-nav__link:focus,
    button:focus,
    a:focus {
      outline: 2px solid #4f46e5;
      outline-offset: 2px;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
    }
  `;
  document.head.appendChild(style);
}

// ============================================================================
// 🔧 Utility Functions
// ============================================================================

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ============================================================================
// 📊 Enterprise Analytics Integration
// ============================================================================

function initializeAnalytics() {
  // Track repository category views
  const categoryLinks = document.querySelectorAll('a[href*="services/"]');
  categoryLinks.forEach(link => {
    link.addEventListener('click', () => {
      const category = link.textContent.trim();
      console.log(`📊 Category viewed: ${category}`);
      
      if (window.gtag) {
        gtag('event', 'category_view', {
          event_category: 'Navigation',
          event_label: category
        });
      }
    });
  });
  
  // Track external links
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="illunare"])');
  externalLinks.forEach(link => {
    link.addEventListener('click', () => {
      const url = link.href;
      console.log(`📊 External link clicked: ${url}`);
      
      if (window.gtag) {
        gtag('event', 'click', {
          event_category: 'External Link',
          event_label: url
        });
      }
    });
  });
}

// ============================================================================
// 🚀 Enterprise Feature Initialization
// ============================================================================

function initializeEnterpriseFeatures() {
  // Add repository statistics
  addRepositoryStatistics();
  
  // Initialize advanced search
  initializeAdvancedSearch();
  
  // Add enterprise notifications
  addEnterpriseNotifications();
}

function addRepositoryStatistics() {
  const statsContainer = document.createElement('div');
  statsContainer.className = 'stats-grid';
  
  const stats = [
    { number: '90+', label: 'Microservices' },
    { number: '15+', label: 'Programming Languages' },
    { number: '1M+', label: 'RPS Capacity' },
    { number: '99.99%', label: 'Uptime SLA' }
  ];
  
  stats.forEach(stat => {
    const card = document.createElement('div');
    card.className = 'stat-card pulse-glow';
    card.innerHTML = `
      <div class="stat-number">${stat.number}</div>
      <div class="stat-label">${stat.label}</div>
    `;
    statsContainer.appendChild(card);
  });
  
  // Find a good place to insert the stats
  const mainContent = document.querySelector('.md-content__inner');
  if (mainContent && mainContent.children.length > 2) {
    mainContent.insertBefore(statsContainer, mainContent.children[2]);
  }
}

// ============================================================================
// 🎯 Advanced Search & Filter Functionality
// ============================================================================

function initializeAdvancedSearch() {
  const searchInput = document.querySelector('input[data-md-component="search-query"]');
  if (!searchInput) return;
  
  // Enhanced search with enterprise features
  searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.toLowerCase();
    filterContent(query);
  }, 300));
}

function filterContent(query) {
  const tables = document.querySelectorAll('table tbody tr');
  let visibleCount = 0;
  
  tables.forEach(row => {
    const text = row.textContent.toLowerCase();
    const isVisible = query === '' || text.includes(query);
    
    row.style.display = isVisible ? '' : 'none';
    if (isVisible) visibleCount++;
  });
  
  // Update search result indicator
  updateSearchResults(visibleCount, query);
}

function updateSearchResults(count, query) {
  let indicator = document.querySelector('.search-results-indicator');
  
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'search-results-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: rgba(79, 70, 229, 0.9);
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: bold;
      backdrop-filter: blur(4px);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    document.body.appendChild(indicator);
  }
  
  if (query) {
    indicator.textContent = `${count} results found`;
    indicator.style.transform = 'translateX(0)';
    
    setTimeout(() => {
      indicator.style.transform = 'translateX(100%)';
    }, 3000);
  } else {
    indicator.style.transform = 'translateX(100%)';
  }
}

// ============================================================================
// 🌟 Enterprise UI Enhancements
// ============================================================================

function addEnterpriseTooltips() {
  const tooltipElements = document.querySelectorAll('[title]');
  
  tooltipElements.forEach(element => {
    const title = element.getAttribute('title');
    element.removeAttribute('title');
    
    element.addEventListener('mouseenter', (e) => {
      showTooltip(e.target, title);
    });
    
    element.addEventListener('mouseleave', hideTooltip);
  });
}

function showTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'enterprise-tooltip';
  tooltip.textContent = text;
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    z-index: 10000;
    pointer-events: none;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `;
  
  document.body.appendChild(tooltip);
  
  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
}

function hideTooltip() {
  const tooltip = document.querySelector('.enterprise-tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}

// ============================================================================
// 🔔 Enterprise Notifications System
// ============================================================================

function addEnterpriseNotifications() {
  // Check for platform updates
  checkForUpdates();
  
  // Add feature announcements
  showFeatureAnnouncements();
}

function checkForUpdates() {
  // Simulate update check
  setTimeout(() => {
    if (Math.random() > 0.7) { // 30% chance to show update notification
      showNotification('🚀 New features available in illunare 4.0.1!', 'info', 5000);
    }
  }, 2000);
}

function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `enterprise-notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  document.body.appendChild(notification);
  
  // Slide in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove
  if (duration > 0) {
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }
}

// ============================================================================
// 🔥 Hot Module Replacement Simulation (for demo purposes)
// ============================================================================

function simulateHotReload() {
  console.log('🔥 Simulating hot reload...');
  showNotification('🔥 Hot reload completed - Zero downtime!', 'success', 3000);
}

// Expose functions for external use
window.illunareEnterprise = {
  config: ILLUNARE_CONFIG,
  showNotification,
  simulateHotReload,
  trackEvent: (category, action, label) => {
    console.log(`📊 Event tracked: ${category} - ${action} - ${label}`);
    if (window.gtag) {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }
};

// ============================================================================
// 🔚 End of illunare 4.0 Enterprise JavaScript
// ============================================================================

console.log('✨ illunare 4.0 Enterprise JavaScript loaded successfully'); 