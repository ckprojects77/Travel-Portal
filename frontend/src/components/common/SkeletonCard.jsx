export default function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-4 w-2/3 rounded-full" />
        <div className="skeleton h-3 w-1/2 rounded-full" />
        <div className="flex justify-between pt-2">
          <div className="skeleton h-3 w-1/4 rounded-full" />
          <div className="skeleton h-3 w-1/4 rounded-full" />
        </div>
      </div>
    </div>
  );
}
