export const Role = {
  ADMIN: 'ADMIN',
  SELLER: 'SELLER',
  BUYER: 'BUYER',
  WAREHOUSER: 'WAREHOUSER',
  ACCOUNTANT: 'ACCOUNTANT',
} as const

export type Role = (typeof Role)[keyof typeof Role]
