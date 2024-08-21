import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  postcode: string;

  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  houseFlatNumber: string;
}
