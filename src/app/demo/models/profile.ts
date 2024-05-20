export class User{
  username: string;
  email: string;
  password:string
}
export enum Estados {
  "pendiente"  = "pendiente",
   "proceso" = "proceso",
   "resuelto" = "resuelto",
   "cerrado" = "cerrado"
 }
 export class Events{
   name?: string;
   estado?: Estados;
   start ?:string |  Date;
   end?: string | Date;
 
 
 }
 export class Departamento{
  id: number;
  nombre: string;


}
export class Depa{

  nombre: string;
  count: number;

}
export class Depas{

  nombre: string;
  counting: number;
}
export class Total{
  total: number;
}
export class Profesor {
  id?: string;
 name?: string;
 email?: string;
 telefono? :number;
 movil? :number;
 categoria_doc?: string;
 categorias_cientificas?: string;
 titulo?: string;
 responsabilidad?: string;
 tipo_relacion?: string;
 plan?: Plan_Estudio;
 evento?: Events;
 
}
export class Disciplina{
  id: number;
  nombre: string;
  profesores: Profesor;
}
export class Relacion{
  id: number;
  profesor: number;
  disciplina: number;
}
export class Asignatura{
  id?: number;
  nombre?: string;
  horas_conferencias?: number;
  horas_cp?: number;
  horas_cpc?: number;
  horas_lab?: number;
  horas_taller?: number;
  horas_seminarios ?: number;


}
export class Plan_Estudio{
  id?: number;
  asignatura?: Asignatura;
  carrera?: string;
  anno ?: string;
  curso?: Date;
  curso_f?: Date;
  tipo_curso ?: string;
  semestre ?: string;
  grupo?:string;

}
export class Relaciones{
  id: number;
  profesor: number;
  plan: number;
}

export class Relacions{
  id: number;
  profesor: number;
  event: number;
}

class Send{
  email:string;
  subject:string;
  message:string;
}
