import React from 'react'
import { Private, GridPage } from '@/presentation/components'
import { LoadChildrens } from '@/domain/usecases'
import moment from 'moment-timezone'

type Props = {
  loadChildrens: LoadChildrens
}

export const Childrens: React.FC<Props> = ({ loadChildrens }: Props) => {
  const now = moment.utc()
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

  return (
    <Private>
      <GridPage
        onLoad={loadAll} />
    </Private>
  )
}
