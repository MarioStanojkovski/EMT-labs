package mk.ukim.finki.wp.emtlab.model.dto;

import mk.ukim.finki.wp.emtlab.model.views.BookCategoryStatsView;

import java.util.List;

public record DisplayBookCategoryStatsViewDto(

        String category,
        Long totalBooks,
        Long totalAvailableCopies,
        Long booksNotInGoodState
) {
    public static DisplayBookCategoryStatsViewDto from(BookCategoryStatsView bookCategoryStat) {
        return new DisplayBookCategoryStatsViewDto(
                bookCategoryStat.getCategory(),
                bookCategoryStat.getTotalBooks(),
                bookCategoryStat.getTotalAvailableCopies(),
                bookCategoryStat.getBooksNotInGoodState()
        );
    }


    public static List<DisplayBookCategoryStatsViewDto> from(List<BookCategoryStatsView> bookCategoryStatViews) {
        return bookCategoryStatViews
                .stream()
                .map(DisplayBookCategoryStatsViewDto::from)
                .toList();
    }
}
