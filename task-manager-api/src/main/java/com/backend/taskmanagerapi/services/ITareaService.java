package com.backend.taskmanagerapi.services;

import com.backend.taskmanagerapi.dtos.input.TaskRequest;
import com.backend.taskmanagerapi.dtos.output.TaskResponse;
import com.backend.taskmanagerapi.dtos.update.UpdateTaskRequest;
import com.backend.taskmanagerapi.entities.Estado;
import com.backend.taskmanagerapi.entities.Prioridad;
import com.backend.taskmanagerapi.exceptions.BadRequestException;
import com.backend.taskmanagerapi.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ITareaService {

    public TaskResponse crearTarea(TaskRequest request, Long usuarioId) throws BadRequestException, ResourceNotFoundException;

    public List<TaskResponse> listarTareas(Long usuarioId, Estado estado, Prioridad prioridad) throws BadRequestException, ResourceNotFoundException;

    public TaskResponse ObtenerPorId(Long id) throws BadRequestException, ResourceNotFoundException;

    public TaskResponse actualizarTarea(Long id, UpdateTaskRequest request) throws BadRequestException, ResourceNotFoundException;

    public void eliminarTarea(Long id) throws BadRequestException, ResourceNotFoundException;

}
