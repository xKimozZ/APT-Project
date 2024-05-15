package com.apt.texteditor.model;

import java.util.Date;
import java.util.List;

public class Version {

    private String id;
    private Date date;
    private List<Operation> data;

    public Date getDate() {
        return date;
    }

    public String getId() {
        return id;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Operation> getData() {
        return data;
    }

    public void setData(List<Operation> data) {
        this.data = data;
    }
}
