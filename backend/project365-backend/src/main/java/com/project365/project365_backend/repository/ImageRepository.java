package com.project365.project365_backend.repository;

import com.project365.project365_backend.model.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageRepository extends MongoRepository<Image, String> {
    // You can define custom queries here if needed, e.g.:
    // List<Image> findByTag(String tag);
}
