import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Thermostat } from '../thermostat';
import { ThermostatDiscoveryService } from '../thermostatDiscoveryService/thermostat-discovery.service';
import * as ThermostatActions from './thermostats.actions';

@Injectable()
export class ThermostatsEffects {
    @Effect()
    discover$ = this.actions$
        .ofType(ThermostatActions.DISCOVER_THERMOSTAT)
        .switchMap(() => {
            return this.thermostatDiscoveryService.getThermostat();
        })
        .map((thermostat: Thermostat) => {
            return {
                type: ThermostatActions.ADD_THERMOSTAT,
                payload: thermostat
            };
        });

    constructor(
        private actions$: Actions,
        private thermostatDiscoveryService: ThermostatDiscoveryService,
    ) {}
}
