package com.backend.taskmanagerapi.controllers;

import com.backend.taskmanagerapi.dtos.input.TaskRequest;
import com.backend.taskmanagerapi.dtos.output.TaskResponse;
import com.backend.taskmanagerapi.dtos.update.UpdateTaskRequest;
import com.backend.taskmanagerapi.entities.Estado;
import com.backend.taskmanagerapi.entities.Prioridad;
import com.backend.taskmanagerapi.entities.Usuario;
import com.backend.taskmanagerapi.exceptions.ResourceNotFoundException;
import com.backend.taskmanagerapi.repositories.UsuarioRepository;
import com.backend.taskmanagerapi.services.ITareaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/tareas")
public class TareaController {

    private final ITareaService tareaService;
    private final UsuarioRepository usuarioRepository;

    private final Logger LOGGER = LoggerFactory.getLogger(TareaController.class);

    @PostMapping("/crear")
    public ResponseEntity<TaskResponse> crearTarea(@Valid @RequestBody TaskRequest request) throws ResourceNotFoundException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        LOGGER.info("Creando tarea para el usuario ID: {}", usuario.getId());
        return new ResponseEntity<>(tareaService.crearTarea(request, usuario.getId()), HttpStatus.CREATED);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<TaskResponse>> listarTareas(
            @RequestParam(required = false) Estado estado,
            @RequestParam(required = false) Prioridad prioridad
    ) throws ResourceNotFoundException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        LOGGER.info("Listando tareas usuario ID: {}, Estado: {}, Prioridad: {}", usuario.getId(), estado, prioridad);
        return new ResponseEntity<>(tareaService.listarTareas(usuario.getId(), estado, prioridad), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> obtenerPorId(@PathVariable Long id) throws ResourceNotFoundException {
        LOGGER.info("Buscando tarea ID: {}", id);
        return new ResponseEntity<>(tareaService.ObtenerPorId(id), HttpStatus.OK);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<TaskResponse> actualizarTarea(
            @PathVariable Long id,
            @RequestBody UpdateTaskRequest request
    ) throws ResourceNotFoundException {
        LOGGER.info("Actualizando tarea ID: {}", id);
        return new ResponseEntity<>(tareaService.actualizarTarea(id, request), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarTarea(@PathVariable Long id) throws ResourceNotFoundException {
        LOGGER.info("Elimination tarea ID: {}", id);
        tareaService.eliminarTarea(id);
        return new ResponseEntity<>(Map.of("mensaje", "Tarea eliminada correctamente"), HttpStatus.OK);
    }
}