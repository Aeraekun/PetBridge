package site.petbridge.global.exception;

import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class ErrorResponse {

    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String code;
    private final String message;

    public ErrorResponse(ErrorCode errorCode) {
        this.status = errorCode.getStatus().value(); // 500
        this.error = errorCode.getStatus().name(); // INTERNAL_SERVER_ERROR
        this.code = errorCode.name(); // INTERNAL_SERVER_ERROR
        this.message = errorCode.getMessage(); // 내부 서버 오류입니다.
    }
}
