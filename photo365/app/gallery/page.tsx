"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import type { NextPage } from 'next';

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

// Separate the gallery component props from the page props
interface GalleryComponentProps {
  apiEndpoint?: string;
}

// Create the actual gallery component
const GalleryComponent: React.FC<GalleryComponentProps> = ({ 
  apiEndpoint = 'https://photo365.onrender.com/images'
}) => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tags, setTags] = useState<TagCount[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Rest of your component logic remains the same
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

  // Your existing component render logic
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
      {/* Your existing JSX */}
    </div>
  );
};

// Create the page component
const ImageGalleryPage: NextPage = () => {
  return <GalleryComponent />;
};

export default ImageGalleryPage;