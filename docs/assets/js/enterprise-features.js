/*
🚀 illunare 4.0 Enterprise Platform - Advanced JavaScript Features
===================================================================

Sophisticated JavaScript for enterprise-grade documentation with modern interactions,
AI-powered features, real-time updates, and advanced user experience enhancements.

Author: illunare 4.0 Platform Team
Version: 4.0.0
Date: January 28, 2025
*/

(function() {
    'use strict';

    // ============================================================================
    // ENTERPRISE CONFIGURATION & CONSTANTS
    // ============================================================================

    const ILLUNARE_CONFIG = {
        version: '4.0.0',
        apiEndpoint: 'https://api.illunare.com/v4',
        features: {
            aiPowered: true,
            hotReloading: true,
            quantumReady: true,
            industrialConnectivity: true,
            brazilianCompliance: true,
            realTimeUpdates: true
        },
        animations: {
            fastDuration: 200,
            normalDuration: 300,
            slowDuration: 500,
            verySlowDuration: 1000
        },
        theme: {
            primary: '#667eea',
            secondary: '#f093fb',
            accent: '#00bcd4',
            industrial: '#ff6b35',
            automotive: '#28a745',
            compliance: '#ffc107'
        }
    };

    // ============================================================================
    // SOPHISTICATED DOM UTILITIES
    // ============================================================================

    class DOMUtils {
        static query(selector, context = document) {
            return context.querySelector(selector);
        }

        static queryAll(selector, context = document) {
            return Array.from(context.querySelectorAll(selector));
        }

        static createElement(tag, className = '', attributes = {}) {
            const element = document.createElement(tag);
            if (className) element.className = className;
            
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
            
            return element;
        }

        static animate(element, keyframes, options = {}) {
            const defaultOptions = {
                duration: ILLUNARE_CONFIG.animations.normalDuration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'both'
            };
            
            return element.animate(keyframes, { ...defaultOptions, ...options });
        }

        static observeIntersection(elements, callback, options = {}) {
            const defaultOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(callback, { ...defaultOptions, ...options });
            elements.forEach(element => observer.observe(element));
            return observer;
        }
    }

    // ============================================================================
    // ADVANCED ANIMATION ENGINE
    // ============================================================================

    class AnimationEngine {
        constructor() {
            this.animations = new Map();
            this.timeline = new Map();
        }

        slideInFromBottom(element, options = {}) {
            const keyframes = [
                { 
                    opacity: 0, 
                    transform: 'translateY(30px) scale(0.95)',
                    filter: 'blur(2px)'
                },
                { 
                    opacity: 1, 
                    transform: 'translateY(0) scale(1)',
                    filter: 'blur(0px)'
                }
            ];

            return DOMUtils.animate(element, keyframes, {
                duration: options.duration || ILLUNARE_CONFIG.animations.slowDuration,
                delay: options.delay || 0,
                ...options
            });
        }

        fadeInWithScale(element, options = {}) {
            const keyframes = [
                { opacity: 0, transform: 'scale(0.8)' },
                { opacity: 1, transform: 'scale(1)' }
            ];

            return DOMUtils.animate(element, keyframes, {
                duration: options.duration || ILLUNARE_CONFIG.animations.normalDuration,
                ...options
            });
        }

        glowPulse(element, color = ILLUNARE_CONFIG.theme.primary, options = {}) {
            const keyframes = [
                { boxShadow: `0 0 5px ${color}` },
                { boxShadow: `0 0 20px ${color}, 0 0 30px ${color}` },
                { boxShadow: `0 0 5px ${color}` }
            ];

            return DOMUtils.animate(element, keyframes, {
                duration: options.duration || 2000,
                iterations: options.iterations || Infinity,
                ...options
            });
        }

        morphButton(element, options = {}) {
            const keyframes = [
                { borderRadius: '25px', transform: 'scale(1)' },
                { borderRadius: '8px', transform: 'scale(1.05)' },
                { borderRadius: '25px', transform: 'scale(1)' }
            ];

            return DOMUtils.animate(element, keyframes, {
                duration: options.duration || ILLUNARE_CONFIG.animations.normalDuration,
                ...options
            });
        }
    }

    // ============================================================================
    // ENTERPRISE FEATURE MANAGER
    // ============================================================================

    class EnterpriseFeatures {
        constructor() {
            this.animationEngine = new AnimationEngine();
            this.features = new Map();
            this.initialized = false;
        }

        init() {
            if (this.initialized) return;

            this.setupIntersectionObserver();
            this.setupAdvancedInteractions();
            this.setupEnterpriseCards();
            this.setupCodeBlockEnhancements();
            this.setupServiceStatusIndicators();
            this.setupBrazilianComplianceFeatures();
            this.setupIndustrialConnectivityTheme();
            this.setupHotReloadingIndicators();
            this.setupQuantumReadyElements();
            this.setupResponsiveEnhancements();
            this.setupKeyboardNavigation();
            this.setupThemeToggler();

            this.initialized = true;
            console.log('🚀 illunare 4.0 Enterprise Features initialized');
        }

        setupIntersectionObserver() {
            const animatedElements = DOMUtils.queryAll([
                '.enterprise-card',
                '.feature-card',
                '.md-typeset h1',
                '.md-typeset h2',
                '.md-typeset h3',
                '.admonition',
                '.highlight'
            ].join(', '));

            DOMUtils.observeIntersection(animatedElements, (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                        
                        this.animationEngine.slideInFromBottom(element, { delay });
                        entry.target.classList.add('illunare-animated');
                    }
                });
            });
        }

        setupAdvancedInteractions() {
            // Enhanced hover effects for buttons
            DOMUtils.queryAll('.illunare-btn, .md-button').forEach(button => {
                button.addEventListener('mouseenter', () => {
                    this.animationEngine.morphButton(button);
                });

                button.addEventListener('click', (e) => {
                    this.createRippleEffect(e, button);
                });
            });

            // Advanced table interactions
            DOMUtils.queryAll('.md-typeset table tr').forEach(row => {
                row.addEventListener('mouseenter', () => {
                    this.animationEngine.fadeInWithScale(row, { duration: 150 });
                });
            });
        }

        setupEnterpriseCards() {
            DOMUtils.queryAll('.enterprise-card, .feature-card').forEach(card => {
                // Add sophisticated hover effects
                card.addEventListener('mouseenter', () => {
                    this.animationEngine.glowPulse(card, ILLUNARE_CONFIG.theme.primary, {
                        duration: 1000,
                        iterations: 1
                    });
                });

                // Add click interaction for expandable content
                const expandableContent = card.querySelector('.expandable-content');
                if (expandableContent) {
                    const toggleButton = DOMUtils.createElement('button', 'expand-toggle', {
                        'aria-label': 'Expand content'
                    });
                    toggleButton.innerHTML = '📋 Show Details';
                    
                    toggleButton.addEventListener('click', () => {
                        this.toggleExpandableContent(expandableContent, toggleButton);
                    });
                    
                    card.appendChild(toggleButton);
                }
            });
        }

        setupCodeBlockEnhancements() {
            DOMUtils.queryAll('.md-typeset .highlight').forEach(codeBlock => {
                // Add language indicator
                const pre = codeBlock.querySelector('pre');
                if (pre && pre.className) {
                    const language = pre.className.match(/language-(\w+)/);
                    if (language) {
                        const indicator = DOMUtils.createElement('div', 'language-indicator');
                        indicator.textContent = language[1].toUpperCase();
                        codeBlock.appendChild(indicator);
                    }
                }

                // Enhanced copy functionality
                const copyButton = DOMUtils.createElement('button', 'copy-code-btn', {
                    'aria-label': 'Copy code to clipboard'
                });
                copyButton.innerHTML = '📋 Copy';
                
                copyButton.addEventListener('click', () => {
                    this.copyCodeToClipboard(codeBlock, copyButton);
                });
                
                codeBlock.appendChild(copyButton);
            });
        }

        setupServiceStatusIndicators() {
            DOMUtils.queryAll('.service-status').forEach(status => {
                const statusType = status.dataset.status;
                
                if (statusType === 'active') {
                    this.animationEngine.glowPulse(status, ILLUNARE_CONFIG.theme.automotive, {
                        duration: 3000,
                        iterations: Infinity
                    });
                } else if (statusType === 'hot-reload') {
                    this.animationEngine.glowPulse(status, '#ff6b6b', {
                        duration: 2000,
                        iterations: Infinity
                    });
                }
            });
        }

        setupBrazilianComplianceFeatures() {
            DOMUtils.queryAll('.brazil-compliance, .lgpd-compliant').forEach(element => {
                // Add Brazilian flag animation
                const flag = DOMUtils.createElement('span', 'brazil-flag-animation');
                flag.innerHTML = '🇧🇷';
                flag.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 1.5rem;
                    animation: illunare-pulse 3s infinite;
                `;
                
                element.style.position = 'relative';
                element.appendChild(flag);

                // Add compliance verification badge
                this.addComplianceVerificationBadge(element);
            });
        }

        setupIndustrialConnectivityTheme() {
            DOMUtils.queryAll('.industrial-profibus').forEach(element => {
                this.animationEngine.glowPulse(element, ILLUNARE_CONFIG.theme.industrial, {
                    duration: 2500,
                    iterations: Infinity
                });
            });

            DOMUtils.queryAll('.industrial-profinet').forEach(element => {
                this.animationEngine.glowPulse(element, '#0066cc', {
                    duration: 3000,
                    iterations: Infinity
                });
            });

            DOMUtils.queryAll('.automotive-badge').forEach(element => {
                this.animationEngine.glowPulse(element, ILLUNARE_CONFIG.theme.automotive, {
                    duration: 2000,
                    iterations: Infinity
                });
            });
        }

        setupHotReloadingIndicators() {
            DOMUtils.queryAll('.hot-reload-indicator').forEach(indicator => {
                // Add pulsing animation
                this.animationEngine.glowPulse(indicator, '#ff6b6b', {
                    duration: 1500,
                    iterations: Infinity
                });

                // Add real-time status simulation
                this.simulateHotReloadStatus(indicator);
            });
        }

        setupQuantumReadyElements() {
            DOMUtils.queryAll('.quantum-ready').forEach(element => {
                this.animationEngine.glowPulse(element, '#43e97b', {
                    duration: 4000,
                    iterations: Infinity
                });

                // Add quantum particle effect
                this.addQuantumParticleEffect(element);
            });
        }

        setupResponsiveEnhancements() {
            // Mobile navigation improvements
            const nav = DOMUtils.query('.md-nav');
            if (nav && window.innerWidth <= 768) {
                this.enhanceMobileNavigation(nav);
            }

            // Responsive table handling
            DOMUtils.queryAll('.md-typeset table').forEach(table => {
                this.makeTableResponsive(table);
            });
        }

        setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                // Advanced keyboard shortcuts
                if (e.ctrlKey || e.metaKey) {
                    switch (e.key) {
                        case 'k':
                            e.preventDefault();
                            this.focusSearch();
                            break;
                        case 'd':
                            e.preventDefault();
                            this.toggleDarkMode();
                            break;
                        case 'h':
                            e.preventDefault();
                            this.showKeyboardShortcuts();
                            break;
                    }
                }
            });
        }

        setupThemeToggler() {
            const themeToggle = DOMUtils.createElement('button', 'illunare-theme-toggle', {
                'aria-label': 'Toggle theme',
                'title': 'Toggle dark/light theme (Ctrl+D)'
            });
            themeToggle.innerHTML = '🌓';
            
            themeToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });

            // Add to header
            const header = DOMUtils.query('.md-header__inner');
            if (header) {
                header.appendChild(themeToggle);
            }
        }

        // ========================================================================
        // HELPER METHODS
        // ========================================================================

        createRippleEffect(event, element) {
            const ripple = DOMUtils.createElement('span', 'ripple-effect');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                z-index: 1000;
            `;

            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);

            DOMUtils.animate(ripple, [
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(2)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => ripple.remove();
        }

        async copyCodeToClipboard(codeBlock, button) {
            const code = codeBlock.querySelector('code').textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                button.innerHTML = '✅ Copied!';
                button.style.background = ILLUNARE_CONFIG.theme.automotive;
                
                setTimeout(() => {
                    button.innerHTML = '📋 Copy';
                    button.style.background = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                button.innerHTML = '❌ Failed';
                setTimeout(() => {
                    button.innerHTML = '📋 Copy';
                }, 2000);
            }
        }

        toggleExpandableContent(content, button) {
            const isExpanded = content.style.display === 'block';
            
            if (isExpanded) {
                this.animationEngine.fadeInWithScale(content, { 
                    direction: 'reverse',
                    fill: 'forwards'
                }).onfinish = () => {
                    content.style.display = 'none';
                };
                button.innerHTML = '📋 Show Details';
            } else {
                content.style.display = 'block';
                this.animationEngine.fadeInWithScale(content);
                button.innerHTML = '📋 Hide Details';
            }
        }

        addComplianceVerificationBadge(element) {
            const badge = DOMUtils.createElement('div', 'compliance-verification');
            badge.innerHTML = '✅ Verified';
            badge.style.cssText = `
                position: absolute;
                bottom: 10px;
                right: 10px;
                background: ${ILLUNARE_CONFIG.theme.automotive};
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 600;
            `;
            element.appendChild(badge);
        }

        simulateHotReloadStatus(indicator) {
            const statuses = ['🔥 Hot Reloading', '⚡ Live Update', '🚀 Deployed'];
            let currentIndex = 0;

            setInterval(() => {
                indicator.querySelector('.status-text').textContent = statuses[currentIndex];
                currentIndex = (currentIndex + 1) % statuses.length;
                
                this.animationEngine.morphButton(indicator, { duration: 200 });
            }, 3000);
        }

        addQuantumParticleEffect(element) {
            const particles = DOMUtils.createElement('div', 'quantum-particles');
            particles.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                overflow: hidden;
            `;

            for (let i = 0; i < 5; i++) {
                const particle = DOMUtils.createElement('div', 'quantum-particle');
                particle.style.cssText = `
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: #43e97b;
                    border-radius: 50%;
                    animation: quantumFloat ${2 + Math.random() * 3}s infinite ease-in-out;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                particles.appendChild(particle);
            }

            element.style.position = 'relative';
            element.appendChild(particles);
        }

        enhanceMobileNavigation(nav) {
            // Add swipe gestures for mobile
            let startX = 0;
            let currentX = 0;

            nav.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            nav.addEventListener('touchmove', (e) => {
                currentX = e.touches[0].clientX;
            });

            nav.addEventListener('touchend', () => {
                const diffX = currentX - startX;
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        this.navigateForward();
                    } else {
                        this.navigateBackward();
                    }
                }
            });
        }

        makeTableResponsive(table) {
            const wrapper = DOMUtils.createElement('div', 'table-responsive');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);

            wrapper.style.cssText = `
                overflow-x: auto;
                margin: 1rem 0;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            `;
        }

        focusSearch() {
            const searchInput = DOMUtils.query('.md-search__input');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        toggleDarkMode() {
            const toggle = DOMUtils.query('[data-md-color-scheme]');
            if (toggle) {
                const currentScheme = toggle.getAttribute('data-md-color-scheme');
                const newScheme = currentScheme === 'slate' ? 'default' : 'slate';
                toggle.setAttribute('data-md-color-scheme', newScheme);
                
                // Store preference
                localStorage.setItem('illunare-theme', newScheme);
            }
        }

        showKeyboardShortcuts() {
            const shortcuts = [
                'Ctrl+K: Focus search',
                'Ctrl+D: Toggle dark mode',
                'Ctrl+H: Show shortcuts'
            ];

            const modal = DOMUtils.createElement('div', 'shortcuts-modal');
            modal.innerHTML = `
                <div class="shortcuts-content">
                    <h3>⌨️ Keyboard Shortcuts</h3>
                    <ul>
                        ${shortcuts.map(shortcut => `<li>${shortcut}</li>`).join('')}
                    </ul>
                    <button class="close-shortcuts">Close</button>
                </div>
            `;

            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;

            modal.querySelector('.close-shortcuts').addEventListener('click', () => {
                modal.remove();
            });

            document.body.appendChild(modal);
        }

        navigateForward() {
            const nextLink = DOMUtils.query('.md-footer__link--next');
            if (nextLink) nextLink.click();
        }

        navigateBackward() {
            const prevLink = DOMUtils.query('.md-footer__link--prev');
            if (prevLink) prevLink.click();
        }
    }

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const enterpriseFeatures = new EnterpriseFeatures();
            enterpriseFeatures.init();
        });
    } else {
        const enterpriseFeatures = new EnterpriseFeatures();
        enterpriseFeatures.init();
    }

    // Add quantum particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes quantumFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            25% { transform: translateY(-10px) rotate(90deg); opacity: 1; }
            50% { transform: translateY(0px) rotate(180deg); opacity: 0.5; }
            75% { transform: translateY(-5px) rotate(270deg); opacity: 0.8; }
        }

        .illunare-theme-toggle {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
            margin-left: 1rem;
        }

        .illunare-theme-toggle:hover {
            background: rgba(255,255,255,0.1);
            transform: scale(1.1);
        }

        .language-indicator {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.7rem;
            font-weight: 600;
        }

        .copy-code-btn {
            position: absolute;
            top: 0.5rem;
            right: 4rem;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.7rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .copy-code-btn:hover {
            background: rgba(102, 126, 234, 1);
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);

    // Global illunare namespace
    window.ILLUNARE = {
        config: ILLUNARE_CONFIG,
        utils: DOMUtils,
        version: ILLUNARE_CONFIG.version
    };

})(); 