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
          ofType(addCategory),
          exhaustMap(({ payload, file }) =>
            this.categoriesRecordsService.addCategory(payload, file).pipe(
              map((newCategory) =>
                addCategorySuccess({ payload: newCategory })
              ),
              catchError(() => EMPTY) 
            )
          )
        )
      );
    
    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory), 
            exhaustMap(({ id }) =>
                this.categoriesRecordsService.deleteCategory(id).pipe(
                    map(() => deleteCategorySuccess({ id })), 
                    catchError(() => EMPTY) 
                )
            )
        )
    );

    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
          ofType(updateCategory), 
          exhaustMap(({ payload, file }) =>
            this.categoriesRecordsService.updateCategory(payload, file).pipe(
              map((updatedCategory) => {
                console.log('Effect - Updated category:', updatedCategory); 
                return updateCategorySuccess({ payload: updatedCategory }); 
              }),
              catchError((error) => {
                console.error('Effect - Error updating category:', error); 
                return EMPTY; 
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