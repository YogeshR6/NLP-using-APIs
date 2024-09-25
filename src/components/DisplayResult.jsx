import React from 'react'

function DisplayResult({ data }) {
  if (!data || !data.data) return null;

  const renderContent = () => {
    switch (data.type) {
      case 'entities':
        return renderEntities();
      case 'topics':
        return renderTopics();
      case 'words':
        return renderWords();
      case 'phrases':
        return renderPhrases();
      case 'relations':
        return renderRelations();
      case 'entailments':
        return renderEntailments();
      case 'senses':
        return renderSenses();
      case 'spelling':
        return renderSpelling();
      default:
        return <p>Select an analysis type and analyze text to see results.</p>;
    }
  };

  const renderEntities = () => (
    <div className="entities bg-white text-black flex flex-col justify-end items-center my-2">
      <h3 className='bold text-2xl'>Entities</h3>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.data.entities.map((entity) => (
          <div key={entity.id} className="relative p-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
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
    </div>
  );

  const renderTopics = () => (
    <div className="topics bg-white text-black flex flex-col justify-end items-center my-2">
      <h3 className='bold text-2xl'>Topics</h3>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.data.topics.map((topic, index) => (
          <div key={index} className="relative p-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {topic.label}
            </h5>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Score: {topic.score.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWords = () => (
    <div className="words bg-white text-black flex flex-col justify-end items-center my-2">
      <h3 className='bold text-2xl'>Words</h3>
      <hr />
      {data.data.sentences.map((sentence, sentenceIndex) => (
        <div key={sentenceIndex} className="sentence mb-4 w-full">
          <h4 className="text-lg font-semibold">Sentence {sentenceIndex + 1}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {sentence.words.map((word, wordIndex) => (
              <div key={wordIndex} className="relative p-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {word.token}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  Part of Speech: {word.partOfSpeech}
                </p>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  Lemma: {word.lemma}
                </p>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  Position: {word.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPhrases = () => (
    <div className="phrases bg-white text-black flex flex-col justify-end items-center my-2">
      <h3 className='bold text-2xl'>Noun Phrases</h3>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.data.nounPhrases.map((phrase, index) => (
          <div key={index} className="relative p-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Phrase {index + 1}
            </h5>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              {phrase.wordPositions.map(pos => data.data.sentences
                .flatMap(sentence => sentence.words)
                .find(word => word.position === pos)?.token)
                .join(' ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRelations = () => {
    const getWordsByPositions = (positions) => {
      return positions.map(pos =>
        data.data.sentences
          .flatMap(sentence => sentence.words)
          .find(word => word.position === pos)?.token
      ).join(' ');
    };

    return (
      <div className="relations bg-white text-black flex flex-col justify-end items-center my-2">
        <h3 className='bold text-2xl'>Relations</h3>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {data.data.relations.map((relation, index) => (
            <div key={index} className="relative p-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Relation {index + 1}
              </h5>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Words: {getWordsByPositions(relation.wordPositions)}
              </p>
              {relation.params.map((param, paramIndex) => (
                <p key={paramIndex} className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {param.relation}: {getWordsByPositions(param.wordPositions)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEntailments = () => (
    <div className="entailments bg-white text-black flex flex-col justify-end items-center my-2">
      <h3 className='bold text-2xl'>Entailments</h3>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.data.entailments.map((entailment, index) => (
          <div key={index} className="relative p-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {entailment.entailedWords.join(' ')}
            </h5>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              Score: {entailment.score.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSenses = () => (
    <div className="senses bg-white text-black flex flex-col justify-end items-center my-2">
      <h3 className='bold text-2xl'>Word Senses</h3>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.data.sentences.flatMap(sentence =>
          sentence.words.filter(word => word.senses && word.senses.length > 0).map((word, index) => (
            <div key={index} className="relative p-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {word.token} ({word.partOfSpeech})
              </h5>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lemma: {word.lemma}
              </p>
              <ul className="list-disc pl-5">
                {word.senses.map((sense, senseIndex) => (
                  <li key={senseIndex} className="block font-sans text-sm font-light leading-relaxed text-inherit antialiased">
                    {sense.synset} (Score: {sense.score.toFixed(4)})
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderSpelling = () => (
    <div className="spelling bg-white text-black flex flex-col justify-end items-center my-2">
      <h3 className='bold text-2xl'>Spelling Suggestions</h3>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.data.sentences.flatMap(sentence =>
          sentence.words.filter(word => word.spellingSuggestions && word.spellingSuggestions.length > 0).map((word, index) => (
            <div key={index} className="relative p-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {word.token}
              </h5>
              <ul className="list-disc pl-5">
                {word.spellingSuggestions.map((suggestion, suggestionIndex) => (
                  <li key={suggestionIndex} className="block font-sans text-sm font-light leading-relaxed text-inherit antialiased">
                    {suggestion.suggestion} (Score: {suggestion.score.toFixed(4)})
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      <h2 className='bold text-4xl p-2'>Analysis Results</h2>
      {renderContent()}
    </>
  )
}

export default DisplayResult