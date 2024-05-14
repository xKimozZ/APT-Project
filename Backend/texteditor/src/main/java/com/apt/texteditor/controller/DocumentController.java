package com.apt.texteditor.controller;

import com.apt.texteditor.dto.DeleteRequest;
import com.apt.texteditor.dto.FileChangeRequest;
import com.apt.texteditor.dto.PermissionRequest;
import com.apt.texteditor.model.GroupPermission;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

import com.apt.texteditor.service.DocumentService;
import com.apt.texteditor.dto.DocumentRequest;
import com.apt.texteditor.model.Document;
import static com.apt.texteditor.utils.JwtUtils.decodeToken;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping
    public ResponseEntity<Document> createDocument(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody DocumentRequest request) {
        Document document = new Document();
        document.setTitle(request.getTitle());
        document.setOwner(request.getUsername());
        document.setContent("");
        Document createdDocument = documentService.createDocument(document);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDocument);
    }

    @PostMapping("/delete-file")
    public ResponseEntity<?> deleteFile(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody DeleteRequest request) {
        try {
            // Extract the token from the Authorization header
            String token = authorizationHeader.replace("Bearer ", "");

            // Decode the token and retrieve its claims
            Claims claims = decodeToken(token);
            String username = claims.getSubject();
            // Call the service method to delete the file
            if (documentService.deleteFile(request.getFileId(), username))
            {
                return ResponseEntity.ok().body("{\"message\": \"File" + request.getFileId() + "\"}");
            }
            else
            {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not allowed to delete this file");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file");
        }
    }

    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        // Extract the token from the Authorization header
        String token = authorizationHeader.replace("Bearer ", "");

        // Decode the token and retrieve its claims
        Claims claims = decodeToken(token);
        String username = claims.getSubject();
        List<Document> documents = documentService.getAllDocumentsForUser(username);
        return ResponseEntity.ok(documents);
        //List<Document> documents = (List<Document>) documentService.getAllDocuments();
        //return ResponseEntity.ok(documents);
    }

    @PostMapping("/change-permissions")
    public ResponseEntity<?> changePermissions(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody PermissionRequest request) {
        try {
            // Extract the token from the Authorization header
            String token = authorizationHeader.replace("Bearer ", "");

            // Decode the token and retrieve its claims
            Claims claims = decodeToken(token);
            String myUsername = claims.getSubject();
            if (Objects.equals(myUsername, request.getUsername()))
            {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Can't change your own permissions");
            }
            // Call a service method to handle adding or modifying permissions
            documentService.changePermissions(request.getFileId(), myUsername ,request.getUsername(), request.isCanView(), request.isCanEdit(), request.isCanRename(), request.isCanDelete());
            return ResponseEntity.ok().body("{\"message\": \"Permission changes confirmed for " + request.getUsername() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error changing permissions");
        }
    }

    @GetMapping("/get-permissions/{id}")
    public ResponseEntity<List<GroupPermission>> getPermissions(@PathVariable String id) {
        // Find the document by id
        Document document = documentService.getDocumentById(id);

        // Check if the document exists
        if (document != null) {
            List<GroupPermission> groupPermissions = document.getGroupPermissions();
            return ResponseEntity.ok(groupPermissions);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable String id) {
        Document document = documentService.getDocumentById(id);
        if (document != null) {
            return ResponseEntity.ok(document);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocumentById(@PathVariable String id) {
        documentService.deleteDocumentById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/file-change")
    public ResponseEntity<?> confirmFileChanges(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody FileChangeRequest request) {
        try {
            // Extract the token from the Authorization header
            String token = authorizationHeader.replace("Bearer ", "");

            // Decode the token and retrieve its claims
            Claims claims = decodeToken(token);
            String username = claims.getSubject();

            // Call the service method to apply the file changes
            if (documentService.confirmFileChanges(request.getFileId(), request.getTitle(), request.isSharingOptionsOn(), username)) {
                return ResponseEntity.ok().body("{\"message\": \"File changes confirmed for " + request.getFileId() + "\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not allowed to confirm changes for this file");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error confirming file changes");
        }
    }
}
