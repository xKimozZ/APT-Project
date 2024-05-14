package com.apt.texteditor.dto;

public class FileChangeRequest {
    private String fileId;
    private String title;
    private boolean sharingOptionsOn;

    // Constructors, getters, and setters

    public FileChangeRequest() {
    }

    public FileChangeRequest(String fileId, String title, boolean sharingOptionsOn) {
        this.fileId = fileId;
        this.title = title;
        this.sharingOptionsOn = sharingOptionsOn;
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
}
