import { Column, Entity, OneToMany } from "typeorm";
import Like from "./Like";
import Post from "./Post";
import TimestampedEntity from "./TimestampedEntity";

@Entity()
export class User extends TimestampedEntity {

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  name: string

  @OneToMany(() => Post, post => post.author)
  posts: Post[]

  @OneToMany(() => Like, like => like.creator)
  likes: Like[]
}
