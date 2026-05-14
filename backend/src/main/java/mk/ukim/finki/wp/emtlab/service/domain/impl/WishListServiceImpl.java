package mk.ukim.finki.wp.emtlab.service.domain.impl;

import jakarta.transaction.Transactional;
import mk.ukim.finki.wp.emtlab.model.domain.User;
import mk.ukim.finki.wp.emtlab.model.domain.WishList;
import mk.ukim.finki.wp.emtlab.repository.BookRepository;
import mk.ukim.finki.wp.emtlab.repository.WishListRepository;
import mk.ukim.finki.wp.emtlab.service.domain.WishListService;
import org.springframework.stereotype.Service;

@Service
public class WishListServiceImpl implements WishListService {

    private final WishListRepository wishListRepository;
    private final BookRepository bookRepository;

    public WishListServiceImpl(WishListRepository wishListRepository, BookRepository bookRepository) {
        this.wishListRepository = wishListRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public WishList getOrCreateForUser(User user) {
        return wishListRepository.findByUser(user)
                .orElseGet(() -> wishListRepository.save(new WishList(user)));
    }

    @Override
    @Transactional
    public WishList addBook(User user, Long bookId) {
        WishList wishList = getOrCreateForUser(user);
        bookRepository.findByIdAndDeletedFalse(bookId).ifPresent(book -> {
            if (!wishList.getBooks().contains(book)) {
                wishList.getBooks().add(book);
            }
        });
        return wishListRepository.save(wishList);
    }

    @Override
    @Transactional
    public WishList removeBook(User user, Long bookId) {
        WishList wishList = getOrCreateForUser(user);
        wishList.getBooks().removeIf(book -> book.getId().equals(bookId));
        return wishListRepository.save(wishList);
    }

    @Override
    @Transactional
    public WishList checkout(User user) {
        WishList wishList = getOrCreateForUser(user);
        wishList.getBooks().clear();
        return wishListRepository.save(wishList);
    }
}
