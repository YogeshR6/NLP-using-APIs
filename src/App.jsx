import React, { useState } from 'react';
import TextBox from './components/TextBox';
import DisplayResult from './components/DisplayResult';
import BarChart from './components/BarChart';

const App = () => {
  const [data, setData] = useState(null);

  return (
    <>
      <h1 className='text-4xl w-full text-center p-2 border-b-2 border-solid border-black'>Enhancing Text Insights Through API-Driven Natural Language Processing</h1>
      <div className='flex flex-col justify-center items-center my-6 w-full'>
        <div className='flex flex-row items-start justify-evenly my-6 w-full'>
          <TextBox setData={setData} />
          {data && (<BarChart displayData={data} />)}
        </div>
        <DisplayResult data={data} />
      </div>
    </>
  );
};

export default App;