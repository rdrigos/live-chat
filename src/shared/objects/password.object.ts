import { DomainError } from '@/errors/domain.error';
import { passwordRegex } from '@/shared/utils/regex.utils';
import { isEmpty } from '@/shared/utils/string.utils';
import { hasValue } from '@/shared/utils/type-checks.utils';
import { Nullable } from '@/types/nullable.type';
import * as crypto from 'node:crypto';

export class Password {
  private static readonly SALT_LENGTH = 16;
  private static readonly ITERATIONS = 100_000;
  private static readonly KEY_LENGTH = 64;
  private static readonly DIGEST = 'sha512';

  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static hash(password: Nullable<string>): Password {
    if (!hasValue(password)) {
      throw new DomainError('The password value cannot be null or undefined');
    }
    if (isEmpty(password)) {
      throw new DomainError('The password value cannot be an empty string');
    }
    if (password.length < 8 || password.length > 64) {
      throw new DomainError('The password must be between 8 and 64 characters long');
    }
    if (!passwordRegex.test(password)) {
      throw new DomainError(
        'The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      );
    }

    // Generate a random salt and derive the hash using PBKDF2
    const salt: string = crypto.randomBytes(Password.SALT_LENGTH).toString('base64');
    const hash: string = crypto
      .pbkdf2Sync(password, salt, Password.ITERATIONS, Password.KEY_LENGTH, Password.DIGEST)
      .toString('base64');

    // Combine the hashing metadata into a single payload string
    const payload: string = ['pbkdf2', salt, hash].join('$');

    // Return a new Password value object containing the hashed payload
    return new Password(payload);
  }

  public static fromHash(hash: Nullable<string>): Password {
    if (!hasValue(hash)) {
      throw new DomainError('The hash value cannot be null or undefined');
    }
    if (isEmpty(hash)) {
      throw new DomainError('The hash value cannot be an empty string');
    }

    // Split the hash string into components separated by '$'
    const parts: string[] = hash.split('$');

    if (parts.length !== 3) {
      throw new DomainError('The hash format is invalid.');
    }
    if (Buffer.from(parts[1], 'base64').length !== Password.SALT_LENGTH) {
      throw new DomainError('Invalid salt length');
    }
    if (Buffer.from(parts[2], 'base64').length !== Password.KEY_LENGTH) {
      throw new DomainError('Invalid hash length');
    }

    // Create and return a new Password instance initialized with the validated hash string
    return new Password(hash);
  }

  public compare(password: Nullable<string>): boolean {
    if (!hasValue(password)) {
      throw new DomainError('The password value cannot be null or undefined');
    }
    if (isEmpty(password)) {
      throw new DomainError('The password value cannot be an empty string');
    }

    // Extract the salt and base64-encoded hash from the stored value string
    const [, salt, hashBase64] = this.value.split('$');

    // Decode the stored hash from base64
    const hash: Buffer = Buffer.from(hashBase64, 'base64');

    // Derive the hash from the input password using the same parameters
    const hashToCompate: Buffer = crypto.pbkdf2Sync(
      password,
      salt,
      Password.ITERATIONS,
      Password.KEY_LENGTH,
      Password.DIGEST
    );

    // Compare the hashes in a timing-safe manner
    return crypto.timingSafeEqual(hashToCompate, hash);
  }

  public toString(): string {
    return JSON.stringify(this);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(id: Password): boolean {
    return this.value === id.value;
  }
}
