package site.petbridge.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /**
     * 400 BAD_REQUEST: 잘못된 요청
     */
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    /**
     * 401 UNAUTHORIZED: 인증되지 않음
     */
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "인증이 필요합니다."),

    /**
     * 403 FORBIDDEN: 접근 금지
     */
    FORBIDDEN(HttpStatus.FORBIDDEN, "접근이 금지되었습니다."),

    /**
     * 404 NOT_FOUND: 리소스를 찾을 수 없음
     */
    RESOURCES_NOT_FOUND(HttpStatus.NOT_FOUND, "리소스 정보를 찾을 수 없습니다."),

    /**
     * 405 METHOD_NOT_ALLOWED: 허용되지 않은 Request Method 호출
     */
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 메서드입니다."),

    /**
     * 409
     */
    CONFLICT(HttpStatus.CONFLICT, "리소스 충돌이 발생했습니다."),

    /**
     * 500 INTERNAL_SERVER_ERROR: 내부 서버 오류
     */
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류입니다."),
    ;

    private final HttpStatus status;
    private final String message;
}
