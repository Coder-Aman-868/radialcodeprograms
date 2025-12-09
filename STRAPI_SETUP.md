# Strapi Backend Setup for Public Program Access

## Issue
The program route `/program/[slug]` was showing "Program Not Found" because Strapi requires authentication for API endpoints by default.

## Solution Options

### Option 1: Create API Token (Recommended)
1. Open Strapi Admin Panel: http://localhost:1337/admin
2. Login with: admin@example.com / Admin123!
3. Go to Settings > API Tokens
4. Click "Create new API Token"
5. Set:
   - Name: "Public Programs Access"
   - Description: "Token for public access to programs"
   - Token type: "Read-only"
   - Token duration: "Unlimited"
6. Copy the generated token
7. Add it to `frontend/.env.local`:
   ```
   NEXT_PUBLIC_STRAPI_API_TOKEN=your_token_here
   ```

### Option 2: Configure Public Permissions
1. Open Strapi Admin Panel: http://localhost:1337/admin
2. Go to Settings > Users & Permissions Plugin > Roles
3. Click on "Public" role
4. Under "Program" permissions, check:
   - find
   - findOne
5. Save

## Current Status
- ✅ Backend is running on http://localhost:1337
- ✅ Admin user created: admin@example.com / Admin123!
- ✅ Frontend API updated to handle authentication
- ✅ Mock data fallback implemented
- ⚠️ Need to configure public access (choose Option 1 or 2 above)

## Testing
After configuration, test these URLs:
- http://localhost:3000/program/aman (should work if "aman" program exists in backend)
- http://localhost:3000/program/advanced-react-workshop (mock data fallback)
- http://localhost:3000/program/non-existent (should show 404)