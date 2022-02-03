import { Controller,Body,Get,Post, Inject, Param } from '@nestjs/common';
import { MomentsService } from './moments.service';
import { Result } from '../common/result.interface';
import { Moments } from './moments.entity'

@Controller('moments')
export class MomentsController {
  constructor(
    @Inject(MomentsService) private readonly MomentsService: MomentsService,
) {} 

  // http://localhost:3800/moments/122
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result> {
      const data = await this.MomentsService.findOneById(id);
      return { code: 200, message: '查询成功', data };
  }

  @Post('add')
  async addMomonts(@Body() body:Moments){
    const data = await this.MomentsService.addMomont(body)
    console.log('add body:',data)
    if(data){
      return { code: 200, message: '查询成功',data};
    }else{
      return { code: 500, message: '发布动态失败',data: null };
    }
  }
}
