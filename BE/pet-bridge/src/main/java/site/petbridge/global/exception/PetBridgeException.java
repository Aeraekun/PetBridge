package site.petbridge.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PetBridgeException extends RuntimeException{

    private final ErrorCode errorCode;
}
