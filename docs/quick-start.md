# 🚀 Quick Start Guide

Get up and running with illunare 4.0 Enterprise Platform in under 10 minutes! This guide will walk you through the essential setup steps for each major component.

<div class="enterprise-badge">Zero to Production</div>

!!! tip "🎯 Choose Your Path"
    Select the integration path that best matches your use case:
    
    - 🏢 **Enterprise Admin** - Dashboard and management interfaces
    - 🏭 **Industrial Engineer** - IoT and industrial connectivity
    - 🚗 **Automotive Developer** - Fleet management and OBD-II
    - 🤖 **AI Developer** - Machine learning and intelligent services
    - 🇧🇷 **Compliance Officer** - Brazilian/LATAM regulatory requirements

---

## 📋 Prerequisites

Before starting, ensure you have the following installed:

### Required Tools
```bash
# Check your environment
node --version      # v18.0+ required
npm --version       # v8.0+ required
git --version       # v2.20+ required
docker --version    # v20.0+ required
```

### Cloud Account Setup
```bash
# Google Cloud Platform (Primary)
gcloud auth login
gcloud config set project your-illunare-project

# Set up authentication
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
export ILLUNARE_PROJECT_ID="your-project-id"
```

### Development Environment
```bash
# Clone the main repository
git clone https://github.com/illunare-40/illunare.git
cd illunare

# Install global dependencies
npm install -g @illunare/cli
npm install -g @angular/cli
npm install -g create-react-app
```

---

## 🏢 Enterprise Admin Setup

Get the admin portal and dashboard running for enterprise management.

### 1. Admin Portal (React/Next.js)

```bash
# Clone and setup admin portal
git clone https://github.com/illunare-40/admin-portal.git
cd admin-portal

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
```

Edit `.env.local`:
```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.illunare.com/v4
NEXT_PUBLIC_WEBSOCKET_URL=wss://ws.illunare.com

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# AI Integration
NEXT_PUBLIC_DEEPSEEK_ENDPOINT=https://ai.illunare.com
NEXT_PUBLIC_OLLAMA_ENDPOINT=http://localhost:11434

# Webhook Configuration
WEBHOOK_SECRET=your-webhook-secret
```

```bash
# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### 2. Mobile Admin Panel (Flutter)

```bash
# Clone mobile app
git clone https://github.com/illunare-40/mobile-app.git
cd mobile-app

# Install Flutter dependencies
flutter pub get

# Configure API endpoints
```

Edit `lib/config/api_config.dart`:
```dart
class ApiConfig {
  static const String baseUrl = 'https://api.illunare.com/v4';
  static const String websocketUrl = 'wss://ws.illunare.com';
  static const String aiEndpoint = 'https://ai.illunare.com';
  
  // Brazilian compliance endpoints
  static const String lgpdEndpoint = 'https://compliance.illunare.com/lgpd';
  static const String esocialEndpoint = 'https://compliance.illunare.com/esocial';
}
```

```bash
# Run on device/simulator
flutter run

# Build for production
flutter build apk --release  # Android
flutter build ios --release  # iOS
```

---

## 🏭 Industrial Connectivity Setup

Connect industrial devices using Profibus, Profinet, and IoT protocols.

### 1. Arduino Integration

```bash
# Clone Arduino libraries
git clone https://github.com/illunare-40/arduino-libraries.git
```

Copy `illunare_industrial.h` to your Arduino libraries folder, then create a new sketch:

```cpp
#include <WiFi.h>
#include <illunare_industrial.h>

// Network credentials
const char* ssid = "your-wifi-ssid";
const char* password = "your-wifi-password";

// illunare configuration
IllunareIndustrial illunare("your-api-key");

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  
  // Initialize illunare platform
  illunare.begin();
  
  // Configure Profibus connection
  illunare.setProfibusConfig(502, "192.168.1.100");
  
  // Configure sensors
  illunare.addSensor("temperature", A0, ANALOG);
  illunare.addSensor("pressure", A1, ANALOG);
  illunare.addSensor("flow", 2, DIGITAL);
  
  Serial.println("🏭 Industrial connectivity initialized");
}

void loop() {
  // Read sensor data
  float temperature = illunare.readSensor("temperature");
  float pressure = illunare.readSensor("pressure");
  bool flow = illunare.readSensor("flow");
  
  // Create data packet
  IllunareDataPacket packet;
  packet.addField("temperature", temperature);
  packet.addField("pressure", pressure);
  packet.addField("flow_active", flow);
  packet.addField("timestamp", millis());
  
  // Send to illunare platform
  if (illunare.sendData(packet)) {
    Serial.println("✅ Data sent successfully");
  } else {
    Serial.println("❌ Failed to send data");
  }
  
  delay(5000); // Send every 5 seconds
}
```

### 2. Raspberry Pi SDK

```bash
# Install Python SDK
pip install illunare-industrial-sdk

# Create industrial gateway
mkdir illunare-industrial-gateway
cd illunare-industrial-gateway
```

Create `industrial_gateway.py`:
```python
from illunare_industrial import (
    ProfibusClient, 
    ProfinetClient, 
    OPCUAClient,
    IllunareGateway
)
import asyncio
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IndustrialGateway:
    def __init__(self):
        self.gateway = IllunareGateway(
            api_key="your-api-key",
            endpoint="https://api.illunare.com/v4/industrial"
        )
        
        # Initialize protocol clients
        self.profibus = ProfibusClient("192.168.1.100", 502)
        self.profinet = ProfinetClient("192.168.1.101")
        self.opcua = OPCUAClient("opc.tcp://192.168.1.102:4840")
    
    async def start_data_collection(self):
        """Start collecting data from industrial devices"""
        logger.info("🏭 Starting industrial data collection...")
        
        while True:
            try:
                # Collect Profibus data
                profibus_data = await self.profibus.read_all_devices()
                
                # Collect Profinet data
                profinet_data = await self.profinet.read_io_data()
                
                # Collect OPC-UA data
                opcua_data = await self.opcua.read_variables([
                    "ns=2;i=1001",  # Temperature
                    "ns=2;i=1002",  # Pressure
                    "ns=2;i=1003"   # Flow rate
                ])
                
                # Combine all data
                industrial_data = {
                    "profibus": profibus_data,
                    "profinet": profinet_data,
                    "opcua": opcua_data,
                    "timestamp": time.time()
                }
                
                # Send to illunare platform
                await self.gateway.send_data(industrial_data)
                logger.info("✅ Industrial data sent successfully")
                
            except Exception as e:
                logger.error(f"❌ Error collecting data: {e}")
            
            await asyncio.sleep(1)  # 1 second interval

if __name__ == "__main__":
    gateway = IndustrialGateway()
    asyncio.run(gateway.start_data_collection())
```

Run the gateway:
```bash
python industrial_gateway.py
```

---

## 🚗 Automotive Platform Setup

Set up fleet management and vehicle compliance systems.

### 1. OBD-II Integration

```bash
# Clone automotive toolkit
git clone https://github.com/illunare-40/automotive-integration.git
cd automotive-integration

# Install dependencies
pip install -r requirements.txt
```

Create `fleet_manager.py`:
```python
from illunare.automotive import (
    FleetManager, 
    OBDScanner, 
    VehicleCompliance,
    BrazilianCompliance
)
import asyncio

class IllunareFleetManager:
    def __init__(self):
        self.fleet = FleetManager(
            api_key="your-api-key",
            compliance_region="BR",
            standards=["INMETRO", "CONTRAN"]
        )
        
        # Brazilian compliance engine
        self.compliance = BrazilianCompliance(
            inmetro_api_key="your-inmetro-key",
            contran_endpoint="https://contran.gov.br/api"
        )
    
    async def setup_vehicle_monitoring(self):
        """Setup vehicle monitoring and compliance"""
        print("🚗 Setting up vehicle monitoring...")
        
        # Register vehicles
        vehicles = [
            {
                "vin": "WVW123456789ABCDE",
                "make": "Volkswagen",
                "model": "Gol",
                "year": 2024,
                "license_plate": "ABC-1234",
                "obd_port": "/dev/ttyUSB0"
            },
            {
                "vin": "9BFSR15B0BB123456",
                "make": "Ford",
                "model": "Ka",
                "year": 2023,
                "license_plate": "XYZ-5678",
                "obd_port": "/dev/ttyUSB1"
            }
        ]
        
        for vehicle_data in vehicles:
            vehicle = await self.fleet.register_vehicle(vehicle_data)
            
            # Setup OBD-II scanner
            scanner = OBDScanner(
                port=vehicle_data["obd_port"],
                vehicle_id=vehicle.id
            )
            
            # Start monitoring
            await scanner.start_monitoring()
            print(f"✅ Monitoring started for {vehicle_data['license_plate']}")
    
    async def run_compliance_check(self):
        """Run compliance checks for all vehicles"""
        vehicles = await self.fleet.get_all_vehicles()
        
        for vehicle in vehicles:
            try:
                # Get latest diagnostics
                diagnostics = await vehicle.get_latest_diagnostics()
                
                # Run compliance check
                compliance_result = await self.compliance.check_vehicle(
                    vehicle, diagnostics
                )
                
                print(f"🔍 Compliance check for {vehicle.license_plate}:")
                print(f"   Status: {compliance_result.status}")
                print(f"   INMETRO: {compliance_result.inmetro_compliant}")
                print(f"   CONTRAN: {compliance_result.contran_compliant}")
                print(f"   Emissions: {compliance_result.emissions_level}")
                
                # Generate compliance report
                if compliance_result.requires_report:
                    report = await self.compliance.generate_report(
                        vehicle, compliance_result
                    )
                    print(f"📋 Report generated: {report.report_id}")
                    
            except Exception as e:
                print(f"❌ Error checking compliance for {vehicle.license_plate}: {e}")

if __name__ == "__main__":
    manager = IllunareFleetManager()
    
    # Run setup and monitoring
    asyncio.run(manager.setup_vehicle_monitoring())
    asyncio.run(manager.run_compliance_check())
```

---

## 🤖 AI Integration Setup

Configure DeepSeek R1/R3 and Ollama for intelligent services.

### 1. DeepSeek R1/R3 Setup

```bash
# Install AI SDK
npm install @illunare/ai-sdk
# or
pip install illunare-ai-sdk
```

Create `ai_integration.js`:
```javascript
import { IllunareAI, DeepSeekClient } from '@illunare/ai-sdk';

class AIIntegration {
  constructor() {
    this.ai = new IllunareAI({
      models: ['deepseek-r1', 'deepseek-r3'],
      languages: ['pt-BR', 'en-US'],
      endpoint: 'https://ai.illunare.com',
      ollama_endpoint: 'http://localhost:11434'
    });
  }

  async setupAIServices() {
    console.log('🤖 Setting up AI services...');
    
    // Initialize security guardian
    const securityGuardian = await this.ai.createSecurityGuardian({
      threatDetection: true,
      fraudPrevention: true,
      realTimeAnalysis: true
    });
    
    // Setup intelligent recommendations
    const recommendationEngine = await this.ai.createRecommendationEngine({
      contextAware: true,
      userBehaviorAnalysis: true,
      predictiveAnalytics: true
    });
    
    // Configure code analysis
    const codeAnalyzer = await this.ai.createCodeAnalyzer({
      languages: ['javascript', 'python', 'go', 'rust', 'elixir'],
      realTimeAnalysis: true,
      performanceOptimization: true
    });
    
    console.log('✅ AI services configured successfully');
    return { securityGuardian, recommendationEngine, codeAnalyzer };
  }

  async testAICapabilities() {
    console.log('🧪 Testing AI capabilities...');
    
    // Test natural language processing
    const nlpResponse = await this.ai.query(
      'Como posso integrar Profibus com Arduino no illunare 4.0?',
      { language: 'pt-BR', context: 'industrial' }
    );
    console.log('🗣️ NLP Response:', nlpResponse);
    
    // Test code analysis
    const codeSnippet = `
      const vehicle = await fleet.getVehicle(vehicleId);
      const diagnostics = await vehicle.runOBDScan();
    `;
    
    const analysis = await this.ai.analyzeCode(codeSnippet, {
      language: 'javascript',
      framework: 'illunare-automotive'
    });
    console.log('🔍 Code Analysis:', analysis);
    
    // Test security assessment
    const securityAssessment = await this.ai.assessSecurity({
      endpoint: '/api/v4/automotive/fleet',
      method: 'GET',
      headers: { 'Authorization': 'Bearer token' }
    });
    console.log('🛡️ Security Assessment:', securityAssessment);
  }
}

// Initialize and test
const aiIntegration = new AIIntegration();
await aiIntegration.setupAIServices();
await aiIntegration.testAICapabilities();
```

### 2. Ollama Local Setup

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama service
ollama serve

# Pull DeepSeek models
ollama pull deepseek-r1
ollama pull deepseek-r3

# Test Ollama integration
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1",
  "prompt": "Explain how to integrate Profibus with illunare 4.0",
  "stream": false
}'
```

---

## 🇧🇷 Brazilian Compliance Setup

Configure LGPD, E-Social, and FenSeg compliance frameworks.

### 1. LGPD Implementation

```bash
# Install compliance SDK
npm install @illunare/compliance-sdk
```

Create `lgpd_compliance.js`:
```javascript
import { LGPDCompliance, ConsentManager } from '@illunare/compliance-sdk';

class LGPDImplementation {
  constructor() {
    this.lgpd = new LGPDCompliance({
      apiKey: process.env.ILLUNARE_API_KEY,
      environment: 'production',
      dataMinimization: true,
      automaticDeletion: true
    });
    
    this.consentManager = new ConsentManager({
      cookieConsent: true,
      granularConsent: true,
      consentWithdrawal: true
    });
  }

  async setupLGPDCompliance() {
    console.log('⚖️ Setting up LGPD compliance...');
    
    // Configure data processing purposes
    await this.lgpd.configurePurposes([
      {
        id: 'fleet_management',
        name: 'Fleet Management',
        description: 'Managing vehicle fleet operations',
        legalBasis: 'legitimate_interest',
        dataTypes: ['vehicle_data', 'driver_data', 'location_data']
      },
      {
        id: 'industrial_monitoring',
        name: 'Industrial Monitoring',
        description: 'Monitoring industrial equipment',
        legalBasis: 'contract_performance',
        dataTypes: ['sensor_data', 'equipment_data']
      }
    ]);
    
    // Setup data subject rights
    await this.lgpd.enableDataSubjectRights([
      'access',
      'rectification',
      'deletion',
      'portability',
      'objection'
    ]);
    
    // Configure automatic data retention
    await this.lgpd.setRetentionPolicies({
      'vehicle_data': '7 years',
      'sensor_data': '5 years',
      'user_data': '2 years after last activity'
    });
    
    console.log('✅ LGPD compliance configured');
  }

  async handleDataSubjectRequest(request) {
    const { type, dataSubjectId, requestDetails } = request;
    
    switch (type) {
      case 'access':
        return await this.lgpd.generateDataExport(dataSubjectId);
      
      case 'deletion':
        return await this.lgpd.deletePersonalData(dataSubjectId);
      
      case 'rectification':
        return await this.lgpd.updatePersonalData(
          dataSubjectId, 
          requestDetails.updates
        );
      
      default:
        throw new Error(`Unsupported request type: ${type}`);
    }
  }
}
```

### 2. E-Social Integration

```python
# Install E-Social SDK
pip install illunare-esocial-sdk

# Create E-Social integration
from illunare.compliance import ESocialClient, TaxCalculator

class ESocialIntegration:
    def __init__(self):
        self.esocial = ESocialClient(
            certificate_path="path/to/certificate.p12",
            certificate_password="cert-password",
            environment="production"  # or "homologation"
        )
        
        self.tax_calc = TaxCalculator(region="BR")
    
    async def setup_employee_registration(self):
        """Setup automated employee registration"""
        print("👥 Setting up E-Social employee registration...")
        
        # Configure employer information
        employer_info = {
            "cnpj": "12.345.678/0001-90",
            "company_name": "Your Company Ltd",
            "activity_code": "6201-5/00",  # Software development
            "address": {
                "street": "Rua das Empresas, 123",
                "city": "São Paulo",
                "state": "SP",
                "zip_code": "01234-567"
            }
        }
        
        await self.esocial.register_employer(employer_info)
        
        # Setup automated payroll processing
        await self.esocial.configure_payroll_automation({
            "calculation_day": 25,
            "payment_day": 5,
            "benefits": ["health_insurance", "meal_voucher", "transport_voucher"],
            "automatic_tax_calculation": True
        })
        
        print("✅ E-Social integration configured")
    
    async def process_employee_data(self, employee_data):
        """Process employee data for E-Social reporting"""
        try:
            # Calculate taxes and contributions
            tax_data = await self.tax_calc.calculate_employee_taxes(
                salary=employee_data["salary"],
                benefits=employee_data["benefits"],
                deductions=employee_data["deductions"]
            )
            
            # Submit to E-Social
            submission_result = await self.esocial.submit_employee_event(
                event_type="S-2200",  # Employee admission
                employee_data=employee_data,
                tax_data=tax_data
            )
            
            return {
                "status": "success",
                "receipt_number": submission_result.receipt,
                "tax_data": tax_data
            }
            
        except Exception as e:
            return {
                "status": "error",
                "error": str(e)
            }
```

---

## 🔥 Hot Reloading Setup

Configure Elixir-based hot reloading for zero-downtime deployments.

### 1. Elixir Runtime Setup

```bash
# Install Elixir and OTP
brew install elixir  # macOS
# or
sudo apt-get install elixir  # Ubuntu

# Create hot reloading service
mix new illunare_hot_reload --sup
cd illunare_hot_reload
```

Create `lib/illunare_hot_reload/application.ex`:
```elixir
defmodule IllunareHotReload.Application do
  use Application

  def start(_type, _args) do
    children = [
      {IllunareHotReload.HotSwapManager, []},
      {IllunareHotReload.DeploymentMonitor, []},
      {IllunareHotReload.HealthChecker, []}
    ]

    opts = [strategy: :one_for_one, name: IllunareHotReload.Supervisor]
    Supervisor.start_link(children, opts)
  end
end

defmodule IllunareHotReload.HotSwapManager do
  use GenServer
  require Logger

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def hot_swap_module(module_name, new_code) do
    GenServer.call(__MODULE__, {:hot_swap, module_name, new_code})
  end

  def init(state) do
    Logger.info("🔥 Hot Swap Manager started")
    {:ok, state}
  end

  def handle_call({:hot_swap, module_name, new_code}, _from, state) do
    try do
      # Compile new code
      {module, binary} = Code.compile_string(new_code)
      
      # Soft purge old version
      :code.soft_purge(module_name)
      
      # Load new version
      :code.load_binary(module, 'nofile', binary)
      
      Logger.info("✅ Hot swapped module: #{module_name}")
      {:reply, {:ok, :swapped}, state}
    rescue
      error ->
        Logger.error("❌ Hot swap failed for #{module_name}: #{inspect(error)}")
        {:reply, {:error, error}, state}
    end
  end
end
```

### 2. Production Deployment

Create `deploy.exs`:
```elixir
defmodule IllunareHotReload.Deploy do
  @doc """
  Deploy new version with zero downtime
  """
  def deploy_new_version(service_name, version) do
    Logger.info("🚀 Deploying #{service_name} version #{version}")
    
    # Health check before deployment
    case health_check(service_name) do
      :healthy ->
        perform_hot_deployment(service_name, version)
      
      :unhealthy ->
        {:error, "Service unhealthy, aborting deployment"}
    end
  end
  
  defp perform_hot_deployment(service_name, version) do
    with {:ok, new_code} <- fetch_new_version(service_name, version),
         {:ok, _} <- validate_code(new_code),
         {:ok, _} <- backup_current_version(service_name),
         {:ok, _} <- hot_swap_code(service_name, new_code),
         {:ok, _} <- verify_deployment(service_name) do
      
      Logger.info("✅ Successfully deployed #{service_name} v#{version}")
      {:ok, :deployed}
    else
      {:error, reason} ->
        Logger.error("❌ Deployment failed: #{reason}")
        rollback_deployment(service_name)
        {:error, reason}
    end
  end
  
  defp rollback_deployment(service_name) do
    Logger.warn("🔄 Rolling back #{service_name}")
    # Rollback logic here
  end
end
```

---

## 🔔 Webhook Integration

Set up real-time notifications across all frontend applications.

### 1. Webhook Configuration

Create `webhook_config.js`:
```javascript
import { WebhookManager } from '@illunare/webhook-sdk';

const webhookManager = new WebhookManager({
  endpoints: {
    adminPortal: 'https://admin-portal.illunare.com/api/webhooks/docs',
    adminPanel: 'https://admin-panel-master.illunare.com/api/webhooks/alerts', 
    ecommerce: 'https://ecommerce-portal.illunare.com/api/webhooks/updates'
  },
  security: {
    secret: process.env.WEBHOOK_SECRET,
    encryption: 'AES-256-GCM',
    signature: 'HMAC-SHA256'
  },
  retry: {
    maxAttempts: 3,
    backoffStrategy: 'exponential'
  }
});

// Setup event listeners
webhookManager.on('documentation.updated', async (event) => {
  console.log('📚 Documentation updated:', event.data);
  
  // Notify all frontends
  await webhookManager.broadcast({
    type: 'info',
    title: '📚 Documentation Updated',
    message: `${event.data.page} has been updated`,
    actions: [
      { label: 'View Changes', url: event.data.diff_url },
      { label: 'Refresh', action: 'refresh_page' }
    ]
  });
});

webhookManager.on('compliance.alert', async (event) => {
  console.log('🚨 Compliance alert:', event.data);
  
  await webhookManager.send('admin-panel', {
    type: 'alert',
    priority: 'high',
    title: '🚨 Compliance Alert',
    message: event.data.message,
    data: event.data
  });
});

export default webhookManager;
```

---

## ✅ Verification & Testing

Verify that all components are working correctly.

### 1. System Health Check

Create `health_check.sh`:
```bash
#!/bin/bash

echo "🔍 Running illunare 4.0 system health check..."

# Check API endpoints
echo "📡 Checking API endpoints..."
curl -s https://api.illunare.com/v4/health | jq '.status'

# Check AI services
echo "🤖 Checking AI services..."
curl -s https://ai.illunare.com/health | jq '.deepseek_status'

# Check industrial connectivity
echo "🏭 Checking industrial services..."
curl -s https://api.illunare.com/v4/industrial/status | jq '.protocols'

# Check automotive services
echo "🚗 Checking automotive services..."
curl -s https://api.illunare.com/v4/automotive/health | jq '.compliance_status'

# Check compliance services
echo "🇧🇷 Checking compliance services..."
curl -s https://api.illunare.com/v4/compliance/status | jq '.lgpd_status'

echo "✅ Health check completed!"
```

### 2. Integration Tests

Create `integration_test.js`:
```javascript
import { test, expect } from '@playwright/test';

test.describe('illunare 4.0 Integration Tests', () => {
  
  test('Admin Portal loads correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toContainText('illunare 4.0');
    await expect(page.locator('[data-testid="ai-widget"]')).toBeVisible();
  });
  
  test('AI Assistant responds to queries', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('[data-testid="ai-widget"]');
    await page.fill('[data-testid="ai-input"]', 'How do I integrate Profibus?');
    await page.click('[data-testid="ai-send"]');
    
    await expect(page.locator('[data-testid="ai-response"]')).toContainText('Profibus');
  });
  
  test('Industrial data collection works', async ({ page }) => {
    // Test industrial connectivity
    const response = await page.request.get('/api/v4/industrial/sensors/data');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('sensors');
    expect(data.sensors.length).toBeGreaterThan(0);
  });
  
  test('Vehicle compliance check works', async ({ page }) => {
    // Test automotive compliance
    const response = await page.request.post('/api/v4/automotive/compliance/check', {
      data: {
        vin: 'WVW123456789ABCDE',
        standards: ['INMETRO', 'CONTRAN']
      }
    });
    
    expect(response.status()).toBe(200);
    const result = await response.json();
    expect(result).toHaveProperty('compliance_status');
  });
});
```

Run tests:
```bash
npm run test:integration
```

---

## 🎯 Next Steps

Congratulations! You now have illunare 4.0 running. Here's what to explore next:

### 📚 **Deep Dive Documentation**
- [**Architecture Guide**](architecture/) - Understanding the system design
- [**API Reference**](api/) - Complete API documentation
- [**Security Guide**](security/) - Zero-trust security implementation

### 🛠️ **Advanced Configuration**
- [**Multi-Cloud Setup**](architecture/multi-cloud.md) - GCP, AWS, Azure deployment
- [**Performance Tuning**](architecture/performance.md) - Optimization guidelines
- [**Monitoring Setup**](devops/monitoring.md) - Comprehensive observability

### 🤝 **Community & Support**
- [**GitHub Issues**](https://github.com/illunare-40/illunare/issues) - Bug reports and features
- [**Discord Community**](https://discord.gg/illunare) - Real-time support and discussions
- [**Enterprise Support**](mailto:enterprise@illunare.com) - 24/7 professional support

### 🚀 **Production Deployment**
- [**CI/CD Setup**](devops/cicd-pipelines.md) - Automated deployment pipelines
- [**Security Hardening**](security/zero-trust.md) - Production security checklist
- [**Scaling Guide**](architecture/scaling.md) - High-availability deployment

---

<div style="text-align: center; margin: 3rem 0; padding: 2rem; background: linear-gradient(135deg, rgba(63, 81, 181, 0.1) 0%, rgba(0, 188, 212, 0.05) 100%); border-radius: 12px; border-left: 4px solid var(--illunare-primary);">

## 🎉 Welcome to illunare 4.0!

**You're now ready to build next-generation enterprise applications with AI, industrial connectivity, automotive integration, and zero-downtime operations.**

[**📊 View Dashboard**](http://localhost:3000){ .md-button .md-button--primary }
[**🤖 Test AI Features**](http://localhost:3000/ai){ .md-button }
[**📞 Get Support**](mailto:fale-conosco@illunare.com.br){ .md-button }

</div>

---

*Need help? The AI assistant (🤖) in the bottom-right corner is available 24/7 in English and Portuguese.* 