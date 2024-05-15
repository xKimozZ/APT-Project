package com.apt.texteditor.model;

import java.util.Date;

public class Version {

    private String id;
    private Date date;
    private String data;

    public Date getDate() {
        return date;
    }

    public String getData() {
        return data;
    }

    public String getId() {
        return id;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setId(String id) {
        this.id = id;
    }
}
