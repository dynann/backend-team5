import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let service: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
          provide: DeliveryService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              orderId: 1,
              status: 'pending',
              deliveryAddress: '123 Main St',
              deliveryTime: '2024-12-06T10:00:00Z',
            }),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              orderId: 1,
              status: 'pending',
              deliveryAddress: '123 Main St',
              deliveryTime: '2024-12-06T10:00:00Z',
            }),
            findByStatus: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue({
              id: 1,
              orderId: 1,
              status: 'completed',
              deliveryAddress: '123 Main St',
              deliveryTime: '2024-12-06T10:00:00Z',
            }),
            remove: jest.fn().mockResolvedValue({ message: 'Delivery removed' }),
          },
        },
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a delivery', async () => {
    const createDeliveryDto: CreateDeliveryDto = {
      orderId: 1,
      status: 'pending',
      deliveryAddress: '123 Main St',
      deliveryTime: '2024-12-06T10:00:00Z',
    };
    const result = await controller.create(createDeliveryDto);
    expect(result).toHaveProperty('id');
    expect(result.status).toBe('pending');
  });

  it('should fetch all deliveries', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
  });

  it('should fetch one delivery by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toHaveProperty('id', 1);
  });
});
