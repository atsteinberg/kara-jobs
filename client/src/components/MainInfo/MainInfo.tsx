import React, { useState, useEffect } from 'react';
import CancelSave from '../CancelSave';
import EditInfo from '../EditInfo';
import PicEdit from '../PicEdit';
import styles from './MainInfo.module.scss';
import { useFirebase } from 'react-redux-firebase';
import 'firebase/storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { Talent } from '../../types/talent';

interface MainInfoAttributes {
  firstName: string;
  lastName: string;
  profession: string;
  city: string;
  country: string;
}

const MainInfo: React.FC<MainInfoAttributes> = ({
  firstName,
  lastName,
  profession,
  city,
  country,
}: MainInfoAttributes) => {
  const firebase = useFirebase();
  const reduxTalent = useSelector<RootState>((state) => state.talent) as Talent;
  console.log(reduxTalent);
  const [showPicEdit, setShowPicEdit] = useState(false);
  const [showInfoEdit, setShowInfoEdit] = useState(false);
  const [info, setInfo] = useState({
    firstName,
    lastName,
    profession,
    city,
    country,
  });
  const [oldInfo, setOldInfo] = useState(info);

  const handleInfoClick = () => {
    setShowInfoEdit(true);
    setOldInfo(info);
  };

  const cancelInfoEdit = () => {
    setShowInfoEdit(false);
    setInfo(oldInfo);
  };

  const saveInfoEdit = () => {
    // TODO: implement actual save to db
    setShowInfoEdit(false);
  };

  const downloadImage = () => {
    const uid = reduxTalent.id;
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

  useEffect(() => {
    downloadImage();
  }, []);

  const handleChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) =>
    setInfo({ ...info, [type]: e.currentTarget.value });
  const nameComponent = showInfoEdit ? (
    <h1>
      <input
        type="text"
        value={info.firstName}
        onChange={(e) => handleChange('firstName', e)}
      ></input>
      <input
        type="text"
        value={info.lastName}
        onChange={(e) => handleChange('lastName', e)}
      ></input>
    </h1>
  ) : (
    <h1>
      {info.firstName} {info.lastName}
    </h1>
  );

  const professionComponent = showInfoEdit ? (
    <h2>
      <input
        type="text"
        value={info.profession}
        onChange={(e) => handleChange('profession', e)}
      ></input>
    </h2>
  ) : (
    <h2>{info.profession}</h2>
  );

  const addressComponent = showInfoEdit ? (
    <h2>
      <input
        type="text"
        value={info.city}
        onChange={(e) => handleChange('city', e)}
      ></input>
      <input
        type="text"
        value={info.country}
        onChange={(e) => handleChange('country', e)}
      ></input>
    </h2>
  ) : (
    <h2>
      {info.city}, {info.country}
    </h2>
  );

  const buttonComponent = showInfoEdit ? (
    <CancelSave onCancel={cancelInfoEdit} onSave={saveInfoEdit} />
  ) : (
    ''
  );

  return (
    <div className={styles.MainInfo}>
      <div className={styles.PicContainer}>
        <img src="" id="profile-picture" className={styles.ProfilePic}></img>
        <EditInfo onClick={() => setShowPicEdit(true)} />
      </div>
      <div className={styles.InfoText}>
        {nameComponent}
        <div className={styles.secondaryText}>
          {professionComponent}
          {addressComponent}
        </div>
        <div className={styles.ButtonContainer}>{buttonComponent}</div>
      </div>
      <EditInfo top="0" onClick={handleInfoClick} />
      {showPicEdit ? <PicEdit setShowPicEdit={setShowPicEdit} /> : ''}
    </div>
  );
};

export default MainInfo;
