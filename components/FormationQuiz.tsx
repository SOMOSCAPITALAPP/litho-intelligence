"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export function FormationQuiz({ moduleId, questions }: { moduleId: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0),
    [answers, questions]
  );
  const complete = Object.keys(answers).length === questions.length;

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="formation-quiz" id={`qcm-${moduleId}`}>
      <div className="formation-quiz-header">
        <div>
          <span className="mystic-kicker">QCM en ligne</span>
          <h3>Valider cette étape</h3>
        </div>
        {submitted ? (
          <span className={score === questions.length ? "quiz-score success" : "quiz-score"}>
            {score}/{questions.length}
          </span>
        ) : null}
      </div>

      <div className="quiz-question-list">
        {questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          const answered = typeof selected === "number";

          return (
            <fieldset className="quiz-question" key={question.question}>
              <legend>{question.question}</legend>
              <div className="quiz-options">
                {question.options.map((option, optionIndex) => {
                  const correct = submitted && optionIndex === question.answer;
                  const wrong = submitted && selected === optionIndex && selected !== question.answer;
                  return (
                    <button
                      className={correct ? "quiz-option correct" : wrong ? "quiz-option wrong" : selected === optionIndex ? "quiz-option active" : "quiz-option"}
                      key={option}
                      onClick={() => {
                        if (!submitted) setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
                      }}
                      type="button"
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {submitted && answered ? <p className="quiz-explanation">{question.explanation}</p> : null}
            </fieldset>
          );
        })}
      </div>

      <div className="card-actions">
        <button className="button gold-button" disabled={!complete} onClick={() => setSubmitted(true)} type="button">
          <CheckCircle2 size={16} />
          Corriger le QCM
        </button>
        <button className="button secondary" onClick={reset} type="button">
          <RotateCcw size={16} />
          Recommencer
        </button>
      </div>
    </div>
  );
}
