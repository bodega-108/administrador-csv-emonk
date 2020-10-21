import { Component, OnInit } from '@angular/core';
import { Csv } from '../../models/csv';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-csc-productos', 
  templateUrl: './csc-productos.component.html',
  styleUrls: ['./csc-productos.component.css']
})
export class CscProductosComponent implements OnInit {
  public sesion:any;
  public csvArray:Csv[]= [
    {sku:'Emonk-7-000023-003', tipo:'simple',categoria:'Hogar',nombre:'Sarten Grill Cuadrado', descripcion:'Sarten bañado en ceramica, basta de usar aceite en tus alimentos',descripcionCorta:'Sarten bañado en ceramica',peso:2,color:'Negro',material:'Hierro'}
  ];
  data:[][];

  selectedCsv: Csv = new Csv();
  constructor( private _UserService:UserService,private route: Router) { 
    this.cargarSesion();
  }

  ngOnInit() {
    
  }
  cargarSesion(){
    this._UserService.getSesion().subscribe(data=>{
      this.sesion = data;
      console.log(this.sesion.ok);
      if(this.sesion.ok === false){
        this.route.navigateByUrl('/');
      }



    })
  }
add(){
  console.log(this.selectedCsv);
  this.csvArray.push(this.selectedCsv);
  this.selectedCsv = new Csv();
}



}
