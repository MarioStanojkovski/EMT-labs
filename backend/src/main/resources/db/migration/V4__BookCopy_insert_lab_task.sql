create table book_copy (
                           id bigint primary key,
                           created_at timestamp not null,
                           updated_at timestamp not null,
                           book_id bigint not null references books(id),
                           state varchar(50) not null,
                           rented boolean default false
);

create index idx_book_copy_book_rented
    on book_copy(book_id, rented);