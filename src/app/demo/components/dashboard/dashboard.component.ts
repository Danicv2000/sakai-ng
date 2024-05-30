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
    chartOp: any;
    departments:Depa[]=[]
    department:Depa[]=[]
    count=[]
    @ViewChild('htmlData') htmlData!: ElementRef;
    basicData: any;
    basicDatas: any;
    basicOptions: any;
    Api="http://127.0.0.1:8000/counting"
    Apis="http://127.0.0.1:8000/countdis"
    ApiUrl="http://127.0.0.1:8000/co"
 
    ing_total = [];
    lic_total = [];
   PA_total = [];
   I_total = [];
 ADI_total = [];
   PT_total = [];
  ATD_total = [];
  A_total = [];

    chartData: any;
    options: any;
    list = [];
    listdrc= [];
    listevent: any;
    listprofile: any;
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
       this.gets();
       this.getDiscipline();
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
    getDiscipline(){
        this.http.get(this.ApiUrl).subscribe((data:any) => { 
            console.log(data)
    
            this.departments.push(data.total) // Cambiado a 'total'
this.PA_total.push(data.PA_total) // Añadido 'PA_total'
this.I_total.push(data.I_total) // Añadido 'I_total'
this.ADI_total.push(data.ADI_total) // Añadido 'ADI_total'
this.PT_total.push(data.PT_total) // Añadido 'PT_total'
this.ATD_total.push(data.ATD_total) // Añadido 'ATD_total'
this.A_total.push(data.A_total) // Añadido 'A_total'

this.basicDatas = {
  labels: ['titulo'],
  datasets: [
    {
        label: 'PA totales',
        data: this.PA_total,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
    },
    {
        label: 'I totales',
        data: this.I_total,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
    },
    {
        label: 'ADI totales',
        data: this.ADI_total,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2
    },
    {
        label: 'PT totales',
        data: this.PT_total,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
    },
    {
        label: 'ATD totales',
        data: this.ATD_total,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2
    },
    {
        label: 'A totales',
        data: this.A_total,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2
    }
]

};

            this.chartOp = {
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
       gets(){
        this.docencia.getall().subscribe
         (response => {
          
             console.log(response);
             this.listprofile=response;
           } 
       );
       
         }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
 