export default function UserAvatar() {
  return (
    <div className="mt-auto flex items-center">
      <img
        src="./assets/avater.webp"
        alt="Mr Hasan"
        className="w-10 h-10 rounded-full mr-3 object-cover"
      />
      <span className="text-black font-semibold">Saad Hasan</span>
    </div>
  );
}
