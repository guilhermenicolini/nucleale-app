import React from 'react'
import { Private } from '@/presentation/components'
import { ChildrenForm, SaveData } from './components/ChildrenForm'
import { Validation } from '@/presentation/protocols'
import { SaveChildren } from '@/domain/usecases'

type Props = {
  validation: Validation
  saveChildren: SaveChildren
}

export const AddChildren: React.FC<Props> = ({ validation, saveChildren }: Props) => {
  const onSave = async (data: SaveData): Promise<void> => {
    await saveChildren.save(data)
  }

  return (
    <Private>
      <ChildrenForm
        validation={validation}
        onSaveChildren={onSave} />
    </Private>
  )
}
