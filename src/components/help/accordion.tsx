import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const AccordionEngine = () => {
  return (
    <>
      <Accordion.Root
        //max-w-md is not a good way to do this
        //but it seems to breakout of the grid if I make it w-full
        //this is defintely a terrible way to do this - it will look bad on some mobile devices.
        className="flex max-w-xs md:max-w-lg flex-col items-center"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="min-w-full" value="item-1">
          <Accordion.Trigger
            className="flex min-w-full cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3  text-base 
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            What is House Call?
            <ChevronDownIcon className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
            Human connections are one of the most important aspects of a healthy
            life. House Call reduces barriers by providing a network for
            caregivers and patients to meet, chat, and decide on how to spend
            their care sessions.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item className="min-w-full" value="item-2">
          <Accordion.Trigger
            className="flex min-w-full cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3  text-base 
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            Where do patients and caregivers meet?
            <ChevronDownIcon className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
   House Call connects patients and caregivers in the comfort of the patient’s home.
          </Accordion.Content>
        </Accordion.Item>


        <Accordion.Item className="min-w-full" value="item-3">
          <Accordion.Trigger
            className="flex min-w-full cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3  text-base 
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            What is House Call?
            <ChevronDownIcon className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
            Human connections are one of the most important aspects of a healthy
            life. House Call reduces barriers by providing a network for
            caregivers and patients to meet, chat, and decide on how to spend
            their care sessions.
          </Accordion.Content>
        </Accordion.Item>





      </Accordion.Root>
    </>
  );
};

export default AccordionEngine;
