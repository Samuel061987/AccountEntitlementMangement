package net.springboot.springbootusersbackend.exceptions;

import jakarta.persistence.Id;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e){
        HttpStatus badRequest= HttpStatus.INTERNAL_SERVER_ERROR;
        ApiException apiException = new ApiException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, ZonedDateTime.now(ZoneId.of("UTC")));
        return new ResponseEntity<>(apiException,badRequest);
    }
    @ExceptionHandler(value = {HttpMessageNotReadableException.class})
    public ResponseEntity<Object> handleBadRequestException(HttpMessageNotReadableException e){
        HttpStatus badRequest= HttpStatus.BAD_REQUEST;
        ApiException apiException = new ApiException(e.getMessage(), HttpStatus.BAD_REQUEST, ZonedDateTime.now(ZoneId.of("UTC")));
        return new ResponseEntity<>(apiException,badRequest);
    }
    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<Object> handleApiOtherRequestException(Exception e){
        HttpStatus badRequest= HttpStatus.INTERNAL_SERVER_ERROR;
        ApiException apiException = new ApiException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, ZonedDateTime.now(ZoneId.of("UTC")));
        return new ResponseEntity<>(apiException,badRequest);
    }

}
