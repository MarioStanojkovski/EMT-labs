package mk.ukim.finki.wp.emtlab.service.application.impl;

import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookCategoryStatsViewDto;
import mk.ukim.finki.wp.emtlab.service.application.BookCategoryStatsApplicationService;
import mk.ukim.finki.wp.emtlab.service.domain.BookCategoryStatsViewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookCategoryStatsViewApplicationServiceImpl implements BookCategoryStatsApplicationService {
    private final BookCategoryStatsViewService bookCategoryStatsViewService;

    public BookCategoryStatsViewApplicationServiceImpl(BookCategoryStatsViewService bookCategoryStatsViewService) {
        this.bookCategoryStatsViewService = bookCategoryStatsViewService;
    }

    @Override
    public List<DisplayBookCategoryStatsViewDto> findAll() {
        return DisplayBookCategoryStatsViewDto.from(bookCategoryStatsViewService.findAll());
    }
}
