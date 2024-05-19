export const Error = {
  default: 'Houve um erro, tente novamente mais tarde',
  required: 'Campo obrigatório',
  date: 'Data inválida',
  selectLeastOneOption: 'Selecione ao menos uma opção',
  min: (size: number) => `No mínimo ${size} caracteres`,
  max: (size: number) => `No máximo ${size} caracteres`,
  dateRange: 'Selecione um intervalo de datas',
}
