// components/ui/gallery-component.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Search } from "lucide-react";

interface ImageData {
  _id: string;
  tag: string;
  url: string;
  title?: string;
}

interface GalleryComponentProps {
  apiEndpoint?: string;
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({
  apiEndpoint = "https://photo365.onrender.com/api/images",
}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data: ImageData[] = await response.json();
        setImages(data);

        const uniqueTags = [...new Set(data.map((img) => img.tag))];
        setTags(uniqueTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [apiEndpoint]);

  const filteredImages = images.filter((image) => {
    const matchesSearch = image.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.includes(image.tag);
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < filteredImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col items-center">
      {/* Search and Filter Section */}
      <div className="w-full max-w-4xl mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-transparent hover:bg-gray-700 text-gray-300"
              }`}
            >
              {tag}
              <span className="ml-2 text-xs">
                ({images.filter((img) => img.tag === tag).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No images found matching your search criteria
        </div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image._id}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <figure className="relative m-0 overflow-hidden h-full">
                <Image
                  src={image.url}
                  alt={image.title || image.tag}
                  width={1080} // Instagram size
                  height={1080} // Instagram size
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-50"
                />
                <figcaption className="absolute inset-0 flex items-center justify-center text-white text-lg p-4 opacity-0 transform translate-y-8 transition-all duration-600 group-hover:opacity-100 group-hover:translate-y-0">
                  {image.title || image.tag}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="rounded-lg overflow-hidden text-center">
              <Image
                src={filteredImages[selectedImageIndex].url}
                alt={filteredImages[selectedImageIndex].title || filteredImages[selectedImageIndex].tag}
                width={1080} // Instagram size
                height={1080} // Instagram size
                className="w-full h-full object-cover" // Ensures image fills the container without distortion
              />
              <div className="p-4 text-white">
                <h2 className="text-lg font-bold">{filteredImages[selectedImageIndex].title || filteredImages[selectedImageIndex].tag}</h2>
              </div>
            </div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={handlePrev}
                disabled={selectedImageIndex === 0}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={handleNext}
                disabled={selectedImageIndex === filteredImages.length - 1}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;
