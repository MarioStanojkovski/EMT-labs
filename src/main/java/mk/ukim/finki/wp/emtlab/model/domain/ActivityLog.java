package mk.ukim.finki.wp.emtlab.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "activity_log")
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "book_name", nullable = false)
    private String bookName;

    @Column(name = "event_time", nullable = false)
    private LocalDateTime eventTime;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    public ActivityLog(String bookName, LocalDateTime eventTime, String eventType) {
        this.bookName = bookName;
        this.eventTime = eventTime;
        this.eventType = eventType;
    }
}
