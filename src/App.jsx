import React, { useState } from 'react';
import TextBox from './components/TextBox';
import DisplayResult from './components/DisplayResult';
import BarChart from './components/BarChart';

const App = () => {
  const [data, setData] = useState(null);
  const [numberOfRequests, setNumberOfRequests] = useState(0);
  return (
    <>
      <h1 className='text-4xl w-full text-center p-2 border-b-2 border-solid border-black'>Enhancing Text Insights Through API-Driven Natural Language Processing</h1>
      <div className='flex flex-col justify-center items-center my-6 w-full'>
        <div className='flex flex-row items-start justify-evenly my-6 w-full'>
          {numberOfRequests < 20 ? (<TextBox setData={setData} setNumberOfRequests={setNumberOfRequests} />) : (<p>You have reached the maximum number of requests for the day.</p>)}
          {data && (<BarChart displayData={data} />)}
        </div>
        <DisplayResult data={data} />
      </div>
    </>
  );
};

export default App;