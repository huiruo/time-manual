import { Controller, Get, Inject, Param } from '@nestjs/common';
import { MomentsService } from './moments.service';
import { Result } from '../common/result.interface';

@Controller('moments')
export class MomentsController {
  constructor(
    @Inject(MomentsService) private readonly MomentsService: MomentsService,
) {} 

  @Get(':id')
  // http://localhost:3800/moments/22
  async findOne(@Param('id') id: string): Promise<Result> {
      // const data = await this.MomentsService.findOneTest(id);
      const data = await this.MomentsService.findOneById(id);
      return { code: 200, message: '查询成功', data };
  }

}
