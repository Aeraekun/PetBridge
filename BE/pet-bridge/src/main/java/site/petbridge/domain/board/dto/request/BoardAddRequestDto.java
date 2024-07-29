package site.petbridge.domain.board.dto.request;

import lombok.Data;

@Data
public class BoardAddRequestDto {

    private int userId;
    private int animalId;
    private String type;
    private String title;
    private String content;
    private String lat;
    private String lon;

}
