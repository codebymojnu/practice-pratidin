export default function QuizHeader({ title, description }) {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
}
