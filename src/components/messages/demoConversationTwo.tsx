const DemoConversationTwo = () => {
  return (
      <div className="mb-2 mt-4 w-full rounded bg-gray-200 dark:bg-gray-500 overflow-scroll max-h-screen">
        <div className=" grid grid-cols-1 rounded bg-pink-400 py-2 dark:bg-gray-500 overflow-auto">
          <div className="grid grid-cols-3 gap-4 overflow-scroll">
            <div className="col-start-1 col-end-3 ml-2 rounded border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
              <div className="px-2 py-2 text-left">
                Good morning, when will our next mobility support session be?
              </div>
            </div>
            <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
              <div className="px-2 py-2 text-left">
                Good morning! Our next session is scheduled for this coming
                Wednesday at 2 PM.
              </div>
            </div>

            <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
              <div className="px-2 py-2 text-left">
                Oh, thats great. I will make sure to be ready for it.
              </div>
            </div>
            <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
              <div className="px-2 py-2 text-left">
                Excellent, I will see you then. Is there anything specific you
                would like to work on during the session?
              </div>
            </div>
            <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
              <div className="px-2 py-2 text-left">
                Yes, I have been having trouble with my balance lately, so I
                would like to focus on exercises to improve that.
              </div>
            </div>

            <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
              <div className="px-2 py-2 text-left">
                All right, we can definitely work on balance exercises during
                our session. Is there anything else you need help with?
              </div>
            </div>
            <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
              <div className="px-2 py-2 text-left">
                No, that is it for now. Thank you.
              </div>
            </div>
            <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
              <div className="px-2 py-2 text-left">
                You are welcome. See you on Wednesday at 2 PM.
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DemoConversationTwo;
