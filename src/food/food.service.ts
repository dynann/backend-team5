import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  private food = [
    {
      id: 0,
      name: 'double cheese burger',
      description: 'blank description',
      price: '$5.2',
      image: 'url....',
    },
    {
      id: 2,
      name: 'Pizza Mamamia',
      description: 'no description at all',
      price: '$4',
      image: 'url....',
    },
  ];

  create(createFoodDto: CreateFoodDto) {
    const newFood = {
      ...createFoodDto,
      id: Date.now(),
    };
    this.food.push(newFood);
    return `this ${JSON.stringify(newFood)} is added to database`;
  }

  findAll() {
    return this.food;
  }

  findOne(id: number) {
    const getFood = this.food.find((food) => food.id === id);
    return getFood;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    this.food = this.food.map((Food) => {
      if (Food.id === id) {
        return { ...Food, ...updateFoodDto };
      }
      return Food;
    });
    return this.findOne(id);
  }

  remove(id: number) {
    const removeFood = this.findOne(id);
    this.food = this.food.filter((Food) => Food.id !== id);
    return removeFood;
  }
}
