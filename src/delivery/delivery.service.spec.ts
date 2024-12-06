import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryService],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new delivery', () => {
    const createDeliveryDto: CreateDeliveryDto = {
      orderId: 1,
      status: 'pending',
      deliveryAddress: '123 Main St',
      deliveryTime: '2024-12-06T10:00:00Z',
    };
    const result = service.create(createDeliveryDto);
    expect(result).toHaveProperty('id');
    expect(result.status).toBe('pending');
  });
});
