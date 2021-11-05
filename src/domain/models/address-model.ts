export type AddressModel = {
  address: string
  number: string
  complement: string
  district: string
  city: string
  cityId: number
  state: string
  zip: string
  country: string
}

export const States = [
  {
    value: 'SP',
    label: 'São Paulo'
  }
]

export const Cities = [
  { value: 6175, label: 'Artur Nogueira' },
  { value: 6291, label: 'Campinas' },
  { value: 6357, label: 'Cosmópolis' },
  { value: 6511, label: 'Indaiatuba' },
  { value: 6595, label: 'Jaguariúna' },
  { value: 6831, label: 'Paulínia' },
  { value: 7017, label: "Santa Bárbara D'Oeste" },
  { value: 7107, label: 'São Paulo' },
  { value: 7149, label: 'Sumaré' },
  { value: 7225, label: 'Valinhos' },
  { value: 7237, label: 'Vinhedo' }
]
