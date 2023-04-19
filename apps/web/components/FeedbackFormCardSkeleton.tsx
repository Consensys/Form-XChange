export const FeedbackFormCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full mx-auto p-4 bg-slate-100 rounded-lg shadow-lg max-w-2xl">
      <div className="flex flex-col gap-2">
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
