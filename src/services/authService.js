import instance from "../constants/axios";

const register = async (userData) => {
  try {
    const result = await instance.post("/users/register", userData);

    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const loginUser = async (userData) => {
  try {
    const result = await instance.post("/users/login", userData);

    console.log(result);
    localStorage.setItem("token", result.data.data.accessToken);

    return result;
  } catch (error) {
    return error;
  }
};

const getCurrentUser = async () => {
  try {
    const result = await instance.get("/users/current-user");
    return result;
  } catch (error) {
    return error;
  }
};
export { register, loginUser, getCurrentUser };
