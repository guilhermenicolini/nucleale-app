import { LocalStorageAdapter } from '@/infra/cache'
import 'jest-localstorage-mock'
import faker from 'faker'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocaStorage Adapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should set item with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<{}>()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should remove item if value is null', () => {
    const sut = makeSut()
    const key = faker.database.column()
    sut.set(key, null)
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, key)
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(2, key)
  })

  test('Should get item with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<{}>()

    const spy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const item = sut.get(key)

    expect(item).toEqual(value)
    expect(spy).toHaveBeenCalledWith(key)
  })
})
