import requests
import json

# --- CONFIGURACIÓN ---
API_BASE_URL = "http://localhost:8080"
USUARIO_PRUEBA = "user_test_01"
CONTRASENA_PRUEBA = "TestPassword1!" # Asegúrate de que este usuario y contraseña existan
# ---------------------

def get_jwt(username, password):
    """Obtiene el Token JWT haciendo POST al endpoint de login."""
    url = f"{API_BASE_URL}/auth/signin"
    print(f"-> Intentando autenticar usuario: {username}...")
    
    try:
        response = requests.post(url, json={"username": username, "password": password})
        response.raise_for_status() # Lanza excepción para códigos 4xx/5xx

        data = response.json()
        print("✅ Autenticación exitosa.")
        return data.get("token")
        
    except requests.exceptions.RequestException as e:
        print(f"❌ ERROR de autenticación o conexión: {e}")
        if 'response' in locals() and response.status_code == 401:
             print("   Verifica que el usuario y la contraseña sean correctos.")
        return None

def create_task(token, task_data):
    """Crea una tarea haciendo POST al endpoint de tareas con el Token."""
    url = f"{API_BASE_URL}/tareas/crear"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    try:
        response = requests.post(url, headers=headers, json=task_data)
        response.raise_for_status()
        
        return f"✅ Tarea '{task_data['titulo']}' creada. (ID: {response.json().get('id')})"
        
    except requests.exceptions.RequestException as e:
        error_msg = response.json().get("mensaje", "Error desconocido del backend.") if 'response' in locals() else str(e)
        return f"❌ Falló al crear '{task_data['titulo']}'. Error: {error_msg}"


# --- DATOS DE LAS 15 TAREAS (Variando prioridad y estado) ---
TASK_DATA = [
    {
        "titulo": "Estudiar para Parcial de Cálculo",
        "descripcion": "Repasar integrales y derivadas para el examen del viernes.",
        "prioridad": "ALTA",
        "estado": "EN_PROGRESO"
    },
    {
        "titulo": "Entrega Taller de Bases de Datos",
        "descripcion": "Terminar el diagrama entidad-relación y las consultas SQL.",
        "prioridad": "ALTA",
        "estado": "PENDIENTE"
    },
    {
        "titulo": "Leer PDF de Ingeniería de Software",
        "descripcion": "Lectura del capítulo 4 sobre metodologías ágiles.",
        "prioridad": "MEDIA",
        "estado": "COMPLETADA"
    },
    {
        "titulo": "Reunión Grupo de Proyecto",
        "descripcion": "Definir los roles para el trabajo final de semestre.",
        "prioridad": "MEDIA",
        "estado": "PENDIENTE"
    },
    {
        "titulo": "Hacer mercado semanal",
        "descripcion": "Comprar leche, huevos, pan y frutas.",
        "prioridad": "MEDIA",
        "estado": "PENDIENTE"
    },
    {
        "titulo": "Pagar recibo de internet",
        "descripcion": "Vence el día 15, pagar por PSE.",
        "prioridad": "ALTA",
        "estado": "PENDIENTE"
    },
    {
        "titulo": "Lavar la ropa",
        "descripcion": "Separar ropa blanca y de color.",
        "prioridad": "BAJA",
        "estado": "COMPLETADA"
    },
    {
        "titulo": "Sacar cita médica",
        "descripcion": "Llamar para control general.",
        "prioridad": "BAJA",
        "estado": "EN_PROGRESO"
    },
    {
        "titulo": "Arreglar bug en el Login",
        "descripcion": "El botón de 'Olvidé contraseña' no redirige bien.",
        "prioridad": "ALTA",
        "estado": "EN_PROGRESO"
    },
    {
        "titulo": "Actualizar LinkedIn",
        "descripcion": "Agregar el nuevo proyecto de Task Manager al portafolio.",
        "prioridad": "MEDIA",
        "estado": "PENDIENTE"
    },
    {
        "titulo": "Hacer backup del PC",
        "descripcion": "Subir archivos importantes a la nube.",
        "prioridad": "MEDIA",
        "estado": "EN_PROGRESO"
    },
    {
        "titulo": "Investigar sobre Docker",
        "descripcion": "Ver tutorial para contenerizar la aplicación.",
        "prioridad": "BAJA",
        "estado": "PENDIENTE"
    },
    {
        "titulo": "Comprar regalo de cumpleaños",
        "descripcion": "Buscar algo para el cumpleaños de mamá.",
        "prioridad": "ALTA",
        "estado": "PENDIENTE"
    },
    {
        "titulo": "Organizar escritorio",
        "descripcion": "Limpiar cables y organizar papeles.",
        "prioridad": "BAJA",
        "estado": "EN_PROGRESO"
    },
    {
        "titulo": "Crear Repositorio",
        "descripcion": "Inicializar git y subir el primer commit",
        "prioridad": "BAJA",
        "estado": "COMPLETADA"
    }
]


if __name__ == "__main__":
    
    # 1. Obtener el Token JWT
    token = get_jwt(USUARIO_PRUEBA, CONTRASENA_PRUEBA)
    
    if token:
        print("\n--- INICIANDO CARGA DE TAREAS ---")
        resultados_exitosos = 0
        
        for i, task in enumerate(TASK_DATA):
            # 2. Crear la tarea usando el token
            resultado = create_task(token, task)
            print(f"[{i+1}/{len(TASK_DATA)}] {resultado}")
            
            if resultado.startswith("✅"):
                resultados_exitosos += 1
                
        print("\n--- PROCESO FINALIZADO ---")
        print(f"Tareas creadas exitosamente: {resultados_exitosos} de {len(TASK_DATA)}.")
        print(f"Usuario asociado: {USUARIO_PRUEBA}")