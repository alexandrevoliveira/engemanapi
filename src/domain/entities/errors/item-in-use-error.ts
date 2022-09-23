export class ItemInUseError extends Error {
  constructor (value: string) {
    const message = `The field ${value} is already in use.`
    super(message)
    this.name = 'ItemInUseError'
  }
}
