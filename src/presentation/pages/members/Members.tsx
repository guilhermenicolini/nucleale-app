import React from 'react'
import { Private, GridPage } from '@/presentation/components'
import { LoadMembers } from '@/domain/usecases'
import moment from 'moment-timezone'

type Props = {
  loadMembers: LoadMembers
}

export const Members: React.FC<Props> = ({ loadMembers }: Props) => {
  const loadAll = async (): Promise<any> => {
    return await loadMembers.loadAll().then(members => members.map(member => ({
      key: member.id,
      title: member.name,
      subtitle: moment.utc(member.birth).format('DD/MM/YYYY'),
      content: member.email
    })))
  }

  return (
    <Private>
      <GridPage
        title="Família"
        onLoad={loadAll} />
    </Private>
  )
}
