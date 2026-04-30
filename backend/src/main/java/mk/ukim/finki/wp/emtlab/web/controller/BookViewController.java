package mk.ukim.finki.wp.emtlab.web.controller;

import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookCategoryStatsViewDto;
import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookViewDto;
import mk.ukim.finki.wp.emtlab.service.application.BookCategoryStatsApplicationService;
import mk.ukim.finki.wp.emtlab.service.application.BookViewApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/views")
public class BookViewController {

    private final BookViewApplicationService bookViewApplicationService;
    private final BookCategoryStatsApplicationService bookCategoryStatsViewApplicationService;

    public BookViewController(BookViewApplicationService bookViewApplicationService, BookCategoryStatsApplicationService bookCategoryStatsViewApplicationService) {
        this.bookViewApplicationService = bookViewApplicationService;
        this.bookCategoryStatsViewApplicationService = bookCategoryStatsViewApplicationService;
    }


    @GetMapping("/books")
    public ResponseEntity<List<DisplayBookViewDto>> getAllBooksFromView() {
        return ResponseEntity.ok(bookViewApplicationService.findAll());
    }

    @GetMapping("/category-stats")
    public ResponseEntity<List<DisplayBookCategoryStatsViewDto>> getCategoryStats() {
        return ResponseEntity.ok(bookCategoryStatsViewApplicationService.findAll());
    }
}
