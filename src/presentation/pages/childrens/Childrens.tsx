import React from 'react'
import { Private, GridPage, Fab } from '@/presentation/components'
import { LoadChildrens } from '@/domain/usecases'
import { AddIcon } from '@/presentation/components/icons'
import moment from 'moment-timezone'
import { useHistory } from 'react-router-dom'

type Props = {
  loadChildrens: LoadChildrens
}

export const Childrens: React.FC<Props> = ({ loadChildrens }: Props) => {
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

  const add = (): void => {
    history.replace('/childrens/add')
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
