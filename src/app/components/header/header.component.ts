import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public cerrar:boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    let token = localStorage.getItem('token');
    let userRole = localStorage.getItem('userRole');

   if(token !== '0'){
     this.cerrar = true;
   }
  } 

  cerrarSesion(){
    localStorage.setItem('userRole','0');
    localStorage.setItem('token','0');
    this.router.navigateByUrl('/logout');
  }
}
