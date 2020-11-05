import { FormularioRoutingModule } from './formulario-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FormularioRoutingModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule],
  providers: [],
})
export class FormularioModule { }