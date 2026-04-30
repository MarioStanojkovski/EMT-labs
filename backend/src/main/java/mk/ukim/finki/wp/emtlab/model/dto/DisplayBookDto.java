package mk.ukim.finki.wp.emtlab.model.dto;

import mk.ukim.finki.wp.emtlab.model.domain.Book;
import mk.ukim.finki.wp.emtlab.model.enums.Category;
import mk.ukim.finki.wp.emtlab.model.enums.State;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record DisplayBookDto(
        Long id,
        String name,
        Category category,
        State state,
        Long authorId,
        String authorName,
        LocalDateTime date_published

) {

    public static DisplayBookDto from(Book book) {
        return new DisplayBookDto(
                book.getId(),
                book.getName(),
                book.getCategory(),
                book.getState(),
                book.getAuthor().getId(),
                book.getAuthor().getName() + " " + book.getAuthor().getSurname(),
                book.getDate_published()
        );
    }

    public static List<DisplayBookDto> from(List<Book> books) {
        return books.stream()
                .map(DisplayBookDto::from)
                .toList();
    }

}
