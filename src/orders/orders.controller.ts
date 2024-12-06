import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new Error('Items cannot be empty.');
    }
    if (createOrderDto.total <= 0) {
      throw new Error('Total must be greater than zero.');
    }
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() query: { status?: string }) {
    if (query.status) {
      return this.ordersService.findByStatus(query.status);
    }
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
