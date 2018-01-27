import { TestBed, inject } from '@angular/core/testing';

import { ThermostatDiscoveryService } from './thermostat-discovery-service.service';

describe('ThermostatDiscoveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThermostatDiscoveryService]
    });
  });

  it('should be created', inject([ThermostatDiscoveryService], (service: ThermostatDiscoveryService) => {
    expect(service).toBeTruthy();
  }));
});
