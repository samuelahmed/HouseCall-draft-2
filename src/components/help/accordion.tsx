import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const AccordionEngine = () => {
  return (
    <>
      <Accordion.Root
        className="flex flex-col items-center"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="w-fit" value="item-1">
          <Accordion.Trigger
            className="w-full flex cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3  text-base 
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            Is it unstyled?
            <ChevronDownIcon
              className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
            Adding a bunch of text             Adding a bunch of text 
            Adding a bunch of text 
            Adding a bunch of text 
            Adding a bunch of text 
            Adding a bunch of text 
            Adding a bunch of text 
            Adding a bunch of text 
            Adding a bunch of text 
            Adding a bunch of text 
            Adding a bunch of text 

          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item className="" value="item-2 ">
          <Accordion.Trigger
            className="ml-3 flex cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3 px-3 text-base 
                        text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            ITEM TWO?
          </Accordion.Trigger>
          <Accordion.Content>some other text</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};

export default AccordionEngine;
