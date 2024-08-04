package site.petbridge.domain.animal.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.animal.domain.Animal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnimalEditRequestDto {

    @NotNull
    private String name;
    @NotNull
    private String species;
    @NotNull
    private String kindCd;
    @NotNull
    private String colorCd;
    @NotNull
    private int age;
    @NotNull
    private int weight;
    @NotNull
    private char sexCd;
    @NotNull
    private char neuterYn;
    @NotNull
    private String specialMark;
    @NotNull
    private String careAddr;

    public Animal toEntity(String filename) {
        return Animal.builder()
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
