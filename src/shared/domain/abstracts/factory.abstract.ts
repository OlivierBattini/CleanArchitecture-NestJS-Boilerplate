import { Result } from "../result/Result";

export interface IFactory<TEntity, TModel, TDto> {
  fromModel(model: TModel): Result<TEntity>;
  fromModelCollection(modelCollection: TModel[]): Result<TEntity[]>;
  toModel(entity: TEntity): TModel;

  fromDto(dto: TDto): Result<TEntity>;
  toDto(entity: TEntity): TDto;
}