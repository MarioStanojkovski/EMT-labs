package mk.ukim.finki.wp.emtlab.service.domain;

import mk.ukim.finki.wp.emtlab.model.domain.Book;
import mk.ukim.finki.wp.emtlab.model.domain.User;
import mk.ukim.finki.wp.emtlab.model.enums.Category;
import mk.ukim.finki.wp.emtlab.model.enums.State;
import mk.ukim.finki.wp.emtlab.model.projection.BookDetailedProjection;
import mk.ukim.finki.wp.emtlab.model.projection.BookSummaryProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book>findTop10ByDate(LocalDateTime localDateTime);
    List<Book> findAll();
    Optional<Book> findById(Long id);
    Book create(Book book);
    Optional<Book> update(Long id, Book book);
    Optional<Book> deleteById(Long id);
    List<Book> findByCategory(Category category);
    Page<Book> findAll(int page, int size, String sortBy);
    Page<Book> filter(Category category, State state, Long authorId, Boolean available, int page, int size, String sortBy);
    Page<BookSummaryProjection> findAllSummary(int page, int size, String sortBy);
    List<Book> findAllWithAuthorAndCountry();
    Optional<Book> rent(Long id, User user);
    Page<BookDetailedProjection> findAllDetailed(int page, int size, String sortBy);

}
