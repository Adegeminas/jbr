import {
  FILE_UPLOADED,
  FILE_REMOVED,

  SET_CURRENT_CANDIDATE,

  LOAD_FAKE_JOBS,
  LOAD_JOBS,

  LOAD_FAKE_ONE_JOB,

  PLACES_LOADED,
  TAXONOMIES_LOADED,
  CACHE_LOADED,
  NO_CACHE,

  ERROR,
  NO_ERROR,

  LOGOUT,
  IN_PROGRESS,
  TO_START,

  TO_NO_REG_SELECT_ROLE_SCREEN,
  TO_NO_REG_LOOKING_FOR_A_JOB_SCREEN,
  TO_NO_REG_RESULTS_SCREEN,
  TO_NO_REG_LOOKING_FOR_AN_EMPLOYEE_SCREEN,

  TO_SIGN_UP_START,
  TO_VERIFICATE_EMAIL_SCREEN,
  LOGIN_SUCCEED,
  UPDATE_PROFILE,

  TO_MAIN_MENU,

  TO_WORKER_COMPLETE_PROFILE_SCREEN
} from '../actions/';

const initialDataState = {
  no_reg_role: 'worker',
  searches_like_yours: 0,
  potential_employees: 0,
  potential_jobs: 0,

  worker_intro_seen: false,
  hirer_intro_seen: false,

  currentScreen: 'LoginScreen',

  error: {
    type: null,
    message: null
  },
  trace: null,

  remember: false,
  e: '',
  p: '',
  access_token: null,
  expires_in: null,
  refresh_token: null,
  token_type: null,
  profile: null,

  jobs: [],
  currentJob: null,
  currentCandidates: [],
  currentCandidate: null,

  pdf: null,
  places: [],
  taxonomies: null
};

export function appState(state = initialDataState, action) {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.payload.error,
        trace: action.payload.trace || null
      };
    case NO_ERROR:
      return {
        ...state,
        error: initialDataState.error
      };

    case PLACES_LOADED:
      return {
        ...state,
        places: action.payload
      };

    case TAXONOMIES_LOADED:
      return {
        ...state,
        taxonomies: action.payload
      };

    case CACHE_LOADED:
      return action.payload.cache.remember ? {
        ...state,
        ...action.payload.cache
      } : {
        ...state,
        worker_intro_seen: action.payload.cache.worker_intro_seen,
        hirer_intro_seen: action.payload.cache.hirer_intro_seen,
        places: action.payload.cache.places,
        taxonomies: action.payload.cache.taxonomies
      };

    case NO_CACHE:
      return {
        ...state
      };

    case IN_PROGRESS:
      return {
        ...state,
        currentScreen: 'WorkInProgressScreen'
      };
    case TO_START:
      return {
        ...state,
        worker_intro_seen: action.payload === 'worker' ? true : state.worker_intro_seen,
        hirer_intro_seen: action.payload === 'hirer' ? true : state.hirer_intro_seen,
        currentScreen: action.payload === 'worker' ?
          (state.profile?.first_name ? 'WorkerMainMenuScreen' : 'WorkerUploadResumeScreen') :
          (state.profile?.first_name ? 'HirerMainMenuScreen' : 'HirerCompleteProfileScreen')
      };

    case LOGOUT:
      return {
        ...initialDataState,
        places: state.places,
        taxonomies: state.taxonomies,
        worker_intro_seen: state.worker_intro_seen,
        hirer_intro_seen: state.hirer_intro_seen
      };

    case TO_NO_REG_SELECT_ROLE_SCREEN:
      return {
        ...state,
        currentScreen: 'NoRegSelectRoleScreen'
      };
    case TO_NO_REG_LOOKING_FOR_A_JOB_SCREEN:
      return {
        ...state,
        currentScreen: 'NoRegLookingForAJobScreen'
      };
    case TO_NO_REG_LOOKING_FOR_AN_EMPLOYEE_SCREEN:
      return {
        ...state,
        currentScreen: 'NoRegLookingForAnEmployeeScreen'
      }
    case TO_NO_REG_RESULTS_SCREEN:
      if (!action.payload) {
        return {
          ...state,
          currentScreen: 'NoRegResultsScreen'
        };
      }

      return {
        ...state,
        currentScreen: 'NoRegResultsScreen',
        no_reg_role: action.payload.no_reg_role,
        searches_like_yours: action.payload.searches_like_yours,
        potential_employees: action.payload.potential_employees,
        potential_jobs: action.payload.potential_jobs
      };

    case TO_SIGN_UP_START:
      return {
        ...state,
        currentScreen: 'GetStartedScreen'
      };
    case TO_VERIFICATE_EMAIL_SCREEN:
      return {
        ...state,
        currentScreen: 'VerificateEmailScreen'
      };
    case LOGIN_SUCCEED:
      return {
        ...state,
        remember: action.payload.remember,
        e: action.payload.e,
        p: action.payload.p,
        access_token: action.payload.access_token,
        expires_in: action.payload.expires_in,
        refresh_token: action.payload.refresh_token,
        token_type: action.payload.token_type,
        profile: action.payload.profile,
        currentScreen: action.payload.profile.role === 'worker' ?
          (state.worker_intro_seen ?
            (action.payload?.profile?.first_name ? 'WorkerMainMenuScreen' : 'WorkerUploadResumeScreen') :
            ('WorkerWelcomeScreen')) :
          (state.hirer_intro_seen ?
            (action.payload?.profile?.first_name ? 'HirerMainMenuScreen' : 'HirerCompleteProfileScreen') :
            ('HirerWelcomeScreen'))
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        currentScreen: state.profile.role === 'worker' ? 'WorkerMainMenuScreen' : 'HirerMainMenuScreen',
        profile_completed: true
      };

    case TO_MAIN_MENU:
      return {
        ...state,
        currentScreen: state.profile.role === 'worker' ? 'WorkerMainMenuScreen' : 'HirerMainMenuScreen'
      };

    case TO_WORKER_COMPLETE_PROFILE_SCREEN:
      return {
        ...state,
        currentScreen: 'WorkerCompleteProfileScreen'
      };

    case LOAD_JOBS:
      return {
        ...state,
        jobs: action.payload
      };

    case LOAD_FAKE_JOBS:
      return {
        ...state,
        jobs: [ {
          title: 'Roofer needed',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. ',
          address_zipcode: '00901',
          address_state: 'IL',
          address_city: 'Adobe Creek',
          search_radius: 10,
          hourly_rate: [1, 100]
        }, {
          title: 'Surgeon needed',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
          address_zipcode: '00901',
          address_state: 'GA',
          address_city: 'Atlanta',
          search_radius: 15,
          hourly_rate: [100, 300]
        } ]
      };

    case SET_CURRENT_CANDIDATE:
      return {
        ...state,
        currentCandidate: action.payload
      };

    case LOAD_FAKE_ONE_JOB:
      return {
        ...state,
        currentJob: action.payload,
        currentCandidates: [ {
          first_name: 'David',
          last_name: 'Jonson',
          gender: 'male'
        }, {
          first_name: 'Mary',
          last_name: 'Kay',
          gender: 'female'
        }, {
          first_name: 'Markus',
          last_name: 'Cruber',
          gender: 'male'
        }, {
          first_name: 'Gurni',
          last_name: 'Gurnisson',
          gender: 'neutral'
        } ]
      };

    case FILE_UPLOADED:
      return {
        ...state,
        pdf: action.payload
      };

    case FILE_REMOVED:
      return {
        ...state,
        pdf: null
      };

    default:
      return state;
  }
}
