import { Action } from '@ngrx/store';
import { Thermostat } from '../thermostat';

export const ADD_THERMOSTAT = 'ADD_THERMOSTAT';

export class AddThermostat implements Action {
    readonly type = ADD_THERMOSTAT;

    constructor(public payload: Thermostat) {}
}

export type ThermostatsActions = AddThermostat;
