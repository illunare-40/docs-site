# 📡 API Documentation

## Overview

illunare 4.0 provides a comprehensive API suite supporting REST, GraphQL, gRPC, and WebSocket protocols for seamless integration across all platforms.

## 🔗 REST APIs

### Authentication

All API requests require authentication using JWT tokens:

```http
GET /api/v1/users
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
```

### Core Endpoints

#### User Management

```http
# Get user profile
GET /api/v1/users/{id}

# Update user profile  
PUT /api/v1/users/{id}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "language": "pt-BR",
    "timezone": "America/Sao_Paulo"
  }
}

# Response
{
  "id": "usr_123456",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "language": "pt-BR", 
    "timezone": "America/Sao_Paulo"
  },
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-28T10:30:00Z"
}
```

#### Security APIs

```http
# Biometric verification
POST /api/v1/security/biometric/verify
Content-Type: application/json

{
  "user_id": "usr_123456",
  "biometric_type": "fingerprint",
  "biometric_data": "base64_encoded_data",
  "device_id": "dev_789012"
}

# Response
{
  "verification_id": "ver_345678",
  "status": "verified",
  "confidence_score": 0.98,
  "processing_time_ms": 250
}
```

#### AI/ML APIs

```http
# DeepSeek analysis
POST /api/v1/ai/deepseek/analyze
Content-Type: application/json

{
  "prompt": "Analyze this business data for insights",
  "data": {...},
  "context": "business_intelligence",
  "temperature": 0.3
}

# Response
{
  "analysis_id": "ana_567890",
  "insights": [
    {
      "category": "risk",
      "description": "Potential fraud pattern detected",
      "confidence": 0.85,
      "recommendations": ["Enable additional verification", "Monitor transactions"]
    }
  ],
  "processing_time_ms": 1200
}
```

## 📈 GraphQL API

### Schema Overview

```graphql
type Query {
  user(id: ID!): User
  users(filter: UserFilter, pagination: Pagination): UserConnection
  
  # Security queries
  threatAnalysis(input: ThreatAnalysisInput!): ThreatAnalysisResult
  biometricVerification(input: BiometricInput!): VerificationResult
  
  # Industrial connectivity
  industrialDevices(facility: String!): [IndustrialDevice!]!
  profinetDevices(network: String!): [ProfinetDevice!]!
  
  # Automotive
  vehicles(fleet: String!): [Vehicle!]!
  fleetAnalytics(fleetId: String!, timeRange: TimeRange!): FleetAnalytics
}

type Mutation {
  # User operations
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
  
  # Security operations
  verifyBiometric(input: BiometricVerificationInput!): VerificationResult!
  updateSecurityPolicy(input: SecurityPolicyInput!): SecurityPolicy!
  
  # Hot reloading
  deployServiceUpdate(input: DeploymentInput!): DeploymentResult!
  rollbackDeployment(deploymentId: ID!): RollbackResult!
}

type Subscription {
  # Real-time threat monitoring
  threatAlerts(severity: ThreatSeverity!): ThreatAlert!
  
  # Vehicle tracking
  vehicleLocation(vehicleId: ID!): VehicleLocation!
  
  # System health
  systemHealth: SystemHealthUpdate!
  
  # Hot reload status
  deploymentStatus(deploymentId: ID!): DeploymentStatusUpdate!
}
```

### Example Queries

```graphql
# Get user with security profile
query GetUserWithSecurity($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    securityProfile {
      biometricEnabled
      threatLevel
      lastVerification
      riskScore
    }
    preferences {
      language
      timezone
      notifications
    }
  }
}

# Real-time threat monitoring
subscription ThreatMonitoring {
  threatAlerts(severity: HIGH) {
    id
    type
    severity
    description
    affectedSystems
    timestamp
    mitigationSteps
  }
}

# Fleet analytics query
query FleetAnalytics($fleetId: String!, $timeRange: TimeRange!) {
  fleetAnalytics(fleetId: $fleetId, timeRange: $timeRange) {
    totalVehicles
    activeVehicles
    averageFuelEfficiency
    totalMileage
    maintenanceAlerts
    complianceStatus {
      inmetro
      contran
      proconve
    }
    performanceMetrics {
      onTimeDelivery
      routeOptimization
      driverPerformance
    }
  }
}
```

## ⚡ gRPC Services

### Proto Definitions

```protobuf
// illunare/v1/user_service.proto
syntax = "proto3";

package illunare.v1;

import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
  rpc UpdateUser(UpdateUserRequest) returns (User);
  rpc DeleteUser(DeleteUserRequest) returns (google.protobuf.Empty);
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
  UserPreferences preferences = 4;
  SecurityProfile security_profile = 5;
  google.protobuf.Timestamp created_at = 6;
  google.protobuf.Timestamp updated_at = 7;
}

message SecurityProfile {
  bool biometric_enabled = 1;
  ThreatLevel threat_level = 2;
  double risk_score = 3;
  google.protobuf.Timestamp last_verification = 4;
}

enum ThreatLevel {
  THREAT_LEVEL_UNSPECIFIED = 0;
  THREAT_LEVEL_LOW = 1;
  THREAT_LEVEL_MEDIUM = 2;
  THREAT_LEVEL_HIGH = 3;
  THREAT_LEVEL_CRITICAL = 4;
}
```

### AI Security Service

```protobuf
// illunare/v1/ai_security_service.proto
service AISecurityService {
  rpc AnalyzeThreat(ThreatAnalysisRequest) returns (ThreatAnalysisResponse);
  rpc VerifyBiometric(BiometricVerificationRequest) returns (BiometricVerificationResponse);
  rpc DetectFraud(FraudDetectionRequest) returns (FraudDetectionResponse);
  rpc StreamSecurityEvents(google.protobuf.Empty) returns (stream SecurityEvent);
}

message ThreatAnalysisRequest {
  string request_id = 1;
  bytes request_data = 2;
  string user_id = 3;
  string session_id = 4;
  map<string, string> context = 5;
}

message ThreatAnalysisResponse {
  string analysis_id = 1;
  ThreatLevel threat_level = 2;
  double confidence_score = 3;
  SecurityAction recommended_action = 4;
  repeated string risk_factors = 5;
  int64 processing_time_ms = 6;
}

enum SecurityAction {
  SECURITY_ACTION_UNSPECIFIED = 0;
  SECURITY_ACTION_ALLOW = 1;
  SECURITY_ACTION_CHALLENGE = 2;
  SECURITY_ACTION_BLOCK = 3;
  SECURITY_ACTION_QUARANTINE = 4;
}
```

### Industrial Connectivity Service

```protobuf
// illunare/v1/industrial_service.proto
service IndustrialService {
  rpc ConnectProfibusDevice(ProfibusSonnectionRequest) returns (DeviceConnectionResponse);
  rpc ReadProfinetData(ProfinetDataRequest) returns (ProfinetDataResponse);
  rpc MonitorArduinoSensors(ArduinoMonitorRequest) returns (stream SensorReading);
  rpc ConfigureRaspberryPi(RaspberryPiConfigRequest) returns (ConfigurationResponse);
}

message ProfinetDataRequest {
  string device_ip = 1;
  uint32 slot = 2;
  uint32 subslot = 3;
  uint32 data_length = 4;
}

message SensorReading {
  string sensor_id = 1;
  string sensor_type = 2;
  double value = 3;
  string unit = 4;
  google.protobuf.Timestamp timestamp = 5;
  SensorStatus status = 6;
}

enum SensorStatus {
  SENSOR_STATUS_UNSPECIFIED = 0;
  SENSOR_STATUS_NORMAL = 1;
  SENSOR_STATUS_WARNING = 2;
  SENSOR_STATUS_ERROR = 3;
  SENSOR_STATUS_OFFLINE = 4;
}
```

## 🔄 WebSocket APIs

### Real-time Events

```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.illunare.com/v1/ws');

// Authentication
ws.send(JSON.stringify({
  type: 'auth',
  token: 'your_jwt_token'
}));

// Subscribe to threat alerts
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'security.threats',
  filters: {
    severity: ['HIGH', 'CRITICAL'],
    user_id: 'usr_123456'
  }
}));

// Handle incoming messages
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'threat_alert':
      handleThreatAlert(message.data);
      break;
      
    case 'vehicle_update':
      updateVehicleLocation(message.data);
      break;
      
    case 'system_health':
      updateSystemStatus(message.data);
      break;
      
    case 'deployment_status':
      updateDeploymentProgress(message.data);
      break;
  }
};
```

### Vehicle Tracking WebSocket

```javascript
// Real-time vehicle tracking
class VehicleTracker {
  constructor(apiKey) {
    this.ws = new WebSocket(`wss://api.illunare.com/v1/automotive/ws?token=${apiKey}`);
    this.vehicles = new Map();
  }
  
  trackVehicle(vehicleId) {
    this.ws.send(JSON.stringify({
      type: 'track_vehicle',
      vehicle_id: vehicleId,
      updates: ['location', 'speed', 'fuel', 'engine_status']
    }));
  }
  
  onVehicleUpdate(callback) {
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'vehicle_update') {
        callback(data.vehicle);
      }
    };
  }
}

// Usage
const tracker = new VehicleTracker('your-api-key');
tracker.trackVehicle('vehicle-123');
tracker.onVehicleUpdate((vehicle) => {
  console.log(`Vehicle ${vehicle.id} at ${vehicle.location.lat}, ${vehicle.location.lng}`);
});
```

## 🔐 Authentication & Security

### JWT Token Structure

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "illunare-key-1"
  },
  "payload": {
    "sub": "usr_123456",
    "iss": "illunare.com",
    "aud": ["api.illunare.com"],
    "exp": 1643723400,
    "iat": 1643637000,
    "scope": ["read:users", "write:users", "admin:security"],
    "tenant_id": "tenant_789",
    "security_level": "high"
  }
}
```

### API Rate Limiting

```http
# Rate limit headers in responses
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1643723400
X-RateLimit-Window: 3600

# When rate limit exceeded
HTTP/1.1 429 Too Many Requests
{
  "error": "rate_limit_exceeded",
  "message": "API rate limit exceeded",
  "retry_after": 3600
}
```

## 📊 API Analytics Dashboard

```mermaid
graph TB
    subgraph "🌐 API Gateway"
        A[Load Balancer]
        B[Rate Limiter]
        C[Authentication]
        D[Request Router]
    end
    
    subgraph "📡 API Protocols"
        E[REST APIs]
        F[GraphQL]
        G[gRPC Services]
        H[WebSocket]
    end
    
    subgraph "🔧 Services"
        I[User Service]
        J[Security Service]
        K[Industrial Service]
        L[Automotive Service]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    D --> F
    D --> G
    D --> H
    E --> I
    F --> J
    G --> K
    H --> L
```

## 🚀 SDKs & Client Libraries

### Python SDK

```python
from illunare_sdk import IllunareClient

# Initialize client
client = IllunareClient(
    api_key="your-api-key",
    environment="production"
)

# User operations
user = client.users.get("usr_123456")
updated_user = client.users.update("usr_123456", {
    "name": "New Name",
    "preferences": {"language": "pt-BR"}
})

# Security operations
threat_analysis = client.security.analyze_threat({
    "request_data": request_data,
    "user_id": "usr_123456"
})

# Industrial connectivity
devices = client.industrial.list_profinet_devices("192.168.1.0/24")
sensor_data = client.industrial.read_arduino_sensors("arduino_001")
```

### JavaScript/TypeScript SDK
    
    ```typescript
import { IllunareClient } from '@illunare/sdk';
    
// Initialize client
    const client = new IllunareClient({
      apiKey: 'your-api-key',
      environment: 'production'
    });
    
// Type-safe operations
interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

// Async/await support
const user: User = await client.users.get('usr_123456');

// Real-time subscriptions
const subscription = client.realtime.subscribe('threats', {
  onThreat: (threat) => console.log('New threat detected:', threat),
  onError: (error) => console.error('Subscription error:', error)
});
```

### Go SDK
    
    ```go
package main

import (
    "context"
    "github.com/illunare/go-sdk"
)

func main() {
    // Initialize client
    client := illunare.NewClient("your-api-key")
    
    // User operations
    user, err := client.Users.Get(context.Background(), "usr_123456")
    if err != nil {
        log.Fatal(err)
    }
    
    // gRPC streaming
    stream, err := client.Industrial.MonitorSensors(context.Background(), &illunare.SensorRequest{
        SensorIds: []string{"sensor_001", "sensor_002"},
    })
    if err != nil {
        log.Fatal(err)
    }
    
    for {
        reading, err := stream.Recv()
        if err != nil {
            break
        }
        fmt.Printf("Sensor %s: %f %s\n", reading.SensorId, reading.Value, reading.Unit)
    }
}
    ```

## 📚 Interactive Documentation

### Swagger/OpenAPI

Visit our interactive API documentation:
- [REST API Explorer](https://api.illunare.com/docs)
- [GraphQL Playground](https://api.illunare.com/graphql)
- [gRPC Documentation](https://api.illunare.com/grpc-docs)

### Postman Collection

Download our Postman collection for easy testing:
```bash
curl -L https://api.illunare.com/postman/collection.json -o illunare-api.json
```

## 🔗 Related Documentation

- [Authentication Guide](../security/authentication.md)
- [Rate Limiting](../reference/rate-limits.md)
- [SDK Documentation](../guides/sdks/index.md)
- [API Versioning](../reference/versioning.md)
- [Error Codes Reference](../reference/error-codes.md) 