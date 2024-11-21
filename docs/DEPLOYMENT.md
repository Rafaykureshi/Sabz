# Deployment Guide

## Prerequisites
- Node.js 18+
- Firebase account
- Netlify account

## Environment Setup

1. Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
...
```

2. Configure Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init
```

## Build Process

1. Build application:
```bash
npm run build
```

2. Test production build:
```bash
npm run preview
```

## Deployment Steps

### Netlify Deployment
1. Connect repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables
4. Deploy

### Manual Deployment
1. Build project
2. Upload dist folder
3. Configure server

## Monitoring
- Set up error tracking
- Configure performance monitoring
- Enable usage analytics

[Additional deployment information...]