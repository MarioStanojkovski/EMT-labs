package mk.ukim.finki.wp.emtlab.service.application;

import mk.ukim.finki.wp.emtlab.model.domain.ActivityLog;
import org.springframework.data.domain.Page;

public interface ActivityLogApplicationService {
    Page<ActivityLog> findAll(int page, int size);
}
