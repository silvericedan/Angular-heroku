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
  idPedido: any;
  tabladatos: any[] = [];
  displayedColumns: string[] = ['nombre', 'direccion', 'pedido', 'fecha', 'acciones'];
  constructor(private fb: FormBuilder, private formularioService: FormularioService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.getTablaDatos();
  }

  iniciarFormulario() {
    this.completarForm = this.fb.group({
      nombre: [''],
      direccion: [''],
      pedido: [''],
      fecha: ['']
    });
  }

  getTablaDatos() {
    this.formularioService.getPedidos().pipe(take(1)).subscribe((pedidos: any) => {
      this.tabladatos = pedidos;
    });
  }

  editarPedido(pedido: any) {
    this.idPedido = pedido._id;
    this.completarForm.patchValue({
      nombre: pedido.nombre,
      direccion: pedido.direccion,
      pedido: pedido.pedido,
      fecha: pedido.fecha
    });
  }

  async borrarPedido(pedido: any) {
    try {
      const pedidoId = pedido._id;
      await this.formularioService.borrarPedido(pedidoId).toPromise();
      const index = this.tabladatos.findIndex((item) => item._id === pedidoId);
      if (index < 0) { return; }
      const pedidolist = [...this.tabladatos];
      pedidolist.splice(index, 1);
      this.tabladatos = pedidolist;
    } catch (error) {
      console.log(error);
    }
  }

  submit() {
    if (this.idPedido) {
      this.formularioService.editarPedido(this.idPedido, this.completarForm.value).subscribe((response) => {
        const index = this.tabladatos.findIndex((item) => item._id === this.idPedido);
        const pedidolist = [...this.tabladatos];
        pedidolist[index] = { _id: response.pedido._id, ...this.completarForm.value };
        this.tabladatos = pedidolist;
      });
    } else {
      this.formularioService.guardarPedido(this.completarForm.value).subscribe((pedido) => {
        this.tabladatos = [...this.tabladatos, pedido];
      });
    }
  }

}
