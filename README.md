# GVA Tours

Sistema completo de gestión de charters turísticos, reservaciones de hotel y administración de agencias de viajes.

## Descripción

GVA Tours es una aplicación web full-stack que permite:

- Gestión de charters terrestres desde Guadalajara a Puerto Vallarta
- Administración de cupones y contratos de transporte
- Generación automática de PDFs para documentación
- Control de recibos y pagos
- Administración de usuarios, clientes, agencias y hoteles

## Estructura del Proyecto

```
gvatours/
├── front-end/          # Aplicación React
├── server/             # API REST Node.js + Express
└── README.md           # Este archivo
```

## Requisitos del Sistema

- **Node.js**: v16.x o v20.x (recomendado v20.13.1)
- **PostgreSQL**: 9.x o superior
- **npm**: v7+

## Inicio Rápido

### 1. Configurar Backend

```bash
# Ir a la carpeta del servidor
cd server

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env_template .env

# Editar .env con tus credenciales de base de datos

# Iniciar servidor
npm start
```

El backend correrá en `http://localhost:19001`

### 2. Configurar Frontend

```bash
# En otra terminal, ir a la carpeta del frontend
cd front-end

# Instalar dependencias
npm install

# Iniciar aplicación
npm start
```

El frontend correrá en `http://localhost:3000`

## Documentación Detallada

- [Frontend README](./front-end/README.md) - Documentación completa del frontend
- [Backend README](./server/README.md) - Documentación completa del backend

## Tecnologías Utilizadas

### Frontend
- React 17
- Material-UI 4
- React Router 5
- Axios
- jsPDF
- Recharts

### Backend
- Node.js
- Express
- PostgreSQL
- html-pdf
- bcrypt
- JWT

## Flujo de Trabajo

### Desarrollo Local

1. Iniciar PostgreSQL
2. Iniciar backend en puerto 19001
3. Iniciar frontend en puerto 3000
4. Acceder a `http://localhost:3000`

### Deploy a Producción

#### Backend

```bash
cd server
npm run deploy
ssh -i "~/Documents/alan/gvatours/gvatours.pem" ec2-user@52.7.16.247
cd /opt/gva-service
pm2 restart gva_service
```

#### Frontend

```bash
cd front-end
npm run deploy
```

## URLs de Producción

- **Frontend**: http://sistemagvatours.com
- **Backend API**: http://52.7.16.247:19001
- **Servidor**: AWS EC2 (52.7.16.247)
- **Base de Datos**: AWS RDS PostgreSQL

## Características Principales

### Módulo de Charters
- Creación y edición de charters
- Puntos de salida configurables (Guadalajara)
- Puntos de llegada (Puerto Vallarta, Nuevo Vallarta, Sayulita, etc.)
- Generación automática de PDF con información del viaje
- Control de pagos y saldos pendientes

### Módulo de Cupones
- Emisión de cupones de hotel
- Gestión de reservaciones
- Generación de documentos PDF

### Módulo de Contratos
- Contratos de transporte
- Términos y condiciones
- Documentación legal

### Módulo de Recibos
- Generación de recibos de pago
- Conversión de números a letras
- Control de transacciones

### Administración
- Gestión de usuarios y roles
- Catálogo de clientes
- Catálogo de agencias de viajes
- Catálogo de hoteles
- Upload de imágenes para agencias

## Troubleshooting General

### Backend no conecta

```bash
# Verificar que PostgreSQL esté corriendo
brew services list

# Verificar puerto del backend
lsof -ti:19001
```

### Frontend no conecta al backend

Verificar que:
1. Backend esté corriendo en puerto 19001
2. Variables de entorno en `front-end/src/utils/API.js` sean correctas

### Problemas con Node

```bash
# Usar la versión correcta de Node
nvm use 20

# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
```

## Seguridad

- Autenticación mediante localStorage
- Contraseñas encriptadas con bcrypt
- Helmet.js para seguridad HTTP
- CORS configurado
- Validación de datos con Joi

## Soporte

Para problemas o preguntas:
- Revisar las secciones de Troubleshooting en cada README
- Verificar los logs del servidor
- Revisar la consola del navegador para errores del frontend

## Licencia

Privado - GVA Tours

---

**Última actualización**: Febrero 2026
