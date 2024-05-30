import { Component, OnInit} from '@angular/core'; 
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { DocenciaService } from 'src/app/demo/service/docencia.service';
import { Profesor } from 'src/app/demo/models/profile';
@Component({
  providers: [MessageService],
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
    eventos: any[] = []; // Array para almacenar los eventos
    productDialog: boolean = false;
  
    deleteProductDialog: boolean = false;
  
    deleteProductsDialog: boolean = false;
  
    products!: Profesor[] ;
    customers!: Profesor[];
    product: Profesor = {};
  
    selectedProducts: Profesor[] = [];
  
    submitted: boolean = false;
  
    cols: any[] = [];
  
    statuses: any[] = [];
  
    rowsPerPageOptions = [5, 10, 20];
  
    constructor(private docenciaService: DocenciaService, private messageService: MessageService) { }
  
    ngOnInit() {
        
        this.docenciaService.listarProfesor().subscribe(data => {
            console.log(data)
            this.products = data;
        });
        this.docenciaService.listarProfesor().subscribe(data => {
            console.log(data)
            this.customers = data;
       
        });
  
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'start', header: 'Start' },
            { field: 'end', header: 'End' },
            { field: 'estado', header: 'Estado' },
            { field: 'evento', header: 'Evento' }
        ];
  
        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }
  
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }
  
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }
  
    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }
  
    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }
  
    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }
    calculateCustomerTotals(name: string) {
        let total = 0;

        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.evento?.name === name) {
                    total++;
                }
            }
        }

        return total;
    }
    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.products) {
            for (let customer of this.products) {
                if (customer.evento?.name === name) {
                    total++;
                }
            }
        }

        return total;
    }
   
    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }
  
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
  
    saveProduct() {
        this.submitted = true;
  
        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();


                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }
  
            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }
  
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }
  
        return index;
    }
  
    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
  
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getSeverity(status: string) {
        switch (status) {
            case 'resuelto':
                return 'danger';
            case 'proceso':
                return 'success';
            case 'pendiente':
                return 'primary';
            case 'renewal':
                return null;
            default:
                return 'default'; // or any other default value
        }
    }

  }
  