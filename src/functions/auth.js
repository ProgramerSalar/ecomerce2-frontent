import axios from "axios";

export const createorUpdateUser = async (authtoken) => {
  return await axios.post(
    `${"http://localhost:8000/api"}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${"http://localhost:8000/api"}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
