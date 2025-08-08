import { DomainError } from '@/errors/domain.error';
import { emailRegex } from '@/shared/utils/regex.utils';
import { isEmpty } from '@/shared/utils/string.utils';
import { hasValue } from '@/shared/utils/type-checks.utils';
import { Nullable } from '@/types/nullable.type';

export class Email {
  private readonly value: string;

  constructor(value: Nullable<string>) {
    this.value = this.validate(value);
  }

  private validate(value: Nullable<string>): string {
    if (!hasValue(value)) {
      throw new DomainError('The email value cannot be null or undefined');
    }
    if (isEmpty(value)) {
      throw new DomainError('The email value cannot be an empty string');
    }
    if (!emailRegex.test(value)) {
      throw new DomainError('The email value must be a valid email address');
    }

    return value.toLowerCase();
  }

  public toString(): string {
    return JSON.stringify(this);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(id: Email): boolean {
    return this.value === id.value;
  }
}
