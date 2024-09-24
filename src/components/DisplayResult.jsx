import React from 'react'

function DisplayResult({data}) {
  return (
    <>
    <h2 className='bold text-4xl p-2'>Analysis Results</h2>
    {data && (    
        <div className="entities bg-white text-black flex flex-col justify-end items-center my-2">
          <h3 className='bold text-2xl'>Entities</h3>
          <hr />
          {data.entities.map((entity) => (
            <div key={entity.id} className="relative p-4 mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {entity.entityId}
            </h5>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Confidence Score: {entity.confidenceScore.toFixed(2)}
            </p>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Relevance Score: {entity.relevanceScore.toFixed(2)}
            </p>
            <a className="!font-medium !text-blue-gray-900 !transition-colors hover:!text-pink-500" href={entity.wikiLink}>
              <button className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" data-ripple-dark="true" >More info</button>
            </a>
        </div>
          ))}
        </div>
      )}
    </>
  )
}

export default DisplayResult