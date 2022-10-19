import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pantalla',
  templateUrl: './pantalla.component.html',
  styleUrls: ['./pantalla.component.scss']
})
export class PantallaComponent implements OnInit {

  @Input() elementos: string = "h";

  @Output() element = new EventEmitter();

  enviar() {
    this.element.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
