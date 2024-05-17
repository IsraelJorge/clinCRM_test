import { ReactNode } from 'react'

import { Icon } from './icon'
import { Button } from './ui/button'
import { Table, TableHeader, TableRow, TableBody, TableCell } from './ui/table'

type DataTableProps<TData extends Record<string, unknown>> = {
  columns: Partial<ColumnInfo<TData>>
  data: TData[]
  actionColumn?: ActionColumn<TData>
  keyExtractor: (row: TData, index: number) => string | number
}

export type ColumnInfo<TData extends Record<string, unknown>> = {
  [K in keyof TData]: {
    header: string
    transform?: (value: TData[K], row: TData, index: number) => ReactNode
  }
}

export interface ActionColumn<Data extends Record<string, unknown>> {
  header?: string
  edit?: (row: Data) => void
  delete?: (row: Data) => void
}

export function DataTable<TData extends Record<string, unknown>>({
  columns,
  data,
  actionColumn,
  keyExtractor,
}: DataTableProps<TData>) {
  const columnKeys = Object.keys(columns)

  const shouldRenderAction =
    Boolean(actionColumn?.edit) || Boolean(actionColumn?.delete)

  const renderActionColumn = (item: TData, index: number) => {
    return (
      <TableCell className="sticky right-0 top-0 text-center">
        <div className="flex w-full items-center justify-center gap-2">
          {actionColumn?.edit && (
            <Button size="icon" data-testid={`edit-${index}`}>
              <Icon name="PenIcon" size={16} />
            </Button>
          )}

          {actionColumn?.delete && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => actionColumn.delete!(item)}
              data-testid={`delete-${index}`}
            >
              <Icon name="TrashIcon" size={16} />
            </Button>
          )}
        </div>
      </TableCell>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columnKeys.map((key, index) => {
            const column = columns[key]

            return (
              <TableCell
                key={`${column?.header}-${index}`}
                className="text-nowrap font-bold"
              >
                {column?.header}
              </TableCell>
            )
          })}
          {shouldRenderAction ? (
            <th className="sticky right-0 top-0 overflow-hidden text-ellipsis whitespace-nowrap break-words p-4 text-center text-base font-bold">
              {actionColumn?.header ?? ''}
            </th>
          ) : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          const key = keyExtractor(item, index)

          return (
            <TableRow key={key}>
              {columnKeys.map((key, columnIndex) => {
                const column = columns[key]

                const value = column?.transform
                  ? column?.transform!(
                      item[key as keyof typeof columns] as TData[string],
                      item,
                      index,
                    )
                  : (item[key as keyof typeof columns] as ReactNode)

                return (
                  <TableCell
                    data-label={column?.header}
                    key={`${column?.header}-${columnIndex}`}
                  >
                    {value}
                  </TableCell>
                )
              })}
              {shouldRenderAction ? renderActionColumn(item, index) : null}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
