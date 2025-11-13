package com.backend.taskmanagerapi.dtos.output;

import com.backend.taskmanagerapi.entities.Estado;
import com.backend.taskmanagerapi.entities.Prioridad;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponse {
    private Long id;
    private String titulo;
    private String descripcion;
    private Estado estado;
    private Prioridad prioridad;
    private LocalDateTime fechaCreacion;
}