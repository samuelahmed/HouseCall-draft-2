import Image from "next/image";
const MessageDashboardConnectionCard = () => {
  return (
    <>
      <div className="grid h-16 w-full grid-cols-1 md:grid-cols-3 items-center justify-around px-4 md:h-16 lg:h-16 content-center">
        <div className="flex justify-start ">
          <Image
            className="col-span-1 hidden rounded pr-2 md:inline lg:inline"
            alt=""
            width={50}
            height={50}
            src={
              "https://lh3.googleusercontent.com/a/AEdFTp6NaZTShvMSBO0d5G5dr63_Mi7uQ37nSrxP4Bca=s96-c"
            }
          />
        </div>
        <div className="col-span-2 grid grid-rows-1 md:grid-rows-2 lg:grid-rows-2 ">
          <div className="flex-center flex items-center justify-center text-sm text-center">
            Samuel Duval
          </div>
          <div className="max-w-16 mt-2 hidden max-h-4 overflow-hidden text-xs md:inline lg:inline">
            preview of last message and overflow
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageDashboardConnectionCard;
