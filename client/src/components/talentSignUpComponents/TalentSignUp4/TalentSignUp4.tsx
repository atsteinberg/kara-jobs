import React, { useState, useEffect } from 'react';
import styles from './TalentSignUp4.module.scss';
import Form from '../../Form';
import TextInput from '../../TextInput';
import Label from '../../Label';
import Option from '../../Option';
import Select from '../../Select';
import Button from '../../Button';
import BlueWrapper from '../../../containers/BlueWrapper';
import ProgressBar from '../../ProgressBar';
import logo from '../../../assets/logos/kara_lightblue.png';
import { useHistory } from 'react-router-dom';

const current = new Date().getFullYear();
const optArray = [current, current + 1, current + 2, current + 3];

const TalentSignUp4: React.FC = () => {
  const history = useHistory();
  const talent = JSON.parse(sessionStorage.getItem('talent') as string);

  const [info, setInfo] = useState({
    studyProgram: '',
    university: '',
    expectedGraduationYear: current,
  });

  useEffect(() => {
    const studyProgramHTML = document.getElementById(
      'studyProgram',
    ) as HTMLInputElement;
    const universityHTML = document.getElementById(
      'university',
    ) as HTMLInputElement;
    if (talent) {
      if (talent.studyProgram !== undefined)
        studyProgramHTML.value = talent.studyProgram;
      if (talent.university !== undefined)
        universityHTML.value = talent.university;
      if (
        talent.expectedGraduationYear !== undefined &&
        talent.expectedGraduationYear !== 0
      )
        setInfo({
          expectedGraduationYear: talent.expectedGraduationYear,
          studyProgram: talent.studyProgram,
          university: talent.university,
        });
    }
  }, []);

  const updateSession = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLSelectElement>,
  ) => {
    sessionStorage.setItem(
      'talent',
      JSON.stringify(
        Object.assign(talent, {
          [e.currentTarget.id]: e.currentTarget.value,
        }),
      ),
    );
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>,
  ) => {
    switch (e.currentTarget.id) {
      case 'studyProgram':
        setInfo({
          studyProgram: e.currentTarget.value,
          expectedGraduationYear: info.expectedGraduationYear,
          university: info.university,
        });
        break;
      case 'university':
        setInfo({
          studyProgram: info.studyProgram,
          expectedGraduationYear: info.expectedGraduationYear,
          university: e.currentTarget.value,
        });
        break;
      case 'expectedGraduationYear':
        setInfo({
          studyProgram: info.studyProgram,
          expectedGraduationYear: parseInt(e.currentTarget.value),
          university: info.university,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const talentObj = {
      ...talent,
      ...info,
      onboardingPage: 5,
    };
    sessionStorage.setItem('talent', JSON.stringify(talentObj));
    // post to DB (only relevant props from this page)
    history.push('/talent-signup-5');
  };

  return (
    <BlueWrapper>
      <div className={styles.TalentSignUp4}>
        <div className={styles.FormHeader}>
          <img src={logo} className={styles.Logo} />
          <ProgressBar profil={true} anerkennung={false} dokumente={false} />
        </div>
        <div className={styles.FormWrapper}>
          <div className={styles.InputWrapper}>
            <Form onSubmit={handleSubmit} id="education-form">
              <TextInput
                id="studyProgram"
                labelText="Studiengang*"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => updateSession(e)}
                required={true}
              ></TextInput>
              <TextInput
                id="university"
                labelText="Universität*"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => updateSession(e)}
                required={true}
              ></TextInput>
              <Label htmlFor="expectedGraduationYear">
                Erwartetes Abschlussjahr*
              </Label>
              <Select
                id="expectedGraduationYear"
                value={info.expectedGraduationYear}
                onChange={handleChange}
                onBlur={(e) => updateSession(e)}
                required
              >
                {optArray.map((opt) => (
                  <Option key={opt} value={opt}>
                    {opt}
                  </Option>
                ))}
              </Select>
            </Form>
          </div>
          <div
            onClick={() => history.push('/talent-signup-3')}
            className={styles.TextLink}
          >
            Ich arbeite bereits
          </div>
          <div className={styles.ButtonWrapper}>
            <Button onClick={() => history.push('/talent-signup-2')}>
              Zurück
            </Button>
            <Button type="submit" value="Submit" form="education-form">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </BlueWrapper>
  );
};

export default TalentSignUp4;
