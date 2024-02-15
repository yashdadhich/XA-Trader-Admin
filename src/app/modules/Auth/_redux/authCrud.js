import axios from "axios";

export const LOGIN_URL = "login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = "user/me";
export const UPDATE_PROFILE_URL = "update-profile";
export const CHANGE_PASSWORD_URL = "change-password";

export async function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

export function updateProfile(data) {
  return axios.patch(UPDATE_PROFILE_URL, data);
}

export function changePassword(oldPassword, newPassword) {
  return axios.patch(CHANGE_PASSWORD_URL, { oldPassword, newPassword });
}
