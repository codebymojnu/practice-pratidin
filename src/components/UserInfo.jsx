import { useAuth } from "./../hooks/useAuth";
export default function UserInfo() {
  const { auth } = useAuth();
  return (
    <>
      {auth?.user && (
        <div className="text-center mb-12">
          <img
            src="./assets/avater.webp"
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
          />
          <p className="text-xl text-gray-600">Welcome</p>
          <h2 className="text-4xl font-bold text-gray-700 font-jaro">
            {auth?.user?.full_name}
          </h2>
        </div>
      )}
    </>
  );
}
