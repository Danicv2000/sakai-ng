import { Component } from '@angular/core';
import { DocenciaService } from 'src/app/demo/service/docencia.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {

  constructor(private docenciaService: DocenciaService) { }



}
