import { DomainError } from '@/errors/domain.error';
import { isEmpty } from '@/shared/utils/string.utils';
import { hasValue } from '@/shared/utils/type-checks.utils';
import { Nullable } from '@/types/nullable.type';
import * as uuid from 'uuid';

export class UUID {
  private readonly value: string;

  constructor(value?: Nullable<string>) {
    this.value = this.resolve(value);
  }

  private resolve(value: Nullable<string>): string {
    if (!hasValue(value)) {
      return uuid.v7();
    }
    if (isEmpty(value)) {
      throw new DomainError('The ID value cannot be an empty string');
    }
    if (!uuid.validate(value)) {
      throw new DomainError('The ID value must be a valid UUID');
    }
    if (uuid.version(value) !== 7) {
      throw new DomainError('The ID value must be a valid UUID version 7');
    }

    return value;
  }

  public toString(): string {
    return JSON.stringify(this);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(id: UUID): boolean {
    return this.value === id.value;
  }
}
