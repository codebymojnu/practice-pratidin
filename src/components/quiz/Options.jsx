import Option from "./Option";
export default function Options({ options = [] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <Option key={index} name={`answer${index + 1}`} option={option} />
      ))}
    </div>
  );
}
