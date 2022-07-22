import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'root',
    description: '유저 아이디',
    readOnly: true,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @ApiProperty({
    example: '1q2w3e!',
    description: '유저 패스워드',
    readOnly: false,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class SignUpDto {
  @ApiProperty({
    example: 'guest1',
    description: '유저 아이디',
    readOnly: true,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @ApiProperty({
    example: 'tester@kakao.com',
    description: '유저 이메일',
    readOnly: true,
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({
    example: '1q2w3e!',
    description: '유저 패스워드',
    readOnly: false,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    example: 'normal | vip | super',
    description: '유저 권한',
    readOnly: true,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public readonly role: string;
}