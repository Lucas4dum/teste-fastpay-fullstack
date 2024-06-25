import * as React from 'react'

import { cn } from '~/libs/utils'

const Table = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>((props, ref) => (
  <table
    ref={ref}
    className={cn('w-full text-left', props.className ?? '')}
    {...props}
  />
))

Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => (
  <thead
    ref={ref}
    className={cn('bg-gray-50', props.className ?? '')}
    {...props}
  />
))

TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => (
  <tbody
    ref={ref}
    className={cn('divide-y divide-gray-200', props.className ?? '')}
    {...props}
  />
))

TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => (
  <tr
    ref={ref}
    className={cn('hover:bg-gray-100', props.className ?? '')}
    {...props}
  />
))

TableRow.displayName = 'TableRow'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => (
  <td
    ref={ref}
    className={cn('whitespace-nowrap py-4', props.className ?? '')}
    {...props}
  />
))

TableCell.displayName = 'TableCell'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>((props, ref) => (
  <th
    ref={ref}
    className={cn(
      'py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500',
      props.className ?? '',
    )}
    {...props}
  />
))

TableHead.displayName = 'TableHead'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>((props, ref) => (
  <caption
    ref={ref}
    className={cn('mt-1 text-sm text-gray-500', props.className ?? '')}
    {...props}
  />
))

TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}
