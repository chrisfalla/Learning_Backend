# Learning Backend - Sistema de Gestión Educativa

Sistema backend completo para la gestión de plataformas educativas, desarrollado con Node.js, Express y MongoDB.

## 🚀 Características

- **Autenticación y Autorización**: Sistema completo con JWT y roles (admin, instructor, estudiante)
- **Gestión de Usuarios**: CRUD completo con validaciones y permisos por roles
- **Gestión de Cursos**: Creación, actualización, eliminación y consulta de cursos
- **Sistema de Inscripciones**: Matrícula de estudiantes en cursos con validaciones
- **Gestión de Contenidos**: Módulos y lecciones organizados jerárquicamente
- **Sistema de Progreso**: Seguimiento del avance de estudiantes en lecciones y cursos
- **Upload de Archivos**: Subida de imágenes y archivos multimedia
- **Validaciones Robustas**: Validación de datos con express-validator
- **Logging**: Sistema de logs con Winston
- **Seguridad**: Helmet, rate limiting, sanitización de datos

## 🛠️ Tecnologías

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (jsonwebtoken)
- **Validación**: express-validator
- **Seguridad**: bcryptjs, helmet, express-rate-limit, express-mongo-sanitize
- **Logging**: Winston
- **Upload**: Multer
- **Variables de Entorno**: dotenv
- **Desarrollo**: nodemon

## 📁 Estructura del Proyecto

```
Learning_Backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # Configuración de MongoDB
│   │   ├── logger.js             # Configuración de Winston logger
│   │   └── multer.js             # Configuración de Multer para uploads
│   │
│   ├── controllers/
│   │   ├── authController.js     # Controlador de autenticación
│   │   ├── courseController.js   # Controlador de cursos
│   │   ├── enrollmentController.js # Controlador de inscripciones
│   │   ├── lessonController.js   # Controlador de lecciones
│   │   ├── moduleController.js   # Controlador de módulos
│   │   ├── progressController.js # Controlador de progreso
│   │   ├── uploadController.js   # Controlador de uploads
│   │   └── userController.js     # Controlador de usuarios
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js     # Verificación de JWT y autenticación
│   │   ├── errorMiddleware.js    # Manejo global de errores
│   │   ├── roleMiddleware.js     # Control de acceso por roles
│   │   └── validateMiddleware.js # Validación de requests
│   │
│   ├── models/
│   │   ├── Course.js             # Modelo de cursos
│   │   ├── Enrollment.js         # Modelo de inscripciones
│   │   ├── Lesson.js             # Modelo de lecciones
│   │   ├── Module.js             # Modelo de módulos
│   │   ├── Progress.js           # Modelo de progreso
│   │   └── User.js               # Modelo de usuarios
│   │
│   ├── routes/
│   │   ├── authRoutes.js         # Rutas de autenticación
│   │   ├── courseRoutes.js       # Rutas de cursos
│   │   ├── enrollmentRoutes.js   # Rutas de inscripciones
│   │   ├── lessonRoutes.js       # Rutas de lecciones
│   │   ├── moduleRoutes.js       # Rutas de módulos
│   │   ├── progressRoutes.js     # Rutas de progreso
│   │   ├── uploadRoutes.js       # Rutas de uploads
│   │   └── userRoutes.js         # Rutas de usuarios
│   │
│   ├── utils/
│   │   └── validators.js         # Validadores personalizados
│   │
│   └── app.js                    # Configuración de Express
│
├── uploads/                      # Directorio para archivos subidos
├── logs/                         # Directorio para logs
├── .env                          # Variables de entorno
├── .gitignore                    # Archivos ignorados por git
├── package.json                  # Dependencias del proyecto
└── server.js                     # Punto de entrada de la aplicación
```

## 🔐 Roles y Permisos

### Admin
- Gestión completa de usuarios
- Gestión completa de cursos
- Acceso a todas las funcionalidades

### Instructor
- Crear y gestionar sus propios cursos
- Gestionar módulos y lecciones de sus cursos
- Ver inscripciones y progreso de estudiantes

### Estudiante
- Ver cursos disponibles
- Inscribirse en cursos
- Acceder a contenido de cursos inscritos
- Marcar lecciones como completadas

## 🗄️ Modelos de Datos

### User
- name, email, password
- role: admin | instructor | student
- timestamps

### Course
- title, description, instructor
- duration, level, category, price
- isPublished, enrollmentCount
- timestamps

### Module
- title, description, course
- order, lessons
- timestamps

### Lesson
- title, description, module, course
- content, videoUrl, duration, order
- resources, isPublished
- timestamps

### Enrollment
- user, course, status
- enrolledAt, completedAt, progress
- timestamps

### Progress
- user, course, lesson
- completed, completedAt, timeSpent
- timestamps

## 🚦 API Endpoints

### Autenticación (`/api/auth`)
- `POST /register` - Registro de usuarios
- `POST /login` - Inicio de sesión
- `GET /me` - Perfil del usuario autenticado

### Usuarios (`/api/users`)
- `GET /` - Listar usuarios (admin)
- `GET /:id` - Obtener usuario por ID
- `PUT /:id` - Actualizar usuario
- `DELETE /:id` - Eliminar usuario (admin)

### Cursos (`/api/courses`)
- `POST /` - Crear curso (instructor/admin)
- `GET /` - Listar cursos
- `GET /:id` - Obtener curso por ID
- `PUT /:id` - Actualizar curso
- `DELETE /:id` - Eliminar curso
- `PATCH /:id/publish` - Publicar/despublicar curso

### Módulos (`/api/modules`)
- `POST /` - Crear módulo
- `GET /course/:courseId` - Módulos por curso
- `GET /:id` - Obtener módulo por ID
- `PUT /:id` - Actualizar módulo
- `DELETE /:id` - Eliminar módulo

### Lecciones (`/api/lessons`)
- `POST /` - Crear lección
- `GET /module/:moduleId` - Lecciones por módulo
- `GET /:id` - Obtener lección por ID
- `PUT /:id` - Actualizar lección
- `DELETE /:id` - Eliminar lección

### Inscripciones (`/api/enrollments`)
- `POST /` - Inscribirse en curso
- `GET /my-courses` - Cursos del usuario
- `GET /course/:courseId/students` - Estudiantes del curso
- `GET /:id` - Obtener inscripción
- `PATCH /:id/status` - Actualizar estado

### Progreso (`/api/progress`)
- `POST /complete` - Marcar lección como completada
- `GET /course/:courseId` - Progreso en curso
- `GET /lesson/:lessonId` - Progreso en lección

### Uploads (`/api/upload`)
- `POST /image` - Subir imagen
- `POST /video` - Subir video
- `POST /document` - Subir documento

## ⚙️ Configuración

### Variables de Entorno (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning_platform
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRE=7d
NODE_ENV=development
```

## 🚀 Instalación y Uso

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones
```

### Desarrollo

```bash
# Modo desarrollo con nodemon
npm run dev

# Modo producción
npm start
```

### Base de Datos

```bash
# Asegúrate de tener MongoDB ejecutándose
mongod

# O usa MongoDB Atlas para una base de datos en la nube
```

## 🔒 Seguridad

- **Hashing de Contraseñas**: bcryptjs con salt rounds
- **JWT**: Tokens con expiración configurable
- **Helmet**: Headers de seguridad HTTP
- **Rate Limiting**: Protección contra fuerza bruta
- **Sanitización**: Prevención de inyección NoSQL
- **CORS**: Control de acceso desde orígenes permitidos
- **Validación**: Validación exhaustiva de inputs

## 📝 Logging

Sistema de logging con Winston:
- Logs de errores en `logs/error.log`
- Logs combinados en `logs/combined.log`
- Logs en consola en desarrollo
- Rotación automática de logs

## 🧪 Testing

```bash
# Ejecutar tests (por implementar)
npm test
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

**Desarrollado con ❤️ para la educación en línea**
