# SPEC KIT - SPECIFY
## PWA Membresía Salud - Hospital San Diego de Alcalá

**Versión:** 1.0
**Fecha:** Mayo 2026
**Responsable:** René Fimbres V.
**Estado:** Pendiente de aprobación

---

## 1. VISIÓN Y OBJETIVOS

### 1.1 Propósito del sistema
- **¿Qué resuelve?** Gestión integral de membresía de salud: agendamiento de citas, consulta de expediente clínico, validación de cobertura, pagos y generación de QR único
- **¿Por qué existe?** Digitalizar procesos manuales del hospital (formularios papel, teléfono) para reducir tiempos de espera
- **¿Problema principal?** Duplicación de atenciones por falta de validación y tiempos de espera de 30+ minutos en mostrador

---

## 2. SISTEMA DE DISEÑO Y ESTÉTICA (Visual Identity)

### 2.1 Tipografía Corporativa
Se implementará la familia **Avenir** para garantizar una apariencia premium y moderna:
- **Avenir Black:** Títulos principales, encabezados de sección y alertas críticas.
- **Avenir Medium:** Subtítulos, etiquetas de formulario y botones.
- **Avenir Light:** Cuerpo de texto, descripciones y datos secundarios.

### 2.2 Identidad Visual
- **Paleta de Colores:** Derivada del logo oficial (`logo.png`).
- **Estilo UI:**
    - **Glassmorphism:** Uso de fondos semi-transparentes con blur en tarjetas y modales.
    - **Sombras Suaves:** Elevación sutil para componentes interactivos.
    - **Modo Oscuro/Claro:** Soporte nativo coherente con la identidad del hospital.
- **Componente Estrella: Digital Membership Card**
    - Diseño basado en la `Plantilla_Membresias`.
    - Fondo con gradiente premium.
    - Información clave: Nombre del paciente, ID de membresía y Plan.
    - Integración directa del QR de validación en la tarjeta.

---

## 3. HISTORIAS DE USUARIO


### Sprint 1: Auth + Dashboard

| ID | HU | Criterios de Aceptación |
|----|----|-------------------------|
| HU-01 | Registro con email/password + documento de identidad | - Email único en sistema<br>- Password: min 8 chars, mayúscula, minúscula, número, spécial<br>- Documento_ID único (cédula/passport)<br>- Fecha nacimiento obligatoria<br>- Return: JWT access + refresh token |
| HU-02 | Login + mantener sesión activa | - Login con email/password<br>- WebAuthn (biometría) como alternativa<br>- Sesión persiste 15 min inactividad<br>- Refresh token rotation automático |
| HU-03 | Ver estado de membresía en dashboard | - **Visualización de Tarjeta Digital** (Basada en Plantilla_Membresias)<br>- Plan actual (básico/plus/premium)<br>- Estado (activa/vencida/suspendida)<br>- Fecha de expiración<br>- Dependientes autorizados<br>- Servicios cubiertos resumen |

### Sprint 2: Citas Médicas

| ID | HU | Criterios de Aceptación |
|----|----|-------------------------|
| HU-04 | Ver especialidades disponibles | - Lista especialidades con iconos<br>- Filtrar por categoría (consulta, cirugía, urgencia)<br>- Mostrar doctores por especialidad |
| HU-05 | Ver disponibilidad de doctores por fecha | - Calendar picker con fechas disponibles<br>- Slots de 30 minutos<br>- Indicador visual de ocupados/disponibles<br>- Horario de atención configurable |
| HU-06 | Agendar una cita médica | - Seleccionar doctor, especialidad, fecha, hora<br>- Validar cobertura antes de agendar<br>- Mostrar copago si aplica<br>- QR único generado (UUID+HMAC)<br>- Email + SMS confirmación<br>- Notificación push |
| HU-07 | Cancelar una cita | - Cancelar con 48h mínimo de anticipación<br>- Reembolso automático si ya pagó<br>- Notificar al doctor<br>- Registro en historial |
| HU-08 | Ver historial de citas | - Lista citas pasadas y futuras<br>- Estado: confirmada, completada, cancelada<br>- Filtrar por rango de fechas<br>- Ver detalles de cada cita |

### Sprint 3: Expediente Clínico

| ID | HU | Criterios de Aceptación |
|----|----|-------------------------|
| HU-09 | Consultar mi expediente clínico | - Requiere biometría (WebAuthn) para acceder<br>- Alergias (lista)<br>- Medicamentos actuales<br>- Condiciones médicas<br>- Historial quirúrgico<br>- Documentos adjuntos (PDF en S3) |
| HU-10 | Editar información de mi expediente | - Solo campos permitidos (alergias, medicamentos)<br>- Requiere biometría<br>- Registro de auditoría (quién, cuándo, qué cambió) |
| HU-11 | Descargar mi expediente como PDF | - PDF con logo HSDA<br>- Incluye todos los datos clínicos<br>- Fecha de generación<br>- Código QR de verificación |

### Sprint 4: QR Anti-duplicación

| ID | HU | Criterios de Aceptación |
|----|----|-------------------------|
| HU-12 | Generar un QR para mi cita | - QR único: UUID + HMAC( UUID + secret )<br>- Expira en fecha/hora de cita<br>- Visual: imagen PNG para mostrar en pantalla<br>- Opción de reenviar por email |
| HU-13 | Escanear el QR del paciente en mostrador | - Cámara web en Tablet del staff<br>- Validar: membresía activa, cobertura válida, no usado<br>- Mostrar: nombre paciente, plan, documento ID, servicio<br>- Resultado visual claro (aprobado/denegado) |
| HU-14 | Evitar uso duplicado del QR | - Registrar timestamp y IP del escaneo<br>- Bloquear segundo escaneo<br>- Mostrar mensaje claro si ya usado<br>- Log de auditoría completo |

### Sprint 5: Pagos + Cobertura

| ID | HU | Criterios de Aceptación |
|----|----|-------------------------|
| HU-15 | Ver mi historial de pagos | - Transacciones: fecha, monto, descripción, estado, recibo PDF<br>- Filtrar por rango de fechas<br>- Estado: pendiente, completada, fallida, reembolsada |
| HU-16 | Procesar un pago | - Stripe checkout seguro<br>- Moneda: MXN<br>- Comprobante PDF descargable<br>- Notificación de confirmación |
| HU-17 | Consultar servicios cubiertos | - Lista completa de servicios<br>- Porcentaje de cobertura<br>- Copagos definidos<br>- Límites anuales<br>- Diferencias por plan |

### Sprint 6: PWA + Offline

| ID | HU | Criterios de Aceptación |
|----|----|-------------------------|
| HU-18 | Acceder a la app sin internet | - Cache de datos críticos (citas próximas, datos membresía)<br>- Formularios que se syncronizan al reconectar<br>- Indicador de modo offline |
| HU-19 | Recibir notificaciones push | - Recordatorios de citas (24h antes)<br>- Estado de pagos<br>- Renovación de membresía<br>- Permiso explícito del usuario |
| HU-20 | Instalar la app en mi dispositivo | - PWA installable (iOS Safari, Android Chrome)<br>- Iconos 192x192 y 512x512<br>- Splash screen<br>- Standalone mode |

---

## 3. FLUJOS DE USUARIO PRINCIPALES

### Flujo 1: Registro + Login
```
[Paciente] → Register → Validación email/password → Login →
Dashboard (estado membresía)
```

### Flujo 2: Agendamiento de Cita
```
[Paciente] → Citas → Ver Especialidades → Seleccionar Doctor →
Elegir Fecha/Hora → Validar Cobertura → Confirmar →
QR Generado → Email/SMS → Mis Citas (lista actualizada)
```

### Flujo 3: Validación en Mostrador
```
[Paciente] → Llega al mostrador → staff escanea QR →
Sistema valida: membresía OK + cobertura OK + QR no usado →
Resultado: ✅ Aprobado / ❌ Denegado → Log auditoría
```

### Flujo 4: Consulta de Expediente
```
[Paciente] → Expediente → Biometría (WebAuthn) →
Ver datos clínicos → Descargar PDF (opcional) → Log auditoría
```

### Flujo 5: Pago de Membresía
```
[Paciente] → Pagos → Ver Deuda → Procesar Pago (Stripe) →
Confirmación → Receipt PDF → Historial actualizado
```

---

## 4. REQUISITOS NO FUNCIONALES

| Categoría | Requisito | Target |
|-----------|-----------|--------|
| **Performance** | Latencia API p95 | < 200ms |
| | Time to Interactive (TTI) | < 3s |
| | First Contentful Paint | < 1.5s |
| **Seguridad** | Encriptación datos reposo | AES-256 |
| | Encriptación datos tránsito | TLS 1.3 |
| | HIPAA compliance | Completo |
| | Rate limiting (login) | 5 intentos / 15 min |
| | Sesión timeout | 15 min inactividad |
| **Disponibilidad** | Uptime | 99.5% mensual |
| | Recovery Time Objective | 4h |
| | Recovery Point Objective | 1h |
| **Usabilidad** | Lighthouse Score | > 85 |
| | Offline functionality | 90% features |
| | Cross-browser | Chrome, Safari, Firefox |
| | Responsive | Mobile + Tablet + Desktop |

---

## 5. PREGUNTAS PARA CLARIFICAR ANTES DE IMPLEMENTAR

| # | Pregunta | Respuesta esperada |
|---|----------|-------------------|
| 1 | ¿Los planes (básico/plus/premium) tienen servicios diferenciados definidos? | Sí/No + lista servicios |
| 2 | ¿Ya se tiene lista de doctores o se necesita módulo admin para registrarlos? | Existe / Necesita módulo |
| 3 | ¿Notificaciones SMS vía Twilio o solo email? | Twilio + Email / Solo Email |
| 4 | ¿Escaneo QR: solo cámara o también entrada manual de código? | Cámara + Manual / Solo cámara |
| 5 | ¿Staff de mostrador usa la misma PWA o una app diferente? | Misma PWA / App separada |
| 6 | ¿Storage para documentos: AWS S3 u otro proveedor? | AWS S3 /Otro: ___ |

---

## 6. GLOSARIO DE TÉRMINOS

| Término | Definición |
|---------|------------|
| HMAC | Hash-based Message Authentication Code |
| QR Token | Código QR único con validación anti-duplicación |
| Copago | Monto fijo que paga el paciente por servicio |
| Deducible | Monto anual que debe pagar el paciente antes de cobertura |
| WebAuthn | API de autenticación web (biometría) |
| PWA | Progressive Web Application |
| PHI | Protected Health Information ( HIPAA ) |
| RTO | Recovery Time Objective |
| RPO | Recovery Point Objective |

---

## 7. DIAGRAMA DE CASOS DE USO (Simplificado)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  PACIENTE   │     │    STAFF    │     │  ADMINISTRADOR │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ 1. Registrarse    │                   │
       ├───────────────────┤                   │
       │ 2. Login          │                   │
       ├───────────────────┤                   │
       │ 3. Ver membresía │                   │
       ├───────────────────┼───────────────────┤
       │ 4. Agendar cita   │ 8. Escanear QR    │
       ├───────────────────┼───────────────────┤
       │ 5. Ver historial  │                   │
       ├───────────────────┤                   │
       │ 6. Ver expediente │                   │
       ├───────────────────┤                   │
       │ 7. Pagos          │                   │
       ├───────────────────┤                   │
       │ 9. Generar QR     │                   │
       └───────────────────┴───────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   SISTEMA         │
                    │ - Auth Service   │
                    │ - Citas Service  │
                    │ - Expediente S.  │
                    │ - QR Service     │
                    │ - Pagos Service │
                    └──────────────────┘
```

---

## 8. ENTREGABLES ESPERADOS

| Sprint | Entregable | Componentes |
|--------|------------|-------------|
| 1 | Auth + Dashboard | Registro, Login, WebAuthn, Dashboard, Protected Routes |
| 2 | Citas Médicas | Especialidades, Disponibilidad, Agendamiento, Cancelación, Historial |
| 3 | Expediente Clínico | Ver, Editar, PDF, Auditoría |
| 4 | QR Anti-duplicación | Generación QR, Escaneo, Validación, Anti-duplicado |
| 5 | Pagos + Cobertura | Historial, Stripe, Cobertura servicios |
| 6 | PWA + Offline | Service Worker, Cache, Push Notifications, Installable |

---

**Estado:** Pendiente de aprobación de stakeholder
**Próximo paso:** speckit.plan (Plan Técnico)

---

*Documento generado según SDD Protocol - Fase 2: Specify*