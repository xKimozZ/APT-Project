package com.apt.texteditor.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@org.springframework.data.mongodb.core.mapping.Document(collection = "Docs")
public class Document {
    @Id
    private String id;
    private String title;
    private String owner;
    private String content; // Quill content as JSON string
    private List<GroupPermission> groupPermissions;

    public Document() {
        this.groupPermissions = new ArrayList<>();
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<GroupPermission> getGroupPermissions() {
        return groupPermissions;
    }

    public void setGroupPermissions(List<GroupPermission> groupPermissions) {
        this.groupPermissions = groupPermissions;
    }
}
