import { TalentActions } from '../actions/talentActions';
import { Talent } from '../../types/talent';

const initialState: Talent = {
  id: '',
  onboardingPage: 0,
  onboardingComplete: false,
  firstName: '',
  lastName: '',
  isoCode: '',
  country: '',
  zipCode: '',
  city: '',
  occupationId: 1,
  positionName: '',
  occupationStatusId: 1,
  employerName: '',
  studyProgram: '',
  university: '',
  expectedGraduationYear: new Date().getFullYear(),
  approbationStartedFlag: false,
  approbationFederalState: '',
  approbationFeedbackFlag: false,
  approbationStatus: '',
};

const TalentReducer = (
  state: Talent = initialState,
  action: TalentActions,
): Talent => {
  switch (action.type) {
    case 'ADD_TALENT':
      return Object.assign(state, action.payload);
    default:
      return state;
  }
};

export default TalentReducer;
