import { useState } from 'react'
import axios from 'axios';

function TextBox({ setData }) {
  const [inputText, setInputText] = useState('');
  const analyzeText = async () => {
    try {
      const response = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://api.textrazor.com/',
        `text=${encodeURIComponent(inputText)}&extractors=entities`,
        {
          headers: {
            'x-textrazor-key': import.meta.env.VITE_RAZOR_KEY,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setData(response.data.response);
      console.log('Analysis results:', response.data.response);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };
  return (
    <>
      <h2 className='bold text-4xl p-2'>Text Analysis</h2>
      <div className="flex flex-col justify-start items-center">
        <textarea id="message" rows="5" cols="56" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-4" placeholder="Enter text here..." value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>
        <button onClick={analyzeText} className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true" type="submit"> Analyze </button>
      </div>
    </>
  )
}

export default TextBox