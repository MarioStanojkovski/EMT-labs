package mk.ukim.finki.wp.emtlab.web.controller;

import mk.ukim.finki.wp.emtlab.model.domain.User;
import mk.ukim.finki.wp.emtlab.model.dto.DisplayWishListDto;
import mk.ukim.finki.wp.emtlab.service.application.WishListApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishListController {

    private final WishListApplicationService wishListApplicationService;

    public WishListController(WishListApplicationService wishListApplicationService) {
        this.wishListApplicationService = wishListApplicationService;
    }

    @GetMapping
    public ResponseEntity<DisplayWishListDto> getWishList(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(wishListApplicationService.getForUser(user));
    }

    @PostMapping("/add/{bookId}")
    public ResponseEntity<DisplayWishListDto> addBook(
            @PathVariable Long bookId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(wishListApplicationService.addBook(user, bookId));
    }

    @DeleteMapping("/remove/{bookId}")
    public ResponseEntity<DisplayWishListDto> removeBook(
            @PathVariable Long bookId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(wishListApplicationService.removeBook(user, bookId));
    }

    @PostMapping("/checkout")
    public ResponseEntity<DisplayWishListDto> checkout(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(wishListApplicationService.checkout(user));
    }
}
