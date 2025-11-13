package com.backend.taskmanagerapi.services;

import com.backend.taskmanagerapi.dtos.input.LoginRequest;
import com.backend.taskmanagerapi.dtos.input.RegisterRequest;
import com.backend.taskmanagerapi.dtos.output.AuthResponse;
import com.backend.taskmanagerapi.dtos.output.UsuarioResponse;
import com.backend.taskmanagerapi.dtos.update.UpdateUserRequest;
import com.backend.taskmanagerapi.exceptions.BadRequestException;
import com.backend.taskmanagerapi.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IUsuarioService {

    AuthResponse registrarUsuario(RegisterRequest request) throws BadRequestException;

    AuthResponse iniciarSesion(LoginRequest request);

    List<UsuarioResponse> listarUsuarios();

    UsuarioResponse buscarUsuarioPorId(Long id) throws ResourceNotFoundException;

    UsuarioResponse editarUsuario(Long id, UpdateUserRequest request) throws ResourceNotFoundException;

    void eliminarUsuario(Long id) throws ResourceNotFoundException;
}
