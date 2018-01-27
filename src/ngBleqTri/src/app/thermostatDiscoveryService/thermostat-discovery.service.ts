import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Injectable()
export class ThermostatDiscoveryService {
  static DEVICE_NAME = 'CC-RT-BLE';
  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'manufacturer_name_string';
  static GATT_PRIMARY_SERVICE = 'device_information';

  constructor(private ble: BluetoothCore) { }

  getFakeValue() {
    this.ble.fakeNext();
  }

  getDevice() {
    return this.ble.getDevice$();
  }

  streamValues() {
    return this.ble.streamValues$().map((value: DataView) => this.dataView2String(value));
  }

  getThermostatName() {
    try {
      return this.ble
        // 1) call the discover method will trigger the discovery process (by the browser)
        .discover$({ filters: [{ name: ThermostatDiscoveryService.DEVICE_NAME }] })
        // 2) get that service
        .mergeMap((gatt: BluetoothRemoteGATTServer) => {
          return this.ble.getPrimaryService$(gatt, ThermostatDiscoveryService.GATT_PRIMARY_SERVICE);
        })
        // 3) get a specific characteristic on that service
        .mergeMap((primaryService: BluetoothRemoteGATTService) => {
          return this.ble.getCharacteristic$(primaryService, ThermostatDiscoveryService.GATT_CHARACTERISTIC_BATTERY_LEVEL);
        })
        // 4) ask for the value of that characteristic (will return a DataView)
        .mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) => {
          return this.ble.readValue$(characteristic);
        })
          // 5) on that DataView, get the right value
        .map((value: DataView) => {
          return this.dataView2String(value);
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
