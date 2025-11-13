package com.backend.taskmanagerapi.controllers;

import com.backend.taskmanagerapi.dtos.input.RegisterRequest;
import com.backend.taskmanagerapi.dtos.output.AuthResponse;
import com.backend.taskmanagerapi.dtos.output.UsuarioResponse;
import com.backend.taskmanagerapi.dtos.update.UpdateUserRequest;
import com.backend.taskmanagerapi.exceptions.ResourceNotFoundException;
import com.backend.taskmanagerapi.services.IUsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private final IUsuarioService usuarioService;

    private final Logger LOGGER = LoggerFactory.getLogger(UsuarioController.class);


    @PostMapping("/registrar")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<AuthResponse> registrarUsuario(@Valid @RequestBody RegisterRequest usuario) {
        LOGGER.info("Inicia registro de usuario por ADMIN");
        LOGGER.info("Username recibido: {}", usuario.getUsername());

        return new ResponseEntity<>(usuarioService.registrarUsuario(usuario), HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> actualizarUsuario(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest usuario) throws ResourceNotFoundException {
        LOGGER.info("Inicia actualización del usuario con ID: {}", id);
        return new ResponseEntity<>(usuarioService.editarUsuario(id, usuario), HttpStatus.OK);
    }

    @GetMapping("/listar")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<UsuarioResponse>> listarUsuarios() {
        LOGGER.info("Listando todos los usuarios");
        return new ResponseEntity<>(usuarioService.listarUsuarios(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> obtenerUsuarioPorId(@PathVariable Long id) throws ResourceNotFoundException {
        LOGGER.info("Buscando usuario con ID: {}", id);
        return new ResponseEntity<>(usuarioService.buscarUsuarioPorId(id), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws ResourceNotFoundException {
        LOGGER.info("Eliminando usuario con ID: {}", id);
        usuarioService.eliminarUsuario(id);
        return new ResponseEntity<>(Map.of("mensaje", "Usuario eliminado correctamente"), HttpStatus.OK);
    }
}