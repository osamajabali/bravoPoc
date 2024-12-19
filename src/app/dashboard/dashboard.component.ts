import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoriesTableComponent } from '../categories/categories-table/categories-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTabsModule,
    CategoriesTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
