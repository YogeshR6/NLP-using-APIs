import React, { useState } from 'react';
import TextBox from './components/TextBox';
import DisplayResult from './components/DisplayResult';
import BarChart from './components/BarChart';
const App = () => {
  const [data, setData] = useState(null);

  return (
        <>
        <h1 className='text-4xl w-full text-center p-2 border-b-2 border-solid border-black'>Enhancing Text Insights Through API-Driven Natural Language Processing</h1>
        <div className='flex flex-row justify-between m-4'>
        <div className='flex flex-col justify-start items-start m-6 gap-y-4'>
        <TextBox data={data} setData={setData} />
        <DisplayResult data={data} />
        </div>
        {data && (<BarChart displayData={data}/>)}
        </div>
        </>
  );
};

export default App;
