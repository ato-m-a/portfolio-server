import { Body, Controller, Delete, Get, Post, Req, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/* dto */
import { AuthDto, SignUpDto } from './auth.dto';

/* service */
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private AuthService: AuthService) {}

  // 세션 조회
  @ApiOperation({ summary: '세션 확인' })
  @ApiResponse({
    description: '세션 정보',
    status: 200
  })
  @Get()
  public async checkSession(@Res() res: Response, @Session() session: Record<string, any>) {
    if (session && session.auth) {
      res.status(200).json({ role: session.auth.role });
    } else {
      res.status(403).end();
    }
  }

  // 로그인
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({
    description: '로그인 정보'
  })
  @Post('/signin')
  public async signin(@Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>, @Body() dataset: AuthDto) {
    const ip = process.env.NODE_ENV === 'production' ? req.headers['x-forwarded-for'] as string : '127.0.0.1';
    const response = await this.AuthService.validate(dataset, ip);

    delete response.password;

    session.auth = {
      uuid: response.uuid,
      username: response.username,
      email: response.email,
      role: response.role
    };
    session.save(() => {
      res.status(201).json(response);
    });
  }

  // 로그아웃
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({
    description: '로그아웃',
    status: 204
  })
  @Delete('/signout')
  public async signout(@Res() res: Response, @Session() session: Record<string, any>) {
    session.destroy(() => {
      res.status(204).end();
    });
  }

  // 계정 생성
  @ApiOperation({ summary: '계정 생성' })
  @ApiCreatedResponse({
    description: '계정 생성',
  })
  @Post('/signup')
  public async signup(@Res() res: Response, @Body() dataset: SignUpDto) {
    await this.AuthService.signup(dataset);

    res.status(201).end();
  }

  // 계정 정보 수정(패스워드)
  @ApiOperation({ summary: '패스워드 수정' })
  @ApiCreatedResponse({
    description: '계정 비밀번호 수정'
  })
  @Post('/update/password')
  public async updatePassword(@Res() res: Response, @Body() dataset: { username: string, password: string }) {
    await this.AuthService.updatePassword(dataset);

    res.status(201).end();
  }

  // 계정 정보 수정(권한)
  @ApiOperation({ summary: '권한 수정' })
  @ApiCreatedResponse({
    description: '계정 권한 수정'
  })
  @Post('/update/role')
  public async updateRole(@Res() res: Response, @Body() dataset: { username: string, role: string }) {
    await this.AuthService.updateRole(dataset);

    res.status(201).end();
  }
}