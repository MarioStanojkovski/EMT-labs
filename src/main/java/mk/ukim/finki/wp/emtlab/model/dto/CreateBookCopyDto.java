package mk.ukim.finki.wp.emtlab.model.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import mk.ukim.finki.wp.emtlab.model.domain.Book;
import mk.ukim.finki.wp.emtlab.model.domain.BookCopy;
import mk.ukim.finki.wp.emtlab.model.enums.State;

public record CreateBookCopyDto(
        @NotNull(message = "State is required")
        State state,
        Boolean rented,
        @NotNull(message = "Book id is mandatory")
        Long bookId
) {
    public BookCopy toBookCopy(Book book){
        return new BookCopy(state,rented,book);
    }
}
