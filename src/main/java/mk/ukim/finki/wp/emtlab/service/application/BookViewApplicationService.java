package mk.ukim.finki.wp.emtlab.service.application;

import mk.ukim.finki.wp.emtlab.model.dto.DisplayBookViewDto;

import java.util.List;

public interface BookViewApplicationService {
    List<DisplayBookViewDto> findAll();
}
