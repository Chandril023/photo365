package com.project365.project365_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images") // Specify the collection name in MongoDB
public class Image {

    @Id
    private String id;  // MongoDB generates a unique ID for each document

    private String name;
    private String tag;
    private String url;

    // Constructors
    public Image(String name, String tag, String url) {
        this.name = name;
        this.tag = tag;
        this.url = url;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
