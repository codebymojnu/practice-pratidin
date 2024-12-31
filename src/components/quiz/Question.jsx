import NextButton from "./NextButton";
import Options from "./Options";

export default function Question() {
  return (
    <div className="bg-white p-6 !pb-2 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">
          3. What is the height of an empty binary tree?
        </h3>
      </div>
      <Options />
      <NextButton />
    </div>
  );
}
