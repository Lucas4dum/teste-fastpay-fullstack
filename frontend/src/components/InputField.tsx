import React from "react"

type InputFieldProps = {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#939393] lg:text-base" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="rounded-lg bg-input p-2 text-white"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

export default InputField
