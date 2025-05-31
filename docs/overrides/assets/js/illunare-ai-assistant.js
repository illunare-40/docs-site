/* ===============================================================================
   🤖 illunare 4.0 AI Assistant - DeepSeek R1/R3 + Ollama Integration
   COMPREHENSIVE AI-POWERED DOCUMENTATION EXPERIENCE
   =============================================================================== */

class IllunareAIAssistant {
  constructor() {
    this.isInitialized = false;
    this.isConnected = false;
    this.aiModels = ['deepseek-r1', 'deepseek-r3'];
    this.currentModel = 'deepseek-r1';
    this.ollamaEndpoint = 'http://ollama.illunare.com:11434';
    this.confidence_threshold = 0.85;
    this.languages = ['pt-BR', 'en-US'];
    this.currentLanguage = 'en-US';
    this.chatHistory = [];
    this.notifications = [];
    
    this.init();
  }

  async init() {
    this.createAIWidget();
    this.createChatInterface();
    this.setupEventListeners();
    this.initializeWebhooks();
    this.startPerformanceMonitoring();
    await this.connectToAI();
    this.isInitialized = true;
    console.log('🤖 illunare AI Assistant initialized successfully');
  }

  createAIWidget() {
    const widget = document.createElement('div');
    widget.className = 'illunare-ai-widget';
    widget.innerHTML = `
      <div class="ai-status-indicator"></div>
    `;
    widget.addEventListener('click', () => this.toggleChatInterface());
    document.body.appendChild(widget);
  }

  createChatInterface() {
    const chatInterface = document.createElement('div');
    chatInterface.className = 'illunare-ai-chat';
    chatInterface.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-chat-title">
          <span class="ai-icon">🤖</span>
          <span>illunare AI Assistant</span>
          <span class="ai-model-indicator">${this.currentModel}</span>
        </div>
        <div class="ai-chat-controls">
          <button class="ai-language-toggle" title="Toggle Language">🌐</button>
          <button class="ai-model-switch" title="Switch Model">⚙️</button>
          <button class="ai-chat-close" title="Close">✕</button>
        </div>
      </div>
      <div class="ai-chat-messages"></div>
      <div class="ai-chat-input-container">
        <input type="text" class="ai-chat-input" placeholder="Ask me anything about illunare 4.0..." />
        <button class="ai-chat-send">
          <span class="ai-send-icon">🚀</span>
        </button>
      </div>
      <div class="ai-chat-suggestions">
        <button class="ai-suggestion" data-query="How do I integrate Profibus with illunare?">🔌 Profibus Integration</button>
        <button class="ai-suggestion" data-query="Show me automotive OBD-II examples">🚗 OBD-II Examples</button>
        <button class="ai-suggestion" data-query="How to deploy with hot reloading?">🔥 Hot Reloading</button>
        <button class="ai-suggestion" data-query="Brazilian compliance requirements">🇧🇷 LGPD Compliance</button>
      </div>
    `;
    
    chatInterface.style.display = 'none';
    document.body.appendChild(chatInterface);
  }

  setupEventListeners() {
    // Chat interface controls
    document.querySelector('.ai-chat-close').addEventListener('click', () => this.toggleChatInterface());
    document.querySelector('.ai-language-toggle').addEventListener('click', () => this.toggleLanguage());
    document.querySelector('.ai-model-switch').addEventListener('click', () => this.switchModel());
    
    // Chat input
    const inputField = document.querySelector('.ai-chat-input');
    const sendButton = document.querySelector('.ai-chat-send');
    
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    
    sendButton.addEventListener('click', () => this.sendMessage());
    
    // Suggestion buttons
    document.querySelectorAll('.ai-suggestion').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const query = e.target.getAttribute('data-query');
        this.sendMessage(query);
      });
    });

    // Page navigation detection for contextual help
    this.setupNavigationWatcher();
  }

  setupNavigationWatcher() {
    let currentPath = window.location.pathname;
    
    // Watch for navigation changes
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        this.analyzePageContext();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial context analysis
    this.analyzePageContext();
  }

  async analyzePageContext() {
    const path = window.location.pathname;
    const pageTitle = document.title;
    const currentSection = this.detectCurrentSection(path);
    
    // Send contextual recommendations
    await this.sendContextualRecommendations(currentSection, pageTitle);
  }

  detectCurrentSection(path) {
    if (path.includes('/ai/')) return 'ai-ml';
    if (path.includes('/industrial/')) return 'industrial';
    if (path.includes('/automotive/')) return 'automotive';
    if (path.includes('/compliance/')) return 'compliance';
    if (path.includes('/frontend/')) return 'frontend';
    if (path.includes('/architecture/')) return 'architecture';
    if (path.includes('/devops/')) return 'devops';
    return 'general';
  }

  async sendContextualRecommendations(section, pageTitle) {
    const recommendations = await this.getContextualRecommendations(section);
    
    if (recommendations.length > 0) {
      this.showNotification({
        type: 'ai-recommendation',
        title: '🤖 AI Recommendations',
        message: `Based on "${pageTitle}", I suggest exploring: ${recommendations.join(', ')}`,
        actions: [
          { text: 'Show Details', action: () => this.showRecommendationDetails(section) },
          { text: 'Dismiss', action: () => this.dismissNotification() }
        ]
      });
    }
  }

  async getContextualRecommendations(section) {
    const recommendations = {
      'ai-ml': ['DeepSeek R1/R3 setup', 'Security Guardian configuration', 'ML model deployment'],
      'industrial': ['Profibus/Profinet adapters', 'Arduino libraries', 'IoT management'],
      'automotive': ['OBD-II integration', 'Fleet management', 'Vehicle compliance'],
      'compliance': ['LGPD implementation', 'E-Social bridge', 'FenSeg integration'],
      'frontend': ['React component patterns', 'Flutter widgets', 'Responsive design'],
      'architecture': ['Microservices patterns', 'Zero-trust security', 'Multi-cloud'],
      'devops': ['Hot reloading setup', 'CI/CD pipelines', 'Container orchestration'],
      'general': ['Quick start guide', 'API documentation', 'Best practices']
    };
    
    return recommendations[section] || recommendations['general'];
  }

  async connectToAI() {
    try {
      const response = await fetch(`${this.ollamaEndpoint}/api/tags`);
      if (response.ok) {
        this.isConnected = true;
        this.updateAIStatus('connected');
        console.log('✅ Connected to Ollama endpoint');
      } else {
        throw new Error('Failed to connect to Ollama');
      }
    } catch (error) {
      console.warn('⚠️ AI endpoint not available, using fallback mode');
      this.isConnected = false;
      this.updateAIStatus('fallback');
    }
  }

  updateAIStatus(status) {
    const indicator = document.querySelector('.ai-status-indicator');
    const statusColors = {
      'connected': '#4caf50',
      'connecting': '#ff9800',
      'fallback': '#f44336',
      'processing': '#2196f3'
    };
    
    if (indicator) {
      indicator.style.backgroundColor = statusColors[status] || '#757575';
    }
  }

  toggleChatInterface() {
    const chatInterface = document.querySelector('.illunare-ai-chat');
    const isVisible = chatInterface.style.display !== 'none';
    
    chatInterface.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
      // Show welcome message on first open
      if (this.chatHistory.length === 0) {
        this.addMessage('assistant', this.getWelcomeMessage());
      }
    }
  }

  getWelcomeMessage() {
    const messages = {
      'en-US': `👋 Welcome to illunare 4.0 AI Assistant! I'm here to help you with:
      
🔌 Industrial connectivity (Profibus/Profinet)
🚗 Automotive integration & OBD-II
🤖 AI/ML implementation with DeepSeek
🇧🇷 Brazilian compliance (LGPD, E-Social, FenSeg)
🔥 Hot reloading with Elixir
📊 Architecture & best practices

What would you like to explore today?`,
      'pt-BR': `👋 Bem-vindo ao Assistente IA illunare 4.0! Estou aqui para ajudar com:
      
🔌 Conectividade industrial (Profibus/Profinet)
🚗 Integração automotiva & OBD-II
🤖 Implementação IA/ML com DeepSeek
🇧🇷 Conformidade brasileira (LGPD, E-Social, FenSeg)
🔥 Hot reloading com Elixir
📊 Arquitetura & melhores práticas

O que você gostaria de explorar hoje?`
    };
    
    return messages[this.currentLanguage];
  }

  async sendMessage(messageText = null) {
    const input = document.querySelector('.ai-chat-input');
    const message = messageText || input.value.trim();
    
    if (!message) return;
    
    this.addMessage('user', message);
    input.value = '';
    
    this.updateAIStatus('processing');
    
    try {
      const response = await this.getAIResponse(message);
      this.addMessage('assistant', response);
    } catch (error) {
      this.addMessage('assistant', this.getFallbackResponse(message));
    }
    
    this.updateAIStatus(this.isConnected ? 'connected' : 'fallback');
  }

  async getAIResponse(message) {
    if (!this.isConnected) {
      return this.getFallbackResponse(message);
    }

    const prompt = this.buildContextualPrompt(message);
    
    const response = await fetch(`${this.ollamaEndpoint}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.currentModel,
        prompt: prompt,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40
        }
      })
    });

    if (!response.ok) throw new Error('AI request failed');
    
    const aiResponse = await response.json();
    return aiResponse.response || 'Sorry, I couldn\'t process that request.';
  }

  buildContextualPrompt(message) {
    const context = this.getCurrentPageContext();
    const chatContext = this.chatHistory.slice(-5).map(msg => 
      `${msg.role}: ${msg.content}`
    ).join('\n');

    return `You are the illunare 4.0 AI Assistant, an expert in enterprise technology platforms.

CURRENT CONTEXT:
- Page: ${context.page}
- Section: ${context.section}
- Language: ${this.currentLanguage}

PLATFORM EXPERTISE:
- Industrial connectivity (Profibus/Profinet/OPC-UA)
- Automotive integration (OBD-II, fleet management)
- AI/ML with DeepSeek R1/R3 + Ollama
- Brazilian compliance (LGPD, E-Social, FenSeg)
- Hot reloading with Elixir
- Multi-cloud architecture (GCP primary)
- Frontend: React/Next.js, Flutter, Hugo
- Backend: Go, Rust, Elixir, TypeScript

RECENT CONVERSATION:
${chatContext}

USER QUESTION: ${message}

Provide a helpful, accurate response in ${this.currentLanguage}. Include relevant code examples, diagrams, or links when appropriate. Be concise but comprehensive.`;
  }

  getCurrentPageContext() {
    return {
      page: document.title,
      section: this.detectCurrentSection(window.location.pathname),
      url: window.location.href
    };
  }

  getFallbackResponse(message) {
    const responses = {
      'en-US': {
        profibus: '🔌 For Profibus integration, check our Arduino libraries and RJ45 adapters. The industrial connectivity guide has step-by-step setup instructions.',
        automotive: '🚗 Our automotive platform supports OBD-II integration with Brazilian compliance (INMETRO/CONTRAN). See the fleet management documentation.',
        ai: '🤖 DeepSeek R1/R3 is integrated with Ollama for on-premises AI. Check the AI integration guide for setup instructions.',
        compliance: '🇧🇷 Brazilian compliance includes LGPD, E-Social, and FenSeg integration. See our compliance framework documentation.',
        hot: '🔥 Hot reloading with Elixir enables zero-downtime deployments. Check the DevOps guide for implementation details.',
        default: '📚 I\'d be happy to help! Please check our comprehensive documentation or ask about specific topics like industrial connectivity, automotive integration, AI features, or Brazilian compliance.'
      },
      'pt-BR': {
        profibus: '🔌 Para integração Profibus, verifique nossas bibliotecas Arduino e adaptadores RJ45. O guia de conectividade industrial tem instruções passo a passo.',
        automotive: '🚗 Nossa plataforma automotiva suporta integração OBD-II com conformidade brasileira (INMETRO/CONTRAN). Veja a documentação de gestão de frotas.',
        ai: '🤖 DeepSeek R1/R3 está integrado com Ollama para IA local. Verifique o guia de integração IA para instruções de configuração.',
        compliance: '🇧🇷 Conformidade brasileira inclui LGPD, E-Social e integração FenSeg. Veja nossa documentação do framework de conformidade.',
        hot: '🔥 Hot reloading com Elixir permite deployments sem downtime. Verifique o guia DevOps para detalhes de implementação.',
        default: '📚 Ficaria feliz em ajudar! Verifique nossa documentação abrangente ou pergunte sobre tópicos específicos como conectividade industrial, integração automotiva, recursos IA ou conformidade brasileira.'
      }
    };

    const lang = responses[this.currentLanguage];
    const msgLower = message.toLowerCase();
    
    if (msgLower.includes('profibus') || msgLower.includes('profinet')) return lang.profibus;
    if (msgLower.includes('automotive') || msgLower.includes('obd') || msgLower.includes('vehicle')) return lang.automotive;
    if (msgLower.includes('ai') || msgLower.includes('deepseek') || msgLower.includes('ollama')) return lang.ai;
    if (msgLower.includes('compliance') || msgLower.includes('lgpd') || msgLower.includes('e-social')) return lang.compliance;
    if (msgLower.includes('hot') || msgLower.includes('reload') || msgLower.includes('elixir')) return lang.hot;
    
    return lang.default;
  }

  addMessage(role, content) {
    const messagesContainer = document.querySelector('.ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${role}`;
    
    const timestamp = new Date().toLocaleTimeString();
    
    messageDiv.innerHTML = `
      <div class="ai-message-content">${content}</div>
      <div class="ai-message-timestamp">${timestamp}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to chat history
    this.chatHistory.push({ role, content, timestamp });
    
    // Limit chat history
    if (this.chatHistory.length > 50) {
      this.chatHistory = this.chatHistory.slice(-25);
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en-US' ? 'pt-BR' : 'en-US';
    
    const indicator = document.querySelector('.ai-language-toggle');
    indicator.textContent = this.currentLanguage === 'pt-BR' ? '🇧🇷' : '🇺🇸';
    
    this.showNotification({
      type: 'info',
      title: 'Language Changed',
      message: `Language switched to ${this.currentLanguage === 'pt-BR' ? 'Português' : 'English'}`
    });
  }

  switchModel() {
    const currentIndex = this.aiModels.indexOf(this.currentModel);
    this.currentModel = this.aiModels[(currentIndex + 1) % this.aiModels.length];
    
    document.querySelector('.ai-model-indicator').textContent = this.currentModel;
    
    this.showNotification({
      type: 'info',
      title: 'AI Model Switched',
      message: `Now using ${this.currentModel}`
    });
  }

  initializeWebhooks() {
    this.webhookEndpoints = {
      'admin-portal': 'https://admin-portal.illunare.com/api/webhooks/docs',
      'admin-panel': 'https://admin-panel-master.illunare.com/api/webhooks/alerts',
      'ecommerce': 'https://ecommerce-portal.illunare.com/api/webhooks/updates'
    };
    
    // Listen for documentation updates
    this.setupDocumentationWebhooks();
  }

  setupDocumentationWebhooks() {
    // Simulate webhook notifications for demo
    setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every interval
        this.receiveWebhookNotification(this.generateSampleNotification());
      }
    }, 30000); // Check every 30 seconds
  }

  generateSampleNotification() {
    const notifications = [
      {
        type: 'update',
        title: '📚 Documentation Updated',
        message: 'New Profibus integration examples added to Industrial Connectivity guide',
        source: 'admin-portal'
      },
      {
        type: 'alert',
        title: '🚨 Security Alert',
        message: 'New compliance requirements detected for Brazilian automotive sector',
        source: 'admin-panel'
      },
      {
        type: 'feature',
        title: '🚀 New Feature',
        message: 'Hot reloading now supports Rust-based microservices',
        source: 'ecommerce'
      }
    ];
    
    return notifications[Math.floor(Math.random() * notifications.length)];
  }

  receiveWebhookNotification(notification) {
    this.showNotification(notification);
    
    // Add AI-powered insights
    this.addAIInsights(notification);
  }

  addAIInsights(notification) {
    setTimeout(() => {
      const insights = this.generateAIInsights(notification);
      if (insights) {
        this.showNotification({
          type: 'ai-insight',
          title: '🤖 AI Insight',
          message: insights,
          actions: [
            { text: 'Learn More', action: () => this.openRelevantDocumentation(notification) },
            { text: 'Dismiss', action: () => this.dismissNotification() }
          ]
        });
      }
    }, 2000);
  }

  generateAIInsights(notification) {
    const insights = {
      'profibus': 'Consider updating your Arduino libraries to support the new Profibus features. This may improve industrial connectivity performance by 15-20%.',
      'security': 'This security update affects automotive compliance. Review your OBD-II implementations and update encryption protocols.',
      'hot reloading': 'Rust microservices can now be updated without downtime. This reduces deployment time from 5 minutes to under 30 seconds.'
    };
    
    const message = notification.message.toLowerCase();
    for (const [key, insight] of Object.entries(insights)) {
      if (message.includes(key)) return insight;
    }
    
    return null;
  }

  showNotification(notification) {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = `illunare-notification notification-${notification.type}`;
    
    notificationDiv.innerHTML = `
      <div class="notification-header">
        <span class="notification-title">${notification.title}</span>
        <button class="notification-close">✕</button>
      </div>
      <div class="notification-message">${notification.message}</div>
      ${notification.actions ? `
        <div class="notification-actions">
          ${notification.actions.map(action => 
            `<button class="notification-action" data-action="${action.text}">${action.text}</button>`
          ).join('')}
        </div>
      ` : ''}
    `;
    
    document.body.appendChild(notificationDiv);
    
    // Show notification
    setTimeout(() => notificationDiv.classList.add('show'), 100);
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => this.dismissNotification(notificationDiv), 10000);
    
    // Setup event listeners
    this.setupNotificationListeners(notificationDiv, notification);
  }

  setupNotificationListeners(notificationDiv, notification) {
    const closeBtn = notificationDiv.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.dismissNotification(notificationDiv));
    
    const actionBtns = notificationDiv.querySelectorAll('.notification-action');
    actionBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (notification.actions && notification.actions[index].action) {
          notification.actions[index].action();
        }
        this.dismissNotification(notificationDiv);
      });
    });
  }

  dismissNotification(notificationDiv = null) {
    const notification = notificationDiv || document.querySelector('.illunare-notification.show');
    if (notification) {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }
  }

  startPerformanceMonitoring() {
    // Monitor page performance
    setInterval(() => {
      this.checkPerformanceMetrics();
    }, 60000); // Check every minute
  }

  checkPerformanceMetrics() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      if (loadTime > 3000) { // If page takes more than 3 seconds
        this.showNotification({
          type: 'performance',
          title: '⚡ Performance Tip',
          message: `Page loaded in ${(loadTime/1000).toFixed(1)}s. Consider enabling our CDN for faster loading.`,
          actions: [
            { text: 'Learn More', action: () => this.openPerformanceGuide() },
            { text: 'Dismiss', action: () => this.dismissNotification() }
          ]
        });
      }
    }
  }

  openPerformanceGuide() {
    window.open('/architecture/performance/', '_blank');
  }

  openRelevantDocumentation(notification) {
    const documentationMap = {
      'profibus': '/industrial/profibus-profinet/',
      'security': '/security/threat-intelligence/',
      'hot reloading': '/devops/elixir-hot-swapping/',
      'automotive': '/automotive/fleet-management/',
      'compliance': '/compliance/lgpd/'
    };
    
    const message = notification.message.toLowerCase();
    for (const [key, url] of Object.entries(documentationMap)) {
      if (message.includes(key)) {
        window.open(url, '_blank');
        return;
      }
    }
    
    // Default to main documentation
    window.open('/', '_blank');
  }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.illunareAI = new IllunareAIAssistant();
});

// Add CSS styles for the AI components
const aiStyles = `
.illunare-ai-chat {
  position: fixed;
  bottom: 80px;
  right: 24px;
  width: 400px;
  height: 600px;
  background: var(--illunare-light-bg, #ffffff);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--illunare-light-border, #e0e0e0);
  z-index: 9997;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ai-chat-header {
  background: var(--illunare-gradient-primary);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ai-chat-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.ai-model-indicator {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
}

.ai-chat-controls {
  display: flex;
  gap: 8px;
}

.ai-chat-controls button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.ai-chat-controls button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.ai-chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ai-message {
  max-width: 80%;
  word-wrap: break-word;
}

.ai-message-user {
  align-self: flex-end;
  background: var(--illunare-gradient-primary);
  color: white;
  padding: 12px;
  border-radius: 12px 12px 4px 12px;
}

.ai-message-assistant {
  align-self: flex-start;
  background: var(--illunare-light-surface, #f5f5f5);
  padding: 12px;
  border-radius: 12px 12px 12px 4px;
  border-left: 3px solid var(--illunare-primary);
}

.ai-message-timestamp {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 4px;
}

.ai-chat-input-container {
  padding: 16px;
  border-top: 1px solid var(--illunare-light-border, #e0e0e0);
  display: flex;
  gap: 8px;
}

.ai-chat-input {
  flex: 1;
  padding: 12px;
  border: 1px solid var(--illunare-light-border, #e0e0e0);
  border-radius: 8px;
  outline: none;
  font-family: inherit;
}

.ai-chat-input:focus {
  border-color: var(--illunare-primary);
}

.ai-chat-send {
  background: var(--illunare-gradient-primary);
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.ai-chat-send:hover {
  transform: translateY(-2px);
}

.ai-chat-suggestions {
  padding: 0 16px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ai-suggestion {
  background: var(--illunare-light-surface, #f5f5f5);
  border: 1px solid var(--illunare-light-border, #e0e0e0);
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ai-suggestion:hover {
  background: var(--illunare-primary);
  color: white;
  transform: translateY(-1px);
}

.ai-status-indicator {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4caf50;
  border: 2px solid white;
}

@media (max-width: 768px) {
  .illunare-ai-chat {
    width: calc(100vw - 48px);
    height: calc(100vh - 120px);
    right: 24px;
    left: 24px;
    bottom: 80px;
  }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = aiStyles;
document.head.appendChild(styleSheet); 