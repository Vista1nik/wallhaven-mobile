import useSWRInfinite from "swr/infinite";
import { Query } from "../types/Query";

const useSearch = (
    {
        q,
        categories = '111',
        purity = '100',
        sorting = 'toplist',
        order = 'desc',
        topRange = '1M',
        atleast,
        resolutions,
        ratios,
        colors,
    }: Query
) => {
    const query = new URLSearchParams(JSON.parse(JSON.stringify({
        q,
        categories,
        purity,
        sorting,
        order,
        topRange,
        atleast,
        resolutions,
        ratios,
        colors,
    }))).toString()

    const { data, error, size, setSize } = useSWRInfinite(index => `https://wallhaven.cc/api/v1/search?${query}&page=${index + 1}`)

    return {
        data: data ? data.map(apiRes => apiRes.data).flat() : [],
        error,
        loading: !data && !error,
        size,
        setSize
    }
}

export default useSearch