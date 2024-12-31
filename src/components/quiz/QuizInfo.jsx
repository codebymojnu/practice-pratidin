import InfoBadge from "./InfoBadge";
export default function QuizInfo({ totalQuestion }) {
  return (
    <div className="flex flex-col">
      <InfoBadge
        bgColor="bg-green-100"
        textColor="text-green-800"
        text={`Total number of questions : ${totalQuestion}`}
      />
      <InfoBadge
        bgColor="bg-blue-100"
        textColor="text-blue-800"
        text="Participation : 1"
      />
      <InfoBadge
        bgColor="bg-gray-100"
        textColor="text-green-800"
        text="Remaining : 9"
      />
    </div>
  );
}
