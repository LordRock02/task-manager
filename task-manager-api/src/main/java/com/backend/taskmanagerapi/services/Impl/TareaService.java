package com.backend.taskmanagerapi.services.Impl;

import com.backend.taskmanagerapi.dtos.input.TaskRequest;
import com.backend.taskmanagerapi.dtos.output.TaskResponse;
import com.backend.taskmanagerapi.dtos.update.UpdateTaskRequest;
import com.backend.taskmanagerapi.entities.Estado;
import com.backend.taskmanagerapi.entities.Prioridad;
import com.backend.taskmanagerapi.entities.Tarea;
import com.backend.taskmanagerapi.entities.Usuario;
import com.backend.taskmanagerapi.exceptions.BadRequestException;
import com.backend.taskmanagerapi.exceptions.ResourceNotFoundException;
import com.backend.taskmanagerapi.repositories.TareaRepository;
import com.backend.taskmanagerapi.repositories.UsuarioRepository;
import com.backend.taskmanagerapi.services.ITareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TareaService implements ITareaService {

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public TaskResponse crearTarea(TaskRequest request, Long usuarioId) throws BadRequestException, ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));

        Tarea tarea = new Tarea();
        tarea.setTitulo(request.getTitulo());
        tarea.setDescripcion(request.getDescripcion());
        tarea.setPrioridad(request.getPrioridad());
        tarea.setFechaCreacion(LocalDateTime.now());
        tarea.setUsuario(usuario);

        if (request.getEstado() == null) {
            tarea.setEstado(Estado.PENDIENTE);
        } else {
            tarea.setEstado(request.getEstado());
        }

        return mapToResponse(tareaRepository.save(tarea));
    }

    @Override
    public List<TaskResponse> listarTareas(Long usuarioId, Estado estado, Prioridad prioridad) throws BadRequestException, ResourceNotFoundException {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }

        List<Tarea> tareas;

        if (estado != null && prioridad != null) {
            tareas = tareaRepository.findByUsuarioIdAndEstadoAndPrioridad(usuarioId, estado, prioridad);
        } else if (estado != null) {
            tareas = tareaRepository.findByUsuarioIdAndEstado(usuarioId, estado);
        } else if (prioridad != null) {
            tareas = tareaRepository.findByUsuarioIdAndPrioridad(usuarioId, prioridad);
        } else {
            tareas = tareaRepository.findByUsuarioId(usuarioId);
        }

        return tareas.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse ObtenerPorId(Long id) throws BadRequestException, ResourceNotFoundException {
        Tarea tarea = tareaRepository.findById(id)
                .<ResourceNotFoundException>orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con id: " + id));

        return mapToResponse(tarea);
    }

    @Override
    public TaskResponse actualizarTarea(Long id, UpdateTaskRequest request) throws BadRequestException, ResourceNotFoundException {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con id: " + id));


        if (request.getTitulo() != null && !request.getTitulo().isBlank()) {
            tarea.setTitulo(request.getTitulo());
        }

        if (request.getDescripcion() != null) {
            tarea.setDescripcion(request.getDescripcion());
        }

        if (request.getPrioridad() != null) {
            tarea.setPrioridad(request.getPrioridad());
        }

        if (request.getEstado() != null) {
            tarea.setEstado(request.getEstado());
        }

        return mapToResponse(tareaRepository.save(tarea));
    }

    @Override
    public void eliminarTarea(Long id) throws BadRequestException, ResourceNotFoundException {
        if (!tareaRepository.existsById(id)) {
            throw new ResourceNotFoundException("No se puede eliminar. Tarea no encontrada con id: " + id);
        }
        tareaRepository.deleteById(id);
    }

    private TaskResponse mapToResponse(Tarea tarea) {
        return TaskResponse.builder()
                .id(tarea.getId())
                .titulo(tarea.getTitulo())
                .descripcion(tarea.getDescripcion())
                .estado(tarea.getEstado())
                .prioridad(tarea.getPrioridad())
                .fechaCreacion(tarea.getFechaCreacion())
                .build();
    }
}