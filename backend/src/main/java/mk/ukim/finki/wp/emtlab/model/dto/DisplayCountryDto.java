package mk.ukim.finki.wp.emtlab.model.dto;

import mk.ukim.finki.wp.emtlab.model.domain.Country;

public record DisplayCountryDto(
        Long id,
        String name,
        String continent
) {
    public static DisplayCountryDto from(Country country) {
        return new DisplayCountryDto(
                country.getId(),
                country.getName(),
                country.getContinent()
        );
    }
}
//filtriranje na knigi spored state
// good/bad filter na fronted dodavanje kopce
// ako e good samo good ako e bad samo bad ako e prazno togash site
//endpoint
