package mk.ukim.finki.wp.emtlab.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Getter
@Table(name = "book_view")
public class BookView {

    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "state")
    private String state;

    @Column(name = "available_copies")
    private Long availableCopies;

    @Column(name = "author_full_name")
    private String authorFullName;

    @Column(name = "country_name")
    private String countryName;
}
