import useSWR from "swr";

const useSearch = (
    {
        q,
        categories = '111',
        purity = '100',
        sorting = 'toplist',
        order = 'desc',
        topRange = '1M',
        ratios,
        page
    }: {
        q?: string;
        categories?: '001' | '010' | '100' | '011' | '110' | '101' | '111';
        purity?:  '001' | '010' | '100' | '011' | '110' | '101' | '111';
        sorting?: 'date_added' | 'relevance' | 'random' | 'views' | 'favorites' | 'toplist';
        order?: 'asc' | 'desc';
        topRange?: '1d' | '3d' | '1w' | '1M' | '3M' | '6M' | '1y';
        ratios?: '16x9' | '16x10' | '21x9' | '32x9' | '48x9' | '9x16' | '10x16' | '9x18' | '1x1' | '3x2' | '4x3' | '5x4';
        page?: number;
    }
) => {
    const query = new URLSearchParams(JSON.parse(JSON.stringify({
        q,
        categories,
        purity,
        sorting,
        order,
        topRange,
        ratios,
        page
    }))).toString()

    const { data, error } = useSWR(`https://wallhaven.cc/api/v1/search?${query}`)

    return {
        data,
        error,
        loading: !data && !error
    }
}

export default useSearch