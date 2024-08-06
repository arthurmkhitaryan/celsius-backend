import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;

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

  @IsNotEmpty()
  @IsEnum(['Customer', 'Partner'], {
    message: 'Role must be either Customer or Partner',
  })
  role: string;
}
