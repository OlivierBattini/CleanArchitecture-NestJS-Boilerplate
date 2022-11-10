import { IsString, IsDefined, IsBoolean } from 'class-validator';

export class UpdateTaskRequest {
  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsBoolean()
  isDone: boolean;
}
