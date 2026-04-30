package mk.ukim.finki.wp.emtlab.model.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import mk.ukim.finki.wp.emtlab.model.views.BookView;

import java.util.List;

public record DisplayBookViewDto(

        String name,
        String category,
        String state,
        Long availableCopies,
        String authorFullName,
        String countryName
) {
    public static DisplayBookViewDto from(BookView bookView) {
        return new DisplayBookViewDto(
                bookView.getName(),
                bookView.getCategory(),
                bookView.getState(),
                bookView.getAvailableCopies(),
                bookView.getAuthorFullName(),
                bookView.getCountryName()

        );
    }

    public static List<DisplayBookViewDto> from(List<BookView> bookViews) {
        return bookViews
                .stream()
                .map(DisplayBookViewDto::from)
                .toList();
    }


}
