import React from 'react';
import styles from './TalentSignUp5.module.scss';

interface TalentSignUp5Props {
	talentHandler: Function;
	progressHandler: Function
}


const TalentSignUp5: React.FC<TalentSignUp5Props> = ({ talentHandler, progressHandler }: TalentSignUp5Props) => {
  return <div className={styles.TalentSignUp5}>TalentSignUp5 works!</div>;
};

export default TalentSignUp5;
