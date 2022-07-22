import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
  @ApiProperty({
    example: '김두한',
    description: '성명',
    readOnly: true,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @ApiProperty({
    example: 'doohan@gmail.com',
    description: '이메일',
    readOnly: true,
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({
    example: '안녕하세요. 문의드릴 것이 있어 남깁니다.',
    description: '제목',
    readOnly: true,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public readonly subject: string;

  @ApiProperty({
    example: '...내용',
    description: '내용',
    readOnly: true,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public readonly content: string;
}