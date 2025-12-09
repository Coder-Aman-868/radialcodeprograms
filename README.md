# Radial Code Dashboard

A complete Next.js + TailwindCSS + Strapi project for managing programs and student certificates.

## Features

- **Admin Portal**: Login, create/manage programs, view registrations, generate certificates
- **Public Portal**: Student registration and certificate download
- **Certificate Generation**: Auto-generated PDFs with QR codes
- **Responsive Design**: Clean UI with purple (#5928e5) and white (#ffffff) color scheme

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: Strapi 4.15.5
- **Database**: SQLite (dev) / PostgreSQL (production)
- **PDF Generation**: jsPDF with QR codes
- **Authentication**: JWT tokens

## Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 2. Setup Backend (Strapi)

```bash
cd backend

# Copy environment file
cp .env.example .env

# Start Strapi in development mode
npm run develop
```

When Strapi starts for the first time:
1. Create an admin user at http://localhost:1337/admin
2. Configure API permissions (see Configuration section below)

### 3. Setup Frontend (Next.js)

```bash
cd frontend

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

### 4. Run Both Services

From the root directory:

```bash
npm run dev
```

## Configuration

### Strapi API Permissions

After creating your admin user, configure the following permissions:

#### Public Role Permissions:
- **Program**: find, findOne
- **Student**: create, find
- **Certificate**: find

#### Authenticated Role Permissions:
- **Program**: create, update, delete, find, findOne
- **Student**: create, update, delete, find, findOne
- **Certificate**: create, update, delete, find, findOne

### Environment Variables

#### Backend (.env)
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-app-keys-here"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

#### Frontend (next.config.js)
```javascript
env: {
  STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
}
```

## Usage

### Admin Workflow

1. **Login**: Access admin portal at http://localhost:3000
2. **Create Program**: Add program details (name, date, venue, description)
3. **Share Link**: Share public URL `/program/{slug}` with students
4. **Monitor Registrations**: View student registrations in real-time
5. **Generate Certificates**: Auto-generate PDF certificates for students
6. **Activate Certificates**: Enable certificate downloads for students

### Student Workflow

1. **Register**: Visit program link and fill registration form
2. **Attend Program**: Participate in the program/seminar
3. **Download Certificate**: Return to program link and download certificate using email/phone

### Public Portal URLs

Students access programs via: `http://localhost:3000/program/{program-slug}`

## Project Structure

```
radial-code-dashboard/
├── frontend/                 # Next.js application
│   ├── components/          # Reusable UI components
│   ├── lib/                # API utilities and helpers
│   ├── pages/              # Next.js pages
│   └── styles/             # Global styles
├── backend/                 # Strapi application
│   ├── config/             # Strapi configuration
│   └── src/                # API definitions
└── package.json            # Root package file
```

## API Endpoints

### Programs
- `GET /api/programs` - List all programs
- `POST /api/programs` - Create new program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program

### Students
- `GET /api/students` - List students (with filters)
- `POST /api/students` - Register new student
- `DELETE /api/students/:id` - Remove student

### Certificates
- `GET /api/certificates` - List certificates
- `POST /api/certificates` - Create certificate
- `PUT /api/certificates/:id` - Update certificate status

## Certificate Features

- **Auto-generation**: PDF certificates with program details
- **QR Codes**: Unique verification codes
- **Unique IDs**: Format: RC-{timestamp}-{random}
- **Download Control**: Admin can activate/deactivate downloads
- **Verification**: Email + phone number validation

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy to your preferred platform
3. Set environment variable: `STRAPI_URL=your-strapi-url`

### Backend (Railway/Heroku)
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy Strapi application
4. Run database migrations

## Customization

### Colors
Update `frontend/tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: '#5928e5',  // Purple
  white: '#ffffff',    // White
}
```

### Certificate Template
Modify `frontend/lib/certificate.ts` to customize the PDF layout and design.

### Email Notifications
Extend the student registration flow to send confirmation emails using Strapi's email plugin.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure frontend URL is added to Strapi CORS configuration
2. **API Permissions**: Verify role permissions are correctly set in Strapi admin
3. **Database Issues**: Check database connection and file permissions for SQLite

### Support

For issues and questions:
1. Check the console for error messages
2. Verify API endpoints are accessible
3. Ensure all dependencies are installed
4. Check Strapi admin panel for data consistency

## License

MIT License - feel free to use this project for your own programs and events.