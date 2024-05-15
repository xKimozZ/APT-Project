package com.apt.texteditor.model;
import org.springframework.data.annotation.Id;
import java.util.List;

@org.springframework.data.mongodb.core.mapping.Document(collection = "documents")
public class DocumentData {

    @Id
    private String id;
    private List<Version> versions;
    private List<Operation> data;

    public void setId(String id) {
        this.id = id;
    }

    public void setVersions(List<Version> versions) {
        this.versions = versions;
    }

    public String getId() {
        return id;
    }

    public List<Version> getVersions() {
        return versions;
    }

    public List<Operation> getData() {
        return data;
    }

    public void setData(List<Operation> data) {
        this.data = data;
    }
}
