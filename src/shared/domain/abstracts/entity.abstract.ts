import { v4 as uuidv4 } from 'uuid';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  public readonly id: string;
  public readonly props: T;

  protected constructor(props: T, id?: string) {
    // If no id specified, this is a new entity => generate new UUID
    this.id = id ? id : uuidv4();
    this.props = props;
  }

  /**
   * Checks if the specified entity equals the current instance.
   * Nota: in Clean Architecture, and DDD more generally,
   * entity equality is determined by identifier equality.
   */
  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
        return false;
    }

    if (this === object) {
        return true;
    }

    if (!isEntity(object)) {
        return false;
    }

    return this.id === object.id;
  }
}