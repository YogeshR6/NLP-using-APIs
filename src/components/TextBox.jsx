import { useState } from 'react'
import { analyzeText } from '../utils/analyzeText';

function TextBox({ setData, setNumberOfRequests }) {
  const [inputText, setInputText] = useState('');
  const [analysisType, setAnalysisType] = useState('entities');

  const handleAnalyze = async () => {
    try {
      const response = await analyzeText(inputText, analysisType);
      setData({ type: analysisType, data: response });
      console.log('Analysis results:', response);
      setNumberOfRequests(prev => prev + 1);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };

  return (
    <div className='flex flex-col justify-start items-start'>
      <h2 className='bold text-4xl p-2'>Text Analysis</h2>
      <div className="flex flex-col justify-start items-center">
        <textarea id="message" rows="5" cols="56" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-4" placeholder="Enter text here..." value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>
        <select className="mb-4 p-2 border rounded" value={analysisType} onChange={(e) => setAnalysisType(e.target.value)}>
          <option value="entities">Entities</option>
          <option value="topics">Topics</option>
          <option value="words">Words</option>
          <option value="phrases">Phrases</option>
          <option value="relations">Relations</option>
          <option value="entailments">Entailments</option>
          <option value="senses">Senses</option>
          <option value="spelling">Spelling</option>
        </select>
        <button onClick={handleAnalyze} className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true" type="submit"> Analyze </button>
      </div>
    </div>
  )
}

export default TextBox