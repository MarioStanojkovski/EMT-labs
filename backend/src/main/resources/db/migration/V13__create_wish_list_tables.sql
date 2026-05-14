CREATE TABLE wish_lists (
    id         bigserial    primary key,
    created_at timestamp    not null,
    updated_at timestamp    not null,
    user_id    bigint       not null unique,
    CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE wish_list_books (
    wish_list_id bigint not null,
    book_id      bigint not null,
    PRIMARY KEY (wish_list_id, book_id),
    CONSTRAINT fk_wlb_wishlist FOREIGN KEY (wish_list_id) REFERENCES wish_lists(id),
    CONSTRAINT fk_wlb_book    FOREIGN KEY (book_id)      REFERENCES books(id)
);
