import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { RouterModule } from '@angular/router'


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule.forChild([
            { path: '', component: LoginComponent }
          ])


    ]
})
export class AuthModule { }
