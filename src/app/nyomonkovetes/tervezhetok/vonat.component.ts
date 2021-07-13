import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenetvonalDatasourceService } from "../shared/menetvonal-datasource";
import { Vonat } from '../shared/vonat';

@Component({
  selector: 'vonat',
  templateUrl: 'vonat.component.html',
  styleUrls: ['vonat.component.css']
})
export class VonatComponent implements OnInit {
  display: boolean = false;
  vonatok: Vonat[];
  searchForm: FormGroup;

  // @ViewChild("vonatokTableDiv")
  // tableElement: ElementRef;

  constructor(private ds: MenetvonalDatasourceService,  private fb: FormBuilder) { }

  ngOnInit(): void {
      this.ds.getVonatok().subscribe(data => this.vonatok = data);
      this.initSearchForm();
  }

  private initSearchForm(): void {
    this.searchForm = this.fb.group({
      risAzonosito: [''],
      atado: [''],
      tervIdo: [''],
      indulasiAllomas: ['']
    });
  }

  clearForm() {
    this.searchForm.reset();
    this.showDialog();
  }

  submitForm(): void {
    let risAzonosito = this.searchForm.value.risAzonosito;
    let atado = this.searchForm.value.atado;
    let tervIdo = this.searchForm.value.tervIdo;  //string
    let tervIdoISO =  tervIdo != '' ? new Date(tervIdo).toISOString() : ""; //ISOstring
    let indulasiAllomas = this.searchForm.value.indulasiAllomas;

    this.ds.getVonatok().subscribe(data => 
      {
        this.vonatok = data.filter( (vonat, index, array) => {
          // datumot hasonlitjuk a time reszt eldobjuk
          let tervIdoWithoutTime: string = new Date(array[index].tervIdo.getFullYear(), array[index].tervIdo.getMonth(), array[index].tervIdo.getDate()).toISOString(); // ne a getDay-t mert az szar
          return ( 
            (risAzonosito != '' ? array[index].risAzonosito == risAzonosito : true) &&
            (atado != '' ? array[index].atado.toLowerCase() == atado.toLowerCase() : true) &&
            (tervIdo != null && tervIdo != '' ? tervIdoWithoutTime == tervIdoISO : true) &&
            (indulasiAllomas != '' ? array[index].indulasiAllomas.toLowerCase() == indulasiAllomas.toLowerCase() : true)
          )
        }
      );
    
     });

     this.display = false;
    // this.tableElement.nativeElement.hidden = false;
  }

  showDialog() {
      this.display = !this.display;
      //let table: HTMLElement = this.tableElement.nativeElement;
      // if (this.display) {
      //   table.hidden = true;
      // } else {
      //   table.hidden = false;
      // }
  }

}
