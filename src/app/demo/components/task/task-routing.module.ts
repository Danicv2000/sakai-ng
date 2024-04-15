import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TaskComponent }
])],
exports: [RouterModule]
})
export class TaskRoutingModule { }
