import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatMenuModule, ReactiveFormsModule , CommonModule],
})
export class TableComponent<T> implements OnInit {
  @Input() tableData: T[] = [];
  @Input() collectionSize: number = 0;
  @Input() pageSize: number = 10;
  @Input() tableHeaders: string[] = [];
  @Input() displayColumns: (item: T) => ColumnData[];
  @Input() isViewOnly: boolean = false;
  @Input() removeAddButton: boolean = false;
  @Input() removeActions: boolean = false;
  @Input() actionItems: { label: string; icon: string; action: (item: T) => void }[] = [];

  @Input() viewUnsubmittedRequestButton: boolean = false;
  @Input() removeAttachments: boolean = false;
  @Input() removeTableHeader: boolean = false;
  @Input() tableHeaderTitle: string ='';
  @Input() tableHeaderSubtitle: string ='';
  @Input() tableHeaderButton: string='';
  @Input() removeBorderRadius: boolean = false;
  @Input() removePagination: boolean = false;
  @Input() page: number = 0;
  @Output() dropdownToggle = new EventEmitter<T>();
  @Output() pageChangeEvent = new EventEmitter<number>();
  @Output() addButtonEvent = new EventEmitter<void>();
  @Output() openFilterModalEvent = new EventEmitter<void>();
  @Output() downloadPDF = new EventEmitter<void>();
  @Output() downloadExcel = new EventEmitter<void>();
  @Output() viewDetailsEvent = new EventEmitter<T>();

  dataSource: MatTableDataSource<T> = new MatTableDataSource();

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  openModal() {
    this.addButtonEvent.emit();
  }

  emitPageChange(event: PageEvent) {
    const newPage = event.pageIndex + 1;
    this.pageChangeEvent.emit(newPage);
  }

  executeAction(item: T, action: (item: T) => void) {
    console.log('Action Triggered:', action, item);

    action(item);
  }

  viewDetails(item: T) {
    console.log('View Details:', item);
  }

  downloadExcelModal() {
    this.downloadExcel.emit();
  }

  openFilterModal() {
    this.openFilterModalEvent.emit();
  }

  openImageInNewTab(imageUrl: string): void {
    window.open(imageUrl, '_blank');
  }

  
}

export interface ColumnData {
  text: string;
  icon?: string;
  isDate?: boolean;
  isStatus?: boolean;
  isImage?: boolean;
  isText?: boolean;
  isTime?:boolean;
}