import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { UUID } from './UUID';
import { Thermostat } from '../thermostat';

@Injectable()
export class ThermostatDiscoveryService {
  static DEVICE_NAME = 'CC-RT-BLE';

  constructor(private ble: BluetoothCore) { }

  getThermostat(): Observable<Thermostat> {
    try {
      const thermostat = new Thermostat();

      return this.ble
        // 1) call the discover method will trigger the discovery process (by the browser)
        .discover$({ filters: [{ name: ThermostatDiscoveryService.DEVICE_NAME }] })
        // 2) get that service
        .mergeMap((gatt: BluetoothRemoteGATTServer) => {
          thermostat.id = gatt.device.id;
          thermostat.isConnected = gatt.connected;
          return this.ble.getPrimaryService$(gatt, UUID.DEVICE.SERVICE);
        })
        // 3) get a specific characteristic on that service
        .mergeMap((primaryService: BluetoothRemoteGATTService) => {
          return this.ble.getCharacteristic$(primaryService, UUID.DEVICE.MANUFACTURER_NAME);
        })
        // 4) ask for the value of that characteristic (will return a DataView)
        .mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) => {
          return this.ble.readValue$(characteristic);
        })
          // 5) on that DataView, get the right value
        .map((value: DataView) => {
          thermostat.name = ThermostatDiscoveryService.DEVICE_NAME;
          thermostat.manufacturer = this.dataView2String(value);
          return thermostat;
        });
    } catch (e) {
      console.error('Oops! can not read value from %s');
    }
  }

  private dataView2String(data: DataView): string {
    const end = data.byteOffset + data.byteLength;
    let offset = data.byteOffset;
    let text = '';
    let val = -1;

    while (offset < data.byteLength && offset < end) {
        val = data.getUint8(offset++);
        if (val === 0) { break; }
        text += String.fromCharCode(val);
    }

    return text;
  }
}
