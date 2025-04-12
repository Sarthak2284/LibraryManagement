import React , {lazy,Suspense} from 'react'
import Hero from '../components/Hero';
import BestSellers from '../components/BestSellers';
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/NewsLetter';

const LatestCollections = lazy(()=> import('../components/LatestCollections'));
const Home = () => {
    return (
        <div>
          <Hero />
          <Suspense fallback = {<div className='text-center py-8'>Loading.....</div>}>
            <LatestCollections />
          </Suspense>
          <BestSellers />
          <OurPolicy />
          <Newsletter />
        </div>
      );
}

export default Home