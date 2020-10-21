import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cierre-sesion',
  templateUrl: './cierre-sesion.component.html',
  styleUrls: ['./cierre-sesion.component.css']
})
export class CierreSesionComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.route.navigateByUrl('/')
    },5000)
  }

}
