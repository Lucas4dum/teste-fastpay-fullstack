import '~/style/modal.css'

import * as Dialog from '@radix-ui/react-dialog'
import React, { useEffect, useState } from 'react'

import { api } from '~/libs/axios'

interface Category {
  id: string
  name: string
}

interface ModalProps {
  title: string
  triggerText: string
  triggerClassName: string
  inputs: { label: string; id: string; defaultValue?: string }[]
  buttons: { label: string; onClick: (data: any) => void }[]
}

interface FormData {
  [key: string]: string
}

const Modal: React.FC<ModalProps> = ({
  title,
  triggerText,
  triggerClassName,
  inputs,
  buttons,
}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<FormData>({})

  useEffect(() => {
    if (title === 'Nova Transação') {
      fetchCategories()
    }
  }, [title])

  const fetchCategories = async () => {
    const token = sessionStorage.getItem('user-storage')
    if (token) {
      const parsedToken = JSON.parse(token)
      try {
        const response = await api.get('/category', {
          headers: {
            Authorization: `Bearer ${parsedToken.access_token}`,
          },
        })
        setCategories(response.data.categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
  }

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
    <Dialog.Root>
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
