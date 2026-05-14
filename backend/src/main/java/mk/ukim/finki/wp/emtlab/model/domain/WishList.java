package mk.ukim.finki.wp.emtlab.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "wish_lists")
public class WishList extends BaseAuditableEntity {

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToMany
    @JoinTable(
            name = "wish_list_books",
            joinColumns = @JoinColumn(name = "wish_list_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private List<Book> books = new ArrayList<>();

    public WishList(User user) {
        this.user = user;
    }
}
