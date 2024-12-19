import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent {
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryComponent>
  ) {
    this.form = this.fb.group({
      categoryId: [null],
      categoryName: [''],
      imageUrl: ['']
    });
  }

  onSubmit(): void {
    const categoryData = this.form.value;
    this.dialogRef.close({ success: true, category: categoryData });

  }

}
