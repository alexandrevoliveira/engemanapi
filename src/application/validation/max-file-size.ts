import { MaxFileSizeError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class MaxFileSize implements Validator {
  constructor (
    private readonly value: Buffer,
    private readonly maxSizeInMb: number
  ) {}

  validate (): Error | undefined {
    const maxFileSizeInBytes = this.maxSizeInMb * 1024 * 1024
    if (this.value.length > maxFileSizeInBytes) return new MaxFileSizeError(this.maxSizeInMb)
  }
}
