import '~/style/modal.css'

import * as Dialog from '@radix-ui/react-dialog'
import React, { useEffect, useState } from 'react'

import ICategory from '~/interfaces/Icategory'
import { listCategories } from '~/services/functions/category'

interface FormData {
  [key: string]: string
}

interface IModalProps {
  title: string
  triggerText: string
  triggerClassName: string
  inputs: { label: string; id: string; defaultValue?: string }[]
  buttons: { label: string; onClick: (data: any) => void; className?: string }[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const Modal: React.FC<IModalProps> = ({
  title,
  triggerText,
  triggerClassName,
  inputs,
  buttons,
  isOpen,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<FormData>({})
  const [categories, setCategories] = useState<ICategory[]>([])

  const fetchCategories = async () => {
    const categories = await listCategories()
    setCategories(categories)
  }

  useEffect(() => {
    if (
      (title === 'Nova Transação' ||
        title === 'Alterar ou Excluir Transação') &&
      isOpen
    ) {
      fetchCategories()
    }
  }, [title, isOpen])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = (onClick: (data: any) => void) => {
    onClick(formData)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button className={triggerClassName}>{triggerText}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent flex w-full flex-col gap-4 rounded-lg bg-secondary p-5 lg:p-8">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          {inputs.map((input) => (
            <fieldset className="Fieldset" key={input.id}>
              <label className="Label" htmlFor={input.id}>
                {input.label}
              </label>
              {input.id === 'category' ? (
                <select
                  id={input.id}
                  className="Select"
                  onChange={handleChange}
                >
                  <option value="">Selecione a Categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="Input"
                  id={input.id}
                  defaultValue={input.defaultValue}
                  onChange={handleChange}
                />
              )}
            </fieldset>
          ))}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`Button ${button.className || 'blue'}`}
                onClick={() => handleSubmit(button.onClick)}
              >
                {button.label}
              </button>
            ))}
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
