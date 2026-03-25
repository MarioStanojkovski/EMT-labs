package mk.ukim.finki.wp.emtlab.service.domain;

import mk.ukim.finki.wp.emtlab.model.views.BookCategoryStatsView;

import java.util.List;

public interface BookCategoryStatsViewService {
    List<BookCategoryStatsView>findAll();
}
