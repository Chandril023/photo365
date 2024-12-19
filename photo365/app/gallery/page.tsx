"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, Search } from 'lucide-react';

// Types and Interfaces
interface Image {
  _id: string;
  tag: string;
  url: string;
  title?: string;
}

interface TagCount {
  tag: string;
  count: number;
}

// Props interface for future extensibility
interface ImageGalleryProps {
  apiEndpoint?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  apiEndpoint = 'https://photo365.onrender.com/images' 
}) => {
  // State with proper typing
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tags, setTags] = useState<TagCount[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch images with error handling
  useEffect(() => {
    const fetchImages = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Image[] = await response.json();
        setImages(data);
        
        // Process tags with counts
        const tagCounts = data.reduce((acc: Map<string, number>, img: Image) => {
          acc.set(img.tag, (acc.get(img.tag) || 0) + 1);
          return acc;
        }, new Map<string, number>());

        const processedTags: TagCount[] = Array.from(tagCounts.entries()).map(
          ([tag, count]) => ({ tag, count })
        );
        
        setTags(processedTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    void fetchImages();
  }, [apiEndpoint]);

  // Memoized filter function
  const filteredImages = useMemo(() => {
    return images.filter(image => {
      const matchesSearch = image.tag.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.size === 0 || selectedTags.has(image.tag);
      return matchesSearch && matchesTags;
    });
  }, [images, searchTerm, selectedTags]);

  // Optimized tag toggle handler
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => {
      const newTags = new Set(prev);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  }, []);

  // Memoized search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Modal handlers
  const handleOpenModal = useCallback((image: Image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by tag..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                selectedTags.has(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {tag}
              <span className="ml-2 text-xs">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No images found matching your search criteria
        </div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="relative overflow-hidden group cursor-pointer aspect-square"
              onClick={() => handleOpenModal(image)}
            >
              <figure className="relative m-0 overflow-hidden h-full">
                <img
                  src={image.url}
                  alt={image.title || image.tag}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <figcaption className="absolute inset-0 flex items-center justify-center text-white text-lg p-4 opacity-0 
                                     transform translate-y-4 transition-all duration-300 group-hover:opacity-100 
                                     group-hover:translate-y-0 z-10">
                  {image.title || image.tag}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="rounded-lg overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.title || selectedImage.tag}
                className="w-full h-auto"
              />
              <div className="p-4 bg-white bg-opacity-10">
                <span className="px-3 py-1 bg-black bg-opacity-50 rounded-full text-sm text-white">
                  {selectedImage.title || selectedImage.tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;