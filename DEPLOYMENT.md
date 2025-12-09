# Deployment Guide

## 🚨 **CURRENT ISSUE: Vercel Deployment**

When deployed to Vercel, the frontend cannot access the local Strapi backend (`http://localhost:1337`). 

### ✅ **IMMEDIATE FIX: Mock Data (Current Solution)**

The application now includes mock data that works when the backend is unavailable:

**Available Programs on Vercel:**
- `/program/advanced-react-workshop`
- `/program/fullstack-javascript-bootcamp` 
- `/program/python-data-science-workshop`
- `/program/aman` ← **Your program is now available!**

**Features Working:**
- ✅ Program detail pages
- ✅ Registration forms (stored in browser memory)
- ✅ Certificate download interface
- ✅ Admin login (but no data persistence)

### 🚀 **PRODUCTION SOLUTION: Deploy Backend**

For full functionality, deploy your Strapi backend to a cloud service and update the `STRAPI_URL` environment variable in Vercel.

---

This guide covers deploying the Radial Code Dashboard to production environments.

## Frontend Deployment (Vercel)

### 1. Prepare for Deployment

```bash
cd frontend
npm run build
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add STRAPI_URL production
# Enter your production Strapi URL: https://your-strapi-app.herokuapp.com
```

### 3. Configure Domain (Optional)

```bash
vercel domains add yourdomain.com
vercel alias your-deployment-url.vercel.app yourdomain.com
```

## Backend Deployment (Railway)

### 1. Prepare Strapi for Production

Update `backend/config/database.js` for PostgreSQL:

```javascript
// Add this to the connections object
postgres: {
  connection: {
    connectionString: env('DATABASE_URL'),
    ssl: env.bool('DATABASE_SSL', false),
  },
  pool: { 
    min: env.int('DATABASE_POOL_MIN', 2), 
    max: env.int('DATABASE_POOL_MAX', 10) 
  },
},
```

### 2. Deploy to Railway

1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add PostgreSQL database service
4. Configure environment variables:

```env
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=${DATABASE_URL} # Auto-provided by Railway
APP_KEYS=your-production-app-keys
API_TOKEN_SALT=your-production-api-token-salt
ADMIN_JWT_SECRET=your-production-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-production-transfer-token-salt
JWT_SECRET=your-production-jwt-secret
```

### 3. Update CORS Configuration

Update `backend/config/middlewares.js`:

```javascript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    headers: '*',
    origin: [
      'http://localhost:3000',
      'https://your-frontend-domain.vercel.app',
      'https://yourdomain.com'
    ]
  }
},
```

## Alternative Deployment Options

### Frontend Alternatives

#### Netlify
```bash
# Build
npm run build

# Deploy
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

#### AWS Amplify
1. Connect GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables

### Backend Alternatives

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Create app
heroku create your-strapi-app

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set APP_KEYS="key1,key2"
# ... other environment variables

# Deploy
git push heroku main
```

#### DigitalOcean App Platform
1. Create new app from GitHub
2. Configure build settings:
   - Build command: `npm run build`
   - Run command: `npm start`
3. Add managed PostgreSQL database
4. Configure environment variables

## Database Migration

### From SQLite to PostgreSQL

1. Export data from development:
```bash
cd backend
npm run strapi export -- --file backup.tar.gz
```

2. Import to production:
```bash
npm run strapi import -- --file backup.tar.gz
```

### Manual Data Migration

If automatic migration fails, manually recreate:

1. Admin user in production Strapi
2. API permissions configuration
3. Sample program data

## SSL and Security

### Enable HTTPS

Most platforms (Vercel, Railway, Heroku) provide HTTPS automatically.

### Security Headers

Update `backend/config/middlewares.js`:

```javascript
{
  name: 'strapi::security',
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'connect-src': ["'self'", 'https:'],
        'img-src': ["'self'", 'data:', 'blob:', 'https:'],
        'media-src': ["'self'", 'data:', 'blob:', 'https:'],
        upgradeInsecureRequests: null,
      },
    },
  },
},
```

## Performance Optimization

### Frontend Optimization

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Automatic with Next.js
3. **Caching**: Configure in `next.config.js`

```javascript
module.exports = {
  // ... existing config
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

### Backend Optimization

1. **Database Indexing**: Add indexes to frequently queried fields
2. **Caching**: Enable Redis caching in Strapi
3. **CDN**: Use CloudFront or similar for static assets

## Monitoring and Logging

### Error Tracking

Add Sentry to both frontend and backend:

```bash
npm install @sentry/nextjs @sentry/node
```

### Analytics

Add Google Analytics or similar to track usage.

### Health Checks

Create health check endpoints:

```javascript
// backend/src/api/health/routes/health.js
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/health',
      handler: 'health.check',
    },
  ],
};
```

## Backup Strategy

### Database Backups

1. **Automated**: Use platform-provided backup solutions
2. **Manual**: Regular exports using Strapi CLI
3. **File Storage**: Backup uploaded certificates

### Code Backups

1. **Git**: Ensure all code is in version control
2. **Branches**: Maintain stable production branch
3. **Tags**: Tag releases for easy rollback

## Troubleshooting Production Issues

### Common Problems

1. **CORS Errors**: Check middleware configuration
2. **Database Connection**: Verify connection strings
3. **Environment Variables**: Ensure all secrets are set
4. **Build Failures**: Check Node.js version compatibility

### Debugging Tools

1. **Logs**: Check platform logs (Vercel, Railway, etc.)
2. **Database**: Use platform database tools
3. **API Testing**: Use Postman or similar tools

### Rollback Strategy

1. **Frontend**: Revert to previous Vercel deployment
2. **Backend**: Use platform rollback features
3. **Database**: Restore from backup if needed

## Maintenance

### Regular Updates

1. **Dependencies**: Update packages monthly
2. **Security**: Monitor for security vulnerabilities
3. **Performance**: Regular performance audits

### Scaling Considerations

1. **Database**: Upgrade to larger database plans as needed
2. **CDN**: Implement CDN for global performance
3. **Load Balancing**: Consider multiple backend instances for high traffic

This deployment guide should help you successfully deploy the Radial Code Dashboard to production environments.