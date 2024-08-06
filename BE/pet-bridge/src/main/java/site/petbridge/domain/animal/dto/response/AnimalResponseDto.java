package site.petbridge.domain.animal.dto.response;

import lombok.Getter;
import org.springframework.data.domain.Page;
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

    private Page<BoardResponseDto> boards;

    public AnimalResponseDto(Animal entity, String processState, Page<BoardResponseDto> boards) {
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
