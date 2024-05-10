import { Component, OnInit} from '@angular/core';
import { Profesor } from 'src/app/demo/models/profile';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { DocenciaService } from 'src/app/demo/service/docencia.service';

@Component({

  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',


})
export class ProfileComponent implements OnInit {

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Profesor[] = [];

  product: Profesor = {};

  selectedProducts: Profesor[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor( private messageService: MessageService,private docenciaService: DocenciaService) {
      this.openNew();
  }

  ngOnInit() {
      this.docenciaService.listarProfesor().subscribe(data => {
        console.log(data)
        this.products = data;
    });
      this.cols = [
        { field: 'id', header: 'id' },
        { field: 'nombre', header: 'name' },
        { field: 'email', header: 'email' },
        { field: 'titulo', header: 'title' },
        { field: 'categoria_doc', header: 'documentCategory' },
        { field: 'categorias_cientificas', header: 'scientificCategories' },
        { field: 'telefono', header: 'phone' },
        { field: 'movil', header: 'mobile' },
        { field: 'responsabilidad', header: 'responsibility' },
        { field: 'tipo_relacion', header: 'relationshipType' }
      ];

      this.statuses = [
          { label: 'Completo', value: 'Completo' },
          { label: 'Contrato', value: 'Contrato' },
          { label: 'Colaborar', value: 'Colaborar' }
      ];
  }

    openNew() {
        this.product = {
            name: '',
            email: '',
            telefono: 0,
            movil: 0,
            categoria_doc: '',
            categorias_cientificas: '',
            titulo: '',
            responsabilidad: '',
            tipo_relacion: '',
        };
        this.submitted = false;
        this.productDialog = true;
    }

    addProfile() {
        if (this.productDialog) {
            this.docenciaService.agregarProfesor(this.product).subscribe(
                response => {
                    console.log('Perfil creado con éxito', response);
                    this.openNew(); // Abre un nuevo diálogo después de agregar el perfil
                },
                error => {
                    console.log('Hubo un error al crear el perfil', error);
                }
            );
        } else {
            console.log('Debe abrir el diálogo del producto antes de agregar un perfil');
        }
    }
    deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: Profesor) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: Profesor) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }

  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    
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
              this.product.tipo_relacion = this.product.tipo_relacion.value ? this.product.tipo_relacion.value : this.product.tipo_relacion;
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          } else {
              this.product.id = this.createId();
              // @ts-ignore
              this.product.tipo_relacion = this.product.tipo_relacion ? this.product.tipo_relacion.value : 'INSTOCK';
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
}
