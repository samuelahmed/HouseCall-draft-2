const HistoryOverviewCard = () => {
  return (
    <>
      <div className="grid grid-cols-1">
        <div className="mb-2 flex flex-row flex-wrap justify-around gap-4 p-4  text-gray-800 dark:text-white">
          <p className="text-gray-900 dark:text-white">1/21/2023</p> 
          <p className="text-gray-900 dark:text-white">$170</p>
          <p className="text-gray-900 dark:text-white">1:00pm - 6:00pm</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            Companion Care
          </p>
        </div>
      </div>
    </>
  );
};

export default HistoryOverviewCard;
