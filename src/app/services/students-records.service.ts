import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { CategoriesRecords } from "../state/categories-records.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriesRecordsService {
    constructor(
        private http: HttpService
    ) {}

    getCategoriesRecords() : Observable<Array<CategoriesRecords>> {
        return this.http.get<Array<CategoriesRecords>>("Category/GetCategories");
    }

    addCategory(category: CategoriesRecords , formData : FormData) {
        return this.http.post<CategoriesRecords>(`Category/AddCategory?CategoryId=${category.categoryId}&CategoryName=${category.categoryName}&ImageUrl=${category.imageUrl}`,formData);
    }

    deleteCategory(id: number) {
        return this.http.delete(`Category/DeleteCategory?id=${id}`); 
    }

    getCategoryById(id: number): Observable<CategoriesRecords> {
        return this.http.get<CategoriesRecords>(`Category/GetCategoryById?Id=${id}`);
    }

    updateCategory(category: CategoriesRecords , formData : FormData): Observable<CategoriesRecords> {
        return this.http.post<CategoriesRecords>(`Category/AddCategory?CategoryId=${category.categoryId}&CategoryName=${category.categoryName}&ImageUrl=${category.imageUrl}`,formData);

      }
      
}