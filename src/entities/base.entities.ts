import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


export  class Base extends BaseEntity{
    @PrimaryGeneratedColumn({name:"id", type: "bigint"})
    id!: number;

    @CreateDateColumn({name:"created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Date;

    @CreateDateColumn({name:"updated_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt!: Date;

    @CreateDateColumn({name:"deleted_at", type: "timestamptz", nullable: true})
    deletedAt!: Date | null;

    @Column({name:"status", type: "boolean", default: true})   
    status!: boolean;
}