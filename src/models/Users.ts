<<<<<<< HEAD:src/models/User.ts
import {
  Model,
  Column,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  Default,
  AllowNull,
  Max,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Max(128)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Max(328)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Max(128)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(true)
  @Column(DataType.UUID)
  authorizationToken?: string;

  @AllowNull(true)
  @Column(DataType.UUID)
  activationToken?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt?: Date;
}
=======
import {
  Model,
  Column,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  Default,
  AllowNull,
  Max,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Users extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Max(128)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Max(328)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Max(128)
  @Column(DataType.STRING)
  telegram!: string;

  @AllowNull(true)
  @Column(DataType.UUID)
  authorizationToken?: string;

  @AllowNull(true)
  @Column(DataType.UUID)
  activationToken?: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt?: Date;
}

>>>>>>> 855abf6 (something):src/models/Users.ts
