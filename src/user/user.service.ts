import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(loginData: any) {
    const { username, password } = loginData;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { access_token: token };
  }

  async registerUser(userData: User) {
    try {
      return await this.usersRepository.save(userData);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error registering user: ' + error.message,
      );
    }
  }

  async listUsers() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error listing users: ' + error.message,
      );
    }
  }

  async getUser(id: number) {
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error getting user: ' + error.message,
      );
    }
  }

  async updateUser(id: number, userData: User) {
    try {
      return await this.usersRepository.update(id, userData);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating user: ' + error.message,
      );
    }
  }

  async deleteUser(id: number) {
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting user: ' + error.message,
      );
    }
  }
}