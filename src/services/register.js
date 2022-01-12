import createAxios from "./http";

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
