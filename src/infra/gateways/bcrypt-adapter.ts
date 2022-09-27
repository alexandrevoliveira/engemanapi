import { HashGenerator } from '@/domain/contracts/gateways'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashGenerator {
  constructor (private readonly salt: number) {}

  async generate ({ value }: HashGenerator.Input): Promise<HashGenerator.Output> {
    return bcrypt.hash(value, this.salt)
  }
}
