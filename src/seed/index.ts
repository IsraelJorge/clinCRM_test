import { makeDataTable } from '@/__mocks__/data-table-mock'
import { keyStorage } from '@/data/storage/account-receivable-storage'
import { setValueLocalStorage } from '@/utils/localStorage'

export function seed(qnt: number = 10) {
  try {
    const dataMock = makeDataTable(qnt)
    setValueLocalStorage(keyStorage, dataMock)
  } catch (error) {
    console.log(error)

    console.log(
      'Error in seed data, before run the application, run the command: npm run seed',
    )
  }
}
