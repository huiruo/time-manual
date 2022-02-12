import { Controller, Body, Get, Post, Inject, Param } from '@nestjs/common';
import { MomentsService } from './moments.service';
import { Result } from '../common/result.interface';
import { Moments } from './moments.entity';

@Controller('moments')
export class MomentsController {
  constructor(
    @Inject(MomentsService) private readonly MomentsService: MomentsService,
  ) { }

  // http://localhost:3800/moments/122
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result> {
    const data = await this.MomentsService.findOneById(id);
    return { code: 200, message: '查询成功', data };
  }

  @Post('add')
  async addMomonts(@Body() body: Moments) {
    const data = await this.MomentsService.addMoment(body);
    return data;
  }

  @Post('query')
  async queryMomonts(@Body() body) {
    const currentPage: number = body.currentPage;
    const pageSize: number = body.pageSize;
    const data = await this.MomentsService.queryMoments(currentPage, pageSize);
    return data;
  }
}
