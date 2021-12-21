import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('task')
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    content: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    owner: string;

}
