import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from '../../../util/bcrypt';

/* dto */
import { AuthDto, SignUpDto } from './auth.dto';

/* entity */
import { User, AccessLog } from './auth.entity';

/* repo */
import { UserRepository, AccessLogRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private UserRepository: UserRepository,
    private AccessLogRepository: AccessLogRepository
  ) {}

  // 로그인
  public async validate(dataset: AuthDto, ip: string): Promise<User> {
    const response = await this.UserRepository.getOneByUsername(dataset.username);
    
    if (!response) throw new UnauthorizedException();

    const isMatched = await compare(dataset.password, response.password);

    if (!isMatched) throw new UnauthorizedException();

    // 로그인 기록 갱신
    await this.AccessLogRepository.writeLog({ ip, user: response });

    return response;
  }

  // 계정 생성
  public async signup(dataset: SignUpDto): Promise<void> {
    dataset.password = await hash(dataset.password);
    await this.UserRepository.createUser(dataset);
  }

  // 정보 수정(비밀번호)
  public async updatePassword({ username, password }: { username: string, password: string }): Promise<void> {
    const hashed = await hash(password);
    await this.UserRepository.updateUserPassword({ username, password: hashed });
  }

  // 정보 수정(권한)
  public async updateRole({ username, role }: { username: string, role: string }): Promise<void> {
    await this.UserRepository.updateUserRole({ username, role });
  }
}