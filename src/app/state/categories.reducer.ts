
import { createReducer, on } from "@ngrx/store";

import * as Actions from "./categories-records.action";

import { adapter, initialState } from "./categories-records";

export const categoriesReducer = createReducer(
    initialState,
    on(Actions.callCategoriesRecordsApiSuccess,
        (state, { payload }) => adapter.addMany(payload, state) 
    ),
    on(Actions.addCategorySuccess,
        (state, { payload }) => adapter.addOne(payload, state) 
    ),
    on(Actions.deleteCategorySuccess, (state, { id }) =>
        adapter.removeOne(id, state) 
    ),
    on(Actions.updateCategorySuccess, (state, { payload }) => adapter.upsertOne(payload, state)
    ),
);