package mk.ukim.finki.wp.emtlab.model.dto;


import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.wp.emtlab.model.domain.Book;
import mk.ukim.finki.wp.emtlab.model.domain.BookCopy;
import mk.ukim.finki.wp.emtlab.model.enums.Category;
import mk.ukim.finki.wp.emtlab.model.enums.State;

import java.util.List;

public record DisplayBookCopyDto(
        Long id,
        State state,
        Boolean rented,
        Long bookId
) {
    public static DisplayBookCopyDto from(BookCopy bookCopy) {
        return new DisplayBookCopyDto(
                bookCopy.getId(),
                bookCopy.getState(),
                bookCopy.isRented(),
                bookCopy.getBook().getId()
        );
    }

    public static List<DisplayBookCopyDto> from(List<BookCopy> copybooks) {
        return copybooks.stream()
                .map(DisplayBookCopyDto::from)
                .toList();
    }
}
