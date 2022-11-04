import { Module } from '@nestjs/common';

import { TaskModule } from 'src/tasks/task.module';

@Module({
  // Sub modules from sub domains
  imports: [ TaskModule ],
})
export class HttpModule {}
