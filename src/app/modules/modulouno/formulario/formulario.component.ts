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
  idPersona: any;
  tabladatos: any[] = [];
  displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'acciones'];
  constructor(private fb: FormBuilder, private formularioService: FormularioService) { }

  ngOnInit(): void {
    this.iniciarFormulario();

    this.getTablaDatos();
  }

  iniciarFormulario() {
    this.completarForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      edad: ['']
    });
  }

  getTablaDatos() {
    this.formularioService.getPersonas().pipe(take(1)).subscribe((personas: any) => {
      this.tabladatos = personas;
    });
  }

  editarPersona(persona: any) {
    this.idPersona = persona._id;
    this.completarForm.patchValue({
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad
    });
  }

async borrarPersona(persona: any) {
  try {
    this.idPersona = persona._id;
    await this.formularioService.borrarPersona(this.idPersona).toPromise();
    const index = this.tabladatos.findIndex((item) => item._id === this.idPersona);
    if (index < 0) { return; }
    const personalist = [...this.tabladatos];
    personalist.splice(index, 1);
    this.tabladatos = personalist;
  } catch (error) {
    console.log(error);
  }
}

submit() {
  if (this.idPersona) {
    this.formularioService.editarPersona(this.idPersona, this.completarForm.value).subscribe((response) => {
      const index = this.tabladatos.findIndex((item) => item._id === this.idPersona);
      const personalist = [...this.tabladatos];
      personalist[index] = { _id: response.persona._id, ...this.completarForm.value };
      this.tabladatos = personalist;
    });
  } else {
    this.formularioService.guardarPersona(this.completarForm.value).subscribe((persona) => {
      this.tabladatos = [...this.tabladatos, persona];
    });
  }
}

}
