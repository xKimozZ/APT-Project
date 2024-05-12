package com.jetbrains.marco.photoz.clone.service;

import com.jetbrains.marco.photoz.clone.model.Document;
import com.jetbrains.marco.photoz.clone.repository.DocumentsRepository;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {

    private final DocumentsRepository documentRepository;

    public DocumentService(DocumentsRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Iterable<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(int id) {
        return documentRepository.findById(id).orElse(null);
    }

    public void deleteDocumentById(int id) {
        documentRepository.deleteById(id);
    }

    public Document createDocument(Document document) {
        return documentRepository.save(document);
    }
}
