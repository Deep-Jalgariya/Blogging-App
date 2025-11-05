# 📝 Modern Blog Application

A full-stack blogging platform built with React.js and Node.js, featuring user authentication, rich content creation, and social interactions with a beautiful dark/light theme system.


## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** - Secure account creation and authentication
- **Password Reset** - Email-based password recovery system
- **Profile Management** - Customizable user profiles with photo uploads
- **JWT Authentication** - Secure token-based authentication system

### 📖 Content Management
- **Rich Text Editor** - CKEditor integration for professional blog post creation
- **Image Uploads** - Support for story banners and profile pictures
- **Story CRUD Operations** - Create, read, update, and delete blog posts
- **Draft System** - Save and edit drafts before publishing

### 🌟 Social Features
- **Comments System** - Interactive commenting with like functionality
- **Reading Lists** - Save stories to read later
- **User Profiles** - Public profiles showcasing user's stories and activity
- **Story Interactions** - Like and bookmark favorite content

### 🎨 User Experience
- **Dark/Light Theme** - Complete theming system with smooth transitions
- **Responsive Design** - Mobile-first, works on all devices
- **Skeleton Loading** - Smooth loading states for better UX
- **Search Functionality** - Discover content easily
- **Pagination** - Efficient content browsing

## 🚀 Tech Stack

### Frontend
- **React.js** (v17) - Modern UI library
- **React Router** (v6) - Client-side routing
- **CKEditor** - Rich text editing
- **React Icons** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **CSS Variables** - Modern styling with theming support

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (inferred)
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling (inferred)

## 📁 Project Structure

```
BLOG/
├── Frontend/                 # React.js frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AuthScreens/     # Authentication pages
│   │   │   ├── GeneralScreens/  # Home, Header, Footer
│   │   │   ├── StoryScreens/    # Blog post management
│   │   │   ├── ProfileScreens/  # User profile pages
│   │   │   ├── CommentScreens/  # Comment system
│   │   │   └── Skeletons/       # Loading components
│   │   ├── Context/         # React Context providers
│   │   ├── Css/            # Component stylesheets
│   │   └── utils/          # Utility functions
│   └── package.json        # Frontend dependencies
└── Backend/                 # Node.js backend application
    ├── Middlewares/         # Express middlewares
    └── [Other backend files]
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Frontend Setup
```bash
# Navigate to frontend directory
cd BLOG/Frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup
```bash
# Navigate to backend directory
cd BLOG/Backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the server
npm start
```

The backend will be available at `http://localhost:5000`

### Environment Variables
Create a `.env` file in the Backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/blog-app
# or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Server Configuration
PORT=5000
NODE_ENV=development

# File Upload (if using cloud storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🎯 Usage

### For Users
1. **Register** - Create a new account
2. **Login** - Access your dashboard
3. **Create Stories** - Write and publish blog posts
4. **Interact** - Comment, like, and bookmark content
5. **Customize** - Switch between light and dark themes

### For Developers
1. **Component Development** - All components are modular and reusable
2. **Theming** - CSS variables make customization easy
3. **API Integration** - Axios interceptors handle authentication
4. **State Management** - React Context for global state

## 🌙 Theme System

The application features a comprehensive dark/light theme system:

- **CSS Variables** - Consistent color scheme across all components
- **Theme Toggle** - Easy switching with persistence
- **Smooth Transitions** - Animated theme changes
- **Cross-tab Sync** - Theme preference syncs across browser tabs
- **Accessibility** - Proper contrast ratios in both themes

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Great experience on tablets
- **Desktop Enhanced** - Full features on desktop
- **Touch Friendly** - Optimized for touch interactions

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

#### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (development)
npm test           # Run tests
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




