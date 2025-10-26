# 🎮 PokéDex FullStack

Una aplicación web completa que consume la **PokéAPI** para explorar el mundo Pokémon con autenticación, sistema de favoritos y caché optimizada.

## ✨ Características

- 🔍 **Búsqueda avanzada** - Encuentra Pokémon por nombre
- 📊 **Información detallada** - Stats, tipos, habilidades y cadena evolutiva
- ⭐ **Sistema de favoritos** - Guarda tus Pokémon preferidos por usuario
- ⚡ **Caché inteligente** - Respuestas rápidas con Redis y TTL configurable
- 🔐 **Autenticación segura** - Gestión de usuarios y sesiones
- 🛡️ **Rate limiting** - Protección contra abuso de endpoints
- 🎨 **Interfaz moderna** - Experiencia de usuario fluida y responsiva

---

## 🚀 Stack Tecnológico

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de datos:** MongoDB
- **Caché:** Redis
- **Seguridad:** CORS

### Frontend

- **Framework:** React 18
- **Build tool:** Vite
- **Gestión de estado:** Context API / Redux
- **Estilos:** CSS Modules / Tailwind CSS

### DevOps & Calidad

- **Linter:** ESLint
- **Formatter:** Prettier
- **Package Manager:** npm

---

## 📋 Prerequisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [MongoDB](https://www.mongodb.com/) (local o Atlas)
- [Redis](https://redis.io/) (opcional, para caché)
- [Git](https://git-scm.com/)

---

## 🛠️ Instalación

### 1️⃣ Clonar los repositorios

**Backend:**

```bash
git clone https://github.com/Pichardo098/api_pokemon.git
cd poke_api
npm install
```

**Frontend:**

```bash
git clone https://github.com/Pichardo098/ApiPokemonV2.git
cd ApiPokemonV2
npm install
```

### 2️⃣ Configurar variables de entorno

Crea un archivo `.env` en cada proyecto basándote en `.env.example`:

**Backend (.env):**

```env
PORT=3000
HOST=localhost
NODE_ENV=development
POKE_API_URL=https://pokeapi.co/api/v2/
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_TTL=3600
RATE_LIMIT_WINDOW_MS=15
RATE_LIMIT_MAX=1000
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=poke
DB_PORT=27017
```

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:3000/api
```

### 3️⃣ Ejecutar la aplicación

Abre tres terminales:

**Terminal 1 - Redis (WSL):**

```bash
# Iniciar Redis en WSL
redis-server
```

Redis estará disponible en `redis://localhost:6379`

**Terminal 2 - Backend:**

```bash
cd poke_api
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

**Terminal 3 - Frontend:**

```bash
cd ApiPokemonV2
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

> **Nota:** Si Redis no está instalado en WSL, puedes instalarlo con:
>
> ```bash
> sudo apt update
> sudo apt install redis-server
> ```

---

## 📚 Funcionalidades Principales

### 🔎 Exploración de Pokémon

- Lista paginada con todos los Pokémon disponibles
- Búsqueda en tiempo real por nombre
- Filtros por tipo

### 📖 Información Detallada

- Estadísticas base (HP, Ataque, Defensa, etc.)
- Tipos y debilidades
- Habilidades y movimientos
- Cadena evolutiva completa
- Sprites y artwork oficial

### ⭐ Gestión de Favoritos

- Agregar/eliminar Pokémon favoritos
- Persistencia por usuario autenticado
- Vista dedicada de favoritos

### 🚀 Optimizaciones

- **Caché Redis:** Reducción de llamadas a la PokéAPI
- **Rate Limiting:** Protección de endpoints (100 req/15min)
- **Manejo de errores:** Respuestas consistentes y descriptivas

---

## 🗂️ Estructura del Proyecto

```
poke_api/                 # Backend
├── src/
│   ├── controllers/      # Lógica de negocio
│   ├── models/           # Esquemas MongoDB
│   ├── routes/           # Endpoints API
│   └── utils/            # Helpers y constantes
├── .env.example
└── package.json

ApiPokemonV2/             # Frontend
├── src/
│   ├── components/       # Componentes React
│   ├── pages/            # Vistas principales
│   ├── hooks/            # Custom hooks
│   ├── store/            # Redux store
├── .env.example
└── package.json
```

---

## 🔧 Scripts Disponibles

### Backend

```bash
npm run dev        # Modo desarrollo con nodemon
```

### Frontend

```bash
npm run dev        # Servidor de desarrollo
npm run lint       # Verificar código
```

---

## 🌐 API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Pokémon

- `GET /api/pokemon` - Listar Pokémon
- `GET /api/pokemon/details/:name or /api/pokemon/details/:id` - Detalle de Pokémon
- `GET /api/pokemon/catalog/types` - Obtener todos los tipos de Pokémon
- `GET /api/pokemon/type/:type` - Obtener todos los Pokémon de un tipo
- `GET /api/pokemon/specie/:name` - Obtener los detalles de un Pokémon específico
- `GET /api/pokemon/chain/:id` - Obtener la cadena evolutiva de un Pokémon

### Favoritos

- `GET /api/favorites/:userId` - Obtener favoritos del usuario
- `POST /api/favorites/` - Agregar a favoritos
- `DELETE /api/favorites/` - Eliminar de favoritos

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👤 Autor

**Pichardo098**

- GitHub: [@Pichardo098](https://github.com/Pichardo098)

---

## 🙏 Agradecimientos

- [PokéAPI](https://pokeapi.co/) - API pública de Pokémon
- Comunidad de desarrolladores Open Source
- The Pokémon Company (por el increíble universo Pokémon)

---

⭐ **¡Si te gustó el proyecto, dale una estrella en GitHub!** ⭐
