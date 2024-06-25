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
  buttons: { label: string; onClick: (data: any) => void }[]
}

const Modal: React.FC<IModalProps> = ({
  title,
  triggerText,
  triggerClassName,
  inputs,
  buttons,
}) => {
  const [formData, setFormData] = useState<FormData>({})
  const [categories, setCategories] = useState<ICategory[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const fetchCategories = async () => {
    const categories = await listCategories()
    setCategories(categories)
  }

  useEffect(() => {
    if (title === 'Nova Transação' && isOpen) {
      fetchCategories()
    }
  }, [title, isOpen])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = () => {
    buttons[0].onClick(formData)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
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
            <button className="Button blue" onClick={handleSubmit}>
              {buttons[0].label}
            </button>
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
