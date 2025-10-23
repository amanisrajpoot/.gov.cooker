# .gov.cooker API Documentation

## Overview

The .gov.cooker API provides endpoints for transparency, accountability, and citizen engagement. This RESTful API follows OpenAPI 3.0 specifications and includes comprehensive authentication, rate limiting, and security features.

## Base URL

```
Production: https://api.gov-cooker.org/api/v1
Development: http://localhost:3001/api/v1
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting

- **General API**: 100 requests per minute
- **Authentication**: 10 requests per minute
- **File Upload**: 5 requests per minute

## Error Handling

All errors follow a consistent format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/endpoint"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "handle": "username",
  "email": "user@example.com",
  "password": "password123",
  "country": "IN",
  "consent_flags": {
    "data_processing": true,
    "marketing": false,
    "analytics": true
  }
}
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "handle": "username",
    "role": "user",
    "kyc_status": "unverified"
  },
  "token": "jwt-token"
}
```

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "handle": "username",
    "role": "user",
    "kyc_status": "verified"
  },
  "token": "jwt-token"
}
```

#### GET /auth/me
Get current user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "user-id",
  "handle": "username",
  "role": "user",
  "kyc_status": "verified",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Campaigns

#### GET /campaigns
Get list of campaigns with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)
- `status` (string): Filter by status (active, paused, completed)
- `search` (string): Search in title and description

**Response:**
```json
{
  "campaigns": [
    {
      "id": "campaign-id",
      "title": "Fix Mumbai Roads",
      "description": "Campaign to fix potholes",
      "status": "active",
      "signature_count": 15000,
      "verified_signature_count": 12000,
      "anonymous_signature_count": 3000,
      "targets": [
        {
          "name": "BMC Commissioner",
          "position": "Commissioner",
          "department": "Brihanmumbai Municipal Corporation"
        }
      ],
      "created_at": "2024-01-01T00:00:00.000Z",
      "owner": {
        "handle": "citizen123"
      }
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 12
}
```

#### POST /campaigns
Create a new campaign.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Campaign Title",
  "description": "Campaign description",
  "targets": [
    {
      "name": "Official Name",
      "position": "Position",
      "department": "Department"
    }
  ],
  "expires_at": "2024-12-31T23:59:59.000Z"
}
```

**Response:**
```json
{
  "id": "campaign-id",
  "title": "Campaign Title",
  "description": "Campaign description",
  "status": "active",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

#### GET /campaigns/{id}
Get specific campaign details.

**Response:**
```json
{
  "id": "campaign-id",
  "title": "Campaign Title",
  "description": "Campaign description",
  "status": "active",
  "signature_count": 15000,
  "targets": [
    {
      "name": "Official Name",
      "position": "Position",
      "department": "Department"
    }
  ],
  "created_at": "2024-01-01T00:00:00.000Z",
  "owner": {
    "handle": "citizen123"
  }
}
```

#### POST /campaigns/{id}/sign
Add signature to a campaign.

**Request Body:**
```json
{
  "sig_type": "verified",
  "geo_bucket": "IN-MH"
}
```

**Response:**
```json
{
  "signature_id": "signature-id",
  "merkle_leaf": "merkle-hash"
}
```

#### GET /campaigns/{id}/transparency
Get campaign transparency data.

**Response:**
```json
{
  "total_signatures": 15000,
  "verified_signatures": 12000,
  "anonymous_signatures": 3000,
  "merkle_root": "merkle-root-hash",
  "last_updated": "2024-01-01T00:00:00.000Z"
}
```

### Issues

#### GET /issues
Get list of issues with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by status
- `department` (string): Filter by department

**Response:**
```json
{
  "issues": [
    {
      "id": "issue-id",
      "title": "Broken Street Light",
      "description": "Street light not working",
      "status": "open",
      "department": "Electricity Board",
      "location": {
        "type": "Point",
        "coordinates": [77.5946, 12.9716]
      },
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 12
}
```

#### POST /issues
Create a new issue report.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Issue Title",
  "description": "Issue description",
  "location": {
    "address": "Street address",
    "coordinates": {
      "lat": 12.9716,
      "lng": 77.5946
    }
  },
  "department": "Responsible Department"
}
```

**Response:**
```json
{
  "id": "issue-id",
  "title": "Issue Title",
  "status": "open",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### RTI Requests

#### GET /rti
Get list of RTI requests.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "rti_requests": [
    {
      "id": "rti-id",
      "department": "Municipal Corporation",
      "status": "submitted",
      "due_date": "2024-02-01T00:00:00.000Z",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /rti
Create a new RTI request.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "department": "Municipal Corporation",
  "questions": [
    "What is the total budget allocated for road maintenance?",
    "How many pothole complaints have been received?"
  ]
}
```

**Response:**
```json
{
  "id": "rti-id",
  "department": "Municipal Corporation",
  "status": "submitted",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### File Upload

#### POST /media/upload
Upload and process a file.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
file: <file-data>
```

**Response:**
```json
{
  "success": true,
  "file": {
    "originalName": "document.pdf",
    "filename": "hash.pdf",
    "mimeType": "application/pdf",
    "size": 1024000,
    "hash": "file-hash",
    "perceptualHash": "perceptual-hash",
    "metadata": {},
    "processedPath": "/uploads/processed/hash.pdf"
  },
  "message": "File uploaded successfully"
}
```

### Admin Endpoints

#### GET /admin/dashboard
Get admin dashboard statistics.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "totalUsers": 1000,
  "totalCampaigns": 50,
  "totalIssues": 200,
  "totalRTI": 75,
  "pendingModeration": 25,
  "recentActivity": [
    {
      "description": "New campaign created",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "type": "success"
    }
  ]
}
```

#### GET /admin/moderation
Get moderation queue.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "items": [
    {
      "id": "moderation-id",
      "item_id": "campaign-id",
      "item_type": "campaign",
      "content": "Campaign content",
      "status": "pending",
      "flags": ["potential_duplicate"],
      "toxicity_score": 0.1,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `429` - Too Many Requests
- `500` - Internal Server Error

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @gov-cooker/api-client
```

```javascript
import { GovCookerAPI } from '@gov-cooker/api-client';

const api = new GovCookerAPI({
  baseURL: 'https://api.gov-cooker.org/api/v1',
  token: 'your-jwt-token'
});

// Create a campaign
const campaign = await api.campaigns.create({
  title: 'Fix Roads',
  description: 'Campaign to fix potholes',
  targets: [{ name: 'Mayor', position: 'Mayor' }]
});
```

### Python
```bash
pip install gov-cooker-api
```

```python
from gov_cooker_api import GovCookerAPI

api = GovCookerAPI(
    base_url='https://api.gov-cooker.org/api/v1',
    token='your-jwt-token'
)

# Create a campaign
campaign = api.campaigns.create({
    'title': 'Fix Roads',
    'description': 'Campaign to fix potholes',
    'targets': [{'name': 'Mayor', 'position': 'Mayor'}]
})
```

## Webhooks

The API supports webhooks for real-time notifications:

### Campaign Events
- `campaign.created` - New campaign created
- `campaign.milestone` - Campaign reached milestone
- `campaign.completed` - Campaign completed

### Issue Events
- `issue.created` - New issue reported
- `issue.resolved` - Issue resolved
- `issue.updated` - Issue status updated

### Webhook Configuration
```json
{
  "url": "https://your-app.com/webhooks",
  "events": ["campaign.created", "issue.resolved"],
  "secret": "webhook-secret"
}
```

## Rate Limiting

Rate limits are applied per IP address and user:

- **Authentication**: 10 requests per minute
- **General API**: 100 requests per minute
- **File Upload**: 5 requests per minute
- **Admin API**: 200 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Security

### HTTPS
All API endpoints require HTTPS in production.

### CORS
CORS is configured for allowed origins:
- `https://gov-cooker.org`
- `https://www.gov-cooker.org`

### Content Security Policy
The API implements strict CSP headers to prevent XSS attacks.

### Data Encryption
- All sensitive data is encrypted at rest
- Client-side encryption for whistleblower reports
- TLS 1.3 for data in transit

## Support

For API support and questions:
- **Email**: api-support@gov-cooker.org
- **Documentation**: https://docs.gov-cooker.org
- **Status Page**: https://status.gov-cooker.org
