import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from "@ngrx/store";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppState, selectAllCategories, selectStudentById } from "../../state/categories-selectors";
import * as Actions from "../../state/categories-records.action";
import { Component, OnInit } from '@angular/core';
import { ColumnData, TableComponent } from '../../../shared/components/table/table.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { deleteCategory } from '../../state/categories-records.action';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import * as XLSX from 'xlsx';
import { CategoriesRecords } from '../../state/categories-records.model';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    MatDialogModule
  ],
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  displayedColumns: string[] = ['categoryId', 'categoryName', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<CategoriesRecords>();
  allCategories: CategoriesRecords[] = []; // Holds all student data
  categoriesControl: FormControl = new FormControl();

  currentPage: number = 1; // Current page
  pageSize: number = 10; // Items per page
  totalRecords: number = 0; // Total number of records

  actions = [
    {
      label: 'Edit',
      icon: 'edit',
      action: this.editUser.bind(this)
    },
    {
      label: 'Delete',
      icon: 'delete',
      action: this.deleteUser.bind(this),
    },
  ];

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.store.dispatch(Actions.callCategoriesRecordsApi());
  }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.store.select(selectAllCategories).subscribe((res: CategoriesRecords[]) => {
      this.allCategories = res; // Store all records
      this.totalRecords = res.length; // Set total number of records
      this.updatePagination(); // Show the first page
    });

    this.categoriesControl.valueChanges.subscribe((value: number) => {
      if (value) {
        this.store.select(selectStudentById(value)).subscribe((res) => {
          if (res) {
            this.allCategories = [res]; // Set filtered data
          } else {
            this.loadAllCategories();
          }
          this.updatePagination(); // Reset pagination
        });
      } else {
        this.loadAllCategories();
      }
    });
  }

  loadAllCategories() {
    this.store.select(selectAllCategories).subscribe((res: CategoriesRecords[]) => {
      this.allCategories = res;
      this.totalRecords = res.length;
      this.updatePagination();
    });
  }

  // Updates the dataSource based on current page and page size
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.allCategories.slice(startIndex, endIndex); // Slice data for the current page
  }

  // Navigates to a specific page
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }

  // Calculate total number of pages
  totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  applyFilter(filterValue: CategoriesRecords): void {
    debugger
    if (!filterValue.categoryId && !filterValue.categoryName) {
      this.updatePagination();
      return;
    }

    let filteredData: CategoriesRecords[] = [];

    if (filterValue.categoryId && !filterValue.categoryName) {
      const filter = filterValue.categoryId.toString().trim().toLowerCase();
      filteredData = this.allCategories.filter(student =>
        student.categoryId.toString().includes(filter)
      );
    } else if (!filterValue.categoryId && filterValue.categoryName) {
      const filter = filterValue.categoryName.trim().toLowerCase();
      filteredData = this.allCategories.filter(student =>
        student.categoryName.includes(filter)
      );
    }

    if (filteredData.length > 0) {
      this.dataSource.data = filteredData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );

      this.totalRecords = filteredData.length;
    }
  }




  getDisplayColumns(item: CategoriesRecords): ColumnData[] {
    return [
      { isText: true, text: item.categoryId.toString() },
      { isText: true, text: item.categoryName },
      { isImage: true, text: item.imageUrl },
    ];
  }

  editUser(category: CategoriesRecords) {
    this.dialog.open(AddCategoryComponent, {
      width: '700px', // Optional: customize dialog width
      height: '100%',
      position: { left: '0px' }, // Set position to open from the left
      data: { categoryId: category.categoryId ? category.categoryId : 0 }, // Optional: pass data
    });;
  }

  deleteUser(category: CategoriesRecords) {
    const id: number = category.categoryId;
    this.store.dispatch(deleteCategory({ id }));
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '700px', // Optional: customize dialog width
      height: '100%',
      position: { left: '0px' }, // Set position to open from the left
    });

    dialogRef.afterClosed().subscribe((result: { success: boolean, category: CategoriesRecords }) => {
      if (result.success) {
        console.log('Dialog closed with data:', result);

      } else {
        console.log('Dialog was closed without any data.');
      }
    });
  }


  openFilterModal() {
    const dialogRef = this.dialog.open(CategoryFilterComponent, {
      width: '700px', // Optional: customize dialog width
      position: { left: '0px' }, // Set position to open from the left
      height: '100%',
    });

    dialogRef.afterClosed().subscribe((result: { success: boolean, category: CategoriesRecords }) => {
      if (result) {
        if (result.success) {
          this.applyFilter(result.category)

        } else {
          console.log('Dialog was closed without any data.');
        }
      }
    });
  }

  downloadExcel() {
    // Prepare the data for export
    const exportData = this.allCategories.map(student => ({
      'Category ID': student.categoryId,
      'Category Name': student.categoryName,
      'Image URL': student.imageUrl,
    }));

    // Create a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Create a workbook and append the worksheet
    const workbook: XLSX.WorkBook = { Sheets: { 'Categories': worksheet }, SheetNames: ['Categories'] };

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, 'Categories.xlsx');
  }

}