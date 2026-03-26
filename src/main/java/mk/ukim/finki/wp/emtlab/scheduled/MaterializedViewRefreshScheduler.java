package mk.ukim.finki.wp.emtlab.scheduled;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.wp.emtlab.repository.BookCategoryStatsViewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MaterializedViewRefreshScheduler {

   // private final Logger logger = LoggerFactory.getLogger(MaterializedViewRefreshScheduler.class);

    private final BookCategoryStatsViewRepository bookCategoryStatsViewRepository;

    public MaterializedViewRefreshScheduler(BookCategoryStatsViewRepository bookCategoryStatsViewRepository) {
        this.bookCategoryStatsViewRepository = bookCategoryStatsViewRepository;
    }

    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void refreshBookCategoryStats() {
        log.info("Starting refresh of book_category_stats materialized view...");
        bookCategoryStatsViewRepository.refresh();
        log.info("Finished refresh of book_category_stats materialized view.");
    }
}
