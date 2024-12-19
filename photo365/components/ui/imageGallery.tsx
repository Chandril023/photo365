import React, { useState, useEffect } from 'react';
import { X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Image {
  _id: string;
  tag: string;
  url: string;
  title?: string;
}

const ImageGallery = ({
  apiEndpoint = 'https://photo365.onrender.com/api/images'
}) => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const IMAGES_PER_PAGE = 9;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data: Image[] = await response.json();
        setImages(data);

        const uniqueTags = [...new Set(data.map(img => img.tag))] as string[];
        setTags(uniqueTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [apiEndpoint]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTags]);

  const filteredImages = images.filter(image => {
    const matchesSearch = image.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.includes(image.tag);
    return matchesSearch && matchesTags;
  });

  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearSearch = () => setSearchTerm('');

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
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-transparent hover:bg-gray-700 text-gray-300'
              }`}
            >
              {tag}
              <span className="ml-2 text-xs">
                ({images.filter(img => img.tag === tag).length})
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
        <>
          {/* Image Grid */}
          <div className="w-full max-w-6xl grid grid-cols-3 gap-2 mb-6">
            {paginatedImages.map((image) => (
              <div
                key={image._id}
                className="relative overflow-hidden group cursor-pointer aspect-square"
                onClick={() => setSelectedImage(image)}
              >
                <figure className="relative m-0 overflow-hidden h-full">
                  <Image
                    src={image.url}
                    alt={image.title || image.tag}
                    width={1080} // Fixed Instagram-like size
                    height={1080} // Fixed Instagram-like size
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 
                                 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-[200%] after:h-[200%] 
                                 after:bg-black after:bg-opacity-50 after:transform after:scale-0 after:rounded-full 
                                 after:transition-transform after:duration-900 group-hover:after:scale-[2.5] after:-translate-x-1/2 after:-translate-y-1/2"
                  />
                  <figcaption className="absolute inset-0 flex items-center justify-center text-white text-lg p-4 opacity-0 
                                       transform translate-y-8 transition-all duration-600 group-hover:opacity-100 
                                       group-hover:translate-y-0 group-hover:delay-400 z-10">
                    {image.title || image.tag}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="rounded-lg overflow-hidden">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title || selectedImage.tag}
                width={1080} // Fixed Instagram-like size
                height={1080} // Fixed Instagram-like size
                className="w-full h-auto"
              />
              <div className="p-4">
                <span className="px-3 py-1 bg-gray-700 bg-opacity-50 rounded-full text-sm text-white">
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
