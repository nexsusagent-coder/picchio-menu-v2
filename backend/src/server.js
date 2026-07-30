const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');
const config = require('./config');
const db = require('./db');
const originCheck = require('./middleware/origin-check');
const errorHandler = require('./middleware/error-handler');

const healthRoutes = require('./routes/health');
const menuRoutes = require('./routes/menu');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const menuService = require('./services/menu-service');

const app = express();

app.set('trust proxy', 1);

// Security Headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// CORS & Origin check
app.use(originCheck);

// Session Store
app.use(session({
  store: new pgSession({
    pool: db.pool,
    tableName: 'session',
    createTableIfMissing: true
  }),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  name: 'picchio.sid',
  cookie: {
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: config.env === 'production' ? 'none' : 'lax'
  }
}));

// Route mounting
app.use('/api', healthRoutes);
app.use('/api', menuRoutes);
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

// Error Handler
app.use(errorHandler);

// Server startup
async function startServer() {
  try {
    console.log('[SERVER] Initializing database migrations...');
    await db.runMigrations();
    
    console.log('[SERVER] Checking menu seed status...');
    await menuService.seedMenuIfEmpty();

    app.listen(config.port, '0.0.0.0', () => {
      console.log(`[SERVER] Picchio API Server running on port ${config.port} (${config.env})`);
    });
  } catch (err) {
    console.error('[SERVER FATAL ERROR]', err);
    process.exit(1);
  }
}

startServer();
