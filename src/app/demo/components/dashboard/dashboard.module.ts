import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        ChartModule,
        DashboardsRoutingModule,
        HighchartsChartModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
