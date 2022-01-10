import {Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn} from "typeorm";
import Like from "./Like";
import TimestampedEntity from "./TimestampedEntity";
import { User } from "./User";
import {BelongToUser} from "../BelongToUser";

@Entity()
export default class Post extends TimestampedEntity implements BelongToUser {
 
  @Column()
  title: String

  @Column()
  content: String
  
  @ManyToOne(() => User, user => user.posts, { eager: true })
  author: User

  @OneToMany(() => Like, like => like.post)
  likes: Like[]

  isOwnedBy(user: User) {
    return this.author.id === user.id
  }
}
