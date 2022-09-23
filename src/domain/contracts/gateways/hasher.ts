export interface HashGenerator {
  generate: (input: HashGenerator.Input) => Promise<HashGenerator.Output>
}

export namespace HashGenerator {
  export type Input = {
    value: string
  }
  export type Output = string
}
