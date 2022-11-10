import { IsString, IsDefined, IsUUID } from 'class-validator';

export class UpdateTaskParams {
  @IsDefined()
  @IsString()
  @IsUUID()
  id: string;
}
