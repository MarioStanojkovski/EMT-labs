package mk.ukim.finki.wp.emtlab.service.domain.impl;

import mk.ukim.finki.wp.emtlab.model.domain.Author;
import mk.ukim.finki.wp.emtlab.repository.AuthorRepository;
import mk.ukim.finki.wp.emtlab.repository.BookRepository;
import mk.ukim.finki.wp.emtlab.service.domain.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final BookRepository bookRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository, BookRepository bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    @Override
    public Optional<Author> findById(Long id) {
        return authorRepository.findById(id);
    }

    @Override
    public Author create(Author author) {
        return authorRepository.save(author);
    }

    @Override
    public Optional<Author> update(Long id, Author author) {
        return authorRepository.findById(id)
                .map(existingAuthor -> {
                    existingAuthor.setName(author.getName());
                    existingAuthor.setSurname(author.getSurname());
                    existingAuthor.setCountry(author.getCountry());
                    return authorRepository.save(existingAuthor);
                });
    }

    @Override
    public Optional<Author> deleteById(Long id) {
        return authorRepository.findById(id)
                .map(author -> {
                    bookRepository.findAll().stream()
                            .filter(book -> book.getAuthor().getId().equals(id))
                            .forEach(bookRepository::delete);
                    authorRepository.delete(author);
                    return author;
                });
    }
}
