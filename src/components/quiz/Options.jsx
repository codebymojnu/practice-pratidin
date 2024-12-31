import Option from "./Option";
export default function Options() {
  const options = ["0", "-1", "1", "1"];
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <Option key={index} name={`answer${index + 1}`} option={option} />
      ))}
    </div>
  );
}
