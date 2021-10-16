import React from 'react'
import { Private, GridPage, Fab } from '@/presentation/components'
import { DeleteChildren, LoadChildrens } from '@/domain/usecases'
import { AddIcon } from '@/presentation/components/icons'
import moment from 'moment-timezone'
import { useHistory } from 'react-router-dom'

type Props = {
  loadChildrens: LoadChildrens
  deleteChildren: DeleteChildren
}

export const Childrens: React.FC<Props> = ({ loadChildrens, deleteChildren }: Props) => {
  const now = moment.utc()
  const history = useHistory()

  const loadAll = async (): Promise<any> => {
    return await loadChildrens.loadAll().then(childrens => childrens.map(children => {
      const duration = moment.duration(now.diff(moment.utc(children.birth)))

      const age = []
      if (Math.floor(duration.asYears()) >= 1) {
        age.push(`${Math.floor(duration.asYears())} anos`)
      } else {
        age.push(`${Math.floor(duration.asMonths())} meses`)
      }

      return {
        key: children.id,
        title: children.name,
        subtitle: moment.utc(children.birth).format('DD/MM/YYYY'),
        content: age.join(' ').trim()
      }
    }))
  }

  const remove = async (id: string): Promise<void> => {
    return await deleteChildren.delete(id)
  }

  const add = (): void => {
    history.replace('/childrens/add')
  }

  return (
    <Private>
      <GridPage
        onLoad={loadAll}
        onDelete={remove} />
      <Fab name="add" onClick={add}>
        <AddIcon />
      </Fab >
    </Private>
  )
}
