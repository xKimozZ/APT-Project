package com.apt.texteditor.dto;

public class DocumentOperation {
    private String type; // "insert", "delete", or "format"
    private int position; // Position in the document where the operation should be applied
    private String text; // Text to insert or delete
    private String format; // Format to apply (e.g., "bold", "italic")

    public DocumentOperation() {
    }

    public DocumentOperation(String type, int position, String text, String format) {
        this.type = type;
        this.position = position;
        this.text = text;
        this.format = format;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }
}
