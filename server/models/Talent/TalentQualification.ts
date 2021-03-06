import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Talent } from './Talent';

@Table
export class TalentQualification extends Model<TalentQualification> {
  @ForeignKey(() => Talent as typeof Model)
  @Column
  TalentId!: string;

  @AllowNull(false)
  @Column
  institutionName!: string;

  @AllowNull(false)
  @Column
  degree!: string;

  @AllowNull(false)
  @Column
  fieldOfStudy!: string;

  @Column(DataType.DECIMAL(2, 0))
  studyStartMonth!: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(4, 0))
  studyStartYear!: number;

  @Column(DataType.DECIMAL(2, 0))
  studyEndMonth!: number;

  @Column(DataType.DECIMAL(4, 0))
  studyEndYear!: number;

  @Column(DataType.DECIMAL(4, 0))
  studyDescription!: string;

  @BelongsTo(() => Talent as typeof Model)
  talent!: Talent;
}
