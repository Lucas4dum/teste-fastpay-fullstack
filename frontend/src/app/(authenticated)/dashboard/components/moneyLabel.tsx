import { Cn } from '~/util/Cn'

export const MoneyLabel = ({ value }: { value: number }) => {
  return (
    <span
      className={Cn('w-full items-center justify-start font-bold', {
        'text-red-500': value < 0,
        'text-blue-500': value >= 0,
      })}
    >
      {value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}
    </span>
  )
}
