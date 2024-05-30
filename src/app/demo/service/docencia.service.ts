import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Total,Departamento,Depa,Plan_Estudio} from 'src/app/demo/models/profile';

const baseUrl = 'http://localhost:8000/api/profiles';
const base = 'http://localhost:8000/profile/';
const url = 'http://localhost:8000/plan/';
const Url = 'http://localhost:8000/event';
const Base = 'http://localhost:8000/disciplina/';
const BaseUrl = 'http://localhost:8000/api/relacion/';
const baseurl = 'http://localhost:8000/api/relacions/';
const burl = 'http://localhost:8000/api/relaciones/';
const bu = 'http://localhost:8000/api/re/';
const back = 'http://localhost:8000/api/asignar';

const bUrl = 'http://localhost:8000/send';

const cont ='http://localhost:8000/count';
const conte ='http://localhost:8000/counte';
const Aping="http://127.0.0.1:8000/counting";
const Urlic="http://127.0.0.1:8000/countlic";
const dis="http://127.0.0.1:8000/countdis";
const msc="http://127.0.0.1:8000/api/countmsc";
const drc="http://127.0.0.1:8000/api/countdrc";
const dep="http://127.0.0.1:8000/api/depa/";

const pa="http://127.0.0.1:8000/countpa";
const i="http://127.0.0.1:8000/counti";
const adi="http://127.0.0.1:8000/countadi";
const pt="http://127.0.0.1:8000/countpt";
const atd="http://127.0.0.1:8000/countatd";
const a="http://127.0.0.1:8000/counta";

const lic="http://127.0.0.1:8000/dis";
const ing="http://127.0.0.1:8000/disi";

const d="http://127.0.0.1:8000/api/di";
const m="http://127.0.0.1:8000/api/d";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DocenciaService {
  public headersC = new HttpHeaders().set("Content-Type", "application/json");
  public header = new HttpHeaders().set("Content-Type", "application/pdf");
  constructor(private http: HttpClient) {}

  End :string = 'http://localhost:8000/api/print/';


agregarProfesor(disciplina): Observable<any> {
  let body = {
    name: disciplina.name,
    email: disciplina.email,
    telefono: disciplina.telefono,
    movil: disciplina.movil,
    categoria_doc: disciplina.categoria_doc,
    categorias_cientificas: disciplina.categorias_cientificas,
    titulo: disciplina.titulo,
    responsabilidad: disciplina.responsabilidad,
    tipo_relacion: disciplina.tipo_relacion,


  }
  let a = this.http.post(base + 'create/', body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}
actualizarProfesor(id: number, disciplina): Observable<any> {
  let body = {
    name: disciplina.name,
    email: disciplina.email,
    telefono: disciplina.telefono,
    movil: disciplina.movil,
    categoria_doc: disciplina.categoria_doc,
    categorias_cientificas: disciplina.categorias_cientificas,
    titulo: disciplina.titulo,
    responsabilidad: disciplina.responsabilidad,
    tipo_relacion: disciplina.tipo_relacion,
  }
  let a = this.http.put(base + 'update/' + id.toString(), body, {
    headers: this.headersC,
  });
  return a;
}

listarProfesor(): Observable<any> {
  let a = this.http.get(base, {
    headers: this.headersC,
  });
  return a;
}
delete(id: number): Observable<any> {
  return this.http.delete(`${base + 'delete'}/${id}`,httpOptions);
}
buscarprofesor(id: number): Observable<any> {
  let a = this.http.get(base + id, {headers:this.headersC});
  return a;
}

//Para las relaciones
agregarRelacion2(disciplina): Observable<any> {
  let body = {
    profesor: disciplina.profesor,
    plan: disciplina.plan
  }
  let a = this.http.post(burl + "create/", body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}

actualizarRelacion2(id:number, disciplina): Observable<any> {
  let body = JSON.stringify(disciplina);
  let a = this.http.put(burl  + 'update/'+ id.toString() , body, {
    headers: this.headersC,
  });
  return a;
}

listarRelacion2(): Observable<any> {
  let a = this.http.get(burl , {
    headers: this.headersC,
  });
  return a;
}
buscarRelacion2(id:number): Observable<any> {
  let a = this.http.get(burl + id, {headers:this.headersC});
  return a;
}
agregarDepa(disciplina): Observable<any> {
  let body = {
    nombre: disciplina.nombre
  }
  let a = this.http.post(dep + "create/", body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}

//------------------------
agregarDisciplina(disciplina): Observable<any> {
  let body = {
    nombre: disciplina.nombre,

  }
  let a = this.http.post(Base + "create/", body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}
buscarDisciplina(id:number): Observable<any> {
  let a = this.http.get(Base  + id, {headers:this.headersC});
  return a;
}

actualizarDisciplina(id:number, disciplina): Observable<any> {
  let body = {
    nombre: disciplina.nombre,

  }
  let a = this.http.put(Base + 'update/' + id.toString() , body, {
    headers: this.headersC,
  });
  return a;
}

listarDisciplina(): Observable<any> {
  let a = this.http.get(Base, {
    headers: this.headersC,
  });
  return a;
}

deletedisciplina(id: number): Observable<any> {
  return this.http.delete(`${Base + 'delete'}/${id}`,httpOptions);
}

//Para las relaciones
agregarRelacion(disciplina): Observable<any> {
  let body = {
    profesor: disciplina.profesor,
    disciplina: disciplina.disciplina
  }
  let a = this.http.post(BaseUrl + "create/", body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}

buscarRelacion(id:number): Observable<any> {
  let a = this.http.get(BaseUrl + "relacion/" + id, {headers:this.headersC});
  return a;
}
actualizarRelacion(id:number, disciplina): Observable<any> {
  let body = JSON.stringify(disciplina);
  let a = this.http.put(BaseUrl  + 'update/'+ id.toString() , body, {
    headers: this.headersC,
  });
  return a;
}

listarRelacion(): Observable<any> {
  let a = this.http.get(BaseUrl , {
    headers: this.headersC,
  });
  return a;
}
//Para las relaciones
agregarRelacion1(tarea): Observable<any> {
  let body = {
    profesor: tarea.profesor,
    tarea: tarea.tarea
  }
  let a = this.http.post(baseUrl + "create/", body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}

buscarRelacion1(id:number): Observable<any> {
  let a = this.http.get(baseUrl  + id, {headers:this.headersC});
  return a;
}
actualizarRelacion1(id:number, tarea): Observable<any> {
  let body = JSON.stringify(tarea);
  let a = this.http.put(baseUrl  + 'update/'+ id.toString() , body, {
    headers: this.headersC,
  });
  return a;
}

listarRelacion1(): Observable<any> {
  let a = this.http.get(baseUrl , {
    headers: this.headersC,
  });
  return a;
}
//---------------------------------------------//

getAllplan(): Observable<any> {
  let a = this.http.get(url, {
    headers: this.headersC,
  });
  return a;
}
getplan(): Observable<Plan_Estudio[]> {
  let a = this.http.get<Plan_Estudio[]>(url, {
    headers: this.headersC,
  });
  return a;
}
createplan(data): Observable<any> {
  let body = {
    carrera: data.carrera,
    anno: data.anno,
    curso: data.curso,
    curso_f: data.curso_f,
    tipo_curso: data.tipo_curso,
    semestre : data.semestre ,
    grupo: data.grupo,

  }
  let a = this.http.post(url + 'create/', body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}
updateplan(id: number, data): Observable<any> {
  let body = {
    carrera: data.carrera,
    anno: data.anno,
    curso: data.curso,
    curso_f: data.curso_f,
    tipo_curso: data.tipo_curso,
    semestre : data.semestre ,
    grupo: data.grupo,
  }
  let a = this.http.put(url + '/update/' + id.toString(), body, {
    headers: this.headersC,
  });
  return a;
}

deleteplan(id: any): Observable<any> {
  return this.http.delete(`${url + '/delete'}/${id}`,httpOptions);
}
buscarplan(id:number): Observable<any> {
  let a = this.http.get(url  + id, {headers:this.headersC});
  return a;
}
//-----------------
getAllasig(): Observable<any> {
  let a = this.http.get(back, {
    headers: this.headersC,
  });
  return a;
}

createasig(data): Observable<any> {
  let body = {

    nombre: data.nombre,
    horas_cp: data. horas_cp,
    horas_conferencias: data.horas_conferencias,
    horas_cpc: data.horas_cpc,
    horas_lab: data.horas_lab,
    horas_taller: data.horas_taller,
    horas_seminarios: data.horas_seminarios,


  }
  let a = this.http.post(back + '/create/', body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}
updateasig(id: number, data): Observable<any> {
  let body = {
    nombre: data.nombre,
    horas_cp: data. horas_cp,
    horas_conferencias: data.horas_conferencias,
    horas_cpc: data.horas_cpc,
    horas_lab: data.horas_lab,
    horas_taller: data.horas_taller,
    horas_seminarios: data.horas_seminarios,
  }
  let a = this.http.put(back + '/update/' + id.toString(), body, {
    headers: this.headersC,
  });
  return a;
}

deleteasig(id: any): Observable<any> {
  return this.http.delete(`${back + '/delete'}/${id}`,httpOptions);
}

listarRelacion3(): Observable<any> {
  let a = this.http.get(bu , {
    headers: this.headersC,
  });
  return a;
}
buscarRelacion3(id:number): Observable<any> {
  let a = this.http.get(bu + id, {headers:this.headersC});
  return a;
}
agregarRelacion3(data): Observable<any> {
  let body = {
    asignatura: data.asignatura,
    plan: data.plan
  }
  let a = this.http.post(bu + "create/", body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}

actualizarRelacion3(id:number, data): Observable<any>{
  let body = JSON.stringify(data);
  let a = this.http.put(bu  + '/update/' + id.toString() , body, {
    headers: this.headersC,
  });
  return a;
}
//---------------------------------
getAllevent(): Observable<any> {
  let a = this.http.get(Url, {
    headers: this.headersC,
  });
  return a;
}

createevent(data): Observable<any> {
  let body = {

    name: data.name,
    estado: data.estado,
    start: data.start,
    end: data.end,
  }
  let a = this.http.post(Url + '/create/', body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}

updateevent(id: number, data): Observable<any> {
  let body = {

    name: data.name,
    estado: data.estado,
    start: data.start,
    end: data.end,

  }
  let a = this.http.put(Url + '/update/' + id.toString(), body, {
    headers: this.headersC,
  });
  return a;
}
buscarevent(id:number): Observable<any> {
  let a = this.http.get(`${Url}/${id}`, {headers:this.headersC});
  return a;
}
deleteevent(id: number): Observable<any> {
  return this.http.delete(`${Url + '/remove'}/${id}`,httpOptions);
}
//Para las relaciones
agregarRelacions(data): Observable<any> {
  let body = {
    profesor: data.profesor,
    data: data.data
  }
  let a = this.http.post(baseurl + "create/", body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}

buscarRelacions(id:number): Observable<any> {
  let a = this.http.get(baseurl + "relacion/" + id, {headers:this.headersC});
  return a;
}
actualizarRelacions(id:number, data): Observable<any> {
  let body = JSON.stringify(data);
  let a = this.http.put(baseurl  + 'update/'+ id.toString() , body, {
    headers: this.headersC,
  });
  return a;
}

listarRelacions(): Observable<any> {
  let a = this.http.get(baseurl , {
    headers: this.headersC,
  });
  return a;
}
//---------------------------------------------//
sendEmail(data:any): Observable<any> {
  let body = {
    email: data.email,
    subject: data.subject,
    message: data.message
  }
  let a = this.http.post(bUrl , body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}

Generar(id:number): Observable<any> {
  let a = this.http.get(this.End + id, {
    headers: this.header,
  });
  return a;
}

getall(): Observable<Total[]> {
  return this.http.get<Total[]>(cont);
}
gete(): Observable<Total[]> {
  return this.http.get<Total[]>(conte);
}
getlic(): Observable<Total[]> {
  return this.http.get<Total[]>(Urlic);
}
geting(): Observable<Total[]> {
  return this.http.get<Total[]>(Aping);
}
getmsc(): Observable<Total[]> {
  return this.http.get<Total[]>(msc);
}
getdrc(): Observable<Total[]> {
  return this.http.get<Total[]>(drc);
}
getdis(): Observable<Total[]> {
  return this.http.get<Total[]>(dis);
}
listardepa(): Observable<Departamento[]> {
  return this.http.get<Departamento[]>(dep);
}
getpt(): Observable<Total[]> {
  return this.http.get<Total[]>(pt);
}
getpa(): Observable<Total[]> {
  return this.http.get<Total[]>(pa);
}
geti(): Observable<Total[]> {
  return this.http.get<Total[]>(i);
}
getadi(): Observable<Total[]> {
  return this.http.get<Total[]>(adi);
}
getatd(): Observable<Total[]> {
  return this.http.get<Total[]>(atd);
}
geta(): Observable<Total[]> {
  return this.http.get<Total[]>(a);
}

getlics(): Observable<Depa[]> {
  return this.http.get<Depa[]>(lic);
}
getings(): Observable<Depa[]> {
  return this.http.get<Depa[]>(ing);
}
}
