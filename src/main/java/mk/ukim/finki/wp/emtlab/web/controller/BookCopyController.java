//package mk.ukim.finki.wp.emtlab.web.controller;
//
//import mk.ukim.finki.wp.emtlab.model.dto.CreateBookCopyDto;
//import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookCopyDto;
//import mk.ukim.finki.wp.emtlab.service.application.BookCopyApplicationService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/book-copies")
//public class BookCopyController {
//    private final BookCopyApplicationService bookCopyApplicationService;
//
//    public BookCopyController(BookCopyApplicationService bookCopyApplicationService) {
//        this.bookCopyApplicationService = bookCopyApplicationService;
//    }
//
//
//    @GetMapping
//    public List<DisplayBookCopyDto> getAll() {
//        return bookCopyApplicationService.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<DisplayBookCopyDto> getById(@PathVariable Long id) {
//        Optional<DisplayBookCopyDto> copy = bookCopyApplicationService.findById(id);
//        return copy.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public DisplayBookCopyDto create(@RequestBody CreateBookCopyDto dto) {
//        return bookCopyApplicationService.create(dto);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<DisplayBookCopyDto> update(@PathVariable Long id,
//                                                     @RequestBody CreateBookCopyDto dto) {
//        Optional<DisplayBookCopyDto> updated = bookCopyApplicationService.update(id, dto);
//        return updated.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @PostMapping("/{id}/rent")
//    public ResponseEntity<DisplayBookCopyDto> rent(@PathVariable Long id) {
//        Optional<DisplayBookCopyDto> rented = bookCopyApplicationService.rent(id);
//        return rented.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.badRequest().build());
//    }
//}
