import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8000/api/profiles';
const base = 'http://localhost:8000/profile/';
const url = 'http://localhost:8000/api/plan';
const Url = 'http://localhost:8000/api/event';
const Base = 'http://localhost:8000/api/disciplina/';
const BaseUrl = 'http://localhost:8000/api/relacion/';
const baseurl = 'http://localhost:8000/api/relacions/';
const burl = 'http://localhost:8000/api/relacions/';
const back = 'http://localhost:8000/api/asignar';

const bUrl = 'http://localhost:8000/api/send/';
 

let auth_token;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'Authorization':`Bearer ${auth_token}`
                              })
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
//------------------------
agregarDisciplina(disciplina): Observable<any> {
  let body = {
    nombre: disciplina.nombre
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
buscarprofesor(id:number): Observable<any> {
  let a = this.http.get(base  + id, {headers:this.headersC});
  return a;
}
actualizarDisciplina(id:number, disciplina): Observable<any> {
  let body = {
    nombre: disciplina.nombre
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

createplan(data): Observable<any> {
  let body = {
    asignatura: data.asignatura,
    carrera: data.carrera,
    anno: data.anno,
    curso: data.curso,
    curso_f: data.curso_f,
    tipo_curso: data.tipo_curso,
    semestre : data.semestre ,
    grupo: data.grupo,

  }
  let a = this.http.post(url + '/create/', body, {
    headers: this.headersC,
  });
  console.log(a);
  return a;
}
updateplan(id: number, data): Observable<any> {
  let body = {

    asignatura: data.asignatura,
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

}
