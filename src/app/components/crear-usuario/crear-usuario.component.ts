import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { debounceTime} from 'rxjs/operators'; 
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  form: FormGroup;
  public newUser:any;
  constructor(private _UserService: UserService,private _FormBuilder:FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
  }
  private buildForm() {
    this.form = this._FormBuilder.group({
      nombre:['', [Validators.required]],
      apellido:['', [Validators.required]],
      email:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(6)]],
      role:['', [Validators.required]]
    

    });
    
    this.form.valueChanges
    .pipe(
      debounceTime(500))
    .subscribe(value => {
      console.log(value);
    });
  }

  save(event: Event) {
    
    event.preventDefault();
     
    if(this.form.valid){
      
      const value = this.form.value;
      // this.cargando=true;
      console.log(value);  
      this.crearNuevoUsuario(value); this
      this.form.reset(this.form)

      
    } 
  }
 
  crearNuevoUsuario(value) {
    this._UserService.postUsurio(value).subscribe(data=>{
      this.newUser = data;
      console.log(this.newUser);
    })
  }
}
