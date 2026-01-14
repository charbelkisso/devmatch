import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import type { CreateProfileDto } from './dto/create-profile.dto';
import type { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  findAll() {
    return this.profilesRepository.find();
  }

  findOne(id: string) {
    return this.profilesRepository.findOneBy({ id });
  }

  create(createProfileDto: CreateProfileDto) {
    const profile = this.profilesRepository.create(createProfileDto);
    return this.profilesRepository.save(profile);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profilesRepository.findOneBy({ id });
    if (!profile) return null;

    this.profilesRepository.merge(profile, updateProfileDto);
    return this.profilesRepository.save(profile);
  }

  async remove(id: string) {
    await this.profilesRepository.delete(id);
  }
}
