import { Action } from '@ngrx/store';

import { Thermostat } from '../thermostat';

export const DISCOVER_THERMOSTAT = 'DISCOVER_THERMOSTAT';
export const ADD_THERMOSTAT = 'ADD_THERMOSTAT';
export const REMOVE_THERMOSTAT = 'REMOVE_THERMOSTAT';

export class DiscoverThermostat implements Action {
    readonly type = DISCOVER_THERMOSTAT;
}

export class AddThermostat implements Action {
    readonly type = ADD_THERMOSTAT;

    constructor(public payload: Thermostat) {}
}

export class RemoveThermostat implements Action {
    readonly type = REMOVE_THERMOSTAT;

    constructor(public payload: Thermostat) {}
}

export type ThermostatsActions = AddThermostat | RemoveThermostat;
