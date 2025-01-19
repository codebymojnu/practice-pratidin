import RenderContent from "../result/RenderContent";

export default function Option({
  name,
  option,
  isDisabled,
  isSelected,
  onSelect,
}) {
  return (
    <label
      className={`flex items-center space-x-3 py-3 px-4 rounded-md text-lg ${
        isSelected ? "bg-primary text-white" : "bg-primary/5"
      }`}
    >
      <input
        type="radio" // চেকবক্স পরিবর্তন করে রেডিও বাটন করা
        name={name}
        checked={isSelected} // চেকড অবস্থা
        disabled={isDisabled} // নিষ্ক্রিয় অবস্থা
        onChange={onSelect} // সিলেক্ট করা হ্যান্ডলিং
        className="form-radio text-buzzr-purple"
      />
      <span>
        <RenderContent content={option} />
      </span>
    </label>
  );
}
