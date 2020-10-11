import React from 'react';
import styles from './TalentSignUp6.module.scss';

interface TalentSignUp6Props {
  talentHandler: (obj: unknown) => void;
  progressHandler: (num: number) => void;
}

const TalentSignUp6: React.FC<TalentSignUp6Props> = ({
  talentHandler,
  progressHandler,
}: TalentSignUp6Props) => {
  return <div className={styles.TalentSignUp6}>TalentSignUp6 works!</div>;
};

export default TalentSignUp6;