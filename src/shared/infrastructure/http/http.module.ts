import { Module } from '@nestjs/common';

import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  // Sub modules from sub domains
  imports: [ TasksModule ],
})
export class HttpModule {}
