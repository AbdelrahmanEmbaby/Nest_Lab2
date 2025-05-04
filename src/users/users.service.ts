import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    const user = await createdUser.save();
    return this.mapToUserResponseDto(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAllExcluding(userId: string): Promise<UserResponseDto[]> {
    const users = await this.userModel.find({ _id: { $ne: userId } }).exec();
    return users.map((user) => this.mapToUserResponseDto(user));
  }

  async findById(userId: string): Promise<UserResponseDto | null> {
    const user = await this.userModel.findById(userId).exec();
    return user ? this.mapToUserResponseDto(user) : null;
  }

  private mapToUserResponseDto(user: User): UserResponseDto {
    return {
      email: user.email,
      fullName: user.fullName,
      age: user.age,
      mobileNumber: user.mobileNumber,
    };
  }
}
