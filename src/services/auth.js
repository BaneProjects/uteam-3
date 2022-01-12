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
