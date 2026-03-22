//package mk.ukim.finki.wp.emtlab.service.application.impl;
//
//import mk.ukim.finki.wp.emtlab.model.domain.Book;
//import mk.ukim.finki.wp.emtlab.model.domain.BookCopy;
//import mk.ukim.finki.wp.emtlab.model.dto.CreateBookCopyDto;
//import mk.ukim.finki.wp.emtlab.model.dto.CreateBookDto;
//import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookCopyDto;
//import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookDto;
//import mk.ukim.finki.wp.emtlab.model.enums.Category;
//import mk.ukim.finki.wp.emtlab.service.application.BookApplicationService;
//import mk.ukim.finki.wp.emtlab.service.application.BookCopyApplicationService;
//import mk.ukim.finki.wp.emtlab.service.domain.BookCopyService;
//import mk.ukim.finki.wp.emtlab.service.domain.BookService;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//@Service
//public class BookCopyApplicationServiceImpl implements BookCopyApplicationService {
//    private final BookService bookService;
//    private final BookCopyService bookCopyService;
//
//    public BookCopyApplicationServiceImpl(BookService bookService, BookCopyService bookCopyService) {
//        this.bookService = bookService;
//        this.bookCopyService = bookCopyService;
//    }
//
//
//    @Override
//    public List<DisplayBookCopyDto> findAll() {
//        return DisplayBookCopyDto.from(bookCopyService.findAll());
//    }
//
//    @Override
//    public Optional<DisplayBookCopyDto> findById(Long id) {
//        return bookCopyService.findById(id).map(DisplayBookCopyDto::from);
//    }
//
//    @Override
//    public List<DisplayBookCopyDto> findAllByBookId(Long bookId) {
//        return bookCopyService.findAllByBookId(bookId)
//                .stream()
//                .map(DisplayBookCopyDto::from)
//                .toList();
//    }
//
//    @Override
//    public DisplayBookCopyDto create(CreateBookCopyDto dto) {
//
//        return DisplayBookCopyDto.from(
//                bookCopyService.create(dto.bookId(), dto.state())
//        );
//    }
//
//    @Override
//    public Optional<DisplayBookCopyDto> update(Long id, CreateBookCopyDto dto) {
//        Optional<BookCopy> copy = bookCopyService.findById(id);
//
//        copy.ifPresent(c -> bookCopyService.update(c.getId(), dto.state(), dto.rented()));
//
//        return copy.map(DisplayBookCopyDto::from);
//    }
//
//    @Override
//    public Optional<DisplayBookCopyDto> rent(Long copyId) {
//        try {
//            BookCopy copy = bookCopyService.rent(copyId);
//            return Optional.of(DisplayBookCopyDto.from(copy));
//        } catch (IllegalStateException e) {
//            return Optional.empty();
//        }
//    }
//
//
//
//}
