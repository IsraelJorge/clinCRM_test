export const Routes = {
  home: '/',
  accountReceivableRegister: '/account-receivable-register',
  accountReceivableEdit: (id: string) => `/account-receivable/${id}`,
  dashboard: '/dashboard',
} as const
