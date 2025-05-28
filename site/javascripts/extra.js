/* ======================================
   illunare 4.0 Enterprise - Documentation Enhancements
   ====================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize documentation features
    initializeBadges();
    initializeServiceSearch();
    initializeMetricsUpdater();
    initializeNavigationEnhancements();
    initializePerformanceTracking();
});

/**
 * Initialize dynamic badges
 */
function initializeBadges() {
    const badges = document.querySelectorAll('.status-badge, .service-item');
    
    badges.forEach(badge => {
        badge.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            if (serviceName) {
                showServiceDetails(serviceName);
            }
        });
    });
}

/**
 * Initialize service search functionality
 */
function initializeServiceSearch() {
    const searchInput = document.getElementById('service-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            const serviceName = item.getAttribute('data-service') || '';
            const serviceText = item.textContent.toLowerCase();
            
            if (serviceName.includes(query) || serviceText.includes(query)) {
                item.style.display = 'block';
                item.classList.add('animate-fade-in-up');
            } else {
                item.style.display = 'none';
            }
        });
    });
}

/**
 * Initialize real-time metrics updater
 */
function initializeMetricsUpdater() {
    // Update metrics every 30 seconds
    setInterval(updateMetrics, 30000);
    
    // Initial update
    updateMetrics();
}

/**
 * Update platform metrics
 */
async function updateMetrics() {
    try {
        // Mock API call - replace with actual endpoint
        const response = await fetch('/api/metrics');
        if (response.ok) {
            const metrics = await response.json();
            updateMetricsDisplay(metrics);
        }
    } catch (error) {
        console.log('Metrics update scheduled for production deployment');
    }
}

/**
 * Update metrics display
 */
function updateMetricsDisplay(metrics) {
    const metricsTable = document.querySelector('.metrics-table table');
    if (!metricsTable) return;
    
    // Update specific metrics
    updateTableCell('uptime', metrics.uptime || '99.99%');
    updateTableCell('latency', metrics.p99_latency || '45ms');
    updateTableCell('throughput', metrics.throughput || '1.2M req/s');
    updateTableCell('mttr', metrics.mttr || '2.3min');
    
    // Add timestamp
    const timestamp = document.querySelector('.metrics-timestamp');
    if (timestamp) {
        timestamp.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }
}

/**
 * Update specific table cell
 */
function updateTableCell(metric, value) {
    const cell = document.querySelector(`[data-metric="${metric}"]`);
    if (cell) {
        cell.textContent = value;
        cell.classList.add('animate-fade-in-up');
        setTimeout(() => cell.classList.remove('animate-fade-in-up'), 600);
    }
}

/**
 * Show service details modal
 */
function showServiceDetails(serviceName) {
    const modal = createServiceModal(serviceName);
    document.body.appendChild(modal);
    
    // Fetch service details
    fetchServiceDetails(serviceName).then(details => {
        updateModalContent(modal, details);
    });
}

/**
 * Create service details modal
 */
function createServiceModal(serviceName) {
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${serviceName}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="loading">Loading service details...</div>
                </div>
            </div>
        </div>
    `;
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.modal-backdrop').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}

/**
 * Fetch service details
 */
async function fetchServiceDetails(serviceName) {
    try {
        // Mock service details - replace with actual API
        return {
            name: serviceName,
            status: 'healthy',
            version: 'v4.0.12',
            language: 'Go',
            framework: 'Gin',
            deployment: 'Kubernetes',
            lastDeploy: '2025-01-18 16:00 UTC',
            metrics: {
                uptime: '99.99%',
                requests: '125K/hour',
                errors: '0.01%',
                latency: '23ms'
            }
        };
    } catch (error) {
        return {
            name: serviceName,
            status: 'error',
            error: 'Unable to fetch service details'
        };
    }
}

/**
 * Update modal content with service details
 */
function updateModalContent(modal, details) {
    const modalBody = modal.querySelector('.modal-body');
    
    if (details.error) {
        modalBody.innerHTML = `<div class="error">Error: ${details.error}</div>`;
        return;
    }
    
    modalBody.innerHTML = `
        <div class="service-details">
            <div class="detail-section">
                <h4>Service Information</h4>
                <table class="detail-table">
                    <tr><td>Status</td><td><span class="status-badge status-badge--success">${details.status}</span></td></tr>
                    <tr><td>Version</td><td>${details.version}</td></tr>
                    <tr><td>Language</td><td>${details.language}</td></tr>
                    <tr><td>Framework</td><td>${details.framework}</td></tr>
                    <tr><td>Deployment</td><td>${details.deployment}</td></tr>
                    <tr><td>Last Deploy</td><td>${details.lastDeploy}</td></tr>
                </table>
            </div>
            <div class="detail-section">
                <h4>Performance Metrics</h4>
                <table class="detail-table">
                    <tr><td>Uptime</td><td>${details.metrics.uptime}</td></tr>
                    <tr><td>Requests/Hour</td><td>${details.metrics.requests}</td></tr>
                    <tr><td>Error Rate</td><td>${details.metrics.errors}</td></tr>
                    <tr><td>Avg Latency</td><td>${details.metrics.latency}</td></tr>
                </table>
            </div>
            <div class="detail-actions">
                <button class="btn btn-primary" onclick="window.open('https://github.com/illunare-40/${details.name}', '_blank')">
                    View Repository
                </button>
                <button class="btn btn-secondary" onclick="window.open('/services/${details.name.replace('-service', '')}/', '_blank')">
                    View Documentation
                </button>
            </div>
        </div>
    `;
}

/**
 * Initialize navigation enhancements
 */
function initializeNavigationEnhancements() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add copy button to code blocks
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        button.addEventListener('click', () => copyToClipboard(block.textContent, button));
        
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}

/**
 * Initialize performance tracking
 */
function initializePerformanceTracking() {
    // Track page load performance
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        console.log(`Documentation page loaded in ${loadTime}ms`);
        
        // Send to analytics (if configured)
        if (window.gtag) {
            gtag('event', 'page_load_time', {
                event_category: 'Performance',
                value: Math.round(loadTime)
            });
        }
    });
    
    // Track user interactions
    document.addEventListener('click', (e) => {
        if (e.target.matches('.quick-nav-item, .service-item, .status-badge')) {
            const element = e.target.textContent.trim();
            
            if (window.gtag) {
                gtag('event', 'element_click', {
                    event_category: 'Navigation',
                    event_label: element
                });
            }
        }
    });
}

/**
 * Theme switcher enhancement
 */
function enhanceThemeSwitcher() {
    const themeToggle = document.querySelector('[data-md-component="palette"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            // Smooth transition for theme changes
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}

/**
 * Service status checker
 */
async function checkServiceStatus() {
    const services = document.querySelectorAll('[data-service]');
    
    for (const service of services) {
        const serviceName = service.getAttribute('data-service');
        try {
            // Mock health check - replace with actual endpoint
            const response = await fetch(`/health/${serviceName}`);
            const status = response.ok ? 'healthy' : 'unhealthy';
            
            const indicator = service.querySelector('.status-indicator');
            if (indicator) {
                indicator.className = `status-indicator status-indicator--${status === 'healthy' ? 'healthy' : 'error'}`;
            }
        } catch (error) {
            console.log(`Service status check scheduled for production: ${serviceName}`);
        }
    }
}

// Initialize theme switcher when available
document.addEventListener('DOMContentLoaded', enhanceThemeSwitcher);

// Check service status every 60 seconds
setInterval(checkServiceStatus, 60000);

// Add CSS for modal and enhancements
const additionalStyles = `
<style>
.service-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}

.modal-backdrop {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    max-height: 80%;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
}

.modal-body {
    padding: 1.5rem;
}

.detail-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
}

.detail-table td {
    padding: 0.5rem;
    border-bottom: 1px solid #f3f4f6;
}

.detail-table td:first-child {
    font-weight: 600;
    color: #374151;
}

.detail-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
}

.btn-primary {
    background: #6366f1;
    color: white;
}

.btn-secondary {
    background: #e5e7eb;
    color: #374151;
}

.copy-code-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: #374151;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
    opacity: 0.8;
}

.copy-code-btn:hover {
    opacity: 1;
}

.copy-code-btn.copied {
    background: #10b981;
}

[data-md-color-scheme="slate"] .modal-content {
    background: #1e293b;
    color: #e2e8f0;
}

[data-md-color-scheme="slate"] .modal-header {
    border-bottom-color: #334155;
}

[data-md-color-scheme="slate"] .detail-table td {
    border-bottom-color: #334155;
}

[data-md-color-scheme="slate"] .detail-table td:first-child {
    color: #e2e8f0;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles); 