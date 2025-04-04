function Option({ option, optionIndex }) {
  return (
    <p key={option}>
      {optionIndex + 1}
      {")"} {option}
    </p>
  );
}

export default Option;
