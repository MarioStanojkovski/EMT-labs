package mk.ukim.finki.wp.emtlab.service.domain.impl;

import mk.ukim.finki.wp.emtlab.model.views.BookCategoryStatsView;
import mk.ukim.finki.wp.emtlab.repository.BookCategoryStatsViewRepository;
import mk.ukim.finki.wp.emtlab.service.domain.BookCategoryStatsViewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookCategoryStatsViewServiceImpl implements BookCategoryStatsViewService {
    private final BookCategoryStatsViewRepository bookCategoryStatsViewRepository;

    public BookCategoryStatsViewServiceImpl(BookCategoryStatsViewRepository bookCategoryStatsViewRepository) {
        this.bookCategoryStatsViewRepository = bookCategoryStatsViewRepository;
    }

    @Override
    public List<BookCategoryStatsView> findAll() {
        return bookCategoryStatsViewRepository.findAll();
    }
}
