import React from 'react'
import { Private, GridPage, Fab } from '@/presentation/components'
import { LoadMembers } from '@/domain/usecases'
import moment from 'moment-timezone'
import { AddIcon } from '@/presentation/components/icons'
import { useHistory } from 'react-router-dom'

type Props = {
  loadMembers: LoadMembers
}

export const Members: React.FC<Props> = ({ loadMembers }: Props) => {
  const history = useHistory()
  const loadAll = async (): Promise<any> => {
    return await loadMembers.loadAll().then(members => members.map(member => ({
      key: member.id,
      title: member.name,
      subtitle: moment.utc(member.birth).format('DD/MM/YYYY'),
      content: member.email
    })))
  }

  const add = (): void => {
    history.replace('/family/add')
  }

  return (
    <Private>
      <GridPage
        onLoad={loadAll} />
      <Fab name="add" onClick={add}>
        <AddIcon />
      </Fab >
    </Private>
  )
}
