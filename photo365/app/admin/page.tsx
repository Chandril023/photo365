"use client";

import React, { useEffect, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import axios from "axios";

// Type definitions for images
type ImageType = {
  id: string;
  url: string;
  title: string;
  tag: string;
};

const API_BASE_URL = "https://photo365.onrender.com/api/images";

const AdminPage: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const [newImageTitle, setNewImageTitle] = useState<string>("");
  const [newImageTag, setNewImageTag] = useState<string>("");
  const [imageTitle, setImageTitle] = useState<string>("");
  const [imageTag, setImageTag] = useState<string>("");
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  // Fetch images from API
  const fetchImages = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newImage = { url: newImageUrl, title: newImageTitle, tag: newImageTag };
      const response = await axios.post(API_BASE_URL, newImage);
      setImages((prevImages) => [...prevImages, response.data]);
      setShowUploadModal(false);
      setNewImageUrl("");
      setNewImageTitle("");
      setNewImageTag("");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle delete image
  const handleDeleteImage = async (imageId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${imageId}`);
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
      setSelectedImage(null);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Handle edit image
  const handleEditImage = async () => {
    if (!selectedImage || !imageTitle || !imageTag) return;
    try {
      const updatedImage = { ...selectedImage, title: imageTitle, tag: imageTag };
      const response = await axios.put(`${API_BASE_URL}/${selectedImage.id}`, updatedImage);
      setImages((prevImages) =>
        prevImages.map((img) => (img.id === selectedImage.id ? response.data : img))
      );
      setEditMode(false);
      setImageTitle("");
      setImageTag("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images when component mounts
  }, []);

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow-lg p-4 mb-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
        <div className="flex items-center gap-6">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="text-sm text-blue-600 hover:text-blue-800 transition duration-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          {/* Add Image Button */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300 flex items-center gap-2"
            onClick={() => setShowUploadModal(true)}
          >
            <Plus size={16} /> Add Image
          </button>
        </div>
      </header>

      {/* Image List */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transition duration-200 transform hover:scale-105"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-lg font-semibold truncate">{image.title}</h3>
                <span className="text-white text-sm">{image.tag}</span>
                <div className="flex gap-3">
                  <button
                    className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditMode(true);
                      setSelectedImage(image);
                      setImageTitle(image.title);
                      setImageTag(image.tag);
                    }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(image.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-96 shadow-xl">
            <header className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Image</h2>
              <button
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => setShowUploadModal(false)}
              >
                <X size={20} />
              </button>
            </header>
            <form onSubmit={handleImageUpload}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newImageTag}
                  onChange={(e) => setNewImageTag(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Edit Modal */}
      {editMode && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-96 shadow-xl">
            <header className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Image</h2>
              <button
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setEditMode(false);
                  setSelectedImage(null);
                }}
              >
                <X size={20} />
              </button>
            </header>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={imageTag}
                onChange={(e) => setImageTag(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={() => {
                  setEditMode(false);
                  setSelectedImage(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                onClick={handleEditImage}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
