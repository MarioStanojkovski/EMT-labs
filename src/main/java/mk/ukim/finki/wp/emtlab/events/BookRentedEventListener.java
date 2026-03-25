package mk.ukim.finki.wp.emtlab.events;

import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.wp.emtlab.model.domain.ActivityLog;
import mk.ukim.finki.wp.emtlab.repository.ActivityLogRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.LocalDateTime;

@Component
@Slf4j
public class BookRentedEventListener {

    private final ActivityLogRepository activityLogRepository;

    public BookRentedEventListener(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async
    public void onBookRented(BookRentedEvent event) {
        String bookName = event.book().getName();
        long remaining = event.remainingAvailableCopies();

        log.info("Book rented: '{}'. Remaining available copies: {}", bookName, remaining);

        activityLogRepository.save(new ActivityLog(bookName, LocalDateTime.now(), "BOOK_RENTED"));

        if (remaining == 0) {
            log.warn("Book '{}' is now unavailable (0 available copies).", bookName);
            activityLogRepository.save(new ActivityLog(bookName, LocalDateTime.now(), "BOOK_UNAVAILABLE"));
        }
    }
}
