# SPEC KIT - PLAN
## PWA Membresía Salud - Hospital San Diego de Alcalá

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Diseño Técnico

---

## 1. ARQUITECTURA TÉCNICA

### 1.1 Stack Tecnológico Final
- **Frontend:** React 18 + TypeScript + Vite 5
- **UI/UX:** TailwindCSS 3 + Shadcn/ui + Framer Motion (para animaciones premium)
- **Fuentes:** Avenir (Black, Medium, Light) integradas vía `@font-face`
- **Estado:** Zustand (Client) + TanStack Query v5 (Server State)
- **Backend:** Node.js 20 LTS + Express + TypeScript
- **ORM & DB:** Prisma 5 + PostgreSQL 16
- **Auth:** JWT + WebAuthn (Biometría)
- **Infraestructura:** Vercel (Frontend) + Railway/Render (Backend) + AWS S3 (Docs)

---

## 2. ESTRUCTURA DE DIRECTORIOS

### 2.1 Frontend Structure (`/frontend`)
```
src/
├── assets/
│   ├── fonts/
│   │   ├── avenir-black.ttf
│   │   ├── avenir-medium.ttf
│   │   └── avenir-light.ttf
│   └── images/
│       └── logo.png
├── components/
│   ├── ui/            # Componentes base Shadcn (Button, Input, etc)
│   ├── shared/         # Header, Sidebar, Layout
│   ├── membership/     # DigitalCard, PlanBadge, MembershipStatus
│   ├── appointments/   # AppointmentCalendar, DoctorCard
│   └── medical/        # RecordViewer, PDFDownloader
├── hooks/              # useAuth, useAppointments, useOffline
├── services/           # api.ts, auth.service.ts, membership.service.ts
├── store/              # authStore.ts, appStore.ts (Zustand)
├── pages/              # Dashboard, Login, Register, Record, Payments
├── lib/                # utils.ts, query-client.ts, validators.ts
└── styles/             # globals.css (Tailwind config)
```

### 2.2 Backend Structure (`/backend`)
```
src/
├── controllers/        # AuthController, AppointmentController, etc.
├── middleware/         # authMiddleware, rateLimiter, securityHeaders
├── services/           # MembershipService, QRService, PaymentService
├── routes/             # authRoutes, appointmentRoutes, qrRoutes
├── db/
│   ├── prisma.ts       # Prisma Client singleton
│   └── schema.prisma   # Base de datos
├── types/               # Domain types and API responses
└── utils/              # crypto.ts, logger.ts, mailer.ts
```

---

## 3. DISEÑO DE BASE DE DATOS (Refinado)

Utilizaremos el esquema Prisma definido en la arquitectura, asegurando que:
- **Encriptación la nivel de campo:** Alergias y medicamentos en `Expediente` se almacenan como `String` encriptados con AES-256.
- **Índices Críticos:** `User(email)`, `User(documento_id)`, `QRToken(token_unique)`, `Cita(timestamp)`.
- **Capa de Auditoría:** Tabla `AuditLog` capturando cada acceso a datos PHI (Protected Health Information).

---

## 4. CONFIGURACIÓN DE IDENTIDAD VISUAL (Tailwind)

Implementaremos la configuración de `tailwind.config.ts` la siguiente manera:

```typescript
theme: {
  extend: {
    fontFamily: {
      avenirBlack: ['"Avenir Black"', 'sans-serif'],
      avenirMedium: ['"Avenir Medium"', 'sans-serif'],
      avenirLight: ['"Avenir Light"', 'sans-serif'],
    },
    colors: {
      hospital: {
        primary: '#XXXXXX', // Extraído de logo.png
        secondary: '#XXXXXX',
        accent: '#XXXXXX',
      },
    },
    backgroundImage: {
      'membership-gradient': 'linear-gradient(to right, #... , #...)',
    }
  }
}
```

---

## 5. PLAN DE IMPLEMENTACIÓN INCREMENTAL

### Sprint 1: Core Auth & Visual Base
1. **Configuración Inicial:** Setup de Vite + Tailwind + Avenir Fonts.
2. **Backend Auth:** Implementación de Registro/Login con JWT y validaciones Zod.
3. **Dashboard UI:** Creación del Layout y la **Digital Membership Card** (estética premium).
4. **Biometría:** Integración inicial de WebAuthn para login rápido.

### Sprint 2: Gestión de Citas
1. **Catálogo de Servicios:** API de especialidades y doctores.
2. **Calendario de Disponibilidad:** Implementación de slots de 30 min.
3. **Flujo de Agendamiento:** Validación de cobertura -> Confirmación -> Notificación.

### Sprint 3: Expediente Clínico Seguro
1. **Módulo de Seguridad:** Middleware de validación biométrica obligatoria.
2. **Vista de Expediente:** UI para visualización de datos encriptados.
3. **S3 Integration:** Upload y descarga de PDFs médicos.

### Sprint 4: Sistema QR Anti-Duplicación
1. **Generador de Tokens:** Backend para crear UUID + HMAC.
2. **QR Scanner UI:** Implementación de `html5-qrcode` en Tablet.
3. **Lógica de Validación:** Check de "usado", "expirado" y "membresía activa".

### Sprint 5: Pagos y Cobertura
1. **Stripe Integration:** Flujo de pago de membresía y copagos.
2. **Cálculo de Cobertura:** Lógica de porcentaje de cobertura por plan.
3. **Recibos:** Generación de PDF de pago.

### Sprint 6: PWA & Final Polish
1. **Service Worker:** Implementación de Workbox para modo offline.
2. **Push Notifications:** Firebase Cloud Messaging para recordatorios.
3. **Lighthouse Audit:** Optimización de performance y accesibilidad.

---

## 6. MÉTODOS DE VERIFICACIÓN (DoD)
- [ ] **Unit Tests:** 80% coverage en lógica de negocio (Vitest/Jest).
- [ ] **E2E Tests:** Flujos críticos (Login -> Agendar -> Validar QR) pasan en Cypress.
- [ ] **Visual Check:** La tarjeta digital coincide con la `Plantilla_Membresias`.
- [ ] **Security Audit:** No hay secretos expuestos y los headers de seguridad están activos.
