# GVA Tours - Backend API

API REST para el sistema de gestión de charters turísticos y reservaciones.

## Requisitos Previos

- **Node.js**: v16.x o v20.x
- **PostgreSQL**: 9.x o superior
- **npm**: v7+ o superior

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env_template .env
```

## Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=19001

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gvatours
DB_USER=postgres
DB_PASSWORD=tu_password

# Para producción
# DB_HOST=database-gva.ctdlpwrrgw3t.us-east-2.rds.amazonaws.com
```

### Base de Datos PostgreSQL

#### Instalación Local (macOS)

```bash
# Instalar PostgreSQL
brew install postgresql

# Iniciar servicio
brew services start postgresql

# Conectarse
psql postgres
```

#### Configuración de Usuario

```sql
CREATE ROLE postgres WITH LOGIN PASSWORD 'password';
ALTER ROLE postgres CREATEDB;
CREATE DATABASE gvatours;
```

#### Conectarse a Base de Datos

```bash
# Local
psql -d gvatours -U postgres

# Producción (AWS RDS)
psql -U postgres -h database-gva.ctdlpwrrgw3t.us-east-2.rds.amazonaws.com -p 5432 postgres
```

## Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor (producción)
npm start

# Desarrollo con auto-reload
npm run test

# Producción con auto-reload
npm run testprod

# Debug mode
npm run debug
```

El servidor correrá en [http://localhost:19001](http://localhost:19001)

### Deploy

```bash
# Deploy a servidor con rsync
npm run deploy

# Iniciar con PM2 en servidor
npm run pm2start

# Detener PM2
npm run pm2delete

# Matar proceso en puerto 19001
npm run killport
```

## Endpoints de la API

### Autenticación

```
POST /Login
POST /Registro
```

### Charters

```
GET    /Charters
POST   /Charter
PUT    /Charter/:id
DELETE /Charter/:id
```

### Cupones

```
GET    /Cupones
POST   /Cupon
PUT    /Cupon/:id
DELETE /Cupon/:id
```

### Contratos de Transporte

```
GET    /Contratos
POST   /Contrato
PUT    /Contrato/:id
DELETE /Contrato/:id
```

### Recibos

```
GET    /Recibos
POST   /Recibo
PUT    /Recibo/:id
DELETE /Recibo/:id
```

### Administración

```
GET    /Usuarios
POST   /Usuario
PUT    /Usuario/:id
DELETE /Usuario/:id

GET    /Clientes
POST   /Cliente
PUT    /Cliente/:id
DELETE /Cliente/:id

GET    /Agencias
POST   /Agencia
PUT    /Agencia/:id
DELETE /Agencia/:id
POST   /Agencia/upload (upload de imágenes)

GET    /Hoteles
POST   /Hotel
PUT    /Hotel/:id
DELETE /Hotel/:id
```

## Estructura del Proyecto

```
server/
├── app.js              # Punto de entrada
├── db/
│   ├── connection/     # Configuración de PostgreSQL
│   └── models/         # Modelos de datos
│       ├── charters.js
│       ├── clients.js
│       ├── cupon.js
│       ├── hotels.js
│       ├── login.js
│       ├── receipts.js
│       ├── transportcontracts.js
│       ├── travelagencies.js
│       └── users.js
├── documents/          # Templates de documentos HTML/PDF
│   ├── contrato_transporte.html
│   ├── cupon.html
│   └── recibo.html
└── src/
    └── image.js        # Gestión de imágenes
```

## Dependencias Principales

- **express**: Framework web
- **pg**: Cliente PostgreSQL
- **cors**: Manejo de CORS
- **helmet**: Seguridad HTTP
- **bcrypt**: Encriptación de contraseñas
- **html-pdf**: Generación de PDFs
- **express-fileupload**: Upload de archivos
- **uuid**: Generación de IDs únicos

## Troubleshooting

### Puerto en Uso

Si el puerto 19001 está ocupado:

```bash
# Ver proceso usando el puerto
lsof -ti:19001

# Matar proceso
npm run killport
# o manualmente:
kill -9 $(lsof -ti:19001)
```

### Error de Conexión a Base de Datos

Verificar:

1. PostgreSQL está corriendo: `brew services list`
2. Credenciales correctas en `.env`
3. Base de datos existe: `psql -l`

```bash
# Reiniciar PostgreSQL
brew services restart postgresql
```

### Problemas con PM2 en Producción

```bash
# SSH al servidor
ssh -i "~/Documents/alan/gvatours/gvatours.pem" ec2-user@52.7.16.247

# Ver estado de PM2
pm2 status

# Ver logs
pm2 logs gva_service

# Reiniciar servicio
pm2 restart gva_service
```

## Deploy a Producción

### Preparación

1. Archivo `.env` en servidor con configuración de producción
2. Base de datos PostgreSQL RDS configurada
3. PM2 instalado globalmente en servidor

### Proceso

```bash
# 1. Deploy código
npm run deploy

# 2. SSH al servidor
ssh -i "~/Documents/alan/gvatours/gvatours.pem" ec2-user@52.7.16.247

# 3. Ir al directorio
cd /opt/gva-service

# 4. Instalar dependencias (si es necesario)
npm install

# 5. Iniciar con PM2
pm2 start ecosystem.config.js

# 6. Guardar configuración PM2
pm2 save
```

## Información de Producción

- **Servidor**: AWS EC2 (52.7.16.247)
- **Puerto**: 19001
- **Base de Datos**:  PostgreSQL local 
- **Process Manager**: PM2
- **Ubicación**: `/opt/gva-service`
