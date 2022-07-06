const API_SIGNIN_PATH = 'signin';
const API_UPLOAD_FILE_PATH = 'deviceapi/upload_ota_bin';
const API_DEVICE_INFO_LOAD_PATH = 'api/device_info_load';
const API_SET_BROKER_REQUEST_PATH = 'api/set_broker_request';
const API_ANALYSIS_TEMPERATURE_PATH = 'api/analysis/temperature';
const API_GET_CURRENT_USER_PATH = 'api/currentUser';
const API_GET_FILE_LIST_PATH = 'api/file_list';
const API_DELETE_OTA_FILES_PATH = 'api/delete_ota_files';
const API_SET_OTA_STATUS_PATH = 'api/set_ota_status';
const API_SEND_CUSTOM_BROKER_REQUEST_PATH = 'api/send_custom_broker_request';
const API_GET_DEVICE_LIST_PATH = 'api/device_list';

const API_OTA_FIELDS_PATH = 'deviceapi/fields';

export const API_URL = process.env.UMI_APP_API_URL || 'http://localhost:3001';
export const API_SIGNIN_URL = `${API_URL}/${API_SIGNIN_PATH}`;
export const API_UPLOAD_FILE_URL = `${API_URL}/${API_UPLOAD_FILE_PATH}`;
export const API_DEVICE_INFO_LOAD_URL = `${API_URL}/${API_DEVICE_INFO_LOAD_PATH}`;
export const API_SET_BROKER_REQUEST_URL = `${API_URL}/${API_SET_BROKER_REQUEST_PATH}`;
export const API_ANALYSIS_TEMPERATURE_URL = `${API_URL}/${API_ANALYSIS_TEMPERATURE_PATH}`;
export const API_GET_CURRENT_USER_URL = `${API_URL}/${API_GET_CURRENT_USER_PATH}`;

export const API_OTA_FIELDS_URL = `${API_URL}/${API_OTA_FIELDS_PATH}`;

export const API_GET_FILE_LIST_URL = `${API_URL}/${API_GET_FILE_LIST_PATH}`;
export const API_DELETE_OTA_FILES_URL = `${API_URL}/${API_DELETE_OTA_FILES_PATH}`;
export const API_SET_OTA_STATUS_URL = `${API_URL}/${API_SET_OTA_STATUS_PATH}`;
export const API_SEND_CUSTOM_BROKER_REQUEST_URL = `${API_URL}/${API_SEND_CUSTOM_BROKER_REQUEST_PATH}`;
export const API_GET_DEVICE_LIST_URL = `${API_URL}/${API_GET_DEVICE_LIST_PATH}`;
// export * from './db'
