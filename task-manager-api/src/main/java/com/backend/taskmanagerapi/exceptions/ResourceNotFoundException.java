package com.backend.taskmanagerapi.exceptions;

public class ResourceNotFoundException extends Exception{

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
