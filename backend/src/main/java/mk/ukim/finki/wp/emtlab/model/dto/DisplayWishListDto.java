package mk.ukim.finki.wp.emtlab.model.dto;

import mk.ukim.finki.wp.emtlab.model.domain.WishList;

import java.util.List;

public record DisplayWishListDto(List<DisplayBookDto> books) {

    public static DisplayWishListDto from(WishList wishList) {
        return new DisplayWishListDto(DisplayBookDto.from(wishList.getBooks()));
    }
}
