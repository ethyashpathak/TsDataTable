import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Checkbox } from 'primereact/checkbox';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { useArtworks } from '../hooks/useArtworks';
import { RowSelectionPanel } from './RowSelectionPanel';
import type { Artwork } from '../types/api';

export const ArtworksTable: React.FC = () => {
  const {
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
  } = useArtworks();

  const selectionTemplate = (rowData: Artwork) => {
    return (
      <Checkbox 
        checked={selectedRows.has(rowData.id)}
        onChange={() => toggleRowSelection(rowData.id)}
      />
    );
  };

  const headerSelectionTemplate = () => {
    return (
      <Checkbox 
        checked={isAllSelected}
        onChange={toggleSelectAll}
        className={isIndeterminate ? 'p-checkbox-indeterminate' : ''}
      />
    );
  };

  const titleTemplate = (rowData: Artwork) => {
    return (
      <div style={{ maxWidth: '250px', wordWrap: 'break-word' }}>
        {rowData.title || 'Untitled'}
      </div>
    );
  };

  const placeTemplate = (rowData: Artwork) => {
    return rowData.place_of_origin || 'Unknown';
  };

  const artistTemplate = (rowData: Artwork) => {
    return (
      <div style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
        {rowData.artist_display || 'Unknown Artist'}
      </div>
    );
  };

  const inscriptionsTemplate = (rowData: Artwork) => {
    if (!rowData.inscriptions) return 'None';
    return (
      <div style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
        {rowData.inscriptions.length > 100 
          ? `${rowData.inscriptions.substring(0, 100)}...`
          : rowData.inscriptions
        }
      </div>
    );
  };

  const dateStartTemplate = (rowData: Artwork) => {
    return rowData.date_start || 'Unknown';
  };

  const dateEndTemplate = (rowData: Artwork) => {
    return rowData.date_end || 'Unknown';
  };

  const onPageChange = (event: any) => {
    const newPage = event.page + 1;
    goToPage(newPage);
  };

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <Message severity="error" text={`Error loading artworks: ${error}`} />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Art Institute of Chicago - Artworks</h1>
      
      <RowSelectionPanel
        selectedIds={selectedRows}
        getSelectedArtworkDetails={getSelectedArtworkDetails}
        onClearSelection={clearAllSelections}
        onRemoveItem={removeSelectedItem}
      />

      <div style={{ position: 'relative' }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <ProgressSpinner />
          </div>
        )}

        <DataTable 
          value={artworks}
          tableStyle={{ minWidth: '50rem' }}
          loading={loading}
          emptyMessage="No artworks found"
          scrollable
          scrollHeight="600px"
        >
          <Column 
            header={headerSelectionTemplate}
            body={selectionTemplate}
            style={{ width: '3rem' }}
            frozen
          />
          <Column 
            field="title" 
            header="Title" 
            body={titleTemplate}
            style={{ minWidth: '250px' }}
          />
          <Column 
            field="place_of_origin" 
            header="Place of Origin" 
            body={placeTemplate}
            style={{ minWidth: '150px' }}
          />
          <Column 
            field="artist_display" 
            header="Artist" 
            body={artistTemplate}
            style={{ minWidth: '200px' }}
          />
          <Column 
            field="inscriptions" 
            header="Inscriptions" 
            body={inscriptionsTemplate}
            style={{ minWidth: '200px' }}
          />
          <Column 
            field="date_start" 
            header="Date Start" 
            body={dateStartTemplate}
            style={{ minWidth: '100px' }}
          />
          <Column 
            field="date_end" 
            header="Date End" 
            body={dateEndTemplate}
            style={{ minWidth: '100px' }}
          />
        </DataTable>

        {pagination && (
          <Paginator
            first={(pagination.current_page - 1) * pagination.limit}
            rows={pagination.limit}
            totalRecords={pagination.total}
            onPageChange={onPageChange}
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} artworks"
            style={{ marginTop: '1rem' }}
          />
        )}
      </div>
    </div>
  );
};
