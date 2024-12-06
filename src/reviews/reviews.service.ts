import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  private reviews = []; // Replace with a database connection later

  create(restaurantId: string, createReviewDto: CreateReviewDto) {
    const review = {
      id: Date.now().toString(),
      restaurantId,
      ...createReviewDto,
    };
    this.reviews.push(review);
    return review;
  }

  findAllByRestaurant(restaurantId: string) {
    return this.reviews.filter((review) => review.restaurantId === restaurantId);
  }

  update(reviewId: string, updateReviewDto: UpdateReviewDto) {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (!review) throw new NotFoundException('Review not found');

    Object.assign(review, updateReviewDto);
    return review;
  }

  remove(reviewId: string) {
    const index = this.reviews.findIndex((r) => r.id === reviewId);
    if (index === -1) throw new NotFoundException('Review not found');

    this.reviews.splice(index, 1);
    return { message: 'Review deleted successfully' };
  }
}
