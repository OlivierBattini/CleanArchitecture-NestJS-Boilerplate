import { IsString, IsDefined } from 'class-validator';

export class CreateTaskRequest {
  @IsDefined()
  @IsString()
  description: string;
}
