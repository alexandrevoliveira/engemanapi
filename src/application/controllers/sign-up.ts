import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { ItemInUseError } from '@/domain/entities'
import { AddAccount } from '@/domain/usecases'

type HttpRequest = { name: string, email: string, password: string, passwordConfirmation: string }
type Model = Error | { accessToken: string, id: string, name: string, email: string, isAdmin: boolean }

export class SignUpController extends Controller {
  constructor (private readonly addAccount: AddAccount) {
    super()
  }

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const addAccountOutput = await this.addAccount({ name, email, password })
      return ok(addAccountOutput)
    } catch (error) {
      if (error instanceof ItemInUseError) return badRequest(error)
      throw error
    }
  }

  override buildValidators ({ name, email, password, passwordConfirmation }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: name, fieldName: 'name' }).required().build(),
      ...Builder.of({ value: email, fieldName: 'email' }).required().email().build(),
      ...Builder.of({ value: password, fieldName: 'password' })
        .required()
        .compare({ valueToCompare: passwordConfirmation, fieldToCompareName: 'passwordConfirmation' })
        .build(),
      ...Builder.of({ value: passwordConfirmation, fieldName: 'passwordConfirmation' }).required().build()
    ]
  }
}
