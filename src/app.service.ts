import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { FoodService } from './food/food.service';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UsersService,
    private readonly foodService: FoodService,
  ) {}

  getHello(): string[] {
    return [
      JSON.stringify(this.userService.findAll()),
      JSON.stringify(this.foodService.findAll()),
    ];
  }
}
