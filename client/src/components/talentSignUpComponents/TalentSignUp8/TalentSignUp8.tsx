import React from 'react';
import styles from './TalentSignUp8.module.scss';

const TalentSignUp8: React.FC = () => {
  const talent = JSON.parse(sessionStorage.getItem('talent') as string);
  console.log(talent);
  return <div className={styles.TalentSignUp8}>TalentSignUp8 works!</div>;
};

//back button: redirect to page 6 (zurück zu Anerkennung)

export default TalentSignUp8;
