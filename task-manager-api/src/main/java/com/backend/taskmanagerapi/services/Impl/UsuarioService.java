package com.backend.taskmanagerapi.services.Impl;

import com.backend.taskmanagerapi.dtos.input.LoginRequest;
import com.backend.taskmanagerapi.dtos.input.RegisterRequest;
import com.backend.taskmanagerapi.dtos.output.AuthResponse;
import com.backend.taskmanagerapi.entities.Usuario;
import com.backend.taskmanagerapi.exceptions.BadRequestException;
import com.backend.taskmanagerapi.repositories.UsuarioRepository;
import com.backend.taskmanagerapi.security.JwtUtil;
import com.backend.taskmanagerapi.services.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public AuthResponse registrarUsuario(RegisterRequest request) throws BadRequestException {
        // Validamos si existe
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            // CAMBIO AQUÍ: Lanzamos tu excepción personalizada.
            // El GlobalExceptionHandler la atrapará y devolverá un 400 Bad Request.
            throw new BadRequestException("Error: ¡El usuario ya existe!");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(request.getUsername());
        nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword()));

        // Recuerda: Si tu constructor pide 'tareas', aquí se inicializaría a null o lista vacía
        // o Spring lo maneja si usas el constructor vacío + setters.

        usuarioRepository.save(nuevoUsuario);

        String token = jwtUtil.generateToken(nuevoUsuario.getUsername());

        return AuthResponse.builder()
                .username(nuevoUsuario.getUsername())
                .token(token)
                .mensaje("Usuario registrado exitosamente")
                .build();
    }

    @Override
    public AuthResponse iniciarSesion(LoginRequest request) {
        // Si las credenciales fallan aquí, Spring lanza automáticamente 'BadCredentialsException'.
        // Tu GlobalExceptionHandler ya tiene un método para atrapar eso y devolver 401.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtUtil.generateToken(userDetails.getUsername());

        return AuthResponse.builder()
                .username(userDetails.getUsername())
                .token(token)
                .mensaje("Login exitoso")
                .build();
    }
}