export default function TextField({
  label,
  type,
  id,
  register,
  error,
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        {...register(id)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error?.message}</p>}
    </div>
  );
}
