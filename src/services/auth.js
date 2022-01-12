import createAxios from "./http";

export const login = async (email, password) => {
  try {
    const response = await createAxios.post("/api/auth/local", {
      identifier: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log("An error occurred:", error.response);
  }
};


export const register = async (user) => {
  try {
    const response = await createAxios.post("/api/auth/local/register", {
      username: user.name,
      email: user.email,
      password: user.password,
    });
    return response;
  } catch (error) {
    console.log("An error occurred:", error.response);
  }
};
