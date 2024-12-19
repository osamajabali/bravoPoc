import { createSelector, createFeatureSelector } from "@ngrx/store";
import { adapter, CategoriesRecordsState } from "./categories-records";
import { CategoriesRecords } from "./categories-records.model";

export const selectCategoriesState = createFeatureSelector<CategoriesRecordsState>('categories');
export interface AppState {
    categories: CategoriesRecords[]
}

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();

export const selecteCategoriesEntities = createSelector(
    selectCategoriesState,
    selectEntities
);

export const selectStudentById = (id: number) => createSelector(
    selecteCategoriesEntities,
    (entities) => { return entities[id]; }
);

export const selectFeature = (state: AppState) => state.categories;

export const selectAllCategories = createSelector(
    (state: any) => state.categories,
    selectAll
);
  
  