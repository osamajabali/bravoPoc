
import { createReducer, on } from "@ngrx/store";

import * as Actions from "./categories-records.action";

import { adapter, initialState } from "./categories-records";

export const categoriesReducer = createReducer(
    initialState,
    on(Actions.callCategoriesRecordsApiSuccess,
        (state, { payload }) => adapter.addMany(payload, state) // For array of records
    ),
    on(Actions.addCategorySuccess,
        (state, { payload }) => adapter.addOne(payload, state) // For a single record
    ),
    on(Actions.deleteCategorySuccess, (state, { id }) =>
        adapter.removeOne(id, state) // Remove the category by ID
    ),
    on(Actions.updateCategorySuccess, (state, { payload }) => adapter.upsertOne(payload, state)
    ),
);