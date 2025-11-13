package com.backend.taskmanagerapi.repositories;

import com.backend.taskmanagerapi.entities.Estado;
import com.backend.taskmanagerapi.entities.Prioridad;
import com.backend.taskmanagerapi.entities.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    // Buscar todas las tareas de UN usuario específico
    List<Tarea> findByUsuarioId(Long usuarioId);

    // Buscar por Usuario Y Estado
    List<Tarea> findByUsuarioIdAndEstado(Long usuarioId, Estado estado);

    // Buscar por Usuario Y Prioridad
    List<Tarea> findByUsuarioIdAndPrioridad(Long usuarioId, Prioridad prioridad);
}
