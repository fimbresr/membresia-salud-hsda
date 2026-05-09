# ARQUITECTURA Y DISEÑO - PWA MEMBRESÍA SALUD
## Hospital San Diego de Alcalá | Hermosillo, Sonora

**Documento técnico:** Especificación de arquitectura, procesos y procedimientos  
**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Responsable:** René Fimbres V. | Jefe Mantenimiento e Ingeniería Hospitalaria  
**Estado:** Diseño en progreso

---

## ÍNDICE

1. [Visión y Objetivos](#1-visión-y-objetivos)
2. [Arquitectura General](#2-arquitectura-general)
3. [Stack Tecnológico](#3-stack-tecnológico)
4. [Modelo de Datos](#4-modelo-de-datos)
5. [API REST Specification](#5-api-rest-specification)
6. [Arquitectura Frontend (PWA)](#6-arquitectura-frontend-pwa)
7. [Procedimientos de Desarrollo](#7-procedimientos-de-desarrollo)
8. [Testing Strategy](#8-testing-strategy)
9. [Seguridad y Compliance](#9-seguridad-y-compliance)
10. [Deployment y DevOps](#10-deployment-y-devops)
11. [Monitoreo y Alertas](#11-monitoreo-y-alertas)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. VISIÓN Y OBJETIVOS

### 1.1 Visión General

Desarrollar una **Progressive Web Application (PWA)** para gestión de membresía de salud del Hospital San Diego de Alcalá que permita:

- ✅ Agendamiento de citas médicas en tiempo real
- ✅ Consulta de expediente clínico seguro
- ✅ Validación de cobertura antes de servicios
- ✅ Generación de QR único anti-duplicación
- ✅ Procesamiento de pagos
- ✅ Funcionamiento offline-first
- ✅ Acceso desde tablet/web sin instalación de app nativa

### 1.2 Objetivos Específicos

| Objetivo | Métrica | Prioridad |
|----------|---------|-----------|
| MVP en 6 sprints (12 semanas) | Fecha: Julio 2026 | CRÍTICA |
| Latencia API <200ms (p95) | 95% de requests | ALTA |
| Disponibilidad 99.5% | Uptime mensual | ALTA |
| Adopción: 100+ usuarios piloto | Mes 1 | MEDIA |
| Zero data breaches | Auditoría HIPAA | CRÍTICA |
| Offline: 90% funcionalidad | Sin conexión | MEDIA |

### 1.3 Alcance MVP

**Incluido Sprint 1-6:**
- Autenticación + biometría
- Dashboard + estado membresía
- Agendamiento citas
- Expediente clínico cifrado
- Sistema de pagos
- QR anti-duplicación
- Notificaciones push

**Excluido (Fase 2):**
- Telemedicina/video consultas
- Integración EHR hospitalario
- App nativa iOS/Android
- Prescripciones digitales
- Reportes analytics avanzados

---

## 2. ARQUITECTURA GENERAL

### 2.1 Diagrama de Sistemas

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO FINAL                            │
│  (Tablet iPad 12.9" en Mostrador + Smartphone en casa)      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓ HTTPS/WSS
            ┌────────────────────────────┐
            │  PWA (React + TypeScript)  │
            │  ├─ Service Worker         │
            │  ├─ WebAuthn (Biometría)   │
            │  ├─ QR Scanner (WebCam)    │
            │  └─ Offline-first (Cache)  │
            └────────────────┬───────────┘
                             │
                 ┌───────────┴────────────┐
                 ↓                        ↓
         ┌─────────────────┐    ┌─────────────────┐
         │ REST API        │    │ WebSocket       │
         │ (Express.js)    │    │ (Real-time)     │
         └────────┬────────┘    └────────┬────────┘
                  │                      │
                  └──────────┬───────────┘
                             ↓
            ┌────────────────────────────────┐
            │   Backend Services Layer       │
            │  ┌──────────────────────────┐ │
            │  │ Auth Service             │ │
            │  │ Citas Service            │ │
            │  │ Expediente Service       │ │
            │  │ QR Service               │ │
            │  │ Pagos Service            │ │
            │  │ Notificaciones Service   │ │
            │  └──────────────────────────┘ │
            └────────────────┬───────────────┘
                             │
                ┌────────────┼────────────┐
                ↓            ↓            ↓
        ┌──────────────┐ ┌─────────┐ ┌────────────┐
        │  PostgreSQL  │ │  Redis  │ │  File S3   │
        │  (BD datos)  │ │ (cache) │ │ (docs PDF) │
        └──────────────┘ └─────────┘ └────────────┘
                │
        ┌───────┴────────┬──────────────┬─────────────┐
        ↓                ↓              ↓             ↓
   ┌─────────┐    ┌──────────┐   ┌─────────┐   ┌──────────┐
   │ Stripe  │    │ Twilio   │   │Firebase │   │ Google   │
   │ Pagos   │    │ SMS/Email│   │ Push    │   │ Maps API │
   └─────────┘    └──────────┘   └─────────┘   └──────────┘
```

### 2.2 Flujo de Datos Crítico (Ejemplo: Agendamiento Cita)

```
Cliente (Tablet)                Backend API                BD
     │                              │                      │
     ├─ POST /citas/agendar ────────→
     │  {                           │
     │    fecha, especialidad,      │
     │    doctor_id, user_id        │
     │  }                           │
     │                              ├─ Validar permisos
     │                              ├─ Verificar cobertura
     │                              ├─ Chequear disponibilidad
     │                              ├─ INSERT cita────────→
     │                              │                      ├─ Crear registro
     │                              │                      ├─ Audit log
     │                              │←─ ID cita creada────┤
     │                              │                      │
     │←─ 201 Created ────────────────
     │  {                           │
     │    cita_id,                  │
     │    QR: "uuid+hmac"           │
     │    confirmacion_email        │
     │  }                           │
     │                              ├─ Push notification
     │                              ├─ Email + SMS
     │                              │
     ├─ Actualiza local storage
     ├─ Muestra confirmación
     └─ Guarda en Service Worker
```

---

## 3. STACK TECNOLÓGICO

### 3.1 Frontend Stack

```
Frontend: React 18 + TypeScript
├─ Build Tool: Vite 5.0+
├─ UI Framework: TailwindCSS 3.x + Shadcn/ui
├─ State Management:
│  ├─ @tanstack/react-query (server state)
│  └─ Zustand (client state)
├─ Routing: React Router v6
├─ HTTP Client: Axios + interceptors
├─ Validation: Zod + React Hook Form
├─ PWA:
│  ├─ Workbox CLI (Service Worker)
│  ├─ Web Manifest
│  └─ WebAuthn API
├─ QR Scanner: html5-qrcode + jsQR
├─ Testing:
│  ├─ Vitest (unit tests)
│  ├─ React Testing Library
│  └─ Cypress (e2e)
├─ Deployment: Vercel (auto CI/CD)
└─ Dev Tools:
   ├─ ESLint + Prettier
   ├─ TypeScript strict mode
   └─ Vitest coverage

Package.json (dependencias críticas):
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "@tanstack/react-query": "^5.x",
  "@tanstack/react-query-devtools": "^5.x",
  "zustand": "^4.x",
  "axios": "^1.6.x",
  "zod": "^3.x",
  "react-hook-form": "^7.x",
  "html5-qrcode": "^2.x",
  "workbox-window": "^7.x"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.x",
  "vite": "^5.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x",
  "vitest": "^1.x",
  "@testing-library/react": "^14.x",
  "cypress": "^13.x"
}
```

### 3.2 Backend Stack

```
Backend: Node.js 20 LTS + Express + TypeScript
├─ Framework: Express 4.x
├─ Language: TypeScript 5.x
├─ ORM: Prisma 5.x
├─ Database: PostgreSQL 16
├─ Cache: Redis 7.x
├─ Auth:
│  ├─ JWT (access + refresh tokens)
│  ├─ bcrypt (password hashing)
│  └─ WebAuthn validation
├─ Validation:
│  ├─ express-validator
│  ├─ Zod schemas
│  └─ @fhir/core (FHIR validation)
├─ Security:
│  ├─ helmet (headers)
│  ├─ cors
│  ├─ express-rate-limit
│  └─ compression
├─ Payment:
│  └─ stripe SDK
├─ Notifications:
│  ├─ @sendgrid/mail
│  ├─ twilio
│  └─ firebase-admin (push)
├─ QR Generation:
│  └─ qrcode library
├─ Logging:
│  ├─ winston (logs)
│  └─ morgan (HTTP logging)
├─ Testing:
│  ├─ Jest
│  ├─ Supertest
│  └─ ts-jest
├─ Deployment:
│  ├─ Docker
│  ├─ Docker Compose
│  └─ Railway/Render
└─ Dev Tools:
   ├─ ts-node-dev (hot reload)
   ├─ ESLint + Prettier
   └─ husky (git hooks)

package.json (dependencias críticas):
"dependencies": {
  "express": "^4.x",
  "typescript": "^5.x",
  "@prisma/client": "^5.x",
  "prisma": "^5.x",
  "jsonwebtoken": "^9.x",
  "bcrypt": "^5.x",
  "axios": "^1.6.x",
  "stripe": "^13.x",
  "@sendgrid/mail": "^7.x",
  "twilio": "^3.x",
  "firebase-admin": "^12.x",
  "qrcode": "^1.x",
  "winston": "^3.x",
  "helmet": "^7.x",
  "cors": "^2.x",
  "express-rate-limit": "^7.x",
  "dotenv": "^16.x",
  "zod": "^3.x"
},
"devDependencies": {
  "jest": "^29.x",
  "supertest": "^6.x",
  "@types/node": "^20.x",
  "@types/express": "^4.x",
  "ts-jest": "^29.x",
  "ts-node-dev": "^2.x"
}
```

### 3.3 Database Stack

```
PostgreSQL 16 + pgcrypto (encriptación)
├─ Connection Pool: pg (Node.js driver)
├─ Migration Tool: Prisma Migrate
├─ Backup: pg_dump + S3
├─ Replicación: Streaming replication (standby)
├─ Índices: B-tree + GiST para búsquedas
├─ Particionamiento: Por user_id (seguridad)
└─ Auditoría: Tabla audit_log con triggers
```

### 3.4 Infrastructure Stack

```
Deployment:
├─ Frontend: Vercel
│  ├─ Auto-deploy en push a main
│  ├─ CDN global
│  └─ SSL/TLS automático
├─ Backend: Railway.app o Render.com
│  ├─ Docker container
│  ├─ PostgreSQL managed
│  ├─ Auto-scaling
│  └─ Health checks automáticos
├─ Email: SendGrid API
├─ SMS: Twilio API
├─ Push Notifications: Firebase Cloud Messaging
├─ Maps: Google Maps API
├─ Payments: Stripe Connect
├─ Storage: AWS S3 (documentos PDF)
└─ DNS: Cloudflare

Monitoreo:
├─ Error tracking: Sentry.io
├─ Performance: New Relic o DataDog
├─ Logs: Cloud Logging (Railway/Render)
└─ Uptime: UptimeRobot
```

---

## 4. MODELO DE DATOS

### 4.1 Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ════════════════════════════════════════════════════════════════
// USUARIOS Y AUTENTICACIÓN
// ════════════════════════════════════════════════════════════════

model User {
  id                String            @id @default(uuid())
  email             String            @unique
  password_hash     String
  full_name         String
  phone             String?
  documento_id      String            @unique // Cédula/Passport
  date_of_birth     DateTime
  
  // Biometría
  webauthn_credential String? // Credencial de Face/Fingerprint
  
  // Membresía
  membership        Membership?
  dependents        FamilyDependent[]
  
  // Relaciones clínicas
  citas             Cita[]
  expediente        Expediente?
  pagos             Transaccion[]
  qr_tokens         QRToken[]
  
  // Auditoría
  created_at        DateTime          @default(now())
  updated_at        DateTime          @updatedAt
  last_login        DateTime?
  
  @@index([email])
  @@index([documento_id])
}

model Membership {
  id                String            @id @default(uuid())
  user_id           String            @unique
  user              User              @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  // Plan y estado
  plan              String            // "básico", "plus", "premium"
  state             String            @default("activa") // activa, vencida, suspendida
  start_date        DateTime
  expiry_date       DateTime
  renewal_date      DateTime?
  
  // Cobertura
  servicios_cubiertos ServiceioCobertura[]
  copago_default    Int               @default(100) // MXN
  deducible_anual   Int               @default(5000)
  deducible_usado   Int               @default(0)
  
  created_at        DateTime          @default(now())
  updated_at        DateTime          @updatedAt
  
  @@index([user_id])
  @@index([state])
  @@index([expiry_date])
}

model FamilyDependent {
  id                String            @id @default(uuid())
  member_id         String
  member            User              @relation(fields: [member_id], references: [id], onDelete: Cascade)
  
  full_name         String
  relationship      String            // "cónyuge", "hijo", "padre"
  date_of_birth     DateTime
  documento_id      String
  
  created_at        DateTime          @default(now())
  
  @@unique([member_id, documento_id])
  @@index([member_id])
}

// ════════════════════════════════════════════════════════════════
// CITAS MÉDICAS
// ════════════════════════════════════════════════════════════════

model Cita {
  id                String            @id @default(uuid())
  user_id           String
  user              User              @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  doctor_id         String
  doctor            Doctor            @relation(fields: [doctor_id], references: [id])
  
  especialidad      String
  timestamp         DateTime
  duracion_min      Int               @default(30)
  
  // Estado
  state             String            @default("confirmada") // confirmada, completada, cancelada
  notas             String?
  
  // QR para la cita
  qr_token          String?           @unique
  
  created_at        DateTime          @default(now())
  updated_at        DateTime          @updatedAt
  cancelled_at      DateTime?
  
  @@index([user_id])
  @@index([doctor_id])
  @@index([timestamp])
  @@index([state])
}

model Doctor {
  id                String            @id @default(uuid())
  full_name         String
  speciality        String
  license_number    String            @unique
  phone             String
  
  citas             Cita[]
  
  created_at        DateTime          @default(now())
  updated_at        DateTime          @updatedAt
  
  @@index([speciality])
}

// ════════════════════════════════════════════════════════════════
// EXPEDIENTE CLÍNICO (ENCRIPTADO)
// ════════════════════════════════════════════════════════════════

model Expediente {
  id                String            @id @default(uuid())
  user_id           String            @unique
  user              User              @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  // Estos campos están encriptados en BD (pgcrypto)
  alergias          String? // ENCRYPTED
  medicamentos      String? // ENCRYPTED
  condiciones       String? // ENCRYPTED
  historico_quirurgico String? // ENCRYPTED
  
  // Documentos/archivos en S3
  documentos_urls   String[] // URLs presignadas de S3
  
  created_at        DateTime          @default(now())
  updated_at        DateTime          @updatedAt
  acceso_log        AccesoExpediente[]
  
  @@index([user_id])
}

model AccesoExpediente {
  id                String            @id @default(uuid())
  expediente_id     String
  expediente        Expediente        @relation(fields: [expediente_id], references: [id])
  
  accessed_by       String            // user_id o doctor_id
  accessed_at       DateTime          @default(now())
  ip_address        String?
  user_agent        String?
  
  @@index([expediente_id])
  @@index([accessed_at])
}

// ════════════════════════════════════════════════════════════════
// SERVICIOS Y COBERTURA
// ════════════════════════════════════════════════════════════════

model Servicio {
  id                String            @id @default(uuid())
  nombre            String            @unique
  categoria         String            // "consulta", "cirugía", "farmacia"
  codigo_fhir       String?
  precio_base       Int               // MXN
  
  cobertura         ServiceioCobertura[]
  
  created_at        DateTime          @default(now())
}

model ServiceioCobertura {
  id                String            @id @default(uuid())
  membership_id     String
  membership        Membership        @relation(fields: [membership_id], references: [id], onDelete: Cascade)
  
  servicio_id       String
  servicio          Servicio          @relation(fields: [servicio_id], references: [id])
  
  // Política
  cubierto          Boolean           @default(true)
  porcentaje        Int               @default(80) // % cubierto por plan
  copago            Int?              // MXN fijo
  limite_anual      Int?              // MXN máximo anual
  
  @@unique([membership_id, servicio_id])
  @@index([membership_id])
  @@index([servicio_id])
}

// ════════════════════════════════════════════════════════════════
// PAGOS Y TRANSACCIONES
// ════════════════════════════════════════════════════════════════

model Transaccion {
  id                String            @id @default(uuid())
  user_id           String
  user              User              @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  // Detalles
  type              String            // "pago", "copago", "reembolso"
  amount            Int               // MXN * 100 (centavos)
  description       String
  
  // Stripe
  stripe_payment_id String?           @unique
  stripe_invoice_id String?
  
  // Estado
  state             String            @default("pendiente") // pendiente, completada, fallida, reembolsada
  error_message     String?
  
  // Comprobante
  receipt_url       String? // URL a PDF en S3
  
  created_at        DateTime          @default(now())
  updated_at        DateTime          @updatedAt
  processed_at      DateTime?
  
  @@index([user_id])
  @@index([state])
  @@index([created_at])
}

// ════════════════════════════════════════════════════════════════
// QR ANTI-DUPLICACIÓN
// ════════════════════════════════════════════════════════════════

model QRToken {
  id                String            @id @default(uuid())
  user_id           String
  user              User              @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  // QR único: UUID + HMAC(uuid + secret)
  token_unique      String            @unique
  
  // Validez
  generated_at      DateTime          @default(now())
  expires_at        DateTime
  
  // Estado: si fue usado
  used_at           DateTime?
  used_by_ip        String?
  used_at_location  String? // metadata: "Mostrador A"
  
  cita_id           String? // asociado a una cita (opcional)
  
  @@index([user_id])
  @@index([expires_at])
  @@index([used_at])
}

// ════════════════════════════════════════════════════════════════
// AUDITORÍA Y SEGURIDAD
// ════════════════════════════════════════════════════════════════

model AuditLog {
  id                String            @id @default(uuid())
  user_id           String?
  action            String            // "login", "expediente_access", "qr_scan"
  resource          String            // tabla afectada
  resource_id       String?
  
  old_value         String? // JSON anterior (si aplica)
  new_value         String? // JSON nuevo (si aplica)
  
  ip_address        String
  user_agent        String?
  status            String            // "success", "failure"
  error_code        String?
  
  created_at        DateTime          @default(now())
  
  @@index([user_id])
  @@index([action])
  @@index([created_at])
}

// ════════════════════════════════════════════════════════════════
// NOTIFICACIONES
// ════════════════════════════════════════════════════════════════

model Notificacion {
  id                String            @id @default(uuid())
  user_id           String
  
  title             String
  message           String
  type              String            // "cita", "pago", "oferta"
  link              String?
  
  read_at           DateTime?
  created_at        DateTime          @default(now())
  
  @@index([user_id])
  @@index([created_at])
}
```

### 4.2 Índices y Optimizaciones

```sql
-- Índices para búsquedas rápidas
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_documento ON users(documento_id);
CREATE INDEX idx_membership_state ON memberships(state, expiry_date);
CREATE INDEX idx_citas_user_timestamp ON citas(user_id, timestamp DESC);
CREATE INDEX idx_qr_token_unique ON qr_tokens(token_unique);
CREATE INDEX idx_qr_expires_at ON qr_tokens(expires_at);
CREATE INDEX idx_transaccion_user_state ON transacciones(user_id, state);
CREATE INDEX idx_audit_log_user_action ON audit_logs(user_id, action, created_at DESC);

-- Encriptación de campos sensibles (pgcrypto)
ALTER TABLE expedientes 
ADD COLUMN alergias_encrypted bytea;

-- Particionamiento por usuario (seguridad)
CREATE TABLE expedientes_partitioned (LIKE expedientes);
ALTER TABLE expedientes_partitioned 
PARTITION BY HASH (user_id);

-- Vacío de basura (prevent bloat)
VACUUM ANALYZE;
```

---

## 5. API REST SPECIFICATION

### 5.1 Endpoints Críticos

#### **Auth Endpoints**

```typescript
// POST /api/auth/register
Request:
{
  email: "paciente@gmail.com",
  password: "SecurePass123!",
  full_name: "Juan Pérez",
  phone: "+523651234567",
  documento_id: "ABC123456",
  date_of_birth: "1990-05-15"
}

Response (201):
{
  access_token: "eyJhbGciOiJIUzI1NiIs...",
  refresh_token: "eyJhbGciOiJIUzI1NiIs...",
  user: {
    id: "uuid",
    email: "paciente@gmail.com",
    full_name: "Juan Pérez"
  }
}

// POST /api/auth/login
Request:
{
  email: "paciente@gmail.com",
  password: "SecurePass123!"
}

Response (200):
{
  access_token: "eyJhbGciOiJIUzI1NiIs...",
  refresh_token: "eyJhbGciOiJIUzI1NiIs...",
  user: {...}
}

// POST /api/auth/webauthn/register (Biometría)
Request:
{
  username: "paciente@gmail.com",
  displayName: "Juan Pérez"
}

Response (200):
{
  challenge: "base64-encoded-challenge",
  rp: { name: "Hospital San Diego", id: "hospital.mx" },
  user: { id: "...", name: "...", displayName: "..." }
}

// POST /api/auth/webauthn/verify
Request:
{
  credential: {...}
}

Response (200):
{
  access_token: "...",
  refresh_token: "..."
}

// POST /api/auth/refresh
Request:
{
  refresh_token: "eyJhbGciOiJIUzI1NiIs..."
}

Response (200):
{
  access_token: "eyJhbGciOiJIUzI1NiIs..."
}
```

#### **Citas Endpoints**

```typescript
// POST /api/citas/agendar
Headers: { Authorization: "Bearer {access_token}" }

Request:
{
  doctor_id: "uuid",
  especialidad: "Cardiología",
  timestamp: "2026-06-15T14:30:00Z",
  notas: "Revisión rutinaria"
}

Response (201):
{
  cita_id: "uuid",
  timestamp: "2026-06-15T14:30:00Z",
  doctor: { id: "...", full_name: "Dr. López" },
  qr_token: "a1f2e3d4c5b6a7f8..." (para validar en mostrador),
  confirmation_email: "enviado"
}

Error (409):
{
  error: "Especialidad no cubierta en tu plan",
  code: "SERVICIO_NO_CUBIERTO"
}

// GET /api/citas/disponibilidad
Query: ?doctor_id=uuid&fecha=2026-06-15&especialidad=Cardiología

Response (200):
{
  slots: [
    { time: "09:00", available: true },
    { time: "09:30", available: false }, // Ocupado
    { time: "10:00", available: true }
  ]
}

// GET /api/citas/mis-citas
Headers: { Authorization: "Bearer {access_token}" }

Response (200):
{
  citas: [
    {
      id: "uuid",
      doctor: "Dr. López",
      especialidad: "Cardiología",
      timestamp: "2026-06-15T14:30:00Z",
      state: "confirmada",
      qr: "a1f2e3d4c5b6a7f8..."
    }
  ]
}

// DELETE /api/citas/{cita_id}
Headers: { Authorization: "Bearer {access_token}" }

Response (200):
{
  message: "Cita cancelada",
  reembolso: 250 // MXN reembolsados
}

Error (422):
{
  error: "Cita es dentro de 48h, no se puede cancelar",
  code: "CANCELACION_FUERA_DE_PLAZO"
}
```

#### **Expediente Endpoints**

```typescript
// GET /api/expediente
Headers: 
  Authorization: "Bearer {access_token}"
  X-Require-Biometric: true // Fuerza validación biométrica

Response (200):
{
  id: "uuid",
  alergias: ["Penicilina", "Dipirona"],
  medicamentos: ["Atorvastatina 20mg", "Metformina 500mg"],
  condiciones: ["Hipertensión", "Diabetes tipo 2"],
  historico_quirurgico: "Apendicectomía 2015",
  documentos: [
    {
      url: "https://s3.example.com/...",
      nombre: "Receta_2024.pdf",
      fecha: "2024-03-10"
    }
  ]
}

Error (401):
{
  error: "Requiere validación biométrica",
  code: "BIOMETRIC_REQUIRED"
}

// PUT /api/expediente
Headers: { Authorization: "Bearer {access_token}" }

Request:
{
  alergias: ["Penicilina"],
  medicamentos: ["Atorvastatina 20mg"],
  condiciones: ["Hipertensión"]
}

Response (200):
{
  message: "Expediente actualizado",
  updated_at: "2026-05-06T10:30:00Z"
}

// GET /api/expediente/descargar-pdf
Headers: { Authorization: "Bearer {access_token}" }

Response (200):
Content-Type: application/pdf
[PDF descargable]
```

#### **QR Endpoints (Mostrador)**

```typescript
// POST /api/qr/generar (Genera QR para paciente)
Headers: { Authorization: "Bearer {access_token}" }

Response (201):
{
  token: "a1f2e3d4c5b6a7f8-hmac1234567890",
  expires_at: "2026-06-15T14:30:00Z",
  qr_image: "data:image/png;base64,..." // PNG para mostrar
}

// POST /api/qr/validate (Escanea QR en mostrador)
Headers: { 
  Authorization: "Bearer {staff_token}",
  X-Location: "Mostrador A"
}

Request:
{
  token: "a1f2e3d4c5b6a7f8-hmac1234567890"
}

Response (200):
{
  patient: {
    name: "Juan Pérez",
    membership: "activa",
    plan: "Plus",
    documento_id: "ABC123456"
  },
  valid: true,
  message: "✅ Paciente validado"
}

Error (401):
{
  error: "QR ya fue escaneado",
  code: "QR_ALREADY_USED",
  scanned_at: "2026-06-15T10:00:00Z"
}

Error (401):
{
  error: "QR expirado",
  code: "QR_EXPIRED"
}

Error (404):
{
  error: "QR no encontrado",
  code: "QR_NOT_FOUND"
}
```

#### **Pagos Endpoints**

```typescript
// POST /api/pagos/crear-sesion-stripe
Headers: { Authorization: "Bearer {access_token}" }

Request:
{
  amount: 50000, // MXN * 100 (centavos)
  currency: "MXN",
  description: "Pago de membresía mensual"
}

Response (200):
{
  session_id: "cs_live_...",
  checkout_url: "https://checkout.stripe.com/..."
}

// POST /api/pagos/webhook-stripe
Headers: { 
  X-Stripe-Signature: "t=...,v1=..."
}

Body:
{
  id: "evt_...",
  type: "charge.succeeded",
  data: {
    object: {
      id: "ch_...",
      customer: "cus_...",
      amount: 50000,
      status: "succeeded"
    }
  }
}

Response (200):
{
  received: true
}

// GET /api/pagos/historial
Headers: { Authorization: "Bearer {access_token}" }

Response (200):
{
  transacciones: [
    {
      id: "uuid",
      date: "2026-05-01",
      amount: 500,
      description: "Membresía Mayo",
      state: "completada",
      receipt_url: "https://..."
    }
  ]
}
```

#### **Cobertura Endpoints**

```typescript
// GET /api/cobertura/servicios
Headers: { Authorization: "Bearer {access_token}" }

Response (200):
{
  plan: "Plus",
  servicios: [
    {
      nombre: "Consulta Medicina General",
      cubierto: true,
      porcentaje: 100,
      copago: 100,
      limite_anual: null
    },
    {
      nombre: "Cirugía General",
      cubierto: true,
      porcentaje: 80,
      copago: 500,
      limite_anual: 50000
    },
    {
      nombre: "Odontología",
      cubierto: false,
      porcentaje: 0,
      copago: null
    }
  ]
}

// GET /api/cobertura/validar
Headers: { Authorization: "Bearer {access_token}" }

Query: ?servicio_id=uuid

Response (200):
{
  cubierto: true,
  copago: 150,
  mensaje: "Servicio cubierto al 80% con copago de $150"
}

Error (422):
{
  cubierto: false,
  copago: null,
  mensaje: "Este servicio no está cubierto en tu plan"
}
```

### 5.2 Rate Limiting y Throttling

```typescript
// Backend middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // 100 requests por minuto
  message: "Demasiadas solicitudes, intenta más tarde",
  standardHeaders: true,
  legacyHeaders: false
});

// Rutas críticas: límite más estricto
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos fallidos
  skipSuccessfulRequests: true // No cuenta logins exitosos
});

app.post('/api/auth/login', authLimiter, handleLogin);
app.use('/api/', limiter); // Global
```

---

## 6. ARQUITECTURA FRONTEND (PWA)

### 6.1 Estructura de Carpetas

```
membresía-salud/frontend/
├── src/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Citas.tsx
│   │   │   ├── AgendarCita.tsx
│   │   │   ├── MisCitas.tsx
│   │   │   └── ConfirmacionCita.tsx
│   │   ├── Expediente.tsx
│   │   │   ├── VisualizarExpediente.tsx
│   │   │   ├── EditarExpediente.tsx
│   │   │   └── DescargarPDF.tsx
│   │   ├── Pagos.tsx
│   │   │   ├── HistorialPagos.tsx
│   │   │   └── ProcesarPago.tsx
│   │   ├── QR.tsx
│   │   ├── Cobertura.tsx
│   │   ├── Perfil.tsx
│   │   └── 404.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── WebAuthnButton.tsx
│   │   │   └── SessionManager.tsx
│   │   ├── citas/
│   │   │   ├── CalendarSelector.tsx
│   │   │   ├── DoctorSelect.tsx
│   │   │   └── ConfirmationModal.tsx
│   │   ├── expediente/
│   │   │   ├── ExpedienteCard.tsx
│   │   │   └── DocumentViewer.tsx
│   │   ├── qr/
│   │   │   ├── QRScanner.tsx
│   │   │   ├── QRDisplay.tsx
│   │   │   └── ValidationResult.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Toast.tsx
│   │       └── Spinner.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCitas.ts
│   │   ├── useExpediente.ts
│   │   ├── usePagos.ts
│   │   ├── useQR.ts
│   │   ├── useOffline.ts
│   │   ├── useLocalStorage.ts
│   │   └── useWebAuthn.ts
│   ├── services/
│   │   ├── api.ts (Axios instance)
│   │   ├── auth.service.ts
│   │   ├── citas.service.ts
│   │   ├── expediente.service.ts
│   │   ├── pagos.service.ts
│   │   ├── qr.service.ts
│   │   ├── notificaciones.service.ts
│   │   └── storage.service.ts
│   ├── store/
│   │   ├── authStore.ts (Zustand)
│   │   ├── citasStore.ts
│   │   ├── notificacionesStore.ts
│   │   └── appStore.ts
│   ├── lib/
│   │   ├── validators.ts (Zod schemas)
│   │   ├── crypto.ts (AES encrypt/decrypt)
│   │   ├── queryClient.ts (React Query)
│   │   ├── axios.ts (interceptors)
│   │   └── utils.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── animations.css
│   ├── types/
│   │   ├── index.ts
│   │   ├── api.ts
│   │   └── domain.ts
│   ├── constants/
│   │   ├── api.ts
│   │   └── messages.ts
│   ├── public/
│   │   ├── manifest.json (PWA)
│   │   ├── service-worker.js
│   │   ├── icon-192x192.png
│   │   ├── icon-512x512.png
│   │   └── favicon.ico
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   ├── e2e/ (Cypress)
│   └── setup.ts
├── public/
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── vitest.config.ts
├── cypress.config.ts
├── package.json
├── pnpm-lock.yaml
└── README.md
```

### 6.2 Service Worker Configuration

```typescript
// public/service-worker.js
const CACHE_NAME = 'membresía-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json'
];

// Install: cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch: cache-first para assets, network-first para API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API calls: network-first (actualizar datos)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cache = caches.open(CACHE_NAME);
          cache.then((c) => c.put(request, response.clone()));
          return response;
        })
        .catch(() => caches.match(request))
    );
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: data.type // agrupa notificaciones del mismo tipo
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
```

### 6.3 React Query Setup

```typescript
// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos (antes cacheTime)
      retry: 1,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 1
    }
  }
});
```

### 6.4 Zustand Store Example

```typescript
// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const response = await authService.login(email, password);
    set({
      user: response.user,
      accessToken: response.access_token,
      isAuthenticated: true
    });
    // Guardar en localStorage encriptado
    localStorage.setItem('auth', encrypt(response.access_token));
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false
    });
    localStorage.removeItem('auth');
  },

  setUser: (user: User) => {
    set({ user });
  }
}));
```

### 6.5 Custom Hooks

```typescript
// src/hooks/useAuth.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => {
      // Redirigir a dashboard
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending
  };
}

// src/hooks/useOffline.ts
import { useEffect, useState } from 'react';

export function useOffline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return !isOnline; // Retorna true si está offline
}
```

---

## 7. PROCEDIMIENTOS DE DESARROLLO

### 7.1 Ciclo de Sprints

```
TOTAL: 6 sprints x 2 semanas = 12 semanas (MVP)

Sprint 1 (Semana 1-2): Auth + Dashboard
├─ User registration (email + password + documento)
├─ Login + JWT
├─ WebAuthn setup (biometría)
├─ Dashboard básico (estado membresía)
├─ Protected routes
└─ Tests: 80% coverage

Sprint 2 (Semana 3-4): Citas Médicas
├─ Listar especialidades
├─ Mostrar disponibilidad (calendar)
├─ Agendamiento cita
├─ Confirmación email + SMS
├─ Historial de citas
└─ Tests: 80% coverage

Sprint 3 (Semana 5-6): Expediente Clínico
├─ Visualizar expediente (cifrado)
├─ Editar datos clínicos
├─ Documentos/archivos (S3)
├─ Descargar PDF
├─ Auditoría de acceso
└─ Tests: 80% coverage

Sprint 4 (Semana 7-8): QR + Validación
├─ Generación de QR único
├─ Anti-duplicación (backend)
├─ Escaneo QR (mostrador)
├─ Validación de paciente
├─ Logs de escaneado
└─ Tests: 80% coverage

Sprint 5 (Semana 9-10): Pagos + Cobertura
├─ Integración Stripe
├─ Mostrar deudas
├─ Procesar pagos
├─ Generación recibos (PDF)
├─ Cobertura (servicios + copagos)
└─ Tests: 80% coverage

Sprint 6 (Semana 11-12): PWA + Pulido
├─ Service Worker (Workbox)
├─ Funcionamiento offline
├─ Push notifications
├─ Performance optimization
├─ Security audit
├─ User acceptance testing (UAT)
└─ Tests: 85%+ coverage
```

### 7.2 Workflow Git

```bash
# Setup inicial
git clone https://github.com/hospital/membresía-salud.git
cd membresía-salud
git checkout -b dev
git checkout -b release/sprint-1

# Desarrollo de feature
git checkout -b feature/auth-login
# ... cambios ...
git add .
git commit -m "feat(auth): implementar login con JWT"
git push origin feature/auth-login

# Pull Request → Code Review → Merge a dev
# En dev: ejecutar tests
npm run test:coverage
npm run lint

# Merge a release/sprint-1
git checkout release/sprint-1
git merge dev
git tag -a v1.0.0-sprint1 -m "Sprint 1 release"

# Desplegar a staging
npm run build
npm run deploy:staging

# UAT en staging
# Si OK → merge a main (production)
git checkout main
git merge release/sprint-1
git push origin main

# Vercel auto-deploya en push a main
```

### 7.3 Definición de Hecho (Definition of Done)

```
✅ CÓDIGO:
  □ Feature implementada según especificación
  □ Tests unitarios: 80%+ coverage
  □ Tests de integración: casos críticos
  □ Código review aprobado (2 personas)
  □ Sin warnings ESLint / TypeScript
  □ Prettier formateado

✅ DOCUMENTACIÓN:
  □ README.md actualizado
  □ JSDoc en funciones públicas
  □ API endpoint documentado (Swagger)
  □ Cambios en schema DB documentados

✅ TESTING:
  □ Funcional: prueba manual en dev
  □ Responsive: tablet 12.9" + mobile
  □ Cross-browser: Chrome + Safari + Firefox
  □ Offline: mode offline simulado
  □ Performance: Lighthouse >85

✅ SEGURIDAD:
  □ No hardcoded secrets
  □ Validación input en frontend + backend
  □ XSS mitigation (DOMPurify si aplica)
  □ CSRF tokens en POST
  □ Rate limiting testeado

✅ DEPLOYMENT:
  □ Build sin errores
  □ Vercel preview disponible
  □ Environment variables correctas
  □ Database migrations ejecutadas
  □ Rollback plan documentado
```

---

## 8. TESTING STRATEGY

### 8.1 Pirámide de Testing

```
                    ▲
                   /|\
                  / | \
                 /  |  \  E2E (10%)
                /   |   \  Cypress
               ├─────────┤
              /  |   |   \ Integration (25%)
             /   |   |   \ Jest + Supertest
            ├──────────────┤
           /     |   |     \ Unit (65%)
          /      |   |     \ Vitest
         ┴────────────────────┴
```

### 8.2 Unit Tests

```typescript
// src/lib/__tests__/validators.test.ts
import { validateEmail, validatePassword } from '@/lib/validators';

describe('Validators', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@hospital.mx')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should require minimum 8 characters', () => {
      expect(validatePassword('short')).toBe(false);
    });

    it('should require uppercase, lowercase, number, special char', () => {
      expect(validatePassword('StrongPass123!')).toBe(true);
      expect(validatePassword('strongpass123!')).toBe(false); // No uppercase
    });
  });
});

// src/hooks/__tests__/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import * as authService from '@/services/auth.service';

jest.mock('@/services/auth.service');

describe('useAuth', () => {
  it('should login user', async () => {
    const mockResponse = {
      access_token: 'token',
      user: { id: '1', email: 'test@hospital.mx' }
    };
    
    jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login.mutate({
        email: 'test@hospital.mx',
        password: 'StrongPass123!'
      });
    });

    expect(result.current.user).toEqual(mockResponse.user);
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

### 8.3 Integration Tests

```typescript
// __tests__/api/auth.integration.test.ts
import request from 'supertest';
import app from '@/index';
import { prisma } from '@/db/prisma';

describe('Auth API Integration', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany(); // Limpiar DB de test
  });

  describe('POST /api/auth/register', () => {
    it('should create new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'nuevo@hospital.mx',
          password: 'StrongPass123!',
          full_name: 'Juan Pérez',
          documento_id: 'ABC123456',
          date_of_birth: '1990-05-15'
        });

      expect(response.status).toBe(201);
      expect(response.body.access_token).toBeDefined();
      expect(response.body.user.email).toBe('nuevo@hospital.mx');
    });

    it('should reject duplicate email', async () => {
      // Crear primer usuario
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@hospital.mx',
          password: 'StrongPass123!',
          full_name: 'Juan',
          documento_id: 'ABC123456',
          date_of_birth: '1990-05-15'
        });

      // Intentar crear con mismo email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@hospital.mx',
          password: 'AnotherPass123!',
          full_name: 'Pedro',
          documento_id: 'DEF789123',
          date_of_birth: '1995-10-20'
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toContain('Email already exists');
    });
  });

  describe('POST /api/citas/agendar', () => {
    it('should schedule appointment', async () => {
      // Setup: crear usuario
      const user = await prisma.user.create({
        data: {
          email: 'paciente@hospital.mx',
          password_hash: 'hashed',
          full_name: 'Juan Pérez',
          documento_id: 'ABC123456',
          date_of_birth: new Date('1990-05-15')
        }
      });

      // Setup: crear doctor
      const doctor = await prisma.doctor.create({
        data: {
          full_name: 'Dr. López',
          speciality: 'Cardiología',
          license_number: 'LIC123456',
          phone: '+523651234567'
        }
      });

      // Test: agendar cita
      const response = await request(app)
        .post('/api/citas/agendar')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          doctor_id: doctor.id,
          especialidad: 'Cardiología',
          timestamp: new Date(Date.now() + 86400000) // mañana
        });

      expect(response.status).toBe(201);
      expect(response.body.cita_id).toBeDefined();
      expect(response.body.qr_token).toBeDefined();
    });
  });
});
```

### 8.4 E2E Tests (Cypress)

```typescript
// cypress/e2e/auth.cy.ts
describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should register new user', () => {
    cy.contains('Register').click();

    cy.get('input[name="email"]').type('test@hospital.mx');
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('input[name="full_name"]').type('Juan Pérez');
    cy.get('input[name="documento_id"]').type('ABC123456');
    cy.get('input[name="date_of_birth"]').type('1990-05-15');

    cy.contains('Register').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenido, Juan Pérez').should('be.visible');
  });

  it('should login with email and password', () => {
    cy.get('input[name="email"]').type('paciente@hospital.mx');
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.contains('Login').click();

    cy.url().should('include', '/dashboard');
  });

  it('should validate QR in mostrador', () => {
    // Login como staff
    cy.login('staff@hospital.mx', 'StaffPass123!');

    cy.get('#qr-input').focus();
    // Simular escaneo QR
    cy.get('#qr-input').type('a1f2e3d4c5b6a7f8-hmac1234567890');

    cy.contains('✅ Paciente validado').should('be.visible');
    cy.contains('Juan Pérez').should('be.visible');
  });
});

// cypress/e2e/citas.cy.ts
describe('Appointment Booking', () => {
  beforeEach(() => {
    cy.login('paciente@hospital.mx', 'StrongPass123!');
    cy.visit('http://localhost:5173/citas/agendar');
  });

  it('should schedule appointment', () => {
    // Seleccionar especialidad
    cy.get('[data-testid="specialty-select"]').click();
    cy.contains('Cardiología').click();

    // Seleccionar fecha
    cy.get('[data-testid="date-input"]').click();
    cy.contains('15').click(); // próximo día 15

    // Seleccionar slot disponible
    cy.contains('14:30').click();

    // Confirmar
    cy.contains('Agendar Cita').click();

    // Validar confirmación
    cy.contains('✅ Cita agendada').should('be.visible');
    cy.contains('QR generado').should('be.visible');
  });
});
```

### 8.5 Testing Commands

```bash
# Unit tests
npm run test:unit

# Coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Integration tests (requiere BD de test)
npm run test:integration

# E2E tests
npm run test:e2e

# E2E con UI
npm run test:e2e:ui

# Todos los tests
npm run test

# Linting
npm run lint
npm run lint:fix
```

---

## 9. SEGURIDAD Y COMPLIANCE

### 9.1 HIPAA Compliance Checklist

```
✅ CONTROL DE ACCESO:
  ☐ Autenticación: MFA obligatoria (WebAuthn)
  ☐ Autorización: Role-based access control (RBAC)
  ☐ Sesiones: 15 minutos inactividad timeout
  ☐ Logging: Audit trail de accesos a PHI

✅ INTEGRIDAD DE DATOS:
  ☐ Encriptación en tránsito: TLS 1.3+
  ☐ Encriptación en reposo: AES-256
  ☐ Validación data: Schema validation (Zod)
  ☐ Integridad mensajes: HMAC para QR

✅ DISPONIBILIDAD:
  ☐ Backup: Diario, encriptado, 30 días
  ☐ Replicación: Standby database
  ☐ Disaster recovery: RTO 4h, RPO 1h
  ☐ Uptime: 99.5% SLA

✅ AUDITORÍA:
  ☐ Logging: Todas acciones a datos sensibles
  ☐ Logs: Inmutables, archivados 6+ años
  ☐ Monitoreo: Alertas en actividad sospechosa
  ☐ Penetration testing: Anual

✅ SEGURIDAD FÍSICA:
  ☐ Servidores: Data center certificado
  ☐ Backups: Ubicación geográfica separada
  ☐ Acceso: Restringido a personal autorizado

✅ POLÍTICAS:
  ☐ Documentación: Políticas HIPAA publicadas
  ☐ Capacitación: Staff HIPAA-trained
  ☐ Incidentes: Plan de respuesta documentado
  ☐ Business Associate Agreements (BAA): Firmados
```

### 9.2 Data Encryption

```typescript
// src/lib/crypto.ts
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const SALT_LENGTH = 32;
const TAG_LENGTH = 16;
const IV_LENGTH = 12;

export function encryptExpediente(data: string, userPassword: string): string {
  // Derivar key desde password del usuario
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = crypto.pbkdf2Sync(userPassword, salt, 100000, 32, 'sha256');
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  
  const tag = cipher.getAuthTag();
  
  // Retorna: salt + iv + tag + encrypted
  return [
    salt.toString('hex'),
    iv.toString('hex'),
    tag.toString('hex'),
    encrypted
  ].join(':');
}

export function decryptExpediente(encrypted: string, userPassword: string): string {
  const [saltHex, ivHex, tagHex, encryptedData] = encrypted.split(':');
  
  const salt = Buffer.from(saltHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  
  const key = crypto.pbkdf2Sync(userPassword, salt, 100000, 32, 'sha256');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  
  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  
  return decrypted;
}

// Backend: encriptación de campos sensibles con pgcrypto
// UPDATE expedientes 
// SET alergias = pgp_sym_encrypt(alergias, 'hospital_secret_key')
// WHERE id = $1;
```

### 9.3 API Security Headers

```typescript
// src/middleware/securityHeaders.ts
import helmet from 'helmet';

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://maps.googleapis.com"]
    }
  },
  frameguard: { action: 'deny' }, // X-Frame-Options: DENY
  hidePoweredBy: true, // Oculta X-Powered-By
  hsts: {
    maxAge: 31536000, // 1 año
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'no-referrer' },
  xssFilter: true
});

// Uso en app
app.use(securityHeaders);
```

### 9.4 Rate Limiting

```typescript
// src/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';

// Login: 5 intentos / 15 minutos
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiados intentos de login, intenta más tarde',
  skipSuccessfulRequests: true,
  keyGenerator: (req) => req.ip || req.socket.remoteAddress
});

// API general: 100 requests / minuto
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'Demasiadas solicitudes',
  keyGenerator: (req) => req.user?.id || req.ip
});

// QR scanning: 10 / minuto (prevenir fuzzing)
export const qrLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Demasiados escaneos, intenta en 1 minuto'
});

// Uso en rutas
app.post('/api/auth/login', authLimiter, handleLogin);
app.post('/api/qr/validate', qrLimiter, validateQR);
```

### 9.5 CORS Configuration

```typescript
// src/config/cors.ts
import cors from 'cors';

export const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://hospital.mx',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-CSRF-Token'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400 // 24 horas
};

app.use(cors(corsOptions));
```

---

## 10. DEPLOYMENT Y DEVOPS

### 10.1 Frontend Deployment (Vercel)

```bash
# 1. Conectar repositorio
# Vercel auto-detecta Vite + React

# 2. Environment variables
# .env.production
VITE_API_URL=https://api.hospital.mx
VITE_FIREBASE_CONFIG={"apiKey":"...","projectId":"..."}

# 3. Build optimization
npm run build
# Output: dist/

# 4. Vercel auto-deploy en push a main
# Preview en cada PR desde feature branch

# 5. Performance check
# Lighthouse: >85 en todos los metrics
# Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
```

### 10.2 Backend Deployment (Railway/Render)

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --prod

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start
CMD ["node", "dist/index.js"]
```

```bash
# Deploy a Railway.app
# 1. Conectar GitHub repo
# 2. Crear servicio PostgreSQL
# 3. Set environment variables en Railway
DATABASE_URL=postgresql://...
JWT_SECRET=random-secure-key
STRIPE_SECRET_KEY=sk_live_...

# 4. Auto-deploy en push a main
# Railway ejecuta migrations automáticamente
```

### 10.3 Database Migrations

```bash
# Crear migración
npx prisma migrate dev --name add_expediente_table

# Esto genera:
# - prisma/migrations/20260506_add_expediente_table/migration.sql
# - Aplica automáticamente a DB local

# Deploy a producción
npx prisma migrate deploy
# (ejecutar en CI/CD antes de iniciar app)
```

```sql
-- prisma/migrations/20260506_add_expediente_table/migration.sql
-- AddTable
CREATE TABLE "Expediente" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "user_id" TEXT NOT NULL UNIQUE,
  "alergias" TEXT,
  "medicamentos" TEXT,
  "condiciones" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Expediente_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Expediente_user_id_idx" ON "Expediente"("user_id");
```

### 10.4 GitHub Actions CI/CD

```yaml
# .github/workflows/test-and-deploy.yml
name: Test & Deploy

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: membresía_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run linter
        run: pnpm lint
      
      - name: Run type check
        run: pnpm type-check
      
      - name: Setup database
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/membresía_test
        run: |
          npx prisma migrate deploy
      
      - name: Run tests
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/membresía_test
        run: pnpm test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
      
      - name: Build frontend
        if: github.event_name == 'push'
        run: cd frontend && pnpm build
      
      - name: Build backend
        if: github.event_name == 'push'
        run: cd backend && pnpm build
  
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy frontend to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          npm i -g vercel
          vercel --prod
      
      - name: Deploy backend to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm i -g @railway/cli
          railway up
```

---

## 11. MONITOREO Y ALERTAS

### 11.1 Error Tracking (Sentry)

```typescript
// src/config/sentry.ts
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({
      maskAllText: true, // privacy
      blockAllMedia: true
    })
  ],
  beforeSend(event) {
    // Filtrar errores no críticos
    if (event.level === 'info') {
      return null;
    }
    return event;
  }
});

// Backend
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true })
  ]
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### 11.2 Custom Logging

```typescript
// src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'membresía-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Uso
logger.info('User logged in', { user_id: user.id, ip: req.ip });
logger.error('QR validation failed', {
  error: err.message,
  qr_token: token,
  ip: req.ip
});
```

### 11.3 Prometheus Metrics

```typescript
// src/metrics/prometheus.ts
import { register, Counter, Histogram, Gauge } from 'prom-client';

// Contadores
export const loginAttempts = new Counter({
  name: 'login_attempts_total',
  help: 'Total login attempts',
  labelNames: ['success']
});

export const citasCreadas = new Counter({
  name: 'citas_created_total',
  help: 'Total citas created',
  labelNames: ['especialidad']
});

// Histogramas (latencia)
export const apiResponseTime = new Histogram({
  name: 'api_response_time_ms',
  help: 'API response time in milliseconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [50, 100, 200, 500, 1000, 2000]
});

// Gauges (valores actuales)
export const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active WebSocket connections'
});

// Middleware para registrar
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    apiResponseTime.labels(req.method, req.route.path, res.statusCode).observe(duration);
  });
  next();
});

// Endpoint para Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});
```

### 11.4 Alertas en DataDog/New Relic

```yaml
# datadog-alerts.yaml
monitors:
  - name: "API Response Time High"
    type: "metric alert"
    query: "avg:api_response_time_ms{*} > 500"
    alert_condition: "avg last 5 minutes"
    notification: "@pagerduty @slack"
  
  - name: "Error Rate High"
    type: "metric alert"
    query: "sum:trace.web.request.errors{*} / sum:trace.web.request{*} > 0.05"
    alert_condition: "avg last 5 minutes"
    notification: "@pagerduty"
  
  - name: "Database Connection Pool Full"
    type: "metric alert"
    query: "avg:postgresql.connections{*} / 100 > 0.9"
    alert_condition: "avg last 3 minutes"
    notification: "@slack"
  
  - name: "QR Validation Failures"
    type: "event alert"
    query: "status:error resource:qr_validate"
    alert_condition: "> 10 in 5 minutes"
    notification: "@slack #monitoreo"
```

---

## 12. TROUBLESHOOTING

### 12.1 Problemas Comunes Frontend

```
PROBLEMA: PWA no funciona offline
─────────────────────────────────
Síntomas: App muestra "sin conexión" aún con Service Worker
Solución:
  1. Verificar: DevTools → Application → Service Workers
  2. Check: "Update on reload" desactivado
  3. Clear: Cache storage completamente
  4. Rebuild: npm run build && pnpm preview

PROBLEMA: QR Scanner no abre cámara
─────────────────────────────────
Síntomas: html5-qrcode no detecta cámara
Solución:
  1. Verificar permisos navegador (Settings → Privacy)
  2. HTTPS: QRScanner requiere HTTPS
  3. Test: Verificar en diferente navegador
  4. Logs: Revisar console.error en DevTools

PROBLEMA: Biometría (WebAuthn) falla
─────────────────────────────────
Síntomas: "Credential not available"
Solución:
  1. Verificar: Device soporta biometría
  2. Test: Face ID/Fingerprint habilitado en SO
  3. Clear: Credenciales guardadas en navegador
  4. Reintentar: Después de 30 segundos

PROBLEMA: Login lento, timeout
─────────────────────────────────
Síntomas: POST /api/auth/login toma >5s
Solución:
  1. Check: Estado API backend (health check)
  2. Network: Inspeccionar latencia en DevTools
  3. Database: Ver logs backend (slow queries)
  4. Scaling: Si high load, escalar backend pods
```

### 12.2 Problemas Comunes Backend

```
PROBLEMA: Conexión a BD falla
─────────────────────────────────
Error: "ECONNREFUSED 127.0.0.1:5432"
Solución:
  1. Verificar: PostgreSQL está corriendo
     $ ps aux | grep postgres
  2. Revisar: DATABASE_URL correcto en .env
  3. Test: psql -U postgres -d membresía_dev
  4. Restart: docker-compose restart postgres

PROBLEMA: Migraciones falladas
─────────────────────────────────
Error: "Migration X failed"
Solución:
  1. Revisar: Logs de migración
     $ npx prisma migrate resolve --rolled-back
  2. Manual: Ejecutar SQL manualmente si es necesario
  3. Reset local: npx prisma migrate reset (cuidado: borra BD)
  4. Production: Rollback manual + hotfix

PROBLEMA: JWT token expirado/inválido
─────────────────────────────────
Error: "401 Unauthorized, Invalid token"
Solución:
  1. Verificar: JWT_SECRET correcto en .env
  2. Revoke: Tokens viejos si cambió secret
  3. Client: Frontend debe guardar refresh_token
  4. Refresh: Usar POST /api/auth/refresh automáticamente

PROBLEMA: Rate limiter bloquea usuarios legítimos
─────────────────────────────────
Síntomas: "429 Too Many Requests" en loop
Solución:
  1. Aumentar límites si es necesario
  2. Whitelist IPs confiables (backend hospital)
  3. Usar key por user_id, no IP
  4. Cache en Redis para distribuir límite
```

### 12.3 Problemas de Seguridad

```
PROBLEMA: CORS headers faltantes
─────────────────────────────────
Error: "Access to XMLHttpRequest blocked by CORS policy"
Solución:
  1. Verificar: corsOptions en backend
  2. Test: curl -H "Origin: https://..." -i api.hospital.mx
  3. Update: FRONTEND_URL correcta en .env backend
  4. Restart: Reiniciar backend después de cambios

PROBLEMA: Datos sensibles en logs
─────────────────────────────────
Riesgo: Password hashes, tokens en logs
Solución:
  1. Implementar: beforeSend en Sentry (filter senistive)
  2. Mask: Campos sensibles en logger.ts
  3. Audit: Revisar logs por información expuesta
  4. Rotate: Cambiar secrets si fue comprometido

PROBLEMA: XSS vulnerability en expediente PDF
─────────────────────────────────
Síntomas: Script ejecutable en PDF descargado
Solución:
  1. Validar: Sanitizar expediente antes de generar PDF
  2. DOMPurify: Usar para limpiar HTML
  3. pdfkit: Generar desde template seguro, no user input
  4. Test: OWASP ZAP scan de rutas sensibles
```

### 12.4 Troubleshooting Checklist

```
🔍 ANTES DE ESCALAR SOPORTE:
  ☐ Verificar estado backend (/api/health)
  ☐ Revisar logs (backend + frontend)
  ☐ Clear browser cache + localStorage
  ☐ Recargar página con Ctrl+Shift+R
  ☐ Probar en incógnito
  ☐ Verificar conexión internet
  ☐ Revisar rate limit status
  ☐ Check database reachable

🔍 SI PERSISTE:
  ☐ Captura screenshot de error
  ☐ Exporta logs (DevTools Console)
  ☐ Anota timestamp exacto
  ☐ Replica en otro device
  ☐ Contacta: support@hospital.mx con detalles
```

---

## REFERENCIAS Y RECURSOS

### Tecnologías
- [React 18](https://react.dev)
- [Vite](https://vitejs.dev)
- [Express.js](https://expressjs.com)
- [Prisma ORM](https://www.prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [Workbox](https://developers.google.com/web/tools/workbox)

### Seguridad
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [HIPAA Compliance](https://www.hhs.gov/hipaa/index.html)
- [WebAuthn Spec](https://www.w3.org/TR/webauthn-2/)

### Deployment
- [Vercel Documentation](https://vercel.com/docs)
- [Railway.app Docs](https://docs.railway.app)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

---

**Documento generado:** 2026-05-06  
**Última revisión:** 2026-05-06  
**Estado:** APROBADO PARA SPRINT 1  
**Responsable de aprobación:** René Fimbres V.
