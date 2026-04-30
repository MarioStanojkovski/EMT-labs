package mk.ukim.finki.wp.emtlab.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.wp.emtlab.model.enums.State;
import mk.ukim.finki.wp.emtlab.model.domain.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BookCopy extends BaseEntity{

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private State state;

    private boolean rented;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "rented_by_user_id")
    private User rentedBy;

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public boolean isRented() {
        return rented;
    }

    public void setRented(boolean rented) {
        this.rented = rented;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public User getRentedBy() {
        return rentedBy;
    }

    public void setRentedBy(User rentedBy) {
        this.rentedBy = rentedBy;
    }

    public BookCopy(State state, boolean rented, Book book) {
        this.state = state;
        this.rented = rented;
        this.book = book;
    }



}
