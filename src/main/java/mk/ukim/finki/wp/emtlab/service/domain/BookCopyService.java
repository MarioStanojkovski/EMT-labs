//package mk.ukim.finki.wp.emtlab.service.domain;
//
//import mk.ukim.finki.wp.emtlab.model.domain.BookCopy;
//import mk.ukim.finki.wp.emtlab.model.enums.State;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface BookCopyService    {
//    List<BookCopy> findAll();
//
//    Optional<BookCopy> findById(Long id);
//
//    BookCopy create(Long bookId, State state);
//
//    BookCopy update(Long id, State state, boolean rented);
//
//    void deleteById(Long id);
//
//    List<BookCopy> findAllByBookId(Long bookId);
//
//    BookCopy rent(Long copyId);
//}
