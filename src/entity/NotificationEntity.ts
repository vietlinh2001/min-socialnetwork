import {User} from "./User";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import TimestampedEntity from "./TimestampedEntity";

@Entity({
    name: "notification"
})
export default class NotificationEntity<Payload> extends TimestampedEntity {

    @ManyToOne(() => User, user => user.id, { eager: true })
    to: User

    @Column()
    type: string

    @Column({
        type: "json"
    })
    payload: Payload
}
