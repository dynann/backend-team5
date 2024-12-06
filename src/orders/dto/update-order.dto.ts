export class UpdateOrderDto {
    status?: string;  // Optional status to update
    items?: string[]; // Optional items to update
    total?: number;   // Optional total price to update
  }
  