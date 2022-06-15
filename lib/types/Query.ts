export type resolution = '2560x1080' | '1280x720' | '1280x800' | '1280x960' | '1280x1024' | '3440x1440' | '1600x900' | '1600x1000' | '1600x1200' | '1600x1280' | '3840x1600' | '1920x1080' | '1920x1200' | '1920x1440' | '1920x1536' | '2560x1440' | '2560x1600' | '2560x1920' | '2560x2048' | '3840x2160' | '3840x2400' | '3840x2880' | '3840x3072';
export type ratio = '16x9' | '16x10' | '21x9' | '32x9' | '48x9' | '9x16' | '10x16' | '9x18' | '1x1' | '3x2' | '4x3' | '5x4';
export type color = '#660000' | '#990000' | '#cc0000' | '#cc3333' | '#ea4c88' | '#993399' | '#663399' | '#333399' | '#0066cc' | '#0099cc' | '#66cccc' | '#77cc33' | '#669900' | '#336600' | '#666600' | '#999900' | '#cccc33' | '#ffff00' | '#ffcc33' | '#ff9900' | '#ff6600' | '#cc6633' | '#996633' | '#663300' | '#000000' | '#999999' | '#cccccc' | '#ffffff' | '#424153';

export interface Query {
    q?: string;
    categories?: '001' | '010' | '100' | '011' | '110' | '101' | '111';
    purity?:  '001' | '010' | '100' | '011' | '110' | '101' | '111';
    sorting?: 'date_added' | 'relevance' | 'random' | 'views' | 'favorites' | 'toplist' | 'hot';
    order?: 'asc' | 'desc';
    topRange?: '1d' | '3d' | '1w' | '1M' | '3M' | '6M' | '1y';
    atleast?: resolution;
    resolutions?: resolution[];
    ratios?: ratio[];
    colors?: color[];
}