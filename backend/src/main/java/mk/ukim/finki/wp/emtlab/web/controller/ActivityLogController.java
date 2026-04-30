package mk.ukim.finki.wp.emtlab.web.controller;

import mk.ukim.finki.wp.emtlab.model.domain.ActivityLog;
import mk.ukim.finki.wp.emtlab.service.application.ActivityLogApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/activity-log")
public class ActivityLogController {

    private final ActivityLogApplicationService activityLogApplicationService;

    public ActivityLogController(ActivityLogApplicationService activityLogApplicationService) {
        this.activityLogApplicationService = activityLogApplicationService;
    }

    @GetMapping
    public ResponseEntity<Page<ActivityLog>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(activityLogApplicationService.findAll(page, size));
    }
}
