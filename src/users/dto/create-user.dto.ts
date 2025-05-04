import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsNumber,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty({ minimum: 16, maximum: 60 })
  @IsNumber()
  @Min(16)
  @Max(60)
  age: number;

  @ApiProperty({ pattern: '^01\\d{9}$' })
  @Matches(/^01\d{9}$/)
  mobileNumber: string;
}
