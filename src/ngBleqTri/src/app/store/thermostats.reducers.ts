import { Action } from '@ngrx/store';
import { Thermostat } from '../thermostat';
import * as ThermostatsActions from './thermostats.actions';

export interface ThermostatsState {
    thermostats: Thermostat[];
}

const initialState: ThermostatsState = {
    thermostats: []
};

export default function (state = initialState, action: ThermostatsActions.ThermostatsActions): ThermostatsState {
    switch (action.type) {
        case ThermostatsActions.ADD_THERMOSTAT:
            const thermostat = state.thermostats.find(t => t.id === action.payload.id);
            return {
                ...state,
                thermostats: thermostat
                    ? state.thermostats.map(e => e.id === action.payload.id ? {...e, ...action.payload} : e)
                    : [...state.thermostats, action.payload]
            };
        case ThermostatsActions.REMOVE_THERMOSTAT:
            return {
                ...state,
                thermostats: state.thermostats.filter(e => e.id !== action.payload.id)
            };
        default:
            return state;
    }
}
