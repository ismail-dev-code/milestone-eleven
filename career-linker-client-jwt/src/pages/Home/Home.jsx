import React, { Suspense } from 'react';
import Banner from './Banner';
import HotJobs from './HotJobs';

const Home = () => {

    const jobsPromise = fetch('https://career-linker-server-hub.vercel.app/jobs').then(res => res.json())

    return (
        <div>
            <Banner></Banner>
            <Suspense fallback={'Loading hot jobs'}>
                <HotJobs jobsPromise={jobsPromise}></HotJobs>
            </Suspense>
        </div>
    );
};

export default Home;