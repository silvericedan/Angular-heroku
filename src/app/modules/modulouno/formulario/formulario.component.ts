import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { FormularioService } from './../servicios/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  completarForm: FormGroup;
  idAuto: any;
  tabladatos: any[] = [];
  displayedColumns: string[] = ['marca', 'modelo', 'patente', 'anio', 'acciones'];
  constructor(private fb: FormBuilder, private formularioService: FormularioService) { }

  ngOnInit(): void {
    this.iniciarFormulario();

    this.getTablaDatos();
  }

  iniciarFormulario() {
    this.completarForm = this.fb.group({
      marca: [''],
      modelo: [''],
      patente: [''],
      anio: ['']
    });
  }

  getTablaDatos() {
    this.formularioService.getAutos().pipe(take(1)).subscribe((autos: any) => {
      this.tabladatos = autos;
    });
  }

  editarAuto(auto: any) {
    this.idAuto = auto._id;
    this.completarForm.patchValue({
      marca: auto.marca,
      modelo: auto.modelo,
      patente: auto.patente,
      anio: auto.anio
    });
  }

async borrarAuto(auto: any) {
  try {
    const autoId = auto._id;
    await this.formularioService.borrarAuto(autoId).toPromise();
    const index = this.tabladatos.findIndex((item) => item._id === autoId);
    if (index < 0) { return; }
    const autolist = [...this.tabladatos];
    autolist.splice(index, 1);
    this.tabladatos = autolist;
  } catch (error) {
    console.log(error);
  }
}

submit() {
  if (this.idAuto) {
    this.formularioService.editarAuto(this.idAuto, this.completarForm.value).subscribe((response) => {
      const index = this.tabladatos.findIndex((item) => item._id === this.idAuto);
      const autolist = [...this.tabladatos];
      autolist[index] = { _id: response.automovil._id, ...this.completarForm.value };
      this.tabladatos = autolist;
      
    });
  } else {
    this.formularioService.guardarAuto(this.completarForm.value).subscribe((auto) => {
      this.tabladatos = [...this.tabladatos, auto];
    });
  }
}

}
