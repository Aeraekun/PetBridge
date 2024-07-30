package site.petbridge.domain.animal.dto.request;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class AnimalRegistRequestDto {

    private int userId;
    private String name;
    private Timestamp happenDt;
    private String kindCd;
    private String colorCd;
    private String age;
    private String weight;
    private String noticeNo;
    private String processState;
    private String sexCd;
    private String neuterYn;
    private String specialMark;
    private String careAddr;
    private String noticeComment;

}
