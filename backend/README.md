# Picchio QR Menu Backend API

Isolated Express.js and PostgreSQL backend microservice for Picchio QR Menu.

## Features
- Isolated PostgreSQL database (`picchio-postgres`)
- Secure Argon2id password authentication
- Server-side PostgreSQL session store
- Automatic database migrations and initial JSON seeding
- Caddy reverse proxy with SSL certificate management
- Full REST API for public menu access and admin menu updates

## Environment Variables
Configured in `/opt/picchio/.env`:
- `NODE_ENV`: `production`
- `PORT`: `3000`
- `DATABASE_URL`: PostgreSQL connection string
- `POSTGRES_DB`: `picchio_db`
- `POSTGRES_USER`: `picchio_user`
- `POSTGRES_PASSWORD`: Secret database password
- `ADMIN_PASSWORD_HASH`: Argon2id hashed admin password
- `SESSION_SECRET`: Secret session encryption key
- `ALLOWED_ORIGINS`: Allowed CORS origins
