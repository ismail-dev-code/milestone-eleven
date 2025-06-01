export const myApplicationsPromise = (email, accessToken) => {
  return fetch(`https://career-linker-server-hub.vercel.app/applications?email=${email}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
