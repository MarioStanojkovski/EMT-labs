package mk.ukim.finki.wp.emtlab.service.application;

import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookCategoryStatsViewDto;

import java.util.List;

public interface BookCategoryStatsApplicationService {
    List<DisplayBookCategoryStatsViewDto> findAll();
}
