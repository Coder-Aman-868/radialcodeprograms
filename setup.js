#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Radial Code Dashboard...\n');

// Function to run commands
const runCommand = (command, cwd = process.cwd()) => {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Failed to run: ${command}`);
    return false;
  }
};

// Function to generate random secrets
const generateSecret = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Setup backend environment
const setupBackendEnv = () => {
  const envPath = path.join(__dirname, 'backend', '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating backend .env file...');
    
    const envContent = `HOST=0.0.0.0
PORT=1337

# Secrets (auto-generated)
APP_KEYS="${generateSecret()},${generateSecret()}"
API_TOKEN_SALT=${generateSecret()}
ADMIN_JWT_SECRET=${generateSecret()}
TRANSFER_TOKEN_SALT=${generateSecret()}
JWT_SECRET=${generateSecret()}

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Backend .env file created with random secrets');
  } else {
    console.log('⚠️  Backend .env file already exists, skipping...');
  }
};

// Main setup function
const setup = async () => {
  try {
    // Install root dependencies
    console.log('📦 Installing root dependencies...');
    if (!runCommand('npm install')) {
      throw new Error('Failed to install root dependencies');
    }

    // Setup backend
    console.log('\n🔧 Setting up backend (Strapi)...');
    if (!runCommand('npm install', path.join(__dirname, 'backend'))) {
      throw new Error('Failed to install backend dependencies');
    }
    
    setupBackendEnv();

    // Setup frontend
    console.log('\n🎨 Setting up frontend (Next.js)...');
    if (!runCommand('npm install', path.join(__dirname, 'frontend'))) {
      throw new Error('Failed to install frontend dependencies');
    }

    console.log('\n✅ Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the backend: cd backend && npm run develop');
    console.log('2. Create admin user at http://localhost:1337/admin');
    console.log('3. Configure API permissions (see README.md)');
    console.log('4. Start the frontend: cd frontend && npm run dev');
    console.log('5. Access admin portal at http://localhost:3000');
    console.log('\nOr run both services: npm run dev');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
};

setup();