import React, { useState, useEffect } from 'react';
import styles from './TalentSignUp0.module.scss';
import BlueWrapper from '../../../containers/BlueWrapper';
import TextInput from '../../TextInput';
import Button from '../../Button';
import Form from '../../Form';
import logo from '../../../assets/logos/kara_lightblue.png';
import { useHistory } from 'react-router-dom';

const TalentSignUp0: React.FC = () => {
  const history = useHistory();
  const [info, setInfo] = useState({ firstName: '', lastName: '' });

  const talent = JSON.parse(sessionStorage.getItem('talent') as string);

  useEffect(() => {
    const firstName = document.getElementById('firstName') as HTMLInputElement;
    const lastName = document.getElementById('lastName') as HTMLInputElement;
    if (talent) {
      if (talent.firstName !== undefined) firstName.value = talent.firstName;
      if (talent.lastName !== undefined) lastName.value = talent.lastName;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'firstName') {
      setInfo({ firstName: e.target.value, lastName: info.lastName });
    } else if (e.target.id === 'lastName') {
      setInfo({ firstName: info.firstName, lastName: e.target.value });
    }
  };

  const updateSession = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    sessionStorage.setItem(
      'talent',
      JSON.stringify(Object.assign(talent, { [e.target.id]: e.target.value })),
    );
  };

  // const postToDB = (talentObj: any) => {
  //   console.log(talentObj);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const talentObj = {
      ...talent,
      ...info,
      onboarding_page: 1,
    };
    sessionStorage.setItem('talent', JSON.stringify(talentObj));
    // post to DB: only post relevant data of this page
    //postToDB(talentObj);
    history.push('/talent-signup-1');
  };

  return (
    <BlueWrapper>
      <div className={styles.TalentSignUp0}>
        <div className={styles.FormHeader}>
          <img src={logo} className={styles.Logo} />
          <h3>In wenigen Schritten zu deinem Profil</h3>
        </div>
        <div className={styles.FormWrapper}>
          <Form onSubmit={handleSubmit} className={styles.Form}>
            <TextInput
              className={styles.TextInput}
              id="firstName"
              labelText="Vorname* "
              onChange={handleChange}
              onBlur={updateSession}
              data-testid="firstName"
              required={true}
            ></TextInput>
            <TextInput
              className={styles.TextInput}
              id="lastName"
              labelText="Nachname* "
              onChange={handleChange}
              onBlur={updateSession}
              data-testid="lastName"
              required={true}
            ></TextInput>
            <Button type="submit">Weiter</Button>
          </Form>
        </div>
      </div>
    </BlueWrapper>
  );
};

export default TalentSignUp0;
