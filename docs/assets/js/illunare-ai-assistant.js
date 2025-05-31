/* ==============================================================================
   🤖 illunare 4.0 AI Assistant - Interactive Documentation Helper
   ADVANCED AI-POWERED DOCUMENTATION ASSISTANCE WITH DEEPSEEK INTEGRATION
   ============================================================================== */

class IllunareAIAssistant {
  constructor() {
    this.isInitialized = false;
    this.isOpen = false;
    this.conversationHistory = [];
    this.apiEndpoint = 'https://ai.illunare.com/api/v1/chat';
    this.websocketUrl = 'wss://ai.illunare.com/ws';
    this.currentLanguage = 'en';
    this.supportedLanguages = ['en', 'pt-BR'];
    
    // AI Configuration
    this.aiConfig = {
      model: 'deepseek-r1',
      temperature: 0.7,
      maxTokens: 2048,
      contextWindow: 8192,
      systemPrompt: this.getSystemPrompt()
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  /**
   * Initialize the AI Assistant
   */
  init() {
    if (this.isInitialized) return;
    
    console.log('🤖 Initializing illunare AI Assistant...');
    
    this.detectLanguage();
    this.createWidget();
    this.createChatPanel();
    this.setupEventListeners();
    this.loadConversationHistory();
    this.setupWebSocket();
    
    this.isInitialized = true;
    console.log('✅ illunare AI Assistant initialized successfully');
  }

  /**
   * Detect user's preferred language
   */
  detectLanguage() {
    const urlLang = window.location.pathname.includes('/pt-br/') ? 'pt-BR' : 'en';
    const browserLang = navigator.language || navigator.userLanguage;
    const storedLang = localStorage.getItem('illunare-ai-language');
    
    this.currentLanguage = storedLang || urlLang || (browserLang.startsWith('pt') ? 'pt-BR' : 'en');
    localStorage.setItem('illunare-ai-language', this.currentLanguage);
  }

  /**
   * Get system prompt based on current language
   */
  getSystemPrompt() {
    const prompts = {
      'en': `You are the illunare 4.0 AI Assistant, an expert in enterprise technology platforms. 
             You help users with:
             - Platform architecture and technical implementation
             - AI/ML integration with DeepSeek R1/R3
             - Industrial connectivity (Profibus, Profinet, OPC-UA)
             - Automotive integration and Brazilian compliance
             - Hot reloading with Elixir and zero-downtime deployments
             - Brazilian/LATAM compliance (LGPD, FenSeg, E-Social)
             - Security, fraud detection, and threat intelligence
             
             Always provide accurate, helpful, and contextual responses. 
             Include code examples when relevant. Be concise but comprehensive.`,
             
      'pt-BR': `Você é o Assistente de IA do illunare 4.0, especialista em plataformas tecnológicas empresariais.
                Você ajuda usuários com:
                - Arquitetura da plataforma e implementação técnica
                - Integração de IA/ML com DeepSeek R1/R3
                - Conectividade industrial (Profibus, Profinet, OPC-UA)
                - Integração automotiva e conformidade brasileira
                - Hot reloading com Elixir e deployments sem downtime
                - Conformidade brasileira/LATAM (LGPD, FenSeg, E-Social)
                - Segurança, detecção de fraudes e inteligência de ameaças
                
                Sempre forneça respostas precisas, úteis e contextuais.
                Inclua exemplos de código quando relevante. Seja conciso mas abrangente.`
    };
    
    return prompts[this.currentLanguage] || prompts['en'];
  }

  /**
   * Create the floating AI widget
   */
  createWidget() {
    const widget = document.createElement('div');
    widget.className = 'ai-assistant-widget';
    widget.id = 'illunare-ai-widget';
    widget.setAttribute('aria-label', 'Open AI Assistant');
    widget.setAttribute('role', 'button');
    widget.setAttribute('tabindex', '0');
    
    // Add accessibility
    widget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleChat();
      }
    });
    
    document.body.appendChild(widget);
  }

  /**
   * Create the chat panel
   */
  createChatPanel() {
    const panel = document.createElement('div');
    panel.className = 'ai-chat-panel';
    panel.id = 'illunare-ai-panel';
    
    const messages = {
      'en': {
        title: '🤖 illunare AI Assistant',
        placeholder: 'Ask me about illunare 4.0...',
        send: 'Send',
        close: 'Close',
        clear: 'Clear Chat',
        welcome: 'Hello! I\'m your illunare 4.0 AI assistant. How can I help you today?'
      },
      'pt-BR': {
        title: '🤖 Assistente de IA illunare',
        placeholder: 'Pergunte sobre o illunare 4.0...',
        send: 'Enviar',
        close: 'Fechar',
        clear: 'Limpar Chat',
        welcome: 'Olá! Sou seu assistente de IA do illunare 4.0. Como posso ajudá-lo hoje?'
      }
    };
    
    const msg = messages[this.currentLanguage] || messages['en'];
    
    panel.innerHTML = `
      <div class="ai-chat-header">
        <h3>${msg.title}</h3>
        <div class="ai-chat-controls">
          <button class="ai-btn ai-btn-clear" id="ai-clear-chat" title="${msg.clear}">
            🗑️
          </button>
          <button class="ai-btn ai-btn-close" id="ai-close-chat" title="${msg.close}">
            ✕
          </button>
        </div>
      </div>
      
      <div class="ai-chat-messages" id="ai-chat-messages">
        <div class="ai-message ai-message-assistant">
          <div class="ai-message-content">${msg.welcome}</div>
          <div class="ai-message-time">${new Date().toLocaleTimeString()}</div>
        </div>
      </div>
      
      <div class="ai-chat-input-container">
        <div class="ai-input-wrapper">
          <input 
            type="text" 
            id="ai-chat-input" 
            placeholder="${msg.placeholder}"
            maxlength="500"
            autocomplete="off"
          />
          <button id="ai-send-btn" class="ai-send-btn" title="${msg.send}">
            <span class="ai-send-icon">📤</span>
          </button>
        </div>
        <div class="ai-typing-indicator" id="ai-typing" style="display: none;">
          <div class="neural-loading">
            <div class="neural-dot"></div>
            <div class="neural-dot"></div>
            <div class="neural-dot"></div>
          </div>
          <span>AI is thinking...</span>
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Widget click
    document.getElementById('illunare-ai-widget').addEventListener('click', () => {
      this.toggleChat();
    });
    
    // Close button
    document.getElementById('ai-close-chat').addEventListener('click', () => {
      this.closeChat();
    });
    
    // Clear chat button
    document.getElementById('ai-clear-chat').addEventListener('click', () => {
      this.clearChat();
    });
    
    // Send button
    document.getElementById('ai-send-btn').addEventListener('click', () => {
      this.sendMessage();
    });
    
    // Input enter key
    document.getElementById('ai-chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Click outside to close
    document.addEventListener('click', (e) => {
      const panel = document.getElementById('illunare-ai-panel');
      const widget = document.getElementById('illunare-ai-widget');
      
      if (this.isOpen && !panel.contains(e.target) && !widget.contains(e.target)) {
        this.closeChat();
      }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
  }

  /**
   * Toggle chat panel visibility
   */
  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  /**
   * Open chat panel
   */
  openChat() {
    const panel = document.getElementById('illunare-ai-panel');
    panel.classList.add('active');
    this.isOpen = true;
    
    // Focus input
    setTimeout(() => {
      document.getElementById('ai-chat-input').focus();
    }, 300);
    
    // Track analytics
    this.trackEvent('ai_chat_opened');
  }

  /**
   * Close chat panel
   */
  closeChat() {
    const panel = document.getElementById('illunare-ai-panel');
    panel.classList.remove('active');
    this.isOpen = false;
    
    // Track analytics
    this.trackEvent('ai_chat_closed');
  }

  /**
   * Clear chat history
   */
  clearChat() {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const welcomeMsg = messagesContainer.querySelector('.ai-message-assistant');
    
    // Keep only welcome message
    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(welcomeMsg);
    
    // Clear conversation history
    this.conversationHistory = [];
    localStorage.removeItem('illunare-ai-history');
    
    // Track analytics
    this.trackEvent('ai_chat_cleared');
  }

  /**
   * Send user message
   */
  async sendMessage() {
    const input = document.getElementById('ai-chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Add user message to chat
    this.addMessage(message, 'user');
    
    // Show typing indicator
    this.showTyping(true);
    
    try {
      // Send to AI
      const response = await this.callAI(message);
      
      // Hide typing indicator
      this.showTyping(false);
      
      // Add AI response
      this.addMessage(response, 'assistant');
      
      // Save conversation
      this.saveConversation();
      
      // Track analytics
      this.trackEvent('ai_message_sent', { message_length: message.length });
      
    } catch (error) {
      console.error('AI Assistant Error:', error);
      
      // Hide typing indicator
      this.showTyping(false);
      
      // Show error message
      const errorMsg = this.currentLanguage === 'pt-BR' 
        ? 'Desculpe, ocorreu um erro. Tente novamente.'
        : 'Sorry, an error occurred. Please try again.';
      
      this.addMessage(errorMsg, 'assistant', true);
    }
  }

  /**
   * Add message to chat
   */
  addMessage(content, sender, isError = false) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = `ai-message ai-message-${sender}${isError ? ' ai-message-error' : ''}`;
    
    const timestamp = new Date().toLocaleTimeString();
    
    messageDiv.innerHTML = `
      <div class="ai-message-content">${this.formatMessage(content)}</div>
      <div class="ai-message-time">${timestamp}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to conversation history
    if (!isError) {
      this.conversationHistory.push({
        role: sender === 'user' ? 'user' : 'assistant',
        content: content,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Format message content (support markdown-like formatting)
   */
  formatMessage(content) {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  /**
   * Show/hide typing indicator
   */
  showTyping(show) {
    const typing = document.getElementById('ai-typing');
    typing.style.display = show ? 'flex' : 'none';
    
    if (show) {
      const messagesContainer = document.getElementById('ai-chat-messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  /**
   * Call AI API
   */
  async callAI(message) {
    const context = this.getContextualInfo();
    
    const payload = {
      model: this.aiConfig.model,
      messages: [
        { role: 'system', content: this.aiConfig.systemPrompt },
        ...this.conversationHistory.slice(-10), // Last 10 messages for context
        { role: 'user', content: `${message}\n\nContext: ${context}` }
      ],
      temperature: this.aiConfig.temperature,
      max_tokens: this.aiConfig.maxTokens,
      language: this.currentLanguage
    };
    
    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getApiKey()}`,
        'X-Platform': 'illunare-docs',
        'X-Version': '4.0'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`AI API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Get contextual information about current page
   */
  getContextualInfo() {
    const pageTitle = document.title;
    const pageUrl = window.location.pathname;
    const pageContent = document.querySelector('main, .md-content, article');
    
    let context = `Page: ${pageTitle}\nURL: ${pageUrl}\n`;
    
    // Extract key headings for context
    if (pageContent) {
      const headings = pageContent.querySelectorAll('h1, h2, h3');
      const headingTexts = Array.from(headings)
        .slice(0, 5)
        .map(h => h.textContent.trim())
        .join(', ');
      
      if (headingTexts) {
        context += `Topics: ${headingTexts}\n`;
      }
    }
    
    return context;
  }

  /**
   * Get API key (in production, this should be handled securely)
   */
  getApiKey() {
    return 'illunare-docs-api-key'; // This should be properly secured
  }

  /**
   * Setup WebSocket for real-time features
   */
  setupWebSocket() {
    try {
      this.ws = new WebSocket(this.websocketUrl);
      
      this.ws.onopen = () => {
        console.log('🔗 AI WebSocket connected');
      };
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleWebSocketMessage(data);
      };
      
      this.ws.onclose = () => {
        console.log('🔌 AI WebSocket disconnected');
        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.setupWebSocket(), 5000);
      };
      
      this.ws.onerror = (error) => {
        console.error('❌ AI WebSocket error:', error);
      };
      
    } catch (error) {
      console.warn('WebSocket not available:', error);
    }
  }

  /**
   * Handle WebSocket messages
   */
  handleWebSocketMessage(data) {
    switch (data.type) {
      case 'notification':
        this.showNotification(data.message);
        break;
      case 'update':
        this.handleContentUpdate(data);
        break;
      case 'suggestion':
        this.showSuggestion(data.suggestion);
        break;
    }
  }

  /**
   * Show notification
   */
  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'ai-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  /**
   * Save conversation history
   */
  saveConversation() {
    try {
      localStorage.setItem('illunare-ai-history', JSON.stringify(this.conversationHistory));
    } catch (error) {
      console.warn('Could not save conversation history:', error);
    }
  }

  /**
   * Load conversation history
   */
  loadConversationHistory() {
    try {
      const saved = localStorage.getItem('illunare-ai-history');
      if (saved) {
        this.conversationHistory = JSON.parse(saved);
        
        // Restore messages to chat (last 5 only)
        const recentMessages = this.conversationHistory.slice(-5);
        const messagesContainer = document.getElementById('ai-chat-messages');
        
        recentMessages.forEach(msg => {
          if (msg.role !== 'system') {
            this.addMessage(msg.content, msg.role === 'user' ? 'user' : 'assistant');
          }
        });
      }
    } catch (error) {
      console.warn('Could not load conversation history:', error);
    }
  }

  /**
   * Track analytics events
   */
  trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'ai_assistant',
        event_label: 'illunare_ai',
        ...properties
      });
    }
    
    // Custom analytics
    if (window.illunareAnalytics) {
      window.illunareAnalytics.track(eventName, {
        component: 'ai_assistant',
        language: this.currentLanguage,
        ...properties
      });
    }
  }

  /**
   * Get AI assistant status
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      open: this.isOpen,
      language: this.currentLanguage,
      conversationLength: this.conversationHistory.length,
      websocketConnected: this.ws && this.ws.readyState === WebSocket.OPEN
    };
  }
}

// Initialize AI Assistant
window.illunareAI = new IllunareAIAssistant();

// Expose global functions
window.openIllunareAI = () => window.illunareAI.openChat();
window.closeIllunareAI = () => window.illunareAI.closeChat();

// Add CSS styles
const aiStyles = `
  .ai-chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid rgba(63, 81, 181, 0.1);
    background: linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%);
    color: white;
    border-radius: 16px 16px 0 0;
  }
  
  .ai-chat-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .ai-chat-controls {
    display: flex;
    gap: 8px;
  }
  
  .ai-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 6px;
    padding: 6px 8px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.2s ease;
  }
  
  .ai-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .ai-chat-messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    max-height: 300px;
  }
  
  .ai-message {
    margin-bottom: 16px;
    animation: fadeInUp 0.3s ease;
  }
  
  .ai-message-content {
    padding: 12px 16px;
    border-radius: 12px;
    max-width: 85%;
    word-wrap: break-word;
  }
  
  .ai-message-user .ai-message-content {
    background: linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%);
    color: white;
    margin-left: auto;
  }
  
  .ai-message-assistant .ai-message-content {
    background: #f5f5f5;
    color: #333;
  }
  
  .ai-message-error .ai-message-content {
    background: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
  }
  
  .ai-message-time {
    font-size: 0.75rem;
    color: #666;
    margin-top: 4px;
    text-align: right;
  }
  
  .ai-message-assistant .ai-message-time {
    text-align: left;
  }
  
  .ai-chat-input-container {
    padding: 16px;
    border-top: 1px solid rgba(63, 81, 181, 0.1);
  }
  
  .ai-input-wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  #ai-chat-input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid rgba(63, 81, 181, 0.2);
    border-radius: 24px;
    outline: none;
    font-size: 14px;
    transition: border-color 0.2s ease;
  }
  
  #ai-chat-input:focus {
    border-color: #3f51b5;
  }
  
  .ai-send-btn {
    background: linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }
  
  .ai-send-btn:hover {
    transform: scale(1.05);
  }
  
  .ai-typing-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    font-size: 0.875rem;
    color: #666;
  }
  
  .ai-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #3f51b5 0%, #00bcd4 100%);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = aiStyles;
document.head.appendChild(styleSheet);

console.log('🤖 illunare AI Assistant loaded successfully'); 