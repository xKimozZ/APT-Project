package com.apt.texteditor.dto;

public class PermissionRequest {
    private String fileId;
    private String username;
    private boolean canView;
    private boolean canEdit;
    private boolean canRename;
    private boolean canDelete;

    // Getters and setters

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCanDelete(boolean canDelete) {
        this.canDelete = canDelete;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }

    public void setCanRename(boolean canRename) {
        this.canRename = canRename;
    }

    public void setCanView(boolean canView) {
        this.canView = canView;
    }

    public String getFileId() {
        return fileId;
    }

    public String getUsername() {
        return username;
    }

    public boolean isCanDelete() {
        return canDelete;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public boolean isCanRename() {
        return canRename;
    }

    public boolean isCanView() {
        return canView;
    }
}
