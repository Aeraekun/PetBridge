package site.petbridge.domain.animal.dto.response;

import lombok.Getter;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.board.dto.response.BoardResponseDto;

import java.util.List;

@Getter
public class AnimalResponseDto {

    private int id;
    private int userId;
    private String name;
    private String filename;
    private String species;
    private String kindCd;
    private String colorCd;
    private int age;
    private int weight;
    private char sexCd;
    private char neuterYn;
    private String specialMark;
    private String careAddr;
    private boolean disabled;

    private String processState;

    private List<BoardResponseDto> boards; // 여길 추가했음

    public AnimalResponseDto(Animal entity, String processState, List<BoardResponseDto> boards) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.name = entity.getName();
        this.filename = entity.getFilename();
        this.species = entity.getSpecies();
        this.kindCd = entity.getKindCd();
        this.colorCd = entity.getColorCd();
        this.age = entity.getAge();
        this.weight = entity.getWeight();
        this.sexCd = entity.getSexCd();
        this.neuterYn = entity.getNeuterYn();
        this.specialMark = entity.getSpecialMark();
        this.careAddr = entity.getCareAddr();
        this.disabled = entity.isDisabled();

        this.processState = processState;

        this.boards = boards;
    }
}
