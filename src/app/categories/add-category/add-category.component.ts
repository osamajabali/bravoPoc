import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateCategory, addCategory } from '../../state/categories-records.action';
import { CategoriesRecords } from '../../state/categories-records.model';
import { CategoriesRecordsService } from '../../services/students-records.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  categoryId: number = 0;
  category$!: Observable<CategoriesRecords | undefined>;
  uploadedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: number },
    private categoriesRecordsService: CategoriesRecordsService
  ) {
    this.form = this.fb.group({
      categoryId: [null, Validators.required],
      categoryName: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.categoryId = this.data.categoryId;
    }
    if (this.categoryId) {
      this.getCategoryByID();
    }
  }


  onSubmit(): void {
    if (this.form.valid) {
      const categoryData = this.form.value;

      if (this.categoryId) {
        const formData = new FormData();
        formData.append('File', this.uploadedImage || '');
        this.store.dispatch(updateCategory({ payload: categoryData, file: formData }));
      } else {
        const formData = new FormData();
        formData.append('File', this.uploadedImage || '');
        this.store.dispatch(addCategory({ payload: categoryData, file: formData }));
      }

      this.dialogRef.close({ success: true, category: categoryData });
    } else {
      console.error('Form is invalid');
    }
  }


  getCategoryByID() {
    this.categoriesRecordsService.getCategoryById(this.categoryId).subscribe((category) => {
      this.form.patchValue({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        imageUrl: category.imageUrl,
      });
    });
  }


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.uploadedImage = input.files[0];
      console.log(this.uploadedImage);
    }
  }

}