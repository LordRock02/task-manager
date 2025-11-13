import requests
import json

# --- CONFIGURACIÓN ---
API_BASE_URL = "http://localhost:8080"
SIGNUP_ENDPOINT = f"{API_BASE_URL}/auth/signup"
# Contraseña común (Debe cumplir los requisitos de seguridad: Mayús, Minús, Número, Símbolo)
COMMON_PASSWORD = "TestPassword1!" 
# ---------------------

# --- GENERACIÓN DINÁMICA DE 15 USUARIOS ---
USER_REGISTRATION_DATA = []
for i in range(1, 16):
    USER_REGISTRATION_DATA.append({
        "username": f"user_test_{i:02d}", # Genera nombres como 'user_test_01', 'user_test_02', etc.
        "password": COMMON_PASSWORD
    })
# ------------------------------------------

def register_user(user_data):
    """Intenta registrar un nuevo usuario y reporta el resultado."""
    
    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(SIGNUP_ENDPOINT, json=user_data, headers=headers)
        
        if response.status_code == 201:
            return f"✅ Usuario '{user_data['username']}' registrado exitosamente (201 Created)."
        
        # Manejo de errores del backend (ej: 400 Bad Request por usuario duplicado)
        response_data = response.json()
        error_msg = response_data.get("mensaje", response_data.get("username", "Error desconocido."))
        
        return f"❌ Falló el registro de '{user_data['username']}'. Código: {response.status_code}. Mensaje: {error_msg}"

    except requests.exceptions.RequestException as e:
        return f"❌ ERROR de conexión: El backend no está corriendo en {API_BASE_URL}."


if __name__ == "__main__":
    
    print("\n--- INICIANDO REGISTRO DE 15 USUARIOS CON CONTRASEÑA COMÚN ---")
    
    for i, user in enumerate(USER_REGISTRATION_DATA):
        resultado = register_user(user)
        print(f"[{i+1}/{len(USER_REGISTRATION_DATA)}] {resultado}")
        
    print("\n--- PROCESO FINALIZADO ---")
    print(f"Contraseña común utilizada: {COMMON_PASSWORD}")