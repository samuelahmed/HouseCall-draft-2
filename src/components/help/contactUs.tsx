const ContactUs = () => {
  return (
    <>
      <section className="body-font relative mt-6 text-gray-600 dark:text-white">
        <div className="container mx-auto px-5">
          <div className="mb-12 flex w-full flex-col text-center">
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              Please write a detailed description for the support team. If
              necessary, we will reachout as soon as possible. Kind Regards,
              support team.
            </p>
          </div>
          <div className="mx-auto md:w-2/3 lg:w-1/2">
            <div className="-m-2 flex flex-wrap">
              <div className="w-1/2 p-2">
                <div className="relative">
                  <label className="text-sm leading-7 text-gray-600 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="relative">
                  <label className="text-sm leading-7 text-gray-600 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="relative">
                  <label className="text-sm leading-7 text-gray-600 dark:text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="h-32 w-full resize-none rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                  ></textarea>
                </div>
              </div>
              <div className="w-full p-2">
                <button className="mx-auto flex h-10 rounded border border-gray-500 bg-transparent px-4 pt-2 pb-8 font-semibold text-gray-700 hover:border-gray-700 hover:bg-emerald-200 hover:text-black dark:text-white">
                  Submit Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
