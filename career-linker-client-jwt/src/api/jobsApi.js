export const jobsCreatedByPromise = (email, accessToken) => {
  return fetch(`https://career-linker-server-hub.vercel.app/jobs/applications?email=${email}`, {
    headers: {
        authorization: `Bearer ${accessToken}`
    },
  }).then((res) => res.json());
};
