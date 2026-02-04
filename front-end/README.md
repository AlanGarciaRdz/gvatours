# GVA Tours - Frontend

Sistema de gestión de charters turísticos y reservaciones de hotel.

## Requisitos Previos

- **Node.js**: v16.x o v20.x (recomendado v20.13.1)
- **npm**: v7+ o superior
- **Backend**: El servidor debe estar corriendo en el puerto 19001

## Instalación

```bash
# Limpiar instalaciones anteriores (si es necesario)
rm -rf node_modules package-lock.json

# Instalar dependencias
npm install
```

## Configuración

### Variables de Entorno

El proyecto usa diferentes URLs del backend según el entorno:

- **Development**: `http://localhost:19001`
- **Test DB**: `//52.7.16.247:19001`
- **Production**: `//52.7.16.247:19001`

Las configuraciones se encuentran en `src/utils/API.js`

## Scripts Disponibles

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run start

# Iniciar con base de datos de prueba
npm run test_db
```

El frontend correrá en [http://localhost:3000](http://localhost:3000)

### Build y Deploy

```bash
# Build de producción
npm run build

# Deploy completo a servidor (con rsync)
npm run deploy

# Deploy con scp (alternativo)
npm run deploys
```

**Nota**: Los comandos de deploy requieren:
- Archivo de llave PEM en `~/Documents/alan/gvatours/gvatours.pem`
- Acceso SSH al servidor `ec2-user@52.7.16.247`
- Permisos de escritura en `/var/www/html/` del servidor

### Testing

```bash
npm run test
```

## Dependencias Principales

- **React**: 17.0.2
- **React Router**: 5.3.4
- **Material-UI**: 4.12.4
- **Axios**: 1.6.0
- **jsPDF**: Para generación de PDFs
- **react-datepicker**: Selector de fechas
- **recharts**: Gráficas

## Troubleshooting

### Error de Puerto 19001

Si el frontend no puede conectarse al backend:

```bash
# Verificar que el servidor backend esté corriendo
lsof -ti:19001

# Si no está corriendo, iniciar el backend
cd ../server
npm start
```

### Error de Node/Sass

Si hay errores con `node-sass` o compatibilidad de Node:

```bash
# Usar Node v20
nvm use 20

# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas de Deploy

Si el deploy falla con permisos:

```bash
# Conectarse al servidor
ssh -i "~/Documents/alan/gvatours/gvatours.pem" ec2-user@52.7.16.247

# Ajustar permisos
sudo chown -R ec2-user:ec2-user /var/www/html/
sudo chmod -R 755 /var/www/html/

# Verificar que mod_rewrite esté habilitado
sudo apachectl -M | grep rewrite
```

### Rutas 404 en Producción

Si las rutas no funcionan al recargar la página:

1. Verificar que `.htaccess` esté en `/var/www/html/.htaccess`
2. Verificar que Apache tenga `AllowOverride All` para el directorio
3. Verificar que `mod_rewrite` esté habilitado

## Estructura del Proyecto

```
src/
├── modules/
│   ├── admin/          # Administración (Usuarios, Clientes, Agencias, Hoteles)
│   ├── home/           # Módulos principales (Charters, Cupones, Contratos, Recibos)
│   ├── login/          # Autenticación
│   └── core/           # Componentes compartidos
├── utils/              # Utilidades (API, PDFs, helpers)
└── routes.js           # Configuración de rutas
```

## Información de Producción

- **URL**: http://sistemagvatours.com
- **Servidor**: AWS EC2 (52.7.16.247)
- **Web Server**: Apache 2.2.34

## LocalStorage Keys

El sistema usa localStorage para mantener sesión:

```javascript
// Setters (al hacer login)
localStorage.setItem('09b267c0', res.data.role);      // Role del usuario
localStorage.setItem('6443a053', res.data.name);      // Nombre
localStorage.setItem('c7383f2e', res.data.email);     // Email
localStorage.setItem('4055bf1e', res.data.uuid_user); // UUID
localStorage.setItem('4718acf4', res.data.id_user);   // ID
localStorage.setItem('63dd46ba', res.data.iniciales); // Iniciales

// Getters
localStorage.getItem('09b267c0');

// Limpiar sesión
localStorage.clear();
```
