import { Column, Entity, ManyToOne } from "typeorm";
import Post from "./Post";
import TimestampedEntity from "./TimestampedEntity";
import { User } from "./User";

@Entity()
export default class Like extends TimestampedEntity {
    
  @ManyToOne(() => User, user => user.likes, { eager: true })
  creator: User

  @ManyToOne(() => Post, post => post.likes)
  post: Post

}
