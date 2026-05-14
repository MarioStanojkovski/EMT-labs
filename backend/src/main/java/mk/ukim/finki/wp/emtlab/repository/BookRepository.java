package mk.ukim.finki.wp.emtlab.repository;

import mk.ukim.finki.wp.emtlab.model.domain.Book;
import mk.ukim.finki.wp.emtlab.model.enums.Category;
import mk.ukim.finki.wp.emtlab.model.enums.State;
import mk.ukim.finki.wp.emtlab.model.projection.BookDetailedProjection;
import mk.ukim.finki.wp.emtlab.model.projection.BookSummaryProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findAllByDeletedFalse();

    @Query("SELECT b FROM Book b WHERE b.date_published < :date ORDER BY b.date_published DESC LIMIT 10")
    List<Book> findFirst10ByDatePublishedBefore(LocalDateTime date);

    Optional<Book> findByIdAndDeletedFalse(Long id);

    List<Book> findAllByDeletedFalseAndCategory(Category category);

    Page<Book> findAllByDeletedFalse(Pageable pageable);

    @Query("""
        SELECT DISTINCT b FROM Book b
        LEFT JOIN BookCopy bc ON bc.book = b
        LEFT JOIN b.author a
        WHERE b.deleted = false
        AND (:category IS NULL OR b.category = :category)
        AND (:state IS NULL OR b.state = :state)
        AND (:authorId IS NULL OR a.id = :authorId)
        AND (:available IS NULL OR
            (:available = true AND (SELECT COUNT(c) FROM BookCopy c WHERE c.book = b AND c.rented = false) > 0) OR
            (:available = false AND (SELECT COUNT(c) FROM BookCopy c WHERE c.book = b AND c.rented = false) = 0))
        """)
    Page<Book> filterBooks(
            @Param("category") Category category,
            @Param("state") State state,
            @Param("authorId") Long authorId,
            @Param("available") Boolean available,
            Pageable pageable
    );

    @Query("""
        SELECT b.id AS id, b.name AS name, b.category AS category,
               b.state AS state,
               COUNT(bc) AS availableCopies
        FROM Book b
        LEFT JOIN BookCopy bc ON bc.book = b AND bc.rented = false
        WHERE b.deleted = false
        GROUP BY b.id, b.name, b.category, b.state
        """)
    Page<BookSummaryProjection> findAllProjectedBy(Pageable pageable);

    @EntityGraph(attributePaths = {"author", "author.country"})
    @Query("SELECT b FROM Book b WHERE b.deleted = false")
    List<Book> findAllWithAuthorAndCountry();

    @Query("""
    SELECT b.id AS id, b.name AS name, b.category AS category,
           b.state AS state,
           COUNT(bc) AS availableCopies,
           a.name AS authorName, a.surname AS authorSurname,
           c.name AS authorCountry
    FROM Book b
    LEFT JOIN BookCopy bc ON bc.book = b AND bc.rented = false
    LEFT JOIN b.author a
    LEFT JOIN a.country c
    WHERE b.deleted = false
    GROUP BY b.id, b.name, b.category, b.state, a.name, a.surname, c.name
    """)
    Page<BookDetailedProjection> findAllDetailed(Pageable pageable);
}