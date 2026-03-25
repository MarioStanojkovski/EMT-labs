package mk.ukim.finki.wp.emtlab.events;

import mk.ukim.finki.wp.emtlab.model.domain.Book;

public record BookRentedEvent(Book book, long remainingAvailableCopies) {
}
