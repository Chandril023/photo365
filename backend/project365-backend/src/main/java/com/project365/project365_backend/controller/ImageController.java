package com.project365.project365_backend.controller;

import com.project365.project365_backend.model.Image;
import com.project365.project365_backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    // Endpoint to get all images
    @GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    // Endpoint to get an image by ID
    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable String id) {
        Optional<Image> image = imageService.getImageById(id);
        return image.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to upload a new image
    @PostMapping
    public ResponseEntity<Image> uploadImage(@RequestBody Image image) {
        Image savedImage = imageService.saveImage(image);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedImage);
    }

    // Endpoint to update an image (name and tag)
    @PutMapping("/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable String id, @RequestBody Image image) {
        Optional<Image> existingImage = imageService.getImageById(id);
        if (existingImage.isPresent()) {
            image.setId(id); // Ensure the ID is not overwritten
            Image updatedImage = imageService.saveImage(image);
            return ResponseEntity.ok(updatedImage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete an image
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable String id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}
