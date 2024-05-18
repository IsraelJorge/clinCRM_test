import { Meta } from '@storybook/react'

import { Pagination, PaginationProps } from '@/components/pagination'

const paginationPropsMock = {
  totalPages: 10,
  page: 1,
  onPaginate: () => {},
}

export default {
  title: 'components/Pagination',
  component: Pagination,
  args: paginationPropsMock,
} as Meta<typeof Pagination>

export const Default = (args: PaginationProps) => <Pagination {...args} />
