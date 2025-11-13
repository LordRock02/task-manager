package com.backend.taskmanagerapi.services;

import com.backend.taskmanagerapi.dtos.input.LoginRequest;
import com.backend.taskmanagerapi.dtos.input.RegisterRequest;
import com.backend.taskmanagerapi.dtos.output.AuthResponse;
import com.backend.taskmanagerapi.exceptions.BadRequestException;

public interface IUsuarioService {

    AuthResponse registrarUsuario(RegisterRequest request) throws BadRequestException;

    AuthResponse iniciarSesion(LoginRequest request);
}
