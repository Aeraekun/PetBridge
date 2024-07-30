package site.petbridge.domain.animal.dto.response;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import site.petbridge.domain.animal.domain.Animal;

@Data
@Builder
@AllArgsConstructor
public class AnimalResponseDto {

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
    private boolean disabled;

    public static AnimalResponseDto transferToAnimalResponseDto(Animal animal) {
        return AnimalResponseDto.builder()
            .id(animal.getId())
            .userId(animal.getUserId())
            .name(animal.getName())
            .filename(animal.getFilename())
            .happenDt(animal.getHappenDt())
            .kindCd(animal.getKindCd())
            .colorCd(animal.getColorCd())
            .age(animal.getAge())
            .weight(animal.getWeight())
            .noticeNo(animal.getNoticeNo())
            .popfile(animal.getPopfile())
            .processState(animal.getProcessState())
            .sexCd(animal.getSexCd())
            .neuterYn(animal.getNeuterYn())
            .specialMark(animal.getSpecialMark())
            .careAddr(animal.getCareAddr())
            .noticeComment(animal.getNoticeComment())
            .build();
    }
}
