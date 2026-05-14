package mk.ukim.finki.wp.emtlab.service.domain.impl;

import jakarta.transaction.Transactional;
import mk.ukim.finki.wp.emtlab.events.BookRentedEvent;
import mk.ukim.finki.wp.emtlab.model.domain.Book;
import mk.ukim.finki.wp.emtlab.model.domain.User;
import mk.ukim.finki.wp.emtlab.model.enums.Category;
import mk.ukim.finki.wp.emtlab.model.enums.State;
import mk.ukim.finki.wp.emtlab.model.projection.BookDetailedProjection;
import mk.ukim.finki.wp.emtlab.model.projection.BookSummaryProjection;
import mk.ukim.finki.wp.emtlab.repository.BookCopyRepository;
import mk.ukim.finki.wp.emtlab.repository.BookRepository;
import mk.ukim.finki.wp.emtlab.repository.WishListRepository;
import mk.ukim.finki.wp.emtlab.service.domain.BookService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookCopyRepository bookCopyRepository;
    private final WishListRepository wishListRepository;
    private final ApplicationEventPublisher eventPublisher;

    public BookServiceImpl(BookRepository bookRepository, BookCopyRepository bookCopyRepository,
                           WishListRepository wishListRepository, ApplicationEventPublisher eventPublisher) {
        this.bookRepository = bookRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.wishListRepository = wishListRepository;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAllByDeletedFalse();
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findByIdAndDeletedFalse(id);
    }

    @Override
    public Book create(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Optional<Book> update(Long id, Book book) {
        return bookRepository.findByIdAndDeletedFalse(id)
                .map(existingBook -> {
                    existingBook.setName(book.getName());
                    existingBook.setAuthor(book.getAuthor());
                    existingBook.setCategory(book.getCategory());
                    existingBook.setState(book.getState());
                    existingBook.setDate_published(book.getDate_published());
                    return bookRepository.save(existingBook);
                });
    }

    @Override
    @Transactional
    public Optional<Book> deleteById(Long id) {
        return bookRepository.findByIdAndDeletedFalse(id)
                .map(book -> {
                    wishListRepository.findAll().forEach(wishList -> {
                        if (wishList.getBooks().removeIf(b -> b.getId().equals(id))) {
                            wishListRepository.save(wishList);
                        }
                    });
                    book.setDeleted(true);
                    return bookRepository.save(book);
                });
    }

    @Override
    public List<Book> findByCategory(Category category) {
        return bookRepository.findAllByDeletedFalseAndCategory(category);
    }

    @Override
    public Page<Book> findAll(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return bookRepository.findAllByDeletedFalse(pageable);
    }

    @Override
    public Page<Book> filter(Category category, State state, Long authorId, Boolean available, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return bookRepository.filterBooks(category, state, authorId, available, pageable);
    }

    @Override
    public Page<BookSummaryProjection> findAllSummary(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return bookRepository.findAllProjectedBy(pageable);
    }

    @Override
    public List<Book> findAllWithAuthorAndCountry() {
        return bookRepository.findAllWithAuthorAndCountry();
    }

    @Transactional
    @Override
    public Optional<Book> rent(Long id, User user) {
        return bookRepository.findByIdAndDeletedFalse(id)
                .flatMap(book -> bookCopyRepository.findFirstByBookAndRentedFalse(book)
                        .map(copy -> {
                            copy.setRented(true);
                            copy.setRentedBy(user);
                            bookCopyRepository.save(copy);
                            long remaining = bookCopyRepository.countByBookAndRentedFalse(book);
                            eventPublisher.publishEvent(new BookRentedEvent(book, remaining));
                            return book;
                        }));
    }

    @Override
    public List<Book> findTop10ByDate(LocalDateTime localDateTime) {
        return bookRepository.findFirst10ByDatePublishedBefore(localDateTime);
    }

    @Override
    public Page<BookDetailedProjection> findAllDetailed(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return bookRepository.findAllDetailed(pageable);
    }
}