export const base64Regex = /^[A-Za-z0-9+/=]+$/;

export const emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+.-]*[A-Za-z0-9_+@-])@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/;
