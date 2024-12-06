import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  // Dummy data for testing
  private deliveries = [
    { id: 1, orderId: 1, status: 'pending', deliveryAddress: '123 Main St', deliveryTime: '2024-12-06T10:00:00Z' },
    { id: 2, orderId: 2, status: 'completed', deliveryAddress: '456 Elm St', deliveryTime: '2024-12-06T12:00:00Z' },
    { id: 3, orderId: 3, status: 'in-transit', deliveryAddress: '789 Oak St', deliveryTime: '2024-12-06T14:00:00Z' },
  ]; // In-memory dummy data

  create(createDeliveryDto: CreateDeliveryDto) {
    const newDelivery = {
      id: this.deliveries.length + 1,
      status: 'pending',
      ...createDeliveryDto,
    };
    this.deliveries.push(newDelivery);
    return newDelivery;
  }

  findAll() {
    return this.deliveries;
  }

  findOne(id: number) {
    return this.deliveries.find(delivery => delivery.id === id);
  }

  findByStatus(status: string) {
    return this.deliveries.filter(delivery => delivery.status === status);
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery = this.deliveries.find(delivery => delivery.id === id);
    if (!delivery) {
      throw new Error(`Delivery with ID ${id} not found.`);
    }
    Object.assign(delivery, updateDeliveryDto);
    return delivery;
  }

  remove(id: number) {
    const index = this.deliveries.findIndex(delivery => delivery.id === id);
    if (index === -1) {
      throw new Error(`Delivery with ID ${id} not found.`);
    }
    this.deliveries.splice(index, 1);
    return { message: `Delivery with ID ${id} has been removed.` };
  }
}
