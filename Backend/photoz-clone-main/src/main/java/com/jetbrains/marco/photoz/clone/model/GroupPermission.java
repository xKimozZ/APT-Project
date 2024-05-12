package com.jetbrains.marco.photoz.clone.model;

import org.springframework.data.relational.core.mapping.Table;

@Table("DOCUMENTS")
public class GroupPermission {
    private String username;
    private boolean canView;
    private boolean canEdit;
    private boolean canRename;
    private boolean canDelete;

    // Constructors, getters, and setters

    public GroupPermission() {
    }

    public GroupPermission(String username, boolean canView, boolean canEdit, boolean canRename, boolean canDelete) {
        this.username = username;
        this.canView = canView;
        this.canEdit = canEdit;
        this.canRename = canRename;
        this.canDelete = canDelete;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isCanView() {
        return canView;
    }

    public void setCanView(boolean canView) {
        this.canView = canView;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }

    public boolean isCanRename() {
        return canRename;
    }

    public void setCanRename(boolean canRename) {
        this.canRename = canRename;
    }

    public boolean isCanDelete() {
        return canDelete;
    }

    public void setCanDelete(boolean canDelete) {
        this.canDelete = canDelete;
    }
}
