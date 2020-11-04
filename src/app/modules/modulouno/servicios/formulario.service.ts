import { Automovil } from './../interfaces/automovil.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormularioService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    private autoUrl = 'http://localhost:3002/api/modules/autos/';

    constructor(private httpClient: HttpClient) { }

    getAutos() {
        return this.httpClient.get(this.autoUrl + 'auto');
    }

    guardarAuto(auto: any) {
        return this.httpClient.post(this.autoUrl + 'auto', JSON.stringify(auto), this.httpOptions);
    }

    editarAuto(idAuto, auto): Observable<{ [k: string]: any, auto: Automovil }> {
        return this.httpClient.put<{ [k: string]: any, auto: Automovil }>(`${this.autoUrl}auto/${idAuto}`,
            JSON.stringify(auto), this.httpOptions);

    }

    borrarAuto(idAuto) {
        return this.httpClient.delete(this.autoUrl + 'auto/' + idAuto, this.httpOptions);
    }
}