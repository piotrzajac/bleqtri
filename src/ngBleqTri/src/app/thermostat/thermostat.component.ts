import { Component, OnInit, Input } from '@angular/core';
import { Thermostat } from '../thermostat';

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.component.html',
  styleUrls: ['./thermostat.component.sass']
})
export class ThermostatComponent implements OnInit {
  @Input() public thermostat: Thermostat;

  constructor() { }

  ngOnInit() {
  }

}
