import * as api from '../libs/api.js';
import { errors } from '../libs/error.js';
import { AsyncStorage } from 'react-native';

export const FILE_UPLOADED = 'FILE_UPLOADED';
export const FILE_REMOVED = 'FILE_REMOVED';

export const LOAD_JOBS = 'LOAD_JOBS';
export const LOAD_FAKE_ONE_JOB = 'LOAD_FAKE_ONE_JOB';
export const SET_CURRENT_CANDIDATE = 'SET_CURRENT_CANDIDATE';

export const CACHE_LOADED = 'CACHE_LOADED';
export const NO_CACHE = 'NO_CACHE';
export const PLACES_LOADED = 'PLACES_LOADED';
export const TAXONOMIES_LOADED = 'TAXONOMIES_LOADED';

export const ERROR = 'ERROR';
export const NO_ERROR = 'NO_ERROR';
export const LOGOUT = 'LOGOUT';
export const TO_START = 'TO_START';
export const IN_PROGRESS = 'IN_PROGRESS';
export const TO_NO_REG_SELECT_ROLE_SCREEN = 'TO_NO_REG_SELECT_ROLE_SCREEN';
export const TO_NO_REG_LOOKING_FOR_A_JOB_SCREEN = 'TO_NO_REG_LOOKING_FOR_A_JOB_SCREEN';
export const TO_NO_REG_RESULTS_SCREEN = 'TO_NO_REG_RESULTS_SCREEN';
export const TO_NO_REG_LOOKING_FOR_AN_EMPLOYEE_SCREEN = 'TO_NO_REG_LOOKING_FOR_AN_EMPLOYEE_SCREEN';

export const TO_SIGN_UP_START = 'TO_SIGN_UP_START';
export const TO_VERIFICATE_EMAIL_SCREEN = 'TO_VERIFICATE_EMAIL_SCREEN';
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const TO_MAIN_MENU = 'TO_MAIN_MENU';

export const TO_WORKER_COMPLETE_PROFILE_SCREEN = '_TO_WORKER_COMPLETE_PROFILE_SCREEN';

export const getAllJobs = access_token =>
  async dispatch => {
    const jobs = await api.getAllMyJobs(access_token);

    if (!jobs.data) {
      return dispatch(showError('loading_jobs_error', jobs.message));
    }

    return dispatch({ type: LOAD_JOBS, payload: jobs.data });
  };

export const removePDF = () =>
  async dispatch => {
    dispatch({type: FILE_REMOVED });
  };

export const loadPlaces = () =>
  async dispatch => {
    const places = await api.loadPlaces();

    if (!places.length || places.length < 1) {
      return dispatch(showError('loading_places_error', places.message));
    }

    return dispatch({ type: PLACES_LOADED, payload: places });
  };

export const loadTaxonomies = () =>
  async dispatch => {
    const taxonomies = await api.loadTaxonomies();

    if (taxonomies.skills && taxonomies.main) {
      return dispatch({ type: TAXONOMIES_LOADED, payload: taxonomies });
    }
    return dispatch(showError('loading_taxonomies_error', taxonomies.message));
  };

export const noRegWorkerSearch = query =>
  async dispatch => {
    if (!query?.zip_code?.length || query.zip_code.length === 0) {
      return dispatch(showError('enter_zip_code'));
    }

    const response = await api.workerDemoSearch(query);

    if (response.searches_like_yours === undefined || response.potential_jobs === undefined) {
      return dispatch(showError('search_error', response.message));
    }
    return dispatch({ type: TO_NO_REG_RESULTS_SCREEN, payload: {
      searches_like_yours: response.searches_like_yours,
      potential_jobs: response.potential_jobs,
      no_reg_role: 'worker'
    }});
  };

export const noRegHirerSearch = query =>
  async dispatch => {
    if (!query?.title?.length || query.title.length === 0) {
      return dispatch(showError('enter_title'));
    }

    if (!query?.description?.length || query.description.length === 0) {
      return dispatch(showError('enter_description'));
    }

    if (!query?.zip_code?.length || query.zip_code.length === 0) {
      return dispatch(showError('enter_zip_code'));
    }

    const response = await api.hirerDemoSearch(query);

    if (response.searches_like_yours === undefined || response.potential_employees === undefined) {
      return dispatch(showError('search_error', response.message));
    }

    return dispatch({ type: TO_NO_REG_RESULTS_SCREEN, payload: {
      searches_like_yours: response.searches_like_yours,
      potential_employees: response.potential_employees,
      no_reg_role: 'hirer'
    }});
  };

export const fileUploaded = pdf =>
  async dispatch => {
    dispatch({type: FILE_UPLOADED, payload: pdf });
  };

export const loadCache = () =>
  async dispatch => {
    await AsyncStorage.getItem('jobboard_11')
      .then(data => {
        if (data) {
          const lastState = JSON.parse(data);

          dispatch({type: CACHE_LOADED, payload: { cache: lastState }});
        } else {
          dispatch({type: NO_CACHE });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({type: NO_CACHE });
      });
  };

export const saveCache = (state) =>
  async () => AsyncStorage
    .setItem('jobboard_11', JSON.stringify(state))
    .catch(console.error);

export const showError = (errorType, trace) =>
  dispatch => dispatch({type: ERROR, payload: {
    error: errors[errorType],
    trace
  }});

export const dismissError = () =>
  dispatch => dispatch({ type: NO_ERROR });

export const inProgress = () =>
  dispatch => dispatch({ type: IN_PROGRESS });

export const toStart = (role) =>
  dispatch => dispatch({ type: TO_START, payload: role });

export const logout = () =>
  dispatch => dispatch({ type: LOGOUT });

export const toNoRegSelectRoleScreen = () =>
  dispatch => dispatch({ type: TO_NO_REG_SELECT_ROLE_SCREEN });

export const toNoRegLookingForAJobScreen = () =>
  dispatch => dispatch({ type: TO_NO_REG_LOOKING_FOR_A_JOB_SCREEN });

export const toNoRegLookingForAnEmployeeScreen = () =>
  dispatch => dispatch({ type: TO_NO_REG_LOOKING_FOR_AN_EMPLOYEE_SCREEN});

export const toNoRegResultsScreen = () =>
  dispatch => dispatch({ type: TO_NO_REG_RESULTS_SCREEN });

export const toWorkerCompleteProfileScreen = () =>
  dispatch => dispatch({ type: TO_WORKER_COMPLETE_PROFILE_SCREEN })

export const signUpStart = () =>
  dispatch => dispatch({ type: TO_SIGN_UP_START });

export const register = credentials =>
  async dispatch => {
    if (credentials.as === 'no') {
      return dispatch(showError('register-empty-role'));
    }

    if (!credentials.email || !credentials.password) {
      return dispatch(showError('register-empty-field'));
    }

    if (credentials.password.length < 8) {
      return dispatch(showError('register-short-password'));
    }

    if (credentials.password !== credentials.password_confirmation) {
      return dispatch(showError('register-different-passwords'));
    }

    const result = await api.register(credentials);

    if (result.message) {
      return dispatch(showError('register-general-error', result.message));
    }

    return dispatch({ type: TO_VERIFICATE_EMAIL_SCREEN });
  }

export const authorize = credentials =>
  async dispatch => {
    if (!credentials.email || !credentials.password) {
      return dispatch(showError('login-empty-field'));
    }

    const result = await api.authorize(credentials);

    if (result.error || result.errors) {
      return dispatch(showError('login-invalid_credentials'));
    }

    const profile = await api.getProfile(result.access_token);

    if (!profile.data) {
      return dispatch(showError('login-getprofile-failed', String(profile.message)));
    }

    return dispatch({ type: LOGIN_SUCCEED, payload: {
      access_token: result.access_token,
      expires_in: result.expires_in,
      refresh_token: result.refresh_token,
      token_type: result.token_type,
      profile: profile.data,
      remember: credentials.remember,
      e: credentials.remember ? credentials.email : '',
      p: credentials.remember ? credentials.password : ''
    } });
  };

export const updateProfile = (profile, access_token) =>
  async dispatch => {
    const updatedProfile = await api.updateProfile(profile, access_token);

    if (!updatedProfile.data) {
      return dispatch({ type: ERROR, payload: {
        error: errors['500'],
        trace: updatedProfile.message
      }});
    }

    return dispatch({ type: UPDATE_PROFILE, payload: updatedProfile.data });
  };

export const acceptOffer = (offer_id, accept, access_token) =>
  async dispatch => {
    const result = await api.acceptOffer(offer_id, accept, access_token);

    if (!result.data) {
      return dispatch({ type: ERROR, payload: {
        error: errors['not-implemented']
      }});
    }

    // return dispatch({ type: UPDATE_PROFILE, payload: updatedProfile.data });
  };

export const createJob = (search_query, access_token, callback) =>
  async dispatch => {
    const result = await api.createJob(search_query, access_token);

    if (!result.data) {
      return dispatch({ type: ERROR, payload: {
        error: errors['500']
      }});
    }

    const newJobs = await api.getAllMyJobs(access_token);

    if (!newJobs.data) {
      return dispatch(showError('loading_jobs_error', newJobs.message));
    }

    dispatch({ type: LOAD_JOBS, payload: newJobs.data });

    callback();
  };

export const loadCandidates = (job, access_token, callback) =>
  async dispatch => {
    const job_description = await api.getJobDescription(job, access_token);

    // const candidates = await api.getCandidates(job, access_token);

    if (job_description.data) {
      dispatch({ type: LOAD_FAKE_ONE_JOB, payload: job_description.data });
      callback();
    }
  };

export const setCurrentCandidate = (worker) =>
  async dispatch => {
    return dispatch({ type: SET_CURRENT_CANDIDATE, payload: worker });
  };
