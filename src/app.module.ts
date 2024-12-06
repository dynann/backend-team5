import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [FoodModule, UsersModule, MenuModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
