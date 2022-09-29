import { Controller, SignUpController } from '@/application/controllers'

describe('SignUpController', () => {
  let sut: SignUpController

  beforeEach(() => {
    sut = new SignUpController()
  })

  it('should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
