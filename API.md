# API Documentation

This document describes the REST API endpoints for the Radial Code Dashboard.

## Base URL

- Development: `http://localhost:1337/api`
- Production: `https://your-strapi-domain.com/api`

## Authentication

### Login
```http
POST /auth/local
Content-Type: application/json

{
  "identifier": "admin@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

### Get Current User
```http
GET /users/me
Authorization: Bearer {jwt_token}
```

## Programs API

### List All Programs
```http
GET /programs?populate=*
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Web Development Bootcamp",
        "date": "2024-01-15T10:00:00.000Z",
        "venue": "Tech Hub Downtown",
        "description": "Learn modern web development...",
        "slug": "web-development-bootcamp",
        "certificateStatus": "Ready",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "students": {
          "data": [...]
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

### Get Program by Slug
```http
GET /programs?filters[slug][$eq]=web-development-bootcamp&populate=*
```

### Create Program
```http
POST /programs
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "data": {
    "name": "React Workshop",
    "date": "2024-02-01T14:00:00.000Z",
    "venue": "Innovation Center",
    "description": "Advanced React concepts and patterns",
    "slug": "react-workshop",
    "certificateStatus": "Not Ready"
  }
}
```

### Update Program
```http
PUT /programs/{id}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "data": {
    "name": "Updated Program Name",
    "certificateStatus": "Ready"
  }
}
```

### Delete Program
```http
DELETE /programs/{id}
Authorization: Bearer {jwt_token}
```

## Students API

### List Students by Program
```http
GET /students?filters[program][id][$eq]={program_id}&populate=*
Authorization: Bearer {jwt_token}
```

### Register Student (Public)
```http
POST /students
Content-Type: application/json

{
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "college": "University of Technology",
    "course": "Computer Science",
    "program": 1,
    "submittedOn": "2024-01-10T12:00:00.000Z",
    "certificateStatus": "Not Generated"
  }
}
```

### Get Student by Email and Program (Public)
```http
GET /students?filters[email][$eq]=john@example.com&filters[program][slug][$eq]=web-development-bootcamp&populate=*
```

### Delete Student
```http
DELETE /students/{id}
Authorization: Bearer {jwt_token}
```

## Certificates API

### List Certificates by Program
```http
GET /certificates?filters[program][id][$eq]={program_id}&populate=*
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "uniqueId": "RC-ABC123-XYZ789",
        "qrCode": "data:image/png;base64,...",
        "isActive": true,
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z",
        "student": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "John Doe",
              "email": "john@example.com"
            }
          }
        },
        "program": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "Web Development Bootcamp"
            }
          }
        }
      }
    }
  ]
}
```

### Create Certificate
```http
POST /certificates
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "data": {
    "uniqueId": "RC-ABC123-XYZ789",
    "isActive": false,
    "student": 1,
    "program": 1
  }
}
```

### Update Certificate Status
```http
PUT /certificates/{id}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "data": {
    "isActive": true
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Missing required field: name",
    "details": {
      "errors": [
        {
          "path": ["name"],
          "message": "This field is required"
        }
      ]
    }
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "status": 401,
    "name": "UnauthorizedError",
    "message": "Missing or invalid credentials"
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "status": 403,
    "name": "ForbiddenError",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Resource not found"
  }
}
```

## Query Parameters

### Filtering
```http
# Filter by field value
GET /programs?filters[name][$eq]=Web Development

# Filter by date range
GET /programs?filters[date][$gte]=2024-01-01&filters[date][$lte]=2024-12-31

# Filter by relation
GET /students?filters[program][id][$eq]=1
```

### Sorting
```http
# Sort ascending
GET /programs?sort=name:asc

# Sort descending
GET /programs?sort=createdAt:desc

# Multiple sort fields
GET /programs?sort=date:desc,name:asc
```

### Pagination
```http
# Page and page size
GET /programs?pagination[page]=1&pagination[pageSize]=10

# Limit and offset
GET /programs?pagination[start]=0&pagination[limit]=25
```

### Population
```http
# Populate all relations
GET /programs?populate=*

# Populate specific relations
GET /programs?populate[students]=*

# Deep population
GET /programs?populate[students][populate][certificates]=*
```

## Rate Limiting

- **Public endpoints**: 100 requests per minute per IP
- **Authenticated endpoints**: 1000 requests per minute per user
- **File uploads**: 10 requests per minute per user

## File Upload

### Upload Certificate PDF
```http
POST /upload
Authorization: Bearer {jwt_token}
Content-Type: multipart/form-data

files: [certificate.pdf]
ref: certificate
refId: 1
field: pdfFile
```

## Webhooks

### Program Created
```json
{
  "event": "entry.create",
  "model": "program",
  "entry": {
    "id": 1,
    "name": "New Program",
    "slug": "new-program"
  }
}
```

### Student Registered
```json
{
  "event": "entry.create",
  "model": "student",
  "entry": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "program": 1
  }
}
```

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Authorization': 'Bearer your-jwt-token'
  }
});

// Get all programs
const programs = await api.get('/programs?populate=*');

// Create student
const student = await api.post('/students', {
  data: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    program: 1
  }
});
```

### Python
```python
import requests

headers = {
    'Authorization': 'Bearer your-jwt-token',
    'Content-Type': 'application/json'
}

# Get programs
response = requests.get(
    'http://localhost:1337/api/programs?populate=*',
    headers=headers
)
programs = response.json()

# Create student
student_data = {
    'data': {
        'name': 'Jane Doe',
        'email': 'jane@example.com',
        'program': 1
    }
}
response = requests.post(
    'http://localhost:1337/api/students',
    json=student_data,
    headers=headers
)
```

### cURL
```bash
# Login
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin@example.com","password":"password"}'

# Get programs
curl -X GET http://localhost:1337/api/programs?populate=* \
  -H "Authorization: Bearer your-jwt-token"

# Create student
curl -X POST http://localhost:1337/api/students \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"data":{"name":"John Doe","email":"john@example.com","program":1}}'
```

## Testing

### Postman Collection

Import the following collection for easy API testing:

```json
{
  "info": {
    "name": "Radial Code API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:1337/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

This API documentation provides comprehensive information for integrating with the Radial Code Dashboard backend.