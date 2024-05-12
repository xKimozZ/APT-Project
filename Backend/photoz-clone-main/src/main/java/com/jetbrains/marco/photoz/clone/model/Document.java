package com.jetbrains.marco.photoz.clone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.ArrayList;
import java.util.List;

@Table("DOCUMENTS")
public class Document {
    @Id
    private String id;
    private String content; // Quill content as JSON string
    private List<GroupPermission> groupPermissions;
    private List<String> versionHistory;

    public Document() {
        this.groupPermissions = new ArrayList<>();
        this.versionHistory = new ArrayList<>();
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public List<String> getVersionHistory() {
        return versionHistory;
    }

    public void setVersionHistory(List<String> versionHistory) {
        this.versionHistory = versionHistory;
    }
}
