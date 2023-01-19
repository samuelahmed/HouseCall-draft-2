import Image from "next/image";
const MessageDashboardConnectionCard = () => {
  return (
    <>
      <div className="flex h-16 w-full items-center justify-around md:h-16 lg:h-16">
        <div className="flex justify-start">
          <Image
            className="hidden rounded md:inline lg:inline"
            alt=""
            width={50}
            height={50}
            src={
              "https://lh3.googleusercontent.com/a/AEdFTp6NaZTShvMSBO0d5G5dr63_Mi7uQ37nSrxP4Bca=s96-c"
            }
          />
        </div>
        <div className="flex justify-end ">
          <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-2 ">
            <div className="">Samuel Duval</div>
            <div className="hidden text-sm md:inline lg:inline">
              preview of last message sent in conver...
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageDashboardConnectionCard;
