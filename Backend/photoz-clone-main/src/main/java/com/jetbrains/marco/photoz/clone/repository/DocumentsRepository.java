package com.jetbrains.marco.photoz.clone.repository;

import com.jetbrains.marco.photoz.clone.model.Document;
import com.jetbrains.marco.photoz.clone.model.Photo;
import org.springframework.data.repository.CrudRepository;

public interface DocumentsRepository extends CrudRepository<Document, Integer> {
}
