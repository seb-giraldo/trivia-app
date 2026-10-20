// Shows one question, its four options, and the result once an option is picked.
export default function QuestionCard({ data, picked, hint, hintLoading, onPick, onRequestHint }) {
  const { question, options, answer, funFact } = data;

  return (
    <div className="card">
      <div className="question-header">
        <h2 className="question">{question}</h2>

        {!picked && (
          <button className="hint-button" disabled={hintLoading} onClick={onRequestHint}>
            {hintLoading ? "Thinking..." : "Hint"}
          </button>
        )}
      </div>

      <div className="options">
        {options.map((option) => {
          let className = "option";
          if (picked) {
            if (option === answer) className += " correct";
            else if (option === picked) className += " wrong";
          }

          return (
            <button key={option} className={className} disabled={Boolean(picked)} onClick={() => onPick(option)}>
              {option}
            </button>
          );
        })}
      </div>

      {!picked && hint && (
        <div className="hint-callout">
          <strong>Hint</strong>
          <div>{hint}</div>
        </div>
      )}

      {picked && (
        <>
          <p className="result">{picked === answer ? "Correct!" : `Nope — the answer was ${answer}.`}</p>
          {funFact && (
            <div className="fun-fact">
              <strong>Did you know?</strong>
              <div>{funFact}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
