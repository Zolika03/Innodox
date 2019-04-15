package hu.innodox.homework;

import javax.persistence.EntityExistsException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler 
  extends ResponseEntityExceptionHandler {
 
    @ExceptionHandler(value 
      = { EntityExistsException.class })
    protected ResponseEntity<Object> handleEntityExistsException(
      RuntimeException ex, WebRequest request) {
        String bodyOfResponse = "Több példány nem kölcsönözhető!";
        return handleExceptionInternal(ex, bodyOfResponse, 
          new HttpHeaders(), HttpStatus.CONFLICT, request);
    }
    
    
    @ExceptionHandler(value 
      = { Exception.class })
    protected ResponseEntity<Object> handleException(
      RuntimeException ex, WebRequest request) {
        String bodyOfResponse = "Hiba a háttérrendszer hívása közben!";
        return handleExceptionInternal(ex, bodyOfResponse, 
          new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
