import { CreateClientDTO } from '#dtos/client'
import ClientRepositoryInMemory from '#repositories/in.memory/client'
import ClientUseCase from '#usecases/client'
import { test } from '@japa/runner'

let clientRepository: ClientRepositoryInMemory
let sut: ClientUseCase

test.group('Client use case', ({ each }) => {
  each.setup(() => {
    clientRepository = new ClientRepositoryInMemory()
    sut = new ClientUseCase(clientRepository)
  })

  test('should be able to create', async ({ assert }) => {
    const data: CreateClientDTO = {
      email: 'Y7LJm@example.com',
      name: 'John Doe',
      phone: '1234567890',
    }
    const result = await sut.create(data)
    assert.equal(result.email, data.email)
    assert.equal(result.name, data.name)
    assert.equal(result.phone, data.phone)
  })

  test('should not be able to create with same email or phone', async ({ assert }) => {
    const data: CreateClientDTO = {
      email: 'Y7LJm@example.com',
      name: 'John Doe',
      phone: '1234567890',
    }
    await sut.create(data)
    await assert.rejects(async () => await sut.create(data), 'Client already exists')
  })

  test('should be able filtered list by email or phone or name', async ({ assert }) => {
    await sut.create({
      email: 'john@example.com',
      name: 'John Doe',
      phone: '1234567899',
    })

    await sut.create({
      email: 'luca@example.com',
      name: 'Luca Doe',
      phone: '1234567890',
    })

    const getByEmail = await sut.list({ email: 'john@example.com' })
    assert.equal(getByEmail.length, 1)

    const getByName = await sut.list({ name: 'Doe' })
    assert.equal(getByName.length, 2)

    const getByPhone = await sut.list({ phone: '1234567890' })
    assert.equal(getByPhone.length, 1)
  })
})
