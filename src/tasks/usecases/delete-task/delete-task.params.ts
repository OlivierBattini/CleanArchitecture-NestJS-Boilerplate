import { IsString, IsDefined, IsUUID } from 'class-validator';

export class DeleteTaskParams {
  @IsDefined()
  @IsString()
  @IsUUID()
  id: string;
}
