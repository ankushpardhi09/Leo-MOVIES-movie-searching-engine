const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const movieRoutes = require('./routes/movies');
const filterRoutes = require('./routes/filters');

const app = express();

// Get frontend URL from env or use default
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const BACKEND_PORT = process.env.PORT || 5000;

console.log(`🔐 CORS enabled for: ${FRONTEND_URL}`);
console.log(`📍 Backend listening on port: ${BACKEND_PORT}`);

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      FRONTEND_URL,
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/movies', movieRoutes);
app.use('/api/filters', filterRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'Server is running ✅',
    timestamp: new Date().toISOString(),
    frontend_url: FRONTEND_URL,
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Movie Search Engine API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      search: '/api/movies/search?q=query',
      movie_details: '/api/movies/:id',
      genres: '/api/filters/genres',
      years: '/api/filters/years',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handling middleware
app.use(errorHandler);

const PORT = BACKEND_PORT;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ CORS configured for frontend at ${FRONTEND_URL}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
});