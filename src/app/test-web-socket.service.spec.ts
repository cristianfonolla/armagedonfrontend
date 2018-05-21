import { TestBed, inject } from '@angular/core/testing';

import { TestWebSocketService } from './test-web-socket.service';

describe('TestWebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestWebSocketService]
    });
  });

  it('should be created', inject([TestWebSocketService], (service: TestWebSocketService) => {
    expect(service).toBeTruthy();
  }));
});
