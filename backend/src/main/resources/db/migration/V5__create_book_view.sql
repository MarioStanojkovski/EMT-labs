CREATE VIEW book_view AS
SELECT
    b.id                                 AS id,
    b.name                               AS name,
    b.category                           AS category,
    b.state                              AS state,
    COUNT(bc.id) FILTER (WHERE bc.rented = false) AS available_copies,
    a.name || ' ' || a.surname           AS author_full_name,
    c.name                               AS country_name
FROM books b
         LEFT JOIN authors a ON b.author_id = a.id
         LEFT JOIN countries c ON a.country_id = c.id
         LEFT JOIN book_copy bc ON bc.book_id = b.id
WHERE b.deleted = false
GROUP BY b.id, b.name, b.category, b.state, a.name, a.surname, c.name;
