import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { ProgressSpinner } from 'primereact/progressspinner';
import type { Artwork } from '../types/api';

interface RowSelectionPanelProps {
  selectedIds: Set<number>;
  getSelectedArtworkDetails: () => Promise<Artwork[]>;
  onClearSelection: () => void;
  onRemoveItem: (id: number) => void;
}

export const RowSelectionPanel: React.FC<RowSelectionPanelProps> = ({
  selectedIds,
  getSelectedArtworkDetails,
  onClearSelection,
  onRemoveItem
}) => {
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedIds.size === 0) {
      setSelectedArtworks([]);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const details = await getSelectedArtworkDetails();
        setSelectedArtworks(details);
      } catch (error) {
        console.error('Error fetching selected artwork details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [selectedIds, getSelectedArtworkDetails]);

  if (selectedIds.size === 0) {
    return null;
  }

  return (
    <Card 
      title={`Selected Items (${selectedIds.size})`}
      style={{ marginBottom: '1rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Button 
          label="Clear All" 
          icon="pi pi-times" 
          severity="secondary" 
          size="small"
          onClick={onClearSelection}
        />
        <span style={{ fontSize: '0.9rem', color: '#666' }}>
          Selection persists across page changes
        </span>
      </div>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
          <ProgressSpinner style={{ width: '30px', height: '30px' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {selectedArtworks.map(artwork => (
            <Chip
              key={artwork.id}
              label={`${artwork.title.substring(0, 30)}${artwork.title.length > 30 ? '...' : ''}`}
              removable
              onRemove={() => {
                onRemoveItem(artwork.id);
                return true;
              }}
              style={{ maxWidth: '250px' }}
            />
          ))}
          {selectedIds.size > selectedArtworks.length && (
            <span style={{ fontSize: '0.8rem', color: '#666', padding: '0.5rem' }}>
              ... and {selectedIds.size - selectedArtworks.length} more items
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
