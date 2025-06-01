import React, { Suspense } from "react";
import useAuth from "../../hooks/useAuth";
import JobLists from "./JobLists";
import useJobApi from "../../api/useJobApi";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const { jobsCreatedByPromise } = useJobApi();

  return (
    <div>
      <h2>My posted Jobs: </h2>
      <Suspense>
        <JobLists
          jobsCreatedByPromise={jobsCreatedByPromise(user.email)}
        ></JobLists>
      </Suspense>
    </div>
  );
};

export default MyPostedJobs;
