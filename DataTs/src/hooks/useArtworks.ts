import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse, Artwork, Pagination } from '../types/api';

const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

interface UseArtworksResult {
  artworks: Artwork[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  selectedRows: Set<number>;
  goToPage: (page: number) => void;
  toggleRowSelection: (id: number) => void;
  toggleSelectAll: () => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  clearAllSelections: () => void;
  removeSelectedItem: (id: number) => void;
  getSelectedArtworkDetails: () => Promise<Artwork[]>;
}

export const useArtworks = (): UseArtworksResult => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const fetchArtworks = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}?page=${page}&_=${timestamp}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      const mappedArtworks: Artwork[] = data.data.map(artwork => ({
        id: artwork.id,
        title: artwork.title || 'Untitled',
        place_of_origin: artwork.place_of_origin || 'Unknown',
        artist_display: artwork.artist_display || 'Unknown Artist',
        inscriptions: artwork.inscriptions,
        date_start: artwork.date_start,
        date_end: artwork.date_end
      }));
      
      setArtworks(mappedArtworks);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching artworks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    fetchArtworks(page);
  }, [fetchArtworks]);

  const toggleRowSelection = useCallback((id: number) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedRows.size === artworks.length) {
      setSelectedRows(prev => {
        const newSet = new Set(prev);
        artworks.forEach(artwork => newSet.delete(artwork.id));
        return newSet;
      });
    } else {
      setSelectedRows(prev => {
        const newSet = new Set(prev);
        artworks.forEach(artwork => newSet.add(artwork.id));
        return newSet;
      });
    }
  }, [artworks, selectedRows.size]);

  const clearAllSelections = useCallback(() => {
    setSelectedRows(new Set());
  }, []);

  const removeSelectedItem = useCallback((id: number) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const getSelectedArtworkDetails = useCallback(async (): Promise<Artwork[]> => {
    if (selectedRows.size === 0) return [];
    
    try {
      const selectedIds = Array.from(selectedRows);
      const detailsPromises = selectedIds.map(async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) return null;
        const data = await response.json();
        return {
          id: data.data.id,
          title: data.data.title || 'Untitled',
          place_of_origin: data.data.place_of_origin || 'Unknown',
          artist_display: data.data.artist_display || 'Unknown Artist',
          inscriptions: data.data.inscriptions,
          date_start: data.data.date_start,
          date_end: data.data.date_end
        } as Artwork;
      });
      
      const results = await Promise.all(detailsPromises);
      return results.filter(Boolean) as Artwork[];
    } catch (error) {
      console.error('Error fetching selected artwork details:', error);
      return [];
    }
  }, [selectedRows]);

  const isAllSelected = artworks.length > 0 && artworks.every(artwork => selectedRows.has(artwork.id));
  const isIndeterminate = artworks.some(artwork => selectedRows.has(artwork.id)) && !isAllSelected;

  useEffect(() => {
    fetchArtworks(currentPage);
  }, []);

  return {
    artworks,
    pagination,
    loading,
    error,
    selectedRows,
    goToPage,
    toggleRowSelection,
    toggleSelectAll,
    isAllSelected,
    isIndeterminate,
    clearAllSelections,
    removeSelectedItem,
    getSelectedArtworkDetails
  };
};
