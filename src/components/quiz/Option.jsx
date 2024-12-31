export default function Option({ name, option }) {
  return (
    <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
      <input
        type="checkbox"
        name={name}
        className="form-radio text-buzzr-purple"
      />
      <span>{option}</span>
    </label>
  );
}
