import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'User1', email: 'user1@email.com', password: '12345' },
    { id: 2, name: 'User2', email: 'user2@email.com', password: '123453' },
  ];

  create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: Date.now(),
    };

    this.users.push(newUser);
    return ` this ${JSON.stringify(newUser)} is added to database`;
  }

  //get all the users
  findAll() {
    return this.users;
  }

  //get one user
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  //update user
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  remove(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
