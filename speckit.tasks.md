# SPEC KIT - TASKS
## PWA Membresía Salud - Hospital San Diego de Alcalá

**Estado:** Definición de Tareas
**Referencia:** speckit.plan.md

---

## 🚩 SPRINT 1: AUTH & VISUAL BASE (Semanas 1-2)

### 1.1 Setup de Infraestructura y Diseño
- [ ] **TASK-1.1.1:** Inicializar proyecto Frontend con Vite + React + TypeScript.
- [ ] **TASK-1.1.2:** Configurar Tailwind CSS y Shadcn/ui.
- [ ] **TASK-1.1.3:** Instalar y configurar fuentes Avenir (Black, Medium, Light) vía CSS `@font-face`.
- [ ] **TASK-1.1.4:** Definir paleta de colores corporativos en `tailwind.config.ts` basada en `logo.png`.
- [ ] **TASK-1.1.5:** Crear estructura de carpetas según `speckit.plan.md`.

### 1.2 Backend Core & Auth
- [ ] **TASK-1.2.1:** Setup de Node.js + Express + TypeScript y Docker Compose.
- [ ] **TASK-1.2.2:** Configurar Prisma ORM y desplegar esquema de base de datos inicial (User, Membership).
- [ ] **TASK-1.2.3:** Implementar Endpoint `POST /api/auth/register` con validación Zod.
- [ ] **TASK-1.2.4:** Implementar Endpoint `POST /api/auth/login` con generación de JWT (Access + Refresh).
- [ ] **TASK-1.2.5:** Implementar Middleware de autenticación y protección de rutas.

### 1.3 Frontend Auth UI
- [ ] **TASK-1.3.1:** Crear página de Registro con validaciones en tiempo real.
- [ ] **TASK-1.3.2:** Crear página de Login con soporte para recordar sesión.
- [ ] **TASK-1.3.3:** Implementar `ProtectedRoute` component para restringir acceso al dashboard.
- [ ] **TASK-1.3.4:** Integrar Zustand `authStore` para gestión de sesión global.

### 1.4 Visual Identity (The "WOW" Factor)
- [ ] **TASK-1.4.1:** Desarrollar componente `DigitalMembershipCard` basado en la plantilla visual.
- [ ] **TASK-1.4.2:** Implementar efectos de Glassmorphism y gradientes premium en la tarjeta.
- [ ] **TASK-1.4.3:** Crear Dashboard principal con la tarjeta como elemento central.
- [ ] **TASK-1.4.4:** Implementar animaciones de entrada con Framer Motion.

---

## 🚩 SPRINT 2: CITAS MÉDICAS (Semanas 3-4)

### 2.1 Backend Citas
- [ ] **TASK-2.1.1:** Modelar tablas `Doctor`, `Cita` y `Especialidad` en Prisma.
- [ ] **TASK-2.1.2:** Crear API para listar especialidades y doctores.
- [ ] **TASK-2.1.3:** Implementar lógica de disponibilidad (slots de 30 min) en el servidor.
- [ ] **TASK-2.1.4:** Implementar `POST /api/citas/agendar` con validación de cobertura.

### 2.2 Frontend Citas UI
- [ ] **TASK-2.2.1:** Crear vista de catálogo de especialidades con iconos.
- [ ] **TASK-2.2.2:** Implementar selector de fecha y hora interactivo.
- [ ] **TASK-2.2.3:** Desarrollar flujo de confirmación de cita y visualización de copago.
- [ ] **TASK-2.2.4:** Crear sección "Mis Citas" con historial y estados (confirmada/cancelada).

---

## 🚩 SPRINT 3: EXPEDIENTE CLÍNICO (Semanas 5-6)

### 3.1 Seguridad & Biometría
- [ ] **TASK-3.1.1:** Implementar integración de WebAuthn (FaceID/Fingerprint) en Frontend.
- [ ] **TASK-3.1.2:** Crear endpoint de verificación biométrica en Backend.
- [ ] **TASK-3.1.3:** Implementar middleware de "Acceso Protegido" que fuerce biometría para datos PHI.

### 3.2 Gestión de Datos Médicos
- [ ] **TASK-3.2.1:** Implementar encriptación AES-256 para campos sensibles del expediente.
- [ ] **TASK-3.2.2:** Crear vista de Expediente Clínico con secciones de Alergias y Medicamentos.
- [ ] **TASK-3.2.3:** Integrar AWS S3 para almacenamiento de documentos PDF.
- [ ] **TASK-3.2.4:** Implementar generador de PDF para el expediente completo.

---

## 🚩 SPRINT 4: QR ANTI-DUPLICACIÓN (Semanas 7-8)

### 4.1 Lógica de Tokens QR
- [ ] **TASK-4.1.1:** Implementar generación de token único `UUID + HMAC`.
- [ ] **TASK-4.1.2:** Crear API para generación y entrega de QR en formato base64/PNG.
- [ ] **TASK-4.1.3:** Implementar lógica de expiración y marcado de "usado" en DB.

### 4.2 Validación de Mostrador
- [ ] **TASK-4.2.1:** Implementar `QRScanner` component usando `html5-qrcode`.
- [ ] **TASK-4.2.2:** Crear flujo de validación para staff: Escaneo -> API Check -> Resultado Visual.
- [ ] **TASK-4.2.3:** Implementar logs de auditoría detallados para cada escaneo (IP, Location, Timestamp).

---

## 🚩 SPRINT 5: PAGOS & COBERTURA (Semanas 9-10)

### 5.1 Pasarela de Pagos
- [ ] **TASK-5.1.1:** Configurar Stripe SDK en Backend.
- [ ] **TASK-5.1.2:** Implementar flujo de Checkout para pago de membresía y copagos.
- [ ] **TASK-5.1.3:** Crear Webhook de Stripe para actualizar estado de pago en DB.

### 5.2 Motor de Cobertura
- [ ] **TASK-5.2.1:** Implementar lógica de cálculo de cobertura según el plan (Básico/Plus/Premium).
- [ ] **TASK-5.2.2:** Crear vista de "Mis Beneficios" detallando servicios cubiertos y límites anuales.
- [ ] **TASK-5.2.3:** Generar recibos de pago en formato PDF.

---

## 🚩 SPRINT 6: PWA & POLISH (Semanas 11-12)

### 6.1 Capacidades PWA
- [ ] **TASK-6.1.1:** Configurar Web Manifest y Service Worker con Workbox.
- [ ] **TASK-6.1.2:** Implementar estrategias de cache (CacheFirst para assets, NetworkFirst para API).
- [ ] **TASK-6.1.3:** Desarrollar modo offline para visualización de tarjeta y citas próximas.

### 6.2 Notificaciones y Calidad
- [ ] **TASK-6.2.1:** Integrar Firebase Cloud Messaging (FCM) para push notifications.
- [ ] **TASK-6.2.2:** Implementar recordatorios automáticos de citas.
- [ ] **TASK-6.2.3:** Ejecutar auditoría final de Lighthouse y optimizar performance (Core Web Vitals).
- [ ] **TASK-6.2.4:** Realizar User Acceptance Testing (UAT) con usuarios piloto.

---

## 🚩 INFRAESTRUCTURA, SEGURIDAD & DEPLOY (Transversal)

### I. Docker & VPS Setup
- [ ] **TASK-INFRA.1:** Crear `Dockerfile` multi-stage para Backend y Frontend.
- [ ] **TASK-INFRA.2:** Configurar `docker-compose.yml` con volúmenes persistentes para PostgreSQL.
- [ ] **TASK-INFRA.3:** Configurar Nginx como Reverse Proxy con SSL (Certbot/Let's Encrypt).
- [ ] **TASK-INFRA.4:** Setup de Firewall en VPS (UFW) permitiendo solo puertos 80, 443 y SSH.
- [ ] **TASK-INFRA.5:** Implementar estrategia de Backups diarios de la base de datos hacia S3.

### II. Security Hardening
- [ ] **TASK-SEC.1:** Implementar `helmet` y CORS estricto en el servidor Express.
- [ ] **TASK-SEC.2:** Configurar `express-rate-limit` en rutas críticas (Auth, QR validation).
- [ ] **TASK-SEC.3:** Implementar validación de esquemas con Zod en todos los endpoints.
- [ ] **TASK-SEC.4:** Configurar logs de auditoría inmutables para accesos a expedientes clínicos.
- [ ] **TASK-SEC.5:** Verificación de cumplimiento HIPAA (Encriptación AES-256 en reposo).
