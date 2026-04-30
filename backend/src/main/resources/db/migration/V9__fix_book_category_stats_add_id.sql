DROP MATERIALIZED VIEW IF EXISTS book_category_stats;

CREATE MATERIALIZED VIEW book_category_stats AS
SELECT
    ROW_NUMBER() OVER (ORDER BY b.category)                 AS id,
    b.category                                              AS category,
    COUNT(DISTINCT b.id)                                    AS total_books,
    COUNT(bc.id) FILTER (WHERE bc.rented = false)           AS total_available_copies,
    COUNT(DISTINCT b.id) FILTER (WHERE b.state != 'GOOD')   AS books_not_in_good_state
FROM books b
         LEFT JOIN book_copy bc ON bc.book_id = b.id
WHERE b.deleted = false
GROUP BY b.category;

CREATE UNIQUE INDEX idx_book_category_stats_category ON book_category_stats (category);
