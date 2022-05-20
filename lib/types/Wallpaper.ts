export interface Wallpaper {
    id: string;
    url: string;
    short_url: string;
    views: number;
    favorites: number;
    source: string;
    purity: string;
    category: string;
    dimension_x: number;
    dimension_y: number;
    resolution: string;
    ratio: string;
    file_size: number;
    file_type: string;
    created_at: string;
    colors?: (string)[] | null;
    path: string;
    thumbs: Thumbs;
}

export interface Thumbs {
    large: string;
    original: string;
    small: string;
}