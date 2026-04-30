CREATE OR REPLACE PROCEDURE refresh_book_category_stats()
LANGUAGE SQL
AS $$
    REFRESH MATERIALIZED VIEW CONCURRENTLY book_category_stats;
$$;
