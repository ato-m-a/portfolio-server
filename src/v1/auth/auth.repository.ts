import { EntityRepository, Repository } from 'typeorm';

/* dto */
import { SignUpDto } from './auth.dto';

/* entity */
import { User } from './auth.entity';
import { AccessLog } from './auth.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // 계정 생성
  public async createUser(dataset: SignUpDto): Promise<void> {
    await this.createQueryBuilder('user')
      .insert()
      .into(User)
      .values(dataset)
      .execute();
  }

  // 계정 조회 (just username)
  public async validateUsername(username: string): Promise<boolean> {
    const response = await this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();

    return response ? true : false;
  }

  // 계정 조회 (for signin)
  public async getOneByUsername(username: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .leftJoinAndSelect('user.log', 'accesslog')
      .addSelect('user.password')
      .getOne();
  }

  // 계정 탈퇴
  public async resignUser(uuid: string): Promise<void> {
    await this.createQueryBuilder('user')
      .delete()
      .from(User)
      .where('uuid = :uuid', { uuid })
      .execute();
  }

  // 계정 수정(권한만)
  public async updateUserRole({ username, role }: { [key: string]: string }): Promise<void> {
    await this.createQueryBuilder('user')
      .update(User)
      .set({ role })
      .where('username = :username', { username })
      .execute();
  }

  // 계정 수정(비밀번호만)
  public async updateUserPassword({ username, password }: { [key: string]: string }): Promise<void> {
    await this.createQueryBuilder('user')
      .update(User)
      .set({ password })
      .where('username = :username', { username })
      .execute();
  }
}

@EntityRepository(AccessLog)
export class AccessLogRepository extends Repository<AccessLog> {
  // 로그 작성
  public async writeLog({ ip, user }: { ip: string, user: User }): Promise<void> {
    await this.createQueryBuilder('accesslog')
      .insert()
      .into(AccessLog)
      .values({ ip, user })
      .execute();
  }

  // 로그 열람
  public async readLog(seq: number): Promise<AccessLog[]> {
    return await this.createQueryBuilder('accesslog')
      .leftJoinAndSelect('accesslog.user', 'user', 'user.seq = accesslog.user')
      .orderBy('accesslog.accessdate', 'DESC')
      .where('user.seq = :seq', { seq })
      .getMany();
  }
}