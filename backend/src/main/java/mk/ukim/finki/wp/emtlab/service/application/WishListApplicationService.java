package mk.ukim.finki.wp.emtlab.service.application;

import mk.ukim.finki.wp.emtlab.model.domain.User;
import mk.ukim.finki.wp.emtlab.model.dto.DisplayWishListDto;

public interface WishListApplicationService {
    DisplayWishListDto getForUser(User user);
    DisplayWishListDto addBook(User user, Long bookId);
    DisplayWishListDto removeBook(User user, Long bookId);
    DisplayWishListDto checkout(User user);
}
