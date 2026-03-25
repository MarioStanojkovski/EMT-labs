package mk.ukim.finki.wp.emtlab.web.controller;

import jakarta.validation.Valid;
import mk.ukim.finki.wp.emtlab.model.dto.CreateBookDto;
import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookDto;
import mk.ukim.finki.wp.emtlab.model.enums.Category;
import mk.ukim.finki.wp.emtlab.model.enums.State;
import mk.ukim.finki.wp.emtlab.model.projection.BookDetailedProjection;
import mk.ukim.finki.wp.emtlab.model.projection.BookSummaryProjection;
import mk.ukim.finki.wp.emtlab.service.application.BookApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookApplicationService bookApplicationService;

    public BookController(BookApplicationService bookApplicationService) {
        this.bookApplicationService = bookApplicationService;
    }

    @GetMapping
    public ResponseEntity<List<DisplayBookDto>> findAll() {
        return ResponseEntity.ok(bookApplicationService.findAll());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<DisplayBookDto>> findAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(bookApplicationService.findAll(page, size, sortBy));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<DisplayBookDto>> filter(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) State state,
            @RequestParam(required = false) Long authorId,
            @RequestParam(required = false) Boolean available,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(
                bookApplicationService.filter(category, state, authorId, available, page, size, sortBy)
        );
    }

    @GetMapping("/projections/summary")
    public ResponseEntity<Page<BookSummaryProjection>> findAllSummary(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(bookApplicationService.findAllSummary(page, size, sortBy));
    }

    @GetMapping("/projections/detailed")
    public ResponseEntity<Page<BookDetailedProjection>> findAllDetailed(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(bookApplicationService.findAllDetailed(page, size, sortBy));
    }

    @GetMapping("/with-author-country")
    public ResponseEntity<List<DisplayBookDto>> findAllWithAuthorAndCountry() {
        return ResponseEntity.ok(bookApplicationService.findAllWithAuthorAndCountry());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayBookDto> findById(@PathVariable Long id) {
        return bookApplicationService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayBookDto> create(@RequestBody @Valid CreateBookDto createBookDTO) {
        return ResponseEntity.ok(bookApplicationService.create(createBookDTO));
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<DisplayBookDto> update(
            @PathVariable Long id,
            @RequestBody @Valid CreateBookDto createBookDTO
    ) {
        return bookApplicationService.update(id, createBookDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<DisplayBookDto> deleteById(@PathVariable Long id) {
        return bookApplicationService.deleteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/rent")
    public ResponseEntity<DisplayBookDto> rent(@PathVariable Long id) {
        return bookApplicationService.rent(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}