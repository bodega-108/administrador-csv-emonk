import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { debounceTime} from 'rxjs/operators';
import { ApiSkuService } from '../services/api-sku.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public respuesta:any;
  public skuCreado:boolean=false;
  public cargando:boolean=false;
  public arraySku:any;
  public existente:boolean;
  public seeAllSku:boolean;
  public seccionCrear:boolean;
  public sesion:any;

  form: FormGroup;

  constructor(
    private _FormBuilder:FormBuilder, 
    private _ApiSkuService:ApiSkuService, 
    private _UserService:UserService,
    private route: Router
    ) { 
    this.buildForm();
  }

  ngOnInit() {
 this.cargarSesion();
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

  private buildForm() {
    this.form = this._FormBuilder.group({
      sku:['', [Validators.required, Validators.maxLength(12)]],
      categoria:['', [Validators.required]]

    }); 

    this.form.valueChanges
    .pipe(
      debounceTime(500))
    .subscribe(value => {
      console.log(value);
    });

    this.form.get('sku').valueChanges.subscribe(data=>{
      if(data.length >=10 ){
        console.log("hay mas de 10")
        this._ApiSkuService.getSkus().subscribe(result=>{
          
          this.arraySku = result.skusDB
          console.log(this.arraySku)
         
          for(let i = 0; i < result.skusDB.length; i++){
           
            if(this.arraySku[i].sku === data){
              console.log('El sku ya existe en base de datos');
             
              this.existente=true;
            }else{
              this.existente=false;
            }
          }
        })
        
      }
    })
  }
  
  activeSeccionCrear(){
    this.seeAllSku=false;
    console.log("prueba")
  }
  save(event: Event) {
    event.preventDefault();
    
    if(this.form.valid){
      
      const value = this.form.value;
      this.cargando=true;
      
      this.crearSku(value);
      this.form.reset(this.form)
      setTimeout(()=>{
        
        this.skuCreado = false;

      },5000)
      
    } 
  }
  // Method that create a new sku in database
  crearSku(value){

    this._ApiSkuService.postSku(value).subscribe(res =>{
      this.respuesta = res
      console.log(this.respuesta);
      if(this.respuesta.ok === true){
        this.skuCreado = true;
        this.cargando=false;
      }
    }
    )
  }
  // Funcion para cargar todos los SKU
  getAllSku(){
    this._ApiSkuService.getSkus().subscribe(
      data =>{
        this.arraySku= data.skusDB;
        console.log(this.arraySku);
        this.seeAllSku= true;
        if(this.arraySku.length === 0){
          this.seeAllSku= false;
        }
      }
    )
  }

  deleteSku(datosku){
    this._ApiSkuService.deleteSku(datosku).subscribe(data=>{
      console.log(data);
    });
    setTimeout(()=>{
      this._ApiSkuService.getSkus().subscribe(
        data =>{
          this.arraySku= data.skusDB;
          console.log(this.arraySku);
          this.seeAllSku= true;

          if(this.arraySku.length === 0){
            this.seeAllSku= false;
          }
        }
      )
    },1000)


  }
}
