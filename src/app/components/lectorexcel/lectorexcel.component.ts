import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Excel } from '../../models/excel';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { ApiSkuService} from '../../services/api-sku.service';

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lectorexcel',
  templateUrl: './lectorexcel.component.html',
  styleUrls: ['./lectorexcel.component.css'],
  providers: [ApiSkuService]
})
export class LectorexcelComponent implements OnInit {

  public tipoArchivo = 'csv';
  
  // Funcion para exportar CSV
  exportAsConfig: ExportAsConfig = {
    type: `csv`, // the type you want to download
    elementIdOrContent: 'element', // the id of html/table element
  }
// Funcion para exportar Excel

  exportAsConfigExcel: ExportAsConfig = {
    type: `xlsx`, // the type you want to download
    elementIdOrContent: 'element', // the id of html/table element
  }


  public tablaexcel:boolean;
  public cargando:boolean;
  public texto:string;
  public data:string[][];
  public datos:any[];
  public pruebita: any;
  public palabra:string;
  public skusList:string[];
  public sesion:any;

  constructor(private exportAsService: ExportAsService, private _ApiSkuService:ApiSkuService,private _UserService:UserService,private route: Router) {
    this.datos=[]

   }
/**
 * Funcion que llama a la descarga csv
 */
   download(){
     let fecha = new Date();
     // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig,`csv-emonk-${fecha}` ).subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
   }
/**
 * Funcion que llama a la descarga
 */
downloadExcel(){
  let random = Math.round(Math.random() * 100);
  // download the file using old school javascript method
 this.exportAsService.save(this.exportAsConfigExcel,`excel-emonk-${random}` ).subscribe(() => {
   // save started
 });
 // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
 this.exportAsService.get(this.exportAsConfig).subscribe(content => {
   console.log(content);
 });
}

  ngOnInit() {
    this.cargarSesion();
    this.cargarSkuDB();
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
  onFileChange(evt:any){
    const target : DataTransfer  =  <DataTransfer>(evt.target);
   
    if(target.files.length !== 1) throw new Error("No se permite multiples archivos");
   
    const reader :  FileReader = new FileReader();
   
    reader.onload = (e: any) => {
     
     const bstr: [] = e.target.result;
     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});
   
     const wsname : string = wb.SheetNames[0];
     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
   
    
     this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data)
      this.datos.push(["sku","attribute_set_code","product_type","categories","name","weight","product_online","tax_class_name","visibility","price","additional_attributes","qty","use_config_min_qty","is_in_stock"])
     for(let i = 1; i < this.data.length; i++){
       
      /**
       * Variables para recoger data de excel
       */
      let categoria = this.data[i][9];
      let nombre = this.data[i][10];
      let sku = this.data[i][4];
      let item = this.data[i][4];
      let cola = this.data[i][5];
      let configurableA = this.data[i][8];
      let configurableB = this.data[i][18];
 
      let peso = this.data[i][23];
      let color = this.data[i][24];
      let material = this.data[i][21];
      let size = this.data[i][22];
      let packing = this.data[i][30];
      let pesoCtn = this.data[i][39];
      
  
      if(sku !== null){
        /**
         * Incio de logica para asignacion de cogido
         */
        
        //================================= Validacion para Categoria Home ============================================//
         if(categoria.includes("Home") === true){
          let visibilidad;
          let producType;

          if( configurableA === undefined && configurableB === 'Simple'){
            visibilidad = "Catalog, Search";
            producType = "simple";

           }
               
           if( configurableA === undefined && configurableB === "Configurable"){
            visibilidad="Not Visible Individually"
            producType= "simple";    
         }
         if( configurableA === 'Configurable' && configurableB === "Configurable"){
              visibilidad = "Catalog, Search";
              producType = "configurable";
         }

          // Logica para productos configurable
       
            this.datos.push([7+"-00000"+sku+"-00"+cola,"Default",producType,categoria,nombre,peso,1,"Taxable Goods",visibilidad,1000000,"color="+color+",esteril=No,material="+material+",packing="+packing+",pesoctn="+pesoCtn+",size="+size,50,1,1])
    
         }
        //=============================Fin Validacion =============================================//
        //================================= Validacion para Categoria Home ============================================//
        if(categoria.includes("Baby") === true){
          let visibilidad;
          let producType;

          if( configurableA === undefined && configurableB === 'Simple'){
            visibilidad = "Catalog, Search";
            producType = "simple";

           }
               
           if( configurableA === undefined && configurableB === "Configurable"){
            visibilidad="Not Visible Individually"
            producType= "simple";    
         }
         if( configurableA === 'Configurable' && configurableB === "Configurable"){
              visibilidad = "Catalog, Search";
              producType = "configurable";
         }

          // Logica para productos configurable
       
            this.datos.push([27+"-00000"+sku+"-00"+cola,"Default",producType,categoria,nombre,peso,1,"Taxable Goods",visibilidad,1000000,"color="+color+",esteril=No,material="+material+",packing="+packing+",pesoctn="+pesoCtn+",size="+size,50,1,1])
         }
        //=============================Fin Validacion =============================================//
        //================================= Validacion para Cleaning============================================//
        if(categoria.includes("Cleaning") === true){
          let visibilidad;
          let producType;

          if( configurableA === undefined && configurableB === 'Simple'){
            visibilidad = "Catalog, Search";
            producType = "simple";

           }
               
           if( configurableA === undefined && configurableB === "Configurable"){
            visibilidad="Not Visible Individually"
            producType= "simple";    
         }
         if( configurableA === 'Configurable' && configurableB === "Configurable"){
              visibilidad = "Catalog, Search";
              producType = "configurable";
         }

          // Logica para productos configurable
       
            this.datos.push([25+"-00000"+sku+"-00"+cola,"Default",producType,categoria,nombre,peso,1,"Taxable Goods",visibilidad,1000000,"color="+color+",esteril=No,material="+material+",packing="+packing+",pesoctn="+pesoCtn+",size="+size,50,1,1])
          // Logica para productos configurable
         
        }

        if(categoria.includes("Sustainable") === true){
          let visibilidad;
          let producType;

          if( configurableA === undefined && configurableB === 'Simple'){
            visibilidad = "Catalog, Search";
            producType = "simple";

           }
               
           if( configurableA === undefined && configurableB === "Configurable"){
            visibilidad="Not Visible Individually"
            producType= "simple";    
         }
         if( configurableA === 'Configurable' && configurableB === "Configurable"){
              visibilidad = "Catalog, Search";
              producType = "configurable";
         }

          // Logica para productos configurable
       
            this.datos.push([17+"-00000"+sku+"-00"+cola,"Default",producType,categoria,nombre,peso,1,"Taxable Goods",visibilidad,1000000,"color="+color+",esteril=No,material="+material+",packing="+packing+",pesoctn="+pesoCtn+",size="+size,50,1,1])
          // Logica para productos configurable
       
        }
        if(categoria.includes("Laboratory") === true){
          let visibilidad;
          let producType;

          if( configurableA === undefined && configurableB === 'Simple'){
            visibilidad = "Catalog, Search";
            producType = "simple";

           }
               
           if( configurableA === undefined && configurableB === "Configurable"){
            visibilidad="Not Visible Individually"
            producType= "simple";    
         }
         if( configurableA === 'Configurable' && configurableB === "Configurable"){
              visibilidad = "Catalog, Search";
              producType = "configurable";
         }

          // Logica para productos configurable
       
            this.datos.push([9+"-00000"+sku+"-00"+cola,"Default",producType,categoria,nombre,peso,1,"Taxable Goods",visibilidad,1000000,"color="+color+",esteril=No,material="+material+",packing="+packing+",pesoctn="+pesoCtn+",size="+size,50,1,1])
          // Logica para productos configurable
         
        
        }
        //=============================Fin Validacion =============================================//
       }
     }
     console.log(this.datos)
    };
    
    reader.readAsBinaryString(target.files[0]);
    
    this.cargando= true;

    setTimeout(()=>{
      this.cargando=false;
      this.tablaexcel = true;
    },3000)
   
   }

   cargarSkuDB(){
    this._ApiSkuService.getSkus().subscribe(data=>{
      this.skusList = data;
      console.log(this.skusList);
    })
   }

}



