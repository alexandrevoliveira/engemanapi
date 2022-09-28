import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class PgUser {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ nullable: true })
    name?: string

  @Column()
    email!: string

  @Column({ nullable: true })
    password?: string

  @Column({ name: 'is_admin', default: false })
    isAdmin!: string

  @Column({ name: 'facebook_id', nullable: true })
    facebookId?: string

  @Column({ name: 'picture_url', nullable: true })
    pictureUrl?: string

  @Column({ nullable: true })
    initials?: string
}
