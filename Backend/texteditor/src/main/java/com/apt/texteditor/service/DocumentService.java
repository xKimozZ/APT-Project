package com.apt.texteditor.service;

import com.apt.texteditor.model.Document;
import com.apt.texteditor.model.GroupPermission;
import com.apt.texteditor.repository.DocumentsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentsRepository documentRepository;

    public void changePermissions(String fileId, String myUsername,String username, boolean canView, boolean canEdit, boolean canRename, boolean canDelete) {
        // Find the document by fileId
        Document document = documentRepository.findById(fileId).orElse(null);

        // Check if the document exists
        if (document != null) {
            // Check if the authenticated user is the owner of the document
            if (document.getOwner().equals(myUsername)) {
                // Add or modify the user permissions
                List<GroupPermission> groupPermissions = document.getGroupPermissions();
                if (groupPermissions == null) {
                    groupPermissions = new ArrayList<>();
                }

                // Check if the user already has permissions and update them
                boolean found = false;
                for (GroupPermission permission : groupPermissions) {
                    if (permission.getUsername().equals(username)) {
                        permission.setCanView(canView);
                        permission.setCanEdit(canEdit);
                        permission.setCanRename(canRename);
                        permission.setCanDelete(canDelete);
                        found = true;
                        break;
                    }
                }

                // If user doesn't have permissions, add new permissions
                if (!found) {
                    GroupPermission newPermission = new GroupPermission(username, canView, canEdit, canRename, canDelete);
                    groupPermissions.add(newPermission);
                }

                // Update the document with new permissions
                document.setGroupPermissions(groupPermissions);
                documentRepository.save(document);
            }
        }
    }


    public Boolean confirmFileChanges(String fileId, String newTitle, boolean sharingOptionsOn, String username,
                                      boolean aPublic) {
        // Find the document by fileId
        Document document = documentRepository.findById(fileId).orElse(null);

        // Check if the document exists
        if (document != null) {
            // Check if the authenticated user is the owner of the file
            if (document.getOwner().equals(username) || renameCheck(document, username) ) {
                // Apply the file changes (e.g., update title and sharing options)
                if (!sharingOptionsOn && document.getOwner().equals(username) ) {
                    // Delete all users in groupPermissions
                    document.setGroupPermissions(new ArrayList<>());
                }
                document.setTitle(newTitle);
                if (document.getOwner().equals(username))
                {
                    document.setPublicViewingOn(aPublic);
                    document.setSharingOptionsOn(sharingOptionsOn);
                }
                documentRepository.save(document);


                return true;
            }
            else {
                System.out.println("User not authorized to confirm changes for file: " + fileId);
                return false;
            }
        } else {
            System.out.println("File not found: " + fileId);
            return false;
        }
    }

    public Boolean renameCheck(Document document, String username) {
        List<GroupPermission> group = document.getGroupPermissions();
        if (group != null)
        {
            for (GroupPermission permission : group) {
                if (permission.getUsername().equals(username) && permission.isCanRename()) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    public Boolean deleteCheck(Document document, String username) {
        List<GroupPermission> group = document.getGroupPermissions();
        if (group != null)
        {
            for (GroupPermission permission : group) {
                if (permission.getUsername().equals(username) && permission.isCanDelete()) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    public Boolean deleteFile(String fileId, String username) {
        // Find the document by fileId
        Document document = documentRepository.findById(fileId).orElse(null);

        // Check if the document exists
        if (document != null) {
            if (document.getOwner().equals(username)) {
                // Delete the document from the database
                documentRepository.delete(document);
                System.out.println("File deleted successfully: " + fileId);
                return true;
            } else if ( deleteCheck(document,username) ) {
                // Delete the document from the database
                documentRepository.delete(document);
                System.out.println("File deleted successfully: " + fileId);
                return true;
            }
            else {
                System.out.println("User not authorized to delete file: " + fileId);
                return false;
            }
            // Check if the authenticated user is the owner of the file or has delete permission
        } else {
            System.out.println("File not found: " + fileId);
            return false;
        }
    }

    public List<Document> getAllDocumentsForUser(String username) {
        // Retrieve documents owned by the user
        List<Document> ownedDocuments = documentRepository.findByOwnerOrGroupPermissionsUsername(username);


        return ownedDocuments;
    }

    public DocumentService(DocumentsRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Iterable<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(String id) {
        return documentRepository.findById(id).orElse(null);
    }

    public void deleteDocumentById(String id) {
        documentRepository.deleteById(id);
    }

    public Document createDocument(Document document) {
        return documentRepository.save(document);
    }
}
