import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  private orders = [
    { id: 1, items: ['Pizza', 'Soda'], total: 20.5, status: 'pending' },
    { id: 2, items: ['Burger', 'Fries'], total: 15, status: 'completed' },
    { id: 3, items: ['Pasta', 'Water'], total: 10, status: 'pending' },
  ]; // Dummy data for testing
  create(createOrderDto: CreateOrderDto) {
    // Manual validation for order creation
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new Error('Items cannot be empty.');
    }
    if (createOrderDto.total <= 0) {
      throw new Error('Total must be greater than zero.');
    }

    const newOrder = {
      id: this.orders.length + 1, 
      status: 'pending', 
      ...createOrderDto,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find(order => order.id === id);
    if (!order) {
      throw new Error(`Order #${id} not found.`);
    }
    return order;
  }

  findByStatus(status: string) {
    return this.orders.filter(order => order.status === status);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = this.orders.find(order => order.id === id);
    if (!order) {
      throw new Error(`Order #${id} not found.`);
    }

    // Apply updates manually
    Object.assign(order, updateOrderDto);
    return order;
  }

  remove(id: number) {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error(`Order #${id} not found.`);
    }
    this.orders.splice(orderIndex, 1);
    return { message: `Order #${id} has been removed.` };
  }
}
