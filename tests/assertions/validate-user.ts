import type { IUser } from '@interfaces/models'

export default (user: IUser): void => {
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('first_name')
    expect(user).toHaveProperty('last_name')
    expect(user).toHaveProperty('email_address')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('created_at')
    expect(user).toHaveProperty('updated_at')
}
