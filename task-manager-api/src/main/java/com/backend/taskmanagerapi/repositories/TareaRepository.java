package com.backend.taskmanagerapi.repositories;

import com.backend.taskmanagerapi.entities.Estado;
import com.backend.taskmanagerapi.entities.Prioridad;
import com.backend.taskmanagerapi.entities.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {

    List<Tarea> findByUsuarioId(Long usuarioId);

    List<Tarea> findByUsuarioIdAndEstado(Long usuarioId, Estado estado);


    List<Tarea> findByUsuarioIdAndPrioridad(Long usuarioId, Prioridad prioridad);

    List<Tarea> findByUsuarioIdAndEstadoAndPrioridad(Long usuarioId, Estado estado, Prioridad prioridad);
}
