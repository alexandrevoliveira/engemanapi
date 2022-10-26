import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { AddAccount } from '@/domain/usecases'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = { name: string, email: string, password: string, passwordConfirmation: string }

export class SignUpController extends Controller {
  constructor (private readonly addAccount: AddAccount) {
    super()
  }

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<any>> {
    await this.addAccount({ name, email, password })
    return {
      statusCode: 400,
      data: 'any_data'
    }
  }

  override buildValidators ({ name, email, password, passwordConfirmation }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: name, fieldName: 'name' }).required().build(),
      ...Builder.of({ value: email, fieldName: 'email' }).required().email().build(),
      ...Builder.of({ value: password, fieldName: 'password' })
        .required()
        .compare({ valueToCompare: passwordConfirmation, valueToCompareName: 'passwordConfirmation' })
        .build(),
      ...Builder.of({ value: passwordConfirmation, fieldName: 'passwordConfirmation' }).required().build()
    ]
  }
}
