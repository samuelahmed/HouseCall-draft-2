const DemoConversationTwo = () => {
  return (
    <div className="col-span-5">
      <div className="flex h-16 w-full items-center justify-around  ">
        <div className="text-center text-xl font-semibold">John Smith</div>
      </div>
      <div className=" rounded bg-white dark:bg-gray-500">
        {/* THIS DIV CONTROLS THE HEIGHT OF THE CHAT */}
        <div className=" grid max-h-70vh min-h-70vh grid-cols-1 overflow-scroll rounded bg-white py-2 dark:bg-gray-500">
          <div className="max-h-128 grid grid-cols-3 gap-4 overflow-scroll">
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
      {/* </div> */}

      {/* <DemoConversationTwo /> */}
    </div>
  );
};

export default DemoConversationTwo;
