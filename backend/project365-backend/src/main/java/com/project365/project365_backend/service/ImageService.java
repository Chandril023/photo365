package com.project365.project365_backend.service;

import com.project365.project365_backend.model.Image;
import com.project365.project365_backend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    // Save or update an image
    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    // Get all images
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    // Get image by ID
    public Optional<Image> getImageById(String id) {
        return imageRepository.findById(id);
    }

    // Delete image by ID
    public void deleteImage(String id) {
        imageRepository.deleteById(id);
    }

    // Reorder images (custom logic can be applied here)
    public List<Image> reorderImages(List<Image> images) {
        // Apply reorder logic as needed
        return images;
    }
}
