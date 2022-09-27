import { HashGenerator } from '@/domain/contracts/gateways'

import bcrypt from 'bcrypt'

export class BcryptAdapter {
  constructor (private readonly salt: number) {}

  async generate ({ value }: HashGenerator.Input): Promise<void> {
    await bcrypt.hash(value, this.salt)
  }
}
