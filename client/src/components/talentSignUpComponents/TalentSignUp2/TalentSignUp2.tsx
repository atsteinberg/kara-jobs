import React, { useState } from 'react';
import styles from './TalentSignUp2.module.scss';

interface TalentSignUp2Props {
  talentHandler: (obj: unknown) => void;
  progressHandler: (num: number) => void;
}

const TalentSignUp2: React.FC<TalentSignUp2Props> = ({
  talentHandler,
  progressHandler,
}: TalentSignUp2Props) => {
  const [info, setInfo] = useState({ occupationId: '' });

  const talent = JSON.parse(sessionStorage.getItem('talent') as string);
  console.log(talent);

  // const handleOptionChange = (identifier: string): void => {
  //   setInfo({ occupationId: identifier });
  // };

  // const handleSubmit = () => {
  //   talentHandler(info);
  //   info.occupationId === 'opt4' ? progressHandler(4) : progressHandler(3);
  // };

  return (
    <div>hi there</div>
    // <div className={styles.TalentSignUp2}>
    //   <p>Welchen Job machst du derzeit?</p>
    //   <form onSubmit={handleSubmit}>
    //     <div className="radio">
    //       <label>
    //         <input
    //           type="radio"
    //           value="opt1"
    //           checked={info.occupationId === 'opt1'}
    //           onChange={() => handleOptionChange('opt1')}
    //         />
    //         Krankenpfleger
    //       </label>
    //     </div>
    //     <div className="radio">
    //       <label>
    //         <input
    //           type="radio"
    //           value="opt2"
    //           checked={info.occupationId === 'opt2'}
    //           onChange={() => handleOptionChange('opt2')}
    //         />
    //         Arzt
    //       </label>
    //     </div>
    //     <div className="radio">
    //       <label>
    //         <input
    //           type="radio"
    //           value="opt3"
    //           checked={info.occupationId === 'opt3'}
    //           onChange={() => handleOptionChange('opt3')}
    //         />
    //         Sonstiges med Personal
    //       </label>
    //     </div>
    //     <div className="radio">
    //       <label>
    //         <input
    //           type="radio"
    //           value="opt4"
    //           checked={info.occupationId === 'opt4'}
    //           onChange={() => handleOptionChange('opt4')}
    //         />
    //         Ich studiere noch
    //       </label>
    //     </div>
    //     <button>Weiter</button>
    //   </form>
    // </div>
  );
};

export default TalentSignUp2;
