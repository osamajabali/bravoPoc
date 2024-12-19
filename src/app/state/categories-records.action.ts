import { createAction, props } from "@ngrx/store";
import { CategoriesRecords } from "./categories-records.model";


export const actionsList = {
    callCategoriesRecordsApi: "[ Categories Table Component ] Call categories records api",
    callCategoriesRecordsApiSuccess: "[ Categories Table Component ] Call categories records api success",
    addCategory: "[Add Category Component] Add category",
    addCategorySuccess: "[Add Category Component] Add category success",
    deleteCategory: "[Category Component] Delete category",
    deleteCategorySuccess: "[Category Component] Delete category success",
    getCategoryById: '[Category Component] Get category by ID',
    getCategoryByIdSuccess: '[Category Component] Get category by ID success',  
    updateCategory :'[Category Component] Update category',
    updateCategorySuccess :'[Category Component] Update category success'
};

export const callCategoriesRecordsApi = createAction(actionsList.callCategoriesRecordsApi);
export const callCategoriesRecordsApiSuccess = createAction(actionsList.callCategoriesRecordsApiSuccess, props<{ payload: CategoriesRecords[] }>());

export const addCategory = createAction(
    actionsList.addCategory,
    props<{ payload: CategoriesRecords; file: FormData }>() 
  );
  
  export const addCategorySuccess = createAction(
    actionsList.addCategorySuccess,
    props<{ payload: CategoriesRecords }>() 
  );

export const deleteCategory = createAction(
    actionsList.deleteCategory,
    props<{ id: number }>() 
);

export const deleteCategorySuccess = createAction(
    actionsList.deleteCategorySuccess,
    props<{ id: number }>() 
);

export const getCategoryByIdSuccess = createAction(
    actionsList.getCategoryByIdSuccess,
    props<{ category: CategoriesRecords }>() 
);

export const updateCategory = createAction(
    actionsList.updateCategory,
    props<{ payload: CategoriesRecords; file: FormData }>() 
);
  
  export const updateCategorySuccess = createAction(
    actionsList.updateCategorySuccess,
    props<{ payload: CategoriesRecords }>() 
  );