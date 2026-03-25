package mk.ukim.finki.wp.emtlab.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.wp.emtlab.model.enums.Category;
import mk.ukim.finki.wp.emtlab.model.enums.State;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "books")
public class Book extends BaseAuditableEntity {

    @Column(nullable = false)
    private Boolean deleted = false;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private Author author;

    public Book(String name, Category category, State state, Author author) {
        this.name = name;
        this.category = category;
        this.state = state;
        this.author = author;
        this.deleted = false;
    }
}