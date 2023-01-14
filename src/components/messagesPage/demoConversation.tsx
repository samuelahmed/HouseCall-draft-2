const DemoConversation = () => {
  return (
    <>
      <div className="flex h-16 w-full items-center justify-around rounded ">
        <div className="text-center text-xl font-semibold">Samuel Duval</div>
      </div>
      <div className="my-4 h-full w-11/12 overflow-scroll rounded bg-gray-200 dark:bg-slate-800">
        <div className="my-2 mx-2 h-full bg-white dark:bg-slate-900 rounded">
          <div className="mx-2 my-2 grid grid-cols-1 bg-white py-2 dark:bg-slate-900 rounded">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border-r border-b border-t border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-800">
                <div className="px-2 py-2 text-left">some text test</div>
              </div>
              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border-l border-b border-t border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-800">
                <div className="px-2 py-2 text-left">some text test</div>
              </div>
              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border-l border-b border-t border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-800">
                <div className="px-2 py-2 text-left">
                  some text test some text test some text test some text test
                  some text test some text test some text test some text test
                  some text test some text test some text test some text test
                  some text test
                </div>
              </div>
              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border-r border-b border-t border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-800">
                <div className="px-2 py-2 text-left">some text test</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoConversation;
