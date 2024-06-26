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
import ITransaction from '~/interfaces/Itransaction'
import ITransactionSummary from '~/interfaces/Itransaction-summary'
import { createCategory } from '~/services/functions/category'
import {
  createTransaction,
  deleteTransaction,
  ITransactionDataForm,
  listTransactions,
  updateTransaction,
} from '~/services/functions/transaction'
import { useUser } from '~/store/user'

import { Card } from './components/card'
import Modal from './components/modal'
import { MoneyLabel } from './components/moneyLabel'

export default function Dashboard() {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false)
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false)

  const { signOut } = useUser()
  const [fieldsTransaction, setTransactions] = useState<ITransactionSummary>()
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null)

  const fetchTransactions = async () => {
    const transactionsSummary = await listTransactions()
    setTransactions(transactionsSummary)
  }

  const createTransactionUpdated = async (data: ITransactionDataForm) => {
    try {
      await createTransaction(data)
      await fetchTransactions()
    } catch (error) {
      console.error('Error creating transaction:', error)
    }
  }

  const updateTransactionUpdated = async (data: ITransactionDataForm) => {
    try {
      await updateTransaction(data)
      await fetchTransactions()
    } catch (error) {
      console.error('Error updating transaction:', error)
    }
  }

  const deleteTransactionUpdated = async (id: string) => {
    try {
      await deleteTransaction(id)
      await fetchTransactions()
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  const cards = [
    {
      title: 'Entradas',
      value: fieldsTransaction?.income ? fieldsTransaction?.income : 0,
      icon: <MdOutlineArrowCircleUp className="text-blue-500" size={24} />,
    },
    {
      title: 'Saídas',
      value: fieldsTransaction?.expenses ? fieldsTransaction?.expenses : 0,
      icon: <MdOutlineArrowCircleDown className="text-red-500" size={24} />,
    },
    {
      title: 'Total',
      value: fieldsTransaction?.total ? fieldsTransaction?.total : 0,
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
              <Modal
                title="Nova Categoria"
                triggerText="Nova Categoria"
                triggerClassName="flex items-center justify-center rounded-sm bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                inputs={[{ label: 'Nome', id: 'categoryName' }]}
                buttons={[
                  {
                    label: 'Criar categoria',
                    onClick: (data) => createCategory(data),
                  },
                ]}
                isOpen={isCategoryModalOpen}
                onOpenChange={setCategoryModalOpen}
              />

              <Modal
                title="Nova Transação"
                triggerText="Nova Transação"
                triggerClassName="flex items-center justify-center rounded-sm bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                inputs={[
                  { label: 'Descrição', id: 'description' },
                  { label: 'Preço', id: 'price' },
                  { label: 'Categoria', id: 'category' },
                ]}
                buttons={[
                  {
                    label: 'Criar Transação',
                    onClick: (data) => createTransactionUpdated(data),
                  },
                ]}
                isOpen={isTransactionModalOpen}
                onOpenChange={setTransactionModalOpen}
              />

              <button
                className="flex h-full items-center justify-center rounded-sm bg-bodyColorTertiary p-3 text-sm font-semibold text-white"
                onClick={signOut}
              >
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
          placeholder="Busque transações por uma categoria"
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
            {fieldsTransaction?.transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="cursor-pointer rounded-lg bg-bodyColorTertiary"
                onClick={() => setSelectedTransaction(transaction)}
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
          {fieldsTransaction?.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="w-full cursor-pointer rounded-lg border p-4"
              onClick={() => setSelectedTransaction(transaction)}
            >
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

      {selectedTransaction && (
        <Modal
          title="Alterar ou Excluir Transação"
          triggerText="Alterar ou Excluir Transação"
          triggerClassName="hidden"
          inputs={[
            {
              label: 'Descrição',
              id: 'description',
              defaultValue: selectedTransaction.description,
            },
            {
              label: 'Preço',
              id: 'price',
              defaultValue: String(selectedTransaction.amount),
            },
            {
              label: 'Categoria',
              id: 'category',
              defaultValue: selectedTransaction.categoryId,
            },
          ]}
          buttons={[
            {
              label: 'Alterar Transação',
              onClick: (data) =>
                updateTransactionUpdated({
                  ...data,
                  id: selectedTransaction.id,
                }),
              className: 'blue',
            },
            {
              label: 'Excluir Transação',
              onClick: () => {
                deleteTransactionUpdated(selectedTransaction.id)
                setSelectedTransaction(null)
              },
              className: 'red',
            },
          ]}
          isOpen={!!selectedTransaction}
          onOpenChange={(open) => {
            if (!open) setSelectedTransaction(null)
          }}
        />
      )}
    </div>
  )
}
