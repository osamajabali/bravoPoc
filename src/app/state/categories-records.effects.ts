import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import { actionsList, addCategory, addCategorySuccess, deleteCategory, deleteCategorySuccess, getCategoryByIdSuccess, updateCategory, updateCategorySuccess } from "./categories-records.action";
import { CategoriesRecordsService } from '../services/students-records.service';


@Injectable()
export class CategoriesRecordsEffects {
    loadCategoriesRecords$ = createEffect(() => this.actions$.pipe(
        ofType(actionsList.callCategoriesRecordsApi),
        exhaustMap(() => this.categoriesRecordsService.getCategoriesRecords()
        .pipe(
            map(CategoriesRecords => ({ type: actionsList.callCategoriesRecordsApiSuccess, payload: CategoriesRecords })),
            catchError(() => EMPTY)
        ))
    ));

    addCategory$ = createEffect(() =>
        this.actions$.pipe(
          ofType(addCategory), // Listen for the `addCategory` action
          exhaustMap(({ payload, file }) =>
            this.categoriesRecordsService.addCategory(payload, file).pipe(
              map((newCategory) =>
                addCategorySuccess({ payload: newCategory }) // Dispatch success action
              ),
              catchError(() => EMPTY) // Handle errors appropriately
            )
          )
        )
      );
    
    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory), // Listen for the delete action
            exhaustMap(({ id }) =>
                this.categoriesRecordsService.deleteCategory(id).pipe(
                    map(() => deleteCategorySuccess({ id })), // Dispatch success action with the ID
                    catchError(() => EMPTY) // Handle errors appropriately
                )
            )
        )
    );

    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
          ofType(updateCategory), // Listen for the updateCategory action
          exhaustMap(({ payload, file }) =>
            this.categoriesRecordsService.updateCategory(payload, file).pipe(
              map((updatedCategory) => {
                console.log('Effect - Updated category:', updatedCategory); // Debugging
                return updateCategorySuccess({ payload: updatedCategory }); // Dispatch success action
              }),
              catchError((error) => {
                console.error('Effect - Error updating category:', error); // Handle error
                return EMPTY; // Or dispatch a failure action if needed
              })
            )
          )
        )
      );
      
      

    constructor(
        private actions$: Actions,
        private categoriesRecordsService: CategoriesRecordsService
    ){}
}