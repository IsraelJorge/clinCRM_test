import { RouterProvider as RouterDomProvider } from 'react-router-dom'

import { router } from '@/routes/router'

export const RouterProvider = () => <RouterDomProvider router={router} />
