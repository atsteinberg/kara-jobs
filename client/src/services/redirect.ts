// query DB (talent or employer route) : /talents/uid/signup
// if error: redirect to first page in onboarding and talentsignup container logic (save uid in session mgmt) //no post to DB yet
// if result !== null && onboarding_complete === false: do talent-signup container logic (set session storage and redirect to right page)
// if result !== null && onboarding_complete: redirect to profile view (pass talent object?)

//during onboarding:
//post to DB: /talents/uid/signup

interface incompleteTalent {
  id: string;
  onboardingPage: number;
  onboardingComplete: boolean;
  firstName?: string;
  lastName?: string;
  isoCode?: string;
  residence?: string;
  zipCode?: string;
  city?: string;
  occupationId?: string;
  positionName?: string;
  occupationStatusId?: string;
  employerName?: string;
  studyProgram?: string;
  university?: string;
  expectedGraduationYear?: number;
  approbationStartedFlag?: boolean;
  approbationFederalState?: string;
  approbationFeedbackFlag?: boolean;
  approbationStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface returnType {
  page: number;
  complete: boolean;
  type: string;
  wrongLogin: boolean;
}

const server_address = 'http://localhost:3001';

const setSessionStorage = (obj: incompleteTalent, kind: string) => {
  sessionStorage.setItem(kind, JSON.stringify(obj));
};

//if login:
//ask talent and then employee signup.
//if onboarding complete, redirect to login page
//else redirect to signup flow

const handleLogin = async (uid: string) => {
  const user = await fetch(`${server_address}/users/${uid}`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.message && json.message.includes('No employee with id')) {
        return {
          page: 0,
          complete: false,
          type: 'none',
          wrongLogin: true,
        };
      } else {
        const env = json.firstName ? 'talent' : 'employer';
        setSessionStorage(json, env);
        return {
          page: json.onboardingPage,
          complete: json.onboardingComplete,
          type: env,
          wrongLogin: false,
        };
      }
    });
  return user;
};

export const redirect = async (
  uid: string,
  kind: string,
): Promise<returnType> => {
  let status;
  if (kind === 'login') {
    status = await handleLogin(uid);
  } else {
    status = await fetch(`${server_address}/${kind}s/${uid}/signup`)
      .then((res) => res.json())
      .then((json) => {
        if (json.message && json.message.includes('No info of kind signup')) {
          setSessionStorage(
            { id: uid, onboardingPage: 0, onboardingComplete: false },
            kind,
          );
          return { page: 0, complete: false, type: kind, wrongLogin: false };
        } else {
          setSessionStorage(json, kind);
          return {
            page: json.onboardingPage,
            complete: json.onboardingComplete,
            type: kind,
            wrongLogin: false,
          };
        }
      });
  }
  return status;
};
