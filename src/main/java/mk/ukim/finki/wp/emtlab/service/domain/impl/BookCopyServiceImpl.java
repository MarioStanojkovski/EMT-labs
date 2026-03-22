//package mk.ukim.finki.wp.emtlab.service.domain.impl;
//
//import mk.ukim.finki.wp.emtlab.model.domain.Book;
//import mk.ukim.finki.wp.emtlab.model.domain.BookCopy;
//import mk.ukim.finki.wp.emtlab.model.enums.State;
//import mk.ukim.finki.wp.emtlab.repository.BookCopyRepository;
//import mk.ukim.finki.wp.emtlab.repository.BookRepository;
//import mk.ukim.finki.wp.emtlab.service.domain.BookCopyService;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class BookCopyServiceImpl implements BookCopyService {
//
//    private final BookCopyRepository bookCopyRepository;
//    private final BookRepository bookRepository;
//
//    public BookCopyServiceImpl(
//            BookCopyRepository bookCopyRepository,
//            BookRepository bookRepository) {
//        this.bookCopyRepository = bookCopyRepository;
//        this.bookRepository = bookRepository;
//    }
//
//    @Override
//    public List<BookCopy> findAll() {
//        return bookCopyRepository.findAll();
//    }
//
//    @Override
//    public Optional<BookCopy> findById(Long id) {
//        return bookCopyRepository.findById(id);
//    }
//
//    @Override
//    public BookCopy create(Long bookId, State state) {
//        Book book = bookRepository.findById(bookId)
//                .orElseThrow(() -> new IllegalArgumentException("Book with id " + bookId + " not found"));
//
//        BookCopy copy = new BookCopy();
//        copy.setBook(book);
//        copy.setState(state != null ? state : State.GOOD);
//        copy.setRented(false);
//
//        return bookCopyRepository.save(copy);
//    }
//
//    @Override
//    public BookCopy update(Long id, State state, boolean rented) {
//        BookCopy copy = bookCopyRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Book copy with id " + id + " not found"));
//
//        if (state != null) {
//            copy.setState(state);
//        }
//
//        copy.setRented(rented);
//
//        return bookCopyRepository.save(copy);
//    }
//
//    @Override
//    public void deleteById(Long id) {
//        if (!bookCopyRepository.existsById(id)) {
//            throw new IllegalArgumentException("Book copy with id " + id + " not found");
//        }
//        bookCopyRepository.deleteById(id);
//    }
//
//    @Override
//    public List<BookCopy> findAllByBookId(Long bookId) {
//        return bookCopyRepository.findAllByBookId(bookId);
//    }
//
//    @Override
//    public BookCopy rent(Long copyId) {
//        BookCopy copy = bookCopyRepository.findById(copyId)
//                .orElseThrow(() -> new IllegalArgumentException("Book copy with id " + copyId + " not found"));
//
//        if (copy.isRented()) {
//            throw new IllegalStateException("Book copy is already rented");
//        }
//
//        if (copy.getState() == State.BAD) {
//            throw new IllegalStateException("Cannot rent damaged book copy");
//        }
//
//        copy.setRented(true);
//        return bookCopyRepository.save(copy);
//    }
//
//    public BookCopy returnCopy(Long copyId) {
//        BookCopy copy = bookCopyRepository.findById(copyId)
//                .orElseThrow(() -> new IllegalArgumentException("Book copy with id " + copyId + " not found"));
//
//        if (!copy.isRented()) {
//            throw new IllegalStateException("Book copy is not rented");
//        }
//
//        copy.setRented(false);
//        return bookCopyRepository.save(copy);
//    }
//}