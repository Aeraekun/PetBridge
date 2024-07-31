package site.petbridge.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
public class SuccessResponse <T> {
    private String message; // 결과 메시지

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private T data;

    public SuccessResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public SuccessResponse(String message) {
        this.message = message;
    }
}
