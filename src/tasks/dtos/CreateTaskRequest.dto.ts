import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTaskRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(128)
  description: string;
}
