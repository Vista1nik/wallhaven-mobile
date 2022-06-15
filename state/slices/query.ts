import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { color, Query, ratio, resolution } from "../../lib/types/Query";

const initialState: Query = {
    categories: '111',
    purity: '100',
    sorting: 'toplist',
    order: 'desc',
    topRange: '1M',
}

export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.q = action.payload;
        },
        toggleCategory: (state, action: PayloadAction<string>) => {
            let newCategories = '111'

            if (state.categories) {
                newCategories = state.categories
            }

            const categories = newCategories.split('');

            if (action.payload === "general") {
                categories[0] = categories[0] === '1' ? '0' : '1';
            }

            if (action.payload === "anime") {
                categories[1] = categories[1] === '1' ? '0' : '1';
            }

            if (action.payload === "people") {
                categories[2] = categories[2] === '1' ? '0' : '1';
            }

            newCategories = categories.join('');

            // @ts-ignore
            state.categories = newCategories;
        },
        togglePurity: (state, action: PayloadAction<string>) => {
            let newPurity = '100'

            if (state.purity) {
                newPurity = state.purity
            }

            const purities = newPurity.split('');

            if (action.payload === "sfw") {
                purities[0] = purities[0] === '1' ? '0' : '1';
            }

            if (action.payload === "sketchy") {
                purities[1] = purities[1] === '1' ? '0' : '1';
            }

            if (action.payload === "nsfw") {
                purities[2] = purities[2] === '1' ? '0' : '1';
            }

            newPurity = purities.join('');

            // @ts-ignore
            state.purity = newPurity;
        },
        setSorting: (state, action: PayloadAction<Query['sorting']>) => {
            state.sorting = action.payload;
        },
        setOrder: (state, action: PayloadAction<Query['order']>) => {
            state.order = action.payload;
        },
        setTopRange: (state, action: PayloadAction<Query['topRange']>) => {
            state.topRange = action.payload;
        },
        toggleResolutionExact: (state, action: PayloadAction<resolution>) => {
            let newResolutions: Query['resolutions'] = []

            if (state.resolutions) {
                newResolutions = state.resolutions
            }

            if (newResolutions.includes(action.payload)) {
                newResolutions = newResolutions.filter(resolution => resolution !== action.payload)
                state.resolutions = newResolutions;
                return;
            }

            if (!newResolutions.includes(action.payload)) {
                newResolutions.push(action.payload)
                state.resolutions = newResolutions;
                return;
            }
        },
        clearResolutionsExact: (state) => {
            state.resolutions = []
        },
        setResolutionAtleast: (state, action: PayloadAction<resolution | undefined>) => {
            state.atleast = action.payload;
        },
        toggleRatio: (state, action: PayloadAction<ratio>) => {
            let newRatios: Query['ratios'] = []

            if (state.ratios) {
                newRatios = state.ratios
            }

            if (newRatios.includes(action.payload)) {
                newRatios = newRatios.filter(ratio => ratio !== action.payload)
                state.ratios = newRatios;
                return;
            }

            if (!newRatios.includes(action.payload)) {
                newRatios.push(action.payload)
                state.ratios = newRatios;
                return;
            }
        },
        clearRatios: (state) => {
            state.ratios = []
        },
        toggleColor: (state, action: PayloadAction<color>) => {
            let newColors: Query['colors'] = []

            if (state.colors) {
                newColors = state.colors
            }

            if (newColors.includes(action.payload)) {
                newColors = newColors.filter(color => color !== action.payload)
                state.colors = newColors;
                return;
            }

            if (!newColors.includes(action.payload)) {
                newColors.push(action.payload)
                state.colors = newColors;
                return;
            }
        },
        clearColors: (state) => {
            state.colors = []
        }
    },
});

export const { setSearchQuery, toggleCategory, togglePurity, setSorting, setOrder, setTopRange, toggleResolutionExact, clearResolutionsExact, setResolutionAtleast, toggleRatio, clearRatios, toggleColor, clearColors } = querySlice.actions;
export default querySlice.reducer;