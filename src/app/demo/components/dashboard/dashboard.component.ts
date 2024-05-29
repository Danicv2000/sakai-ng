import { Component, ElementRef, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Depa } from 'src/app/demo/models/profile';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DocenciaService } from 'src/app/demo/service/docencia.service';
import * as Highcharts from 'highcharts';
import {Options} from 'highcharts';
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
  
    private readonly isAsync = true;
    items!: MenuItem[];
    highcharts: typeof Highcharts = Highcharts;
    chartOptions: any;
    chartOption: any;
    departments:Depa[]=[]
    department:Depa[]=[]
    count=[]
    @ViewChild('htmlData') htmlData!: ElementRef;
    basicData: any;

    basicOptions: any;
    Api="http://127.0.0.1:8000/counting"
    Apis="http://127.0.0.1:8000/countdis"
 
    ing_total = [];
    lic_total = [];
    chartData: any;
    options: any;
    list = [];
    listdrc= [];
    listevent: any;
    private documentStyle = getComputedStyle(document.documentElement);
    private textColor = this.documentStyle.getPropertyValue('--text-color');
    private textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
    private surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
    subscription!: Subscription;


    constructor(private http:HttpClient,public elementRef: ElementRef, public layoutService: LayoutService,private docencia: DocenciaService) {
    }


    ngOnInit() {

      this.getDepartments();
       this.getCiens();
       this.get();

       this.options = {
        title:  'My Dashboard' ,
        widgets: [
          { type: 'chart', data: [10, 20, 30, 40] },
          { type: 'table', data: [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 35 }] }
        ]
      };
    
   

     
    }
  
    someMethod() {
      Dashboards.board('dashboard-container', this.options);
    }
    getDepartments() {
      this.http.get(this.Api).subscribe((data:any) => { 
        console.log(data)

          this.departments.push(data.total) // Cambiado a 'total'
          this.ing_total.push(data.ing_total) // Añadido 'ing_total'
          this.lic_total.push(data.lic_total) // Añadido 'lic_total'

          this.basicData = {
            labels: ['titulo'],
            datasets: [
              {
                label: 'Ingenieros totales',
                data: this.ing_total,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 2
            },
            {
                label: 'Licenciados totales',
                data: this.lic_total,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }
            ]
        };
  
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: this.textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
      })
   

    }
    getCiens() {
      this.http.get(this.Apis).subscribe((data:any) => { 
        console.log(data)

          this.departments.push(data.total) // Cambiado a 'total'
          this.list.push(data.msc_total) // Añadido 'ing_total'
          this.listdrc.push(data.drc_total) // Añadido 'lic_total'
     
    
          this.chartOptions = {
            labels: ['PROFESION'],
            datasets: [
              {
                label: 'Master totales',
                data: this.list,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 2
            },
            {
                label: 'doctores totales',
                data: this.listdrc,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }
            ]
        };
  
        this.chartOption = {
            plugins: {
                legend: {
                    labels: {
                        color: this.textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
      })
   

    }
    get(){
      this.docencia.gete().subscribe
       (response => {
        
           console.log(response);
           this.listevent=response;
         } 
     );
     
       }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
 