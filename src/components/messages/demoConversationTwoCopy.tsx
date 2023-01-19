const DemoConversationTwo = () => {
  return (
    <>
      <div className="col-span-5">
        <div className="flex h-16 w-full items-center justify-around  ">
          <div className="text-center text-xl font-semibold">Samuel Duval</div>
        </div>
        <div className=" rounded bg-white dark:bg-gray-500">
          {/* THIS DIV CONTROLS THE HEIGHT OF THE CHAT */}
          <div className=" grid max-h-70vh min-h-70vh grid-cols-1 overflow-scroll rounded bg-white py-2 dark:bg-gray-500">
            <div className=" grid grid-cols-3 gap-4 ">
              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
                <div className="px-2 py-2 text-left">
                  Hi, I just had a few questions about the nutrition care
                  session thats coming up.
                </div>
              </div>

              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
                <div className="px-2 py-2 text-left">
                  Of course, what would you like to know?
                </div>
              </div>
              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
                <div className="px-2 py-2 text-left">
                  What kind of things will we be discussing during the session?
                </div>
              </div>
              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
                <div className="px-2 py-2 text-left">
                  We will be discussing your dietary habits and any concerns you
                  may have about your nutrition. We will also make a plan to
                  improve your nutrition, such as increasing your intake of
                  fruits and vegetables, and making sure you are getting the
                  right amount of vitamins and minerals.
                </div>
              </div>

              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
                <div className="px-2 py-2 text-left">
                  Alright, that sounds good. And what should I do to prepare for
                  the session?
                </div>
              </div>
              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
                <div className="px-2 py-2 text-left">
                  You should come prepared with a list of any questions or
                  concerns you may have. It would also be helpful if you could
                  bring a list of the foods you typically eat in a day or week
                  so we can have a better idea of your dietary habits.
                </div>
              </div>
              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
                <div className="px-2 py-2 text-left">
                  Okay, Ill make sure to do that. Thank you for your help.
                </div>
              </div>
              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
                <div className="px-2 py-2 text-left">
                  Youre welcome. Ill see you on Monday at 11 AM for the
                  nutrition care session.{" "}
                </div>
              </div>
              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
                <div className="px-2 py-2 text-left">
                  Hi, I just had a few questions about the nutrition care
                  session thats coming up.
                </div>
              </div>

              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
                <div className="px-2 py-2 text-left">
                  Of course, what would you like to know?
                </div>
              </div>
              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
                <div className="px-2 py-2 text-left">
                  What kind of things will we be discussing during the session?
                </div>
              </div>
              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
                <div className="px-2 py-2 text-left">
                  We will be discussing your dietary habits and any concerns you
                  may have about your nutrition. We will also make a plan to
                  improve your nutrition, such as increasing your intake of
                  fruits and vegetables, and making sure you are getting the
                  right amount of vitamins and minerals.
                </div>
              </div>

              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
                <div className="px-2 py-2 text-left">
                  Alright, that sounds good. And what should I do to prepare for
                  the session?
                </div>
              </div>
              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
                <div className="px-2 py-2 text-left">
                  You should come prepared with a list of any questions or
                  concerns you may have. It would also be helpful if you could
                  bring a list of the foods you typically eat in a day or week
                  so we can have a better idea of your dietary habits.
                </div>
              </div>
              <div className="col-start-2 col-end-4 mr-2 rounded rounded-l border border-blue-300 bg-blue-200 dark:border-blue-900 dark:bg-blue-600">
                <div className="px-2 py-2 text-left">
                  Okay, Ill make sure to do that. Thank you for your help.
                </div>
              </div>
              <div className="col-start-1 col-end-3 ml-2 rounded rounded-r border border-gray-300 bg-gray-200 dark:border-gray-900 dark:bg-gray-600">
                <div className="px-2 py-2 text-left">
                  Youre welcome. Ill see you on Monday at 11 AM for the
                  nutrition care session.{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* <DemoConversationTwo /> */}
      </div>
    </>
  );
};

export default DemoConversationTwo;
