package com.backend.taskmanagerapi.dtos.update;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String username;
    private String password;
    private String rol;
}
