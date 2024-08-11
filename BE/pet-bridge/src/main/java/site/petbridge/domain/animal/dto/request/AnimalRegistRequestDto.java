package site.petbridge.domain.animal.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.animal.domain.Animal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnimalRegistRequestDto {

    @NotNull
    private String name;
    @NotNull
    private String species;
    @NotNull
    private String kindCd;
    @NotNull
    private String colorCd;
    @NotNull
    private Integer age;
    @NotNull
    private Integer weight;
    @NotNull
    private Character sexCd;
    @NotNull
    private Character neuterYn;
    private String specialMark;
    @NotNull
    private String careAddr;

    public Animal toEntity(int userId, String filename) {
        return Animal.builder()
                .userId(userId)
                .name(name)
                .filename(filename)
                .species(species)
                .kindCd(kindCd)
                .colorCd(colorCd)
                .age(age)
                .weight(weight)
                .sexCd(sexCd)
                .neuterYn(neuterYn)
                .specialMark(specialMark)
                .careAddr(careAddr)
                .build();
    }
}
