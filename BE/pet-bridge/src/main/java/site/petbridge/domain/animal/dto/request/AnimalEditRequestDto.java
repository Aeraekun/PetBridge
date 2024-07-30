package site.petbridge.domain.animal.dto.request;

import java.sql.Timestamp;

import lombok.Data;
import site.petbridge.domain.animal.domain.Animal;

@Data
public class AnimalEditRequestDto {

    private int id;
    private int userId;
    private String name;
    private String filename;
    private Timestamp happenDt;
    private String kindCd;
    private String colorCd;
    private String age;
    private String weight;
    private String noticeNo;
    private String popfile;
    private String processState;
    private String sexCd;
    private String neuterYn;
    private String specialMark;
    private String careAddr;
    private String noticeComment;

    private boolean filenameRemoved;

}
