import { TriangleAlert } from "lucide-react";

export default function ErrorCard({ error }) {
  console.log(error);
  return (
    <div className="bg-red-900 text-red-300 p-4 rounded-lg mb-4 flex items-center gap-2">
      <TriangleAlert />
      <span className="text-sm">
        {Array.isArray(error) ? (
          <ul className="list-disc list-inside">
            {error.map((item, index) => (
              <li key={index}>
                {typeof item === "object" && item.msg ? item.msg : item}
              </li>
            ))}
          </ul>
        ) : (
          <span>{error}</span>
        )}
      </span>
    </div>
  );
}
