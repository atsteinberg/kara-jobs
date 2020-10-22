import React, { useEffect } from 'react';
import styles from './TalentSignUp5.module.scss';
import Form from '../../Form';
import Button from '../../Button';
import BlueWrapper from '../../../containers/BlueWrapper';
import ProgressBar from '../../ProgressBarTalent';
import logo from '../../../assets/logos/kara_gradient.png';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/reducers';
import { Talent } from '../../../types/talent';
import 'firebase/storage';

const TalentSignUp5: React.FC = () => {
  const history = useHistory();
  const talent = JSON.parse(
    sessionStorage.getItem('talent') as string,
  ) as Talent;

  let profession = '';
  if (talent.registrationExperience) {
    if (talent.registrationExperience.occupationId === 1) {
      profession = 'Krankenpfleger';
    } else if (talent.registrationExperience.occupationId === 2) {
      profession = 'Arzt';
    } else {
      profession = 'Medizinisches Personal';
    }
  } else {
    profession = 'Student';
  }

  //FILE MGMT
  const firebase = useFirebase();
  const auth: any = useSelector<RootState>((state) => state.firebase.auth);
  const uid = auth.uid as string;

  const downloadImage = () => {
    const storageRef = firebase
      .storage()
      .ref(`/talents/${uid}/images/profile-picture`);
    storageRef
      .getDownloadURL()
      .then(function (url) {
        if (url) {
          console.log(url);
          const img = document.getElementById(
            'profile-picture',
          ) as HTMLImageElement;
          if (img) img.src = url;
        }
      })
      .catch(function (e) {
        console.log('download error', e);
      });
  };

  function handleFiles(this: HTMLInputElement) {
    console.log('handling');
    const file = this.files ? this.files[0] : null;
    if (file) {
      const storageRef = firebase
        .storage()
        .ref(`/talents/${uid}/images/profile-picture`);
      const task = storageRef.put(file);
      task.on(
        'state_changed',
        function progress(snapshot) {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('uploading percentage: ' + percentage);
        },
        function error(err) {
          console.log('upload error', err);
        },
        function complete() {
          console.log('complete');
          downloadImage();
        },
      );
    }
  }

  async function setEventListener() {
    const input = (await document.getElementById('input')) as HTMLInputElement;
    input.addEventListener('change', handleFiles, false);
  }

  useEffect(() => {
    downloadImage();
    setEventListener();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const talentObj = {
      ...talent,
      onboardingPage: 6,
    };
    sessionStorage.setItem('talent', JSON.stringify(talentObj));
    history.push('/talent-signup-6');
  };

  const redirect = () => {
    if (talent.registrationQualification) {
      history.push('/talent-signup-4');
    } else {
      history.push('/talent-signup-3');
    }
  };

  return (
    <BlueWrapper>
      <div className={styles.TalentSignUp5}>
        <div className={styles.FormHeader}>
          <img src={logo} className={styles.Logo} />
          <ProgressBar profil={true} anerkennung={false} dokumente={false} />
        </div>
        <div className={styles.FormWrapper}>
          <div className={styles.Frame}>
            <img src="" id="profile-picture" className={styles.Picture}></img>
            <div className={styles.ProfileInfo}>
              <div className={styles.Info}>
                {talent.firstName + ' ' + talent.lastName}
              </div>
              <div className={styles.Info}>{profession}</div>
              <div className={styles.Info}>
                {talent.city + ', ' + talent.country}
              </div>
            </div>
          </div>
          <div className={styles.Text}>Profilbild hochladen (optional)</div>
          <div className={styles.InputWrapper}>
            <Form onSubmit={handleSubmit} id="picture-form">
              <input type="file" id="input" className={styles.Input}></input>
            </Form>
          </div>
          <div className={styles.ButtonWrapper}>
            <Button onClick={() => redirect()}>Zurück</Button>
            <Button type="submit" value="Submit" form="picture-form">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </BlueWrapper>
  );
};

export default TalentSignUp5;
