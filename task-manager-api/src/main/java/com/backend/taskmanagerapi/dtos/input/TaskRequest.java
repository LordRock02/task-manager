package com.backend.taskmanagerapi.dtos.input;

import com.backend.taskmanagerapi.entities.Estado;
import com.backend.taskmanagerapi.entities.Prioridad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    private String descripcion;

    private Estado estado;

    @NotNull(message = "La prioridad es obligatoria")
    private Prioridad prioridad;
}