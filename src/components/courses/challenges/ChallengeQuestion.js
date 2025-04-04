import Option from "./Option";

function ChallengeQuestion({ question, index }) {
  return (
    <div className="p-4 rounded-lg space-y-6 text-[var(--text-color-secondary)] bg-[var(--background-secondary)]">
      <h2>
        Question {index + 1} :{" "}
        <span className="font-semibold">{question.text}</span>
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {question?.options.map((option, optionIndex) => (
          <Option option={option} optionIndex={optionIndex} key={option} />
        ))}
      </div>

      <p className="font-semibold">
        Correct Answer:&nbsp;
        <span className="text-green-600 ">{question.correctAnswer}</span>
      </p>
    </div>
  );
}

export default ChallengeQuestion;
