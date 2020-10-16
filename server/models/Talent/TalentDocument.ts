import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { Talent } from './Talent';

interface TalentDocumentAttributes {
  id: number;
  TalentId: string;
  type: string;
  talent: Talent;
}

type TalentDocumentCreationAttributes = Optional<
  TalentDocumentAttributes,
  'id'
>;

@Table
export class TalentDocument
  extends Model<
    TalentDocumentAttributes,
    TalentDocumentCreationAttributes
  >
  implements TalentDocumentAttributes {
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => Talent as typeof Model)
  @Column
  TalentId!: string;

  @AllowNull(false)
  @Column
  type!: string;

  @BelongsTo(() => Talent as typeof Model)
  talent!: Talent;
}
