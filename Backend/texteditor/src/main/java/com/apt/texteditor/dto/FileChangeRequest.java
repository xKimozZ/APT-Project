package com.apt.texteditor.dto;

public class FileChangeRequest {
    private String fileId;
    private String title;
    private boolean sharingOptionsOn;
    private boolean publicViewingOn;

    // Constructors, getters, and setters

    public FileChangeRequest() {
    }

    public FileChangeRequest(String fileId, String title, boolean sharingOptionsOn, boolean publicViewingOn) {
        this.fileId = fileId;
        this.title = title;
        this.sharingOptionsOn = sharingOptionsOn;
        this.publicViewingOn = publicViewingOn;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isSharingOptionsOn() {
        return sharingOptionsOn;
    }

    public void setSharingOptionsOn(boolean sharingOptionsOn) {
        this.sharingOptionsOn = sharingOptionsOn;
    }

    public boolean isPublicViewingOn() {
        return publicViewingOn;
    }

    public void setPublicViewingOn(boolean publicViewingOn) {
        this.publicViewingOn = publicViewingOn;
    }
}
