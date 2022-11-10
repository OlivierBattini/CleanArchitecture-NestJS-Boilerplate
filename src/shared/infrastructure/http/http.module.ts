import { Module } from '@nestjs/common';

import { TaskModule } from '../../../tasks/task.module';

@Module({
  // Sub modules from sub domains
  imports: [ TaskModule ],
})
export class HttpModule {}
