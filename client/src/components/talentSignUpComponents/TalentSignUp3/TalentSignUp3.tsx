import React, { useState, useEffect } from 'react';
import styles from './TalentSignUp3.module.scss';
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
import dbService from '../../../services/dbService';

const optArray = ['Arbeitssuchend', 'Teilzeit', 'Vollzeit'];

const TalentSignUp3: React.FC = () => {
  const history = useHistory();
  const talent = JSON.parse(sessionStorage.getItem('talent') as string);

  const [info, setInfo] = useState({
    positionName: '',
    occupationStatusId: 1,
    employerName: '',
  });

  useEffect(() => {
    const positionNameHTML = document.getElementById(
      'positionName',
    ) as HTMLInputElement;
    const employerNameHTML = document.getElementById(
      'employerName',
    ) as HTMLInputElement;
    if (talent) {
      if (talent.positionName) positionNameHTML.value = talent.positionName;
      if (talent.employerName) employerNameHTML.value = talent.employerName;
      setInfo({
        occupationStatusId: talent.occupationStatusId
          ? talent.occupationStatusId
          : 1,
        positionName: positionNameHTML.value,
        employerName: employerNameHTML.value,
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
      case 'positionName':
        setInfo({
          positionName: e.currentTarget.value,
          occupationStatusId: info.occupationStatusId,
          employerName: info.employerName,
        });
        break;
      case 'occupationStatusId':
        setInfo({
          positionName: info.positionName,
          occupationStatusId: parseInt(e.currentTarget.value),
          employerName: info.employerName,
        });
        break;
      case 'employerName':
        setInfo({
          positionName: info.positionName,
          occupationStatusId: info.occupationStatusId,
          employerName: e.currentTarget.value,
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
    const talentForDB = {
      ...talentObj,
      TalentId: talentObj.id,
    };
    dbService
      .postToDB(`/talents/${talentObj.id}/signup`, talentForDB)
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
    history.push('/talent-signup-5');
  };

  return (
    <BlueWrapper>
      <div className={styles.TalentSignUp3}>
        <div className={styles.FormHeader}>
          <img src={logo} className={styles.Logo} />
          <ProgressBar profil={true} anerkennung={false} dokumente={false} />
        </div>
        <div className={styles.FormWrapper}>
          <div className={styles.InputWrapper}>
            <Form
              onSubmit={handleSubmit}
              id="position-form"
              className={styles.Form}
            >
              <div className={styles.InputContainer}>
                <TextInput
                  id="positionName"
                  labelText="Position*"
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => updateSession(e)}
                  required={true}
                ></TextInput>
              </div>
              <div className={styles.InputContainer}>
                <Label htmlFor="occupationStatusId">
                  Derzeitiges Beschäftigungsverhältnis*
                </Label>
                <Select
                  id="occupationStatusId"
                  value={info.occupationStatusId}
                  onChange={handleChange}
                  onBlur={(e) => updateSession(e)}
                  required
                >
                  {optArray.map((opt) => (
                    <Option key={opt} value={optArray.indexOf(opt)}>
                      {opt}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={styles.InputContainer}>
                <TextInput
                  id="employerName"
                  labelText="Letzter oder derzeitiger Arbeitgeber*"
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => updateSession(e)}
                  required={true}
                ></TextInput>
              </div>
            </Form>
          </div>
          <div
            onClick={() => history.push('/talent-signup-4')}
            className={styles.TextLink}
          >
            Ich studiere noch
          </div>
          <div className={styles.ButtonWrapper}>
            <Button onClick={() => history.push('/talent-signup-2')}>
              Zurück
            </Button>
            <Button type="submit" value="Submit" form="position-form">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </BlueWrapper>
  );
};

export default TalentSignUp3;
