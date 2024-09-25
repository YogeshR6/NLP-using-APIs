import React from "react";
import { Chart } from "react-google-charts";
export default function BarChart({ displayData }) {
  if (!displayData || !displayData.data) {
    return null;
  }
  const renderChart = () => {
    switch (displayData.type) {
      case 'entities':
        return renderEntitiesChart();
      case 'topics':
        return renderTopicsChart();
      case 'words':
        return renderWordsChart();
      case 'phrases':
        return renderPhrasesChart();
      case 'relations':
        return renderRelationsChart();
      case 'entailments':
        return renderEntailmentsChart();
      case 'senses':
        return renderSensesChart();
      case 'spelling':
        return renderSpellingChart();
      default:
        return <p>No chart available for this analysis type.</p>;
    }
  };
  const renderEntitiesChart = () => {
    const data = [
      ["Entity", "Relevance Score", "Confidence Score"],
      ...displayData.data.entities.map((entity) => [
        entity.entityId,
        entity.relevanceScore,
        entity.confidenceScore,
      ]),
    ];
    const options = {
      chart: {
        title: "Entities Analysis",
        subtitle: "Relevance and Confidence Scores",
      },
    };
    return (
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };
  const renderTopicsChart = () => {
    const data = [
      ["Topic", "Score"],
      ...displayData.data.topics.map((topic) => [
        topic.label,
        topic.score,
      ]),
    ];
    const options = {
      chart: {
        title: "Topics Analysis",
        subtitle: "Topic Scores",
      },
    };
    return (
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };
  const renderWordsChart = () => {
    if (!displayData.data || !displayData.data.sentences) {
      return <p>No word data available.</p>;
    }

    const wordFrequency = displayData.data.sentences
      .flatMap(sentence => sentence.words)
      .reduce((acc, word) => {
        acc[word.token] = (acc[word.token] || 0) + 1;
        return acc;
      }, {});

    const data = [
      ["Word", "Frequency"],
      ...Object.entries(wordFrequency),
    ];

    const options = {
      chart: {
        title: "Word Frequency Analysis",
        subtitle: "Number of occurrences for each word",
      },
    };

    return (
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };
  const renderPhrasesChart = () => {
    if (!displayData.data || !displayData.data.nounPhrases) {
      return <p>No phrase data available.</p>;
    }

    const phraseFrequency = displayData.data.nounPhrases.reduce((acc, phrase) => {
      const phraseText = phrase.wordPositions.map(pos =>
        displayData.data.sentences
          .flatMap(sentence => sentence.words)
          .find(word => word.position === pos)?.token
      ).join(' ');
      acc[phraseText] = (acc[phraseText] || 0) + 1;
      return acc;
    }, {});

    const data = [
      ["Phrase", "Frequency"],
      ...Object.entries(phraseFrequency),
    ];

    const options = {
      chart: {
        title: "Noun Phrase Frequency Analysis",
        subtitle: "Number of occurrences for each noun phrase",
      },
    };

    return (
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };
  const renderRelationsChart = () => {
    if (!displayData.data || !displayData.data.relations) {
      return <p>No relation data available.</p>;
    }

    const getWordsByPositions = (positions) => {
      return positions.map(pos =>
        displayData.data.sentences
          .flatMap(sentence => sentence.words)
          .find(word => word.position === pos)?.token
      ).join(' ');
    };

    const relationTypes = displayData.data.relations.reduce((acc, relation) => {
      relation.params.forEach(param => {
        acc[param.relation] = (acc[param.relation] || 0) + 1;
      });
      return acc;
    }, {});

    const data = [
      ["Relation Type", "Frequency"],
      ...Object.entries(relationTypes),
    ];

    const options = {
      chart: {
        title: "Relation Types Frequency",
        subtitle: "Number of occurrences for each relation type",
      },
    };

    return (
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };
  const renderEntailmentsChart = () => {
    const data = [
      ["Entailment", "Score"],
      ...displayData.data.entailments.map((entailment) => [
        entailment.entailedWords.join(' '),
        entailment.score,
      ]),
    ];
    const options = {
      chart: {
        title: "Entailments Analysis",
        subtitle: "Score for each entailment",
      },
    };
    return (
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };
  const renderSensesChart = () => {
    if (!displayData.data || !displayData.data.sentences) {
      return <p>No sense data available.</p>;
    }

    const wordSenseCounts = displayData.data.sentences
      .flatMap(sentence => sentence.words)
      .filter(word => word.senses && word.senses.length > 0)
      .reduce((acc, word) => {
        acc[word.token] = word.senses.length;
        return acc;
      }, {});

    const data = [
      ["Word", "Number of Senses"],
      ...Object.entries(wordSenseCounts),
    ];

    const options = {
      chart: {
        title: "Word Senses Analysis",
        subtitle: "Number of senses for each word",
      },
    };

    return (
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };
  const renderSpellingChart = () => {
    if (!displayData.data || !displayData.data.sentences) {
      return <p>No spelling data available.</p>;
    }

    const spellingCounts = displayData.data.sentences
      .flatMap(sentence => sentence.words)
      .filter(word => word.spellingSuggestions && word.spellingSuggestions.length > 0)
      .reduce((acc, word) => {
        acc[word.token] = word.spellingSuggestions.length;
        return acc;
      }, {});

    const data = [
      ["Word", "Number of Suggestions"],
      ...Object.entries(spellingCounts),
    ];

    const options = {
      chart: {
        title: "Spelling Suggestions Analysis",
        subtitle: "Number of spelling suggestions for each word",
      },
    };

    return (
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };

  return (
    <div className='self-start w-3/5'>
      {renderChart()}
    </div>
  );
}