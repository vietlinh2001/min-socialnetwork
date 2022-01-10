import {Column, Entity, ManyToOne} from "typeorm";
import Post from "./Post";
import TimestampedEntity from "./TimestampedEntity";
import { User } from "./User";
import {BelongToUser} from "../BelongToUser";

@Entity()
export default class Like extends TimestampedEntity implements BelongToUser {
    
  @ManyToOne(() => User, user => user.likes, { eager: true })
  creator: User

  @ManyToOne(() => Post, post => post.likes)
  post: Post

  @Column()
  postId: number

  isOwnedBy(user: User) {
    return this.creator.id === user.id
  }
}
