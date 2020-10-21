import React, { useState, useEffect } from 'react';
import styles from './TalentSignUp6.module.scss';
import Form from '../../Form';
import RadioInputHorizontal from '../../RadioInputHorizontal';
import Button from '../../Button';
import { useHistory } from 'react-router-dom';
import Label from '../../Label';
import Select from '../../Select';
import Option from '../../Option';
import BlueWrapper from '../../../containers/BlueWrapper';
import ProgressBar from '../../ProgressBar';
import logo from '../../../assets/logos/kara_lightblue.png';
import { Talent } from '../../../types/talent';

const TalentSignUp6: React.FC = () => {
  const history = useHistory();
  const [info, setInfo] = useState({
    approbationStarted: false,
    approbationFederalState: '',
  });

  const talent = JSON.parse(
    sessionStorage.getItem('talent') as string,
  ) as Talent;

  const setDropdown = (flag: boolean) => {
    const dropdown = document.getElementById(
      'approbationFederalState',
    ) as HTMLInputElement;
    if (flag === true) {
      dropdown.removeAttribute('disabled');
    } else if (flag === false) {
      dropdown.setAttribute('disabled', 'true');
      setInfo({
        approbationStarted: flag,
        approbationFederalState: '',
      });
    }
  };

  useEffect(() => {
    if (talent && talent.approbations) {
      if (
        talent.approbations[0].approbationStarted &&
        talent.approbations[0].approbationFederalState
      ) {
        setInfo({
          approbationStarted: talent.approbations[0].approbationStarted,
          approbationFederalState:
            talent.approbations[0].approbationFederalState,
        });
      }
      if (talent.approbations[0].approbationStarted) setDropdown(true);
    }
  }, []);

  const updateSession = (
    e: React.FormEvent<HTMLSelectElement> | boolean,
  ): void => {
    if (!talent.approbations) {
      talent.approbations = [{ approbationStarted: false }];
    }
    if (typeof e === 'boolean') {
      sessionStorage.setItem(
        'talent',
        JSON.stringify({
          ...talent,
          approbations: [
            {
              ...talent.approbations[0],
              approbationStarted: e,
              approbationFederalState: info.approbationFederalState,
            },
          ],
        }),
      );
    } else {
      sessionStorage.setItem(
        'talent',
        JSON.stringify({
          ...talent,
          approbations: [
            {
              ...talent.approbations[0],
              approbationStarted: info.approbationStarted,
              approbationFederalState: e.currentTarget.value,
            },
          ],
        }),
      );
    }
  };

  const handleChange = (
    e: React.FormEvent<HTMLSelectElement> | boolean,
  ): void => {
    if (typeof e === 'boolean') {
      if (e === true) {
        setInfo({
          approbationStarted: e,
          approbationFederalState: info.approbationFederalState,
        });
      }
      setDropdown(e);
      updateSession(e);
    } else {
      setInfo({
        approbationStarted: info.approbationStarted,
        approbationFederalState: e.currentTarget.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const page = info.approbationStarted ? 7 : 8;
    if (!talent.approbations) {
      talent.approbations = [{ approbationStarted: false }];
    }
    const talentObj = {
      ...talent,
      approbations: [{ ...talent.approbations[0], ...info }],
      onboardingPage: page,
    };
    sessionStorage.setItem('talent', JSON.stringify(talentObj));
    info.approbationStarted
      ? history.push('/talent-signup-7')
      : history.push('/talent-signup-8');
  };

  const optArray = [
    '',
    'Nordrhein-Westfalen',
    'Niedersachen',
    'Bayern',
    'Rheinland-Pfalz',
    'Hessen',
    'Saarland',
    'Berlin',
    'Brandenburg',
    'Schleswig-Holstein',
    'Mecklenburg-Vorpommern',
    'Thüringen',
    'Sachsen',
    'Sachsen-Anhalt',
    'Bremen',
    'Baden-Württemberg',
    'Hamburg',
  ];

  return (
    <BlueWrapper>
      <div className={styles.TalentSignUp6}>
        <div className={styles.FormHeader}>
          <img src={logo} className={styles.Logo} />
          <ProgressBar profil={false} anerkennung={true} dokumente={false} />
        </div>
        <div className={styles.FormWrapper}>
          <Form onSubmit={handleSubmit} id="approbation-started-form">
            <div className={styles.Text}>
              Hast du schon Mal einen Antrag zur Anerkennung deiner Ausbildung
              bei einer deutschen Behörde eingereicht?*
            </div>
            <div className={styles.RadioContainer}>
              <div className={styles.ItemContainer}>
                <RadioInputHorizontal
                  labelText="Ja"
                  id="true"
                  name="true"
                  value="true"
                  checked={info.approbationStarted === true}
                  onChange={() => handleChange(true)}
                ></RadioInputHorizontal>
              </div>
              <div className={styles.ItemContainer}>
                <RadioInputHorizontal
                  labelText="Nein"
                  id="false"
                  name="false"
                  value="false"
                  checked={info.approbationStarted === false}
                  onChange={() => handleChange(false)}
                ></RadioInputHorizontal>
              </div>
            </div>
            <div className={styles.DropDownContainer}>
              <Label htmlFor="approbationFederalState">
                In welchem Bundesland?
              </Label>
              <Select
                id="approbationFederalState"
                value={info.approbationFederalState}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => updateSession(e)}
                disabled
              >
                {optArray.map((opt) => (
                  <Option key={opt} value={opt}>
                    {opt}
                  </Option>
                ))}
              </Select>
            </div>
          </Form>
          <div className={styles.ButtonWrapper}>
            <Button onClick={() => history.push('/talent-signup-5')}>
              Zurück
            </Button>
            <Button
              type="submit"
              value="Submit"
              form="approbation-started-form"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </BlueWrapper>
  );
};

export default TalentSignUp6;
