# 🚀 Gestor de Tareas Personales (FullStack)

Solución para el reto técnico del Semillero Tech Davivienda. Una aplicación web robusta para la gestión eficiente de tareas con autenticación segura y roles de usuario.

## 🛠️ Tecnologías Utilizadas

### Backend
* **Java 17** & **Spring Boot 3**
* **Spring Security** + **JWT** (Autenticación Stateless)
* **Spring Data JPA** (Persistencia)
* **PostgreSQL Database** H2 (Configurable)
* **Validation API** (Control de calidad de datos)

### Frontend
* **React** + **Vite**
* **CSS Puro** (Diseño personalizado "Galaxy Theme")
* **Axios** (Comunicación HTTP con interceptores)
* **React Router** (Navegación SPA)
* **Lucide React** (Iconografía)

---

## ⚙️ Instrucciones de Ejecución

### 1. Backend (API)
El servicio corre en el puerto `8080`.

```bash
cd task-manager-api
./mvnw spring-boot:run
# O si usas IntelliJ, ejecuta la clase TaskManagerApplication