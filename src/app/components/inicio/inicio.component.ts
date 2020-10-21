import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { debounceTime} from 'rxjs/operators'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public datauser: User;
  public usuario:any; 
  public datosIncorrectos:boolean;
  public correctos:boolean;
  public cargando:boolean;
  public sesion: any;
  public adminUser:boolean=false;
  public roleChina:boolean=false;
  public userEmonk:boolean=false;
  
  form: FormGroup;

  constructor(private _UserService: UserService,private _FormBuilder:FormBuilder) {
    this.adminUser = false;
    this.roleChina = false;
    this.userEmonk = false;
    this.buildForm();
  
   }
   
   private buildForm() {
    this.form = this._FormBuilder.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]]

    });
  }
    
  ngOnInit() {
    this.verificacion();
    this.cargarSesion();
  }
  verificacion(){
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      console.log('no existe token');
      localStorage.setItem('token','0')
    }
    
  }
  cargarSesion() {
    this._UserService.getSesion().subscribe(data=>{
      this.sesion = data;
      // console.log(this.sesion.ok);

      if(this.sesion.ok === true){
        this.cargando=false;
        this.correctos=true;
      }

      if(this.sesion.ok === false){
        // console.log("Sesion expirada");
      }

      let roleUser = localStorage.getItem('userRole');

      if(roleUser === 'ADMIN_ROLE'){
        this.adminUser = true;
        this.roleChina= false;
        this.userEmonk = false;
      }
      
      if(roleUser === 'USER_CHINA'){
        this.roleChina= true;
        this.adminUser = false;
        this.userEmonk = false;
      }
      if(roleUser === 'USER_ROLE'){
        this.userEmonk = true;
        this.roleChina= false;
        this.adminUser = false;
      }
    })
  }

  cargarLogin(value){
    
    this._UserService.getLogin(value).subscribe(data=>{

      this.usuario = data;
    

      localStorage.setItem('token',this.usuario.token)

      
       
      if(this.usuario.ok === true){
         
        
        setTimeout(()=>{
          this.cargando=false;
          this.correctos=true;

          localStorage.setItem('userRole',this.usuario.usuario.role)

          let roleUser = localStorage.getItem('userRole');

          if(roleUser === 'ADMIN_ROLE'){
            this.adminUser = true;
            this.roleChina= false;
            this.userEmonk = false;
          }
          
          if(roleUser === 'USER_CHINA'){
            this.roleChina= true;
            this.adminUser = false;
            this.userEmonk = false;
          }
          if(roleUser === 'USER_ROLE'){
            this.userEmonk = true;
            this.roleChina= false;
            this.adminUser = false;
          }
        },3000)
        
      }
      if(this.usuario.ok === false){
        this.cargando=false;
        this.datosIncorrectos= true;
         
         setTimeout(()=>{
          this.datosIncorrectos= false;
         },5000);
      }

      if(this.usuario.usuario.role === 'ADMIN_ROLE'){
        
        this.adminUser = true;
      }
     
      localStorage.setItem('token',this.usuario.token)
    })
  }

  save(event: Event) {
    
    event.preventDefault();
     
    if(this.form.valid){
      this.cargando=true;
      const value = this.form.value;
      // this.cargando=true;
      console.log(value);  
      this.cargarLogin(value);
      this.form.reset(this.form)

      
    } 
  }
}
