package mk.ukim.finki.wp.emtlab.service.application.impl;

import mk.ukim.finki.wp.emtlab.model.domain.User;
import mk.ukim.finki.wp.emtlab.model.dto.DisplayWishListDto;
import mk.ukim.finki.wp.emtlab.service.application.WishListApplicationService;
import mk.ukim.finki.wp.emtlab.service.domain.WishListService;
import org.springframework.stereotype.Service;

@Service
public class WishListApplicationServiceImpl implements WishListApplicationService {

    private final WishListService wishListService;

    public WishListApplicationServiceImpl(WishListService wishListService) {
        this.wishListService = wishListService;
    }

    @Override
    public DisplayWishListDto getForUser(User user) {
        return DisplayWishListDto.from(wishListService.getOrCreateForUser(user));
    }

    @Override
    public DisplayWishListDto addBook(User user, Long bookId) {
        return DisplayWishListDto.from(wishListService.addBook(user, bookId));
    }

    @Override
    public DisplayWishListDto removeBook(User user, Long bookId) {
        return DisplayWishListDto.from(wishListService.removeBook(user, bookId));
    }

    @Override
    public DisplayWishListDto checkout(User user) {
        return DisplayWishListDto.from(wishListService.checkout(user));
    }
}
