import { Component, ElementRef, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Depa } from 'src/app/demo/models/profile';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DocenciaService } from 'src/app/demo/service/docencia.service';
import * as Highcharts from 'highcharts';
import * as Dashboards from '@highcharts/dashboards';
import * as DataGrid from '@highcharts/dashboards/datagrid';
import LayoutModule from '@highcharts/dashboards/modules/layout';
import {HttpClient} from '@angular/common/http';

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);


@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    private options = {};
    private readonly isAsync = true;
    items!: MenuItem[];
    highcharts: typeof Highcharts = Highcharts;
    chartOptions: any;
    departments:Depa[]=[]
    department:Depa[]=[]
    count=[]
    @ViewChild('htmlData') htmlData!: ElementRef;
  
    Api="http://127.0.0.1:8000/counting"
 
 
    ing_total = [];
    lic_total = [];
    chartData: any;



    subscription!: Subscription;


    constructor(private http:HttpClient,public elementRef: ElementRef, public layoutService: LayoutService,private docenciaService: DocenciaService) {
    }


    ngOnInit() {
      this.getDepartments();
      this.setOptions();
   
    }
    getDepartments() {
      this.http.get(this.Api).subscribe((data:any) => { 
        console.log(data)

          this.departments.push(data.total) // Cambiado a 'total'
          this.ing_total.push(data.ing_total) // Añadido 'ing_total'
          this.lic_total.push(data.lic_total) // Añadido 'lic_total'
     
    
        this.chartOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Titulos'
          },
          xAxis: {
            categories: this.departments
          },
          yAxis: {
            min: 0,
            labels: {
              overflow: 'justify'
            }
          },
          tooltip: {
            valueSuffix: ' profesores'
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true
              }
            }
          },
          series: [
            {
              name: 'ing',
              data: this.ing_total // Cambiado a 'ing_total'
            },
            {
              name: 'lic',
              data: this.lic_total // Cambiado a 'lic_total'
            }
          ],
        };
      })
    }
    
  private renderDashboard() {
    Dashboards.board(this.elementRef.nativeElement, this.options, this.isAsync);
  }

  private setOptions() {
    Dashboards.board('container', {
      gui: {
          layouts: [{
              id: 'layout-1',
              rows: [{
                  cells: [{
                      id: 'dashboard-col-0'
                  }, {
                      id: 'dashboard-col-1'
                  }]
              }]
          }]
      },
      components: [{
          type: 'HTML',
          renderTo: 'dashboard-col-0',
          elements: [
              {
                  tagName: 'h1',
                  textContent: 'Your first dashboard'
              }
          ]
      }, {
          renderTo: 'dashboard-col-1',
          type: 'Highcharts',
         
      }]
  });
  }  
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
