# IbaBattle
Neighbourly - Hyper-Local Marketplace
A community marketplace platform for exchanging local services, skills, and tools.
🎯 Overview
Neighbourly connects neighbors to share services like tutoring, equipment rental, and repair work within their local community.
🏗️ Tech Stack

Frontend: Next.js 14, Tailwind CSS
Backend: Next.js API Routes
Database: PostgreSQL (Supabase)
ORM: Prisma
Auth: Supabase Auth

📊 Database Schema
prismamodel Profile {
  id        String     @id @db.Uuid
  email     String     @unique
  fullName  String?
  role      Role       @default(USER)  // USER or MODERATOR
  createdAt DateTime   @default(now())
  bookings  Bookings[]
  services  Services[]
}

model Services {
  id          String   @id @default(uuid())
  title       String
  description String
  category    String
  neighbour   String
  price       Int
  authorId    String
  bookings    Bookings[]
  author      Profile  @relation(fields: [authorId], references: [id])
}

model Bookings {
  id          String   @id @default(uuid())
  serviceId   String
  bookingDate DateTime
  timeSlot    DateTime
  authorId    String
  author      Profile  @relation(fields: [authorId], references: [id])
  service     Services @relation(fields: [serviceId], references: [id])
}
```

## ✅ Implemented Features

### Stage 1: Neighborhood Pilot ✓
- User authentication
- Create/view services
- Book services
- Validation: Users cannot book their own services
- Basic CRUD operations

### Stage 2: Urban Expansion (Partial)
- ✅ PostgreSQL database
- ✅ REST API endpoints
- ✅ Advanced filtering (category, neighborhood, price)
- ✅ Authentication & Authorization
- ❌ RBAC (not implemented)
- ❌ Request throttling (not implemented)
- ❌ Geospatial queries (not implemented)

### Stage 3: Not Implemented
- Real-time messaging
- Message queues
- Redis caching
- Audit logs

## 🔌 API Endpoints
```
POST   /api/services          - Create service
GET    /api/services          - List all services (with filtering)

POST   /api/bookings          - Create booking
GET    /api/bookings          - List bookings
PUT    /api/bookings          - Update booking
DELETE /api/bookings          - Delete booking
```

**Filtering Example:**
```
GET /api/services?category=Tutoring&neighbour=Downtown&price=50
🚀 Setup
bash# Install dependencies
npm install

# Setup environment variables
# Create .env.local with:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
# DATABASE_URL=your_postgres_url

# Run migrations
npx prisma migrate dev
npx prisma generate

# Start dev server
npm run dev
🎨 Core Features

Service Listing - Post services with title, description, category, location, price
Service Discovery - Browse and filter services
Booking System - Book time slots for services
User Authentication - Secure login/signup

🔐 Validation Rules

Users cannot book their own services
All API routes require authentication
Input validation on forms

🛠️ Design Decisions

PostgreSQL: Chosen for relational data and scalability
Prisma ORM: Type-safe database queries
UUID Keys: Better for distributed systems
Supabase: Quick auth setup and managed PostgreSQL

📝 Assumptions

Prices in cents (USD)
Timestamps in UTC
Single time slot per booking
Neighborhood as string (not coordinates)

🚧 Known Limitations

No RBAC implementation
No rate limiting
No geospatial queries
No real-time features
No caching layer
