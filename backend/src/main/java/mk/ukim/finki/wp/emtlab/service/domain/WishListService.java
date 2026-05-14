package mk.ukim.finki.wp.emtlab.service.domain;

import mk.ukim.finki.wp.emtlab.model.domain.User;
import mk.ukim.finki.wp.emtlab.model.domain.WishList;

public interface WishListService {
    WishList getOrCreateForUser(User user);
    WishList addBook(User user, Long bookId);
    WishList removeBook(User user, Long bookId);
    WishList checkout(User user);
}
