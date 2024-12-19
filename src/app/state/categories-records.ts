import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CategoriesRecords } from './categories-records.model';


export interface CategoriesRecordsState extends EntityState<CategoriesRecords> {}

export const adapter: EntityAdapter<CategoriesRecords> = createEntityAdapter<CategoriesRecords>({
  selectId: (record) => record.categoryId, 
});

export const initialState: CategoriesRecordsState = adapter.getInitialState();