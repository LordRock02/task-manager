package com.backend.taskmanagerapi.services.Impl;

import com.backend.taskmanagerapi.dtos.input.LoginRequest;
import com.backend.taskmanagerapi.dtos.input.RegisterRequest;
import com.backend.taskmanagerapi.dtos.output.AuthResponse;
import com.backend.taskmanagerapi.dtos.output.UsuarioResponse;
import com.backend.taskmanagerapi.dtos.update.UpdateUserRequest;
import com.backend.taskmanagerapi.entities.Rol;
import com.backend.taskmanagerapi.entities.Usuario;
import com.backend.taskmanagerapi.exceptions.BadRequestException;
import com.backend.taskmanagerapi.exceptions.ResourceNotFoundException;
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

import java.util.List;
import java.util.stream.Collectors;

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
    public AuthResponse registrarUsuario(RegisterRequest request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Error: ¡El usuario ya existe!");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(request.getUsername());
        nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword()));
        if ("ADMIN".equalsIgnoreCase(request.getRol())) {
            nuevoUsuario.setRol(Rol.ADMIN);
        } else {
            nuevoUsuario.setRol(Rol.USER);
        }

        usuarioRepository.save(nuevoUsuario);

        String token = jwtUtil.generateToken(nuevoUsuario.getUsername(), nuevoUsuario.getRol().name());

        return AuthResponse.builder()
                .username(nuevoUsuario.getUsername())
                .token(token)
                .mensaje("Usuario registrado exitosamente como " + nuevoUsuario.getRol().name())
                .build();
    }
    @Override
    public AuthResponse iniciarSesion(LoginRequest request) {
        if(!usuarioRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Error: El Usuario o la contraseña estan incorrectos!");
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Usuario usuario = usuarioRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        String token = jwtUtil.generateToken(userDetails.getUsername(), usuario.getRol().name());


        return AuthResponse.builder()
                .username(userDetails.getUsername())
                .token(token)
                .rol(usuario.getRol().name())
                .mensaje("Login exitoso")
                .build();
    }

    @Override
    public List<UsuarioResponse> listarUsuarios() {
        // Convertimos la lista de Entidades a lista de DTOs (UsuarioResponse)
        return usuarioRepository.findAll().stream()
                .map(usuario -> UsuarioResponse.builder()
                        .id(usuario.getId())
                        .username(usuario.getUsername())
                        .rol(usuario.getRol() != null ? usuario.getRol().name() : "SIN_ROL")
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public UsuarioResponse buscarUsuarioPorId(Long id) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));

        return UsuarioResponse.builder()
                .id(usuario.getId())
                .username(usuario.getUsername())
                .rol(usuario.getRol().name())
                .build();
    }

    @Override
    public UsuarioResponse editarUsuario(Long id, UpdateUserRequest request) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));

        if (request.getUsername() != null && !request.getUsername().isEmpty()) {
            usuario.setUsername(request.getUsername());
        }

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getRol() != null && !request.getRol().isEmpty()) {
            try {
                usuario.setRol(Rol.valueOf(request.getRol().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Rol inválido. Use USER o ADMIN");
            }
        }


        Usuario usuarioActualizado = usuarioRepository.save(usuario);


        return UsuarioResponse.builder()
                .id(usuarioActualizado.getId())
                .username(usuarioActualizado.getUsername())
                .rol(usuarioActualizado.getRol().name())
                .build();
    }

    @Override
    public void eliminarUsuario(Long id) throws ResourceNotFoundException {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("No se puede eliminar. Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }
}