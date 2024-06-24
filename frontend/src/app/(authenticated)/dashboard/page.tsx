'use client'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { GoSearch } from 'react-icons/go'
import {
  MdOutlineArrowCircleDown,
  MdOutlineArrowCircleUp,
  MdOutlineAttachMoney,
} from 'react-icons/md'
import { PiSignOutBold } from 'react-icons/pi'

import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { api } from '~/lib/axios'

import { Card } from './components/card'
import { MoneyLabel } from './components/moneyLabel'

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  categoryId: string
  categoryName: string
  userId: string
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transaction')
      setTransactions(response.data.transactions)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  const cards = [
    {
      title: 'Entradas',
      value: transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0),
      icon: <MdOutlineArrowCircleUp className="text-blue-500" size={24} />,
    },
    {
      title: 'Saídas',
      value: transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0),
      icon: <MdOutlineArrowCircleDown className="text-red-500" size={24} />,
    },
    {
      title: 'Total',
      value: transactions.reduce((sum, t) => sum + t.amount, 0),
      icon: <MdOutlineAttachMoney className="text-white" size={24} />,
      bgColor: 'bg-cardBlue',
    },
  ]

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-secondary">
      <div className="relative mb-[100px] flex min-h-[150px] w-full flex-col items-center bg-bodyColorSecondary">
        <div className="flex w-full items-center justify-center pb-10 pt-5">
          <div className="flex w-full max-w-[80%] items-center justify-between">
            <div>
              <Image
                src="/logo_fastpay.svg"
                width={100}
                height={100}
                alt="Logo FastPay"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center rounded-sm bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
                Nova Categoria
              </button>

              <button className="flex items-center justify-center rounded-sm bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
                Nova Transação
              </button>

              <button className="flex h-full items-center justify-center rounded-sm bg-bodyColorTertiary p-3 text-sm font-semibold text-white">
                <PiSignOutBold size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-[100px] mb-8 flex w-full max-w-[80%] overflow-x-auto px-4">
          <div className="flex w-full flex-row flex-nowrap gap-4">
            {cards.map((card, index) => (
              <Fragment key={index}>
                <Card {...card} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 flex w-full max-w-[80%] flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por transação"
          className="w-full rounded-lg bg-bodyColorSecondary p-4 text-white outline-none"
        />
        <button className="flex items-center justify-center gap-4 rounded-lg border border-blue-600 bg-transparent p-4 text-blue-600">
          <GoSearch size={20} />
          Pesquisar
        </button>
      </div>

      {/* DESK */}
      <div className="hidden w-full max-w-[80%] overflow-x-auto md:block">
        <Table className="w-full border-separate border-spacing-y-4 rounded-md">
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="rounded-lg bg-bodyColorTertiary"
              >
                <TableCell className="rounded-l-lg">
                  <div className="p-4 text-white">
                    {transaction.description}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="p-4">
                    <MoneyLabel value={transaction.amount} />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="p-4 text-white">
                    {transaction.categoryName}
                  </div>
                </TableCell>
                <TableCell className="rounded-r-md">
                  <div className="p-4 text-white">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE */}
      <div className="w-full max-w-[80%] md:hidden">
        <div className="w-full space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="w-full rounded-lg border p-4">
              <div className="mb-2 flex w-full justify-between">
                <span>{transaction.description}</span>
              </div>
              <div className="mb-2 flex w-full justify-between">
                <span>
                  <MoneyLabel value={transaction.amount} />
                </span>
              </div>
              <div className="mb-2 flex w-full justify-between">
                <span>{transaction.categoryName}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
