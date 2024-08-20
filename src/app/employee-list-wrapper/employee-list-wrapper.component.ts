import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-employee-list-wrapper',
  template: `
    <ng-container *ngIf="isBrowser">
      <app-employee-list></app-employee-list>
    </ng-container>
  `,
})
export class EmployeeListWrapperComponent implements OnInit {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Any additional initialization logic if needed
  }
}