# Development Setup Guide

## Prerequisites
- Node.js 18+ (recommended: v18.17.0 or higher)
- npm or yarn package manager
- Git (for version control)

## Installation Steps

### Step 1: Clone or Open Project
```bash
cd c:\Users\warda\OneDrive\Pictures\EVO
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages defined in `package.json`:
- Next.js 14
- React 18
- Tailwind CSS (optional, for styling)

### Step 3: Set Up Environment Variables
Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your configuration:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_IMAGE_DOMAIN=scontent.fcai30-1.fna.fbcdn.net
```

### Step 4: Copy Image Assets
Copy the image folder from the old project:
```bash
# Windows PowerShell
Copy-Item -Path "GradProject-main\Pics\*" -Destination "public\Pics\" -Force

# Or manually copy these files:
# - Logo.png
# - HITU.png
# - EVO.png
# - BGPIC.png
# - face.png
# - insta.png
```

### Step 5: Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available NPM Scripts

```bash
# Development server (hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Project Structure

```
.
├── app/
│   ├── layout.js              # Root layout (imports all CSS)
│   ├── page.js                # Home page
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   └── NewsCarousel.js    # News carousel
│   └── (pages)/               # Route groups
│       ├── login/
│       ├── student-page/
│       ├── news/
│       ├── faq/
│       ├── library/
│       ├── documents/
│       ├── gps/
│       ├── control/
│       └── doctor/
├── public/
│   └── Pics/                  # Image assets (IMPORTANT: Add your images here)
├── styles/
│   ├── globals.css            # Global styles
│   ├── theme.css              # Theme & component styles
│   ├── animations.css         # Keyframe animations
│   ├── carousel.css           # Carousel styles
│   ├── forms.css              # Form styles
│   └── login.css              # Login page styles
├── lib/
│   └── utils.js               # Utility functions
├── package.json               # Dependencies
├── next.config.js             # Next.js configuration
├── jsconfig.json              # JavaScript configuration
└── .gitignore                 # Git ignore rules
```

## Key Features Implemented

### ✅ Completed
- [x] Next.js 14 setup with App Router
- [x] React components (Header, NewsCarousel)
- [x] All 10 pages converted to React components
- [x] CSS styling system with themes
- [x] Form handling with React hooks
- [x] Carousel functionality with state management
- [x] Cursor glow effect
- [x] Responsive design
- [x] RTL support (Arabic)

### 🔄 In Progress
- [ ] Image assets migration
- [ ] Testing and QA

### 📋 Future Enhancements
- [ ] API integration
- [ ] Authentication system
- [ ] Database integration
- [ ] Admin dashboard
- [ ] SEO optimization
- [ ] Performance optimization

## Troubleshooting

### Issue: Module not found
**Solution:** Run `npm install` again to ensure all dependencies are installed.

### Issue: Images not showing
**Solution:** 
1. Verify images exist in `public/Pics/` folder
2. Check image paths match the `src` attributes in components
3. Clear browser cache

### Issue: Styles not applying
**Solution:**
1. Restart development server
2. Clear browser cache
3. Check CSS imports in `app/layout.js`

### Issue: Port 3000 already in use
**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

## Testing Your Changes

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] Header navigation works
- [ ] News carousel functions properly
- [ ] Login page displays correctly
- [ ] All page links navigate correctly
- [ ] Styles are applied correctly
- [ ] Responsive design works on mobile

### Running in Production Mode
```bash
npm run build
npm run start
```

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel
4. Deploy automatically on push

### Deploy to Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean
- Self-hosting with PM2

## Getting Help

### Documentation
- [Next.js docs](https://nextjs.org/docs)
- [React docs](https://react.dev)

### Common Issues & Solutions
See `MIGRATION_GUIDE.md` for more detailed information.

## Final Notes
- The old `GradProject-main/` folder can be kept as a backup
- All original CSS and JS has been converted to React components
- CSS files from the old project are preserved in `styles/` directory
- Images need to be copied manually to `public/Pics/`
