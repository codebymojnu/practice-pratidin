export default function NextButton({ onNext, currentIndex, totalQ }) {
  return (
    <button
      onClick={onNext}
      className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
    >
      {currentIndex < totalQ - 1 ? "Next" : "Submit"}
    </button>
  );
}
