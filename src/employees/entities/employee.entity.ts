import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()

export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeid: string;
    @Column('text')
    name: string;
    @Column('text')
    lastName: string;
    @Column('text')
    phoneNumber: string;
    @Column('text')
    email: string;
}
