package net.springboot.springbootusersbackend.exceptions;

public class ApiRequestException extends RuntimeException{

    public ApiRequestException(String message){
        super(message);
    }
}
