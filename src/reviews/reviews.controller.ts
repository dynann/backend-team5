import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('restaurants/:restaurantId/reviews') // Nested route to associate reviews with a restaurant
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(
    @Param('restaurantId') restaurantId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(restaurantId, createReviewDto);
  }

  @Get()
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.reviewsService.findAllByRestaurant(restaurantId);
  }

  @Put(':reviewId')
  update(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(reviewId, updateReviewDto);
  }

  @Delete(':reviewId')
  remove(@Param('reviewId') reviewId: string) {
    return this.reviewsService.remove(reviewId);
  }
}
