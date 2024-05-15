package com.apt.texteditor.repository;

import com.apt.texteditor.model.DocumentData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DocumentDataRepository extends MongoRepository<DocumentData, String> {
}
