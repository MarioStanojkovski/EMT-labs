package mk.ukim.finki.wp.emtlab.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Getter
@Table(name = "book_category_stats")
public class BookCategoryStatsView {

    @Id
    private Long id;

    @Column(name = "category")
    private String category;

    @Column(name = "total_books")
    private Long totalBooks;

    @Column(name = "total_available_copies")
    private Long totalAvailableCopies;

    @Column(name = "books_not_in_good_state")
    private Long booksNotInGoodState;
}
