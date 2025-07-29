export interface ApiResponse {
  pagination: Pagination;
  data: Artwork[];
  info: Info;
  config: Config;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url?: string;
}

export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number | null;
  date_end: number | null;
}

export interface Info {
  license_text: string;
  license_links: string[];
  version: string;
}

export interface Config {
  iiif_url: string;
  website_url: string;
}

export interface TableData {
  artworks: Artwork[];
  pagination: Pagination;
  loading: boolean;
}
