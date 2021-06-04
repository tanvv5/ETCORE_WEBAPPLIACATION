import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DefaultComponent } from '../layouts/default/default.component';
const routes: Routes = [
  {
    path: 'admin',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboad',
        component: DashboardComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
