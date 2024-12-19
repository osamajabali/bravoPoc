import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CategoriesRecords } from './categories-records.model';


export interface CategoriesRecordsState extends EntityState<CategoriesRecords> {}

// Create an entity adapter for CategoriesRecords
export const adapter: EntityAdapter<CategoriesRecords> = createEntityAdapter<CategoriesRecords>({
  selectId: (record) => record.categoryId, // Specify the unique identifier
});

// Initialize the state using the adapter
export const initialState: CategoriesRecordsState = adapter.getInitialState();