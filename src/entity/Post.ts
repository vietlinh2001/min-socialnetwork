import { Column, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import Like from "./Like";
import TimestampedEntity from "./TimestampedEntity";
import { User } from "./User";

@Entity()
export default class Post extends TimestampedEntity {
 
  @Column()
  title: String

  @Column()
  content: String
  
  @ManyToOne(() => User, user => user.posts)
  author: User

  @OneToMany(() => Like, like => like.post)
  likes: Like[]

  @UpdateDateColumn()
  updatedAt: Date
}
