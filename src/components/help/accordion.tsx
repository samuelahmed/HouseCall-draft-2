import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const AccordionEngine = () => {
  return (
    <>
      <Accordion.Root
        className="flex h-10 max-w-xs flex-col items-center text-xl md:max-w-lg"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="text-30 min-w-full" value="item-1">
          <Accordion.Trigger
            className="flex h-10 min-w-full cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3 
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            What is House Call?
            <ChevronDownIcon className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden py-2 px-2 text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
            <p>
              House Call connects patients and caregivers in the comfort of the
              patient’s home.
            </p>
            <br></br>
            <p>
              Human connections are one of the most important aspects of a
              healthy life. House Call reduces barriers by providing a dashboard
              for caregivers and patients to meet, chat, and decide on how to
              spend their care sessions.
            </p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item className="min-w-full" value="item-3">
          <Accordion.Trigger
            className="flex h-10 min-w-full cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3  
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            What care session types are available?
            <ChevronDownIcon className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden py-2 px-2 text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
            <p>
              <span className="font-semibold"> Home Care:</span> Support with
              things and tasks around the home. Examples are cleaning and
              cooking, setting up living spaces, helping with chores, doing
              activities together.
            </p>
            <br></br>
            <p>
              <span className="font-semibold"> Mobility Support:</span> Helping
              with movement, these can be simple such as going on walks to the
              park or more specialized for patient needs.
            </p>
            <br></br>
            <p>
              <span className="font-semibold"> Personal Care:</span> Spending
              time together, to helping with cleaning and washing, helping sort
              bills and mail.
            </p>
            <br></br>
            <p>
              <span className="font-semibold"> Transportation: </span> Helping
              patients get to places in a safe and reliable way.
            </p>
            <br></br>
            <p>
              <span className="font-semibold"> Other:</span> Whatever the
              caregiver and patient find best suits their needs.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item className="min-w-full" value="item-4">
          <Accordion.Trigger
            className="flex h-10 min-w-full cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3  
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            Who are Caregivers?
            <ChevronDownIcon className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden py-2 px-2 text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
            Anyone able and passionate to help others is welcome to join and
            become a caregiver.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item className="min-w-full" value="item-5">
          <Accordion.Trigger
            className="flex h-10 min-w-full cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3  
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            Who are Patients?
            <ChevronDownIcon className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden py-2 px-2 text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
            Anyone who wants to enhance their life with non-medical care
            sessions is welcome to join and become a patient.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item className="min-w-full" value="item-6">
          <Accordion.Trigger
            className="flex h-10 min-w-full cursor-pointer items-center justify-center border border-solid border-blue7 bg-blue3  
              text-olive12 hover:border-blue8 hover:bg-blue4 dark:border-darkBlue7 dark:bg-darkBlue3 dark:text-darkOlive12 dark:hover:border-darkBlue8 dark:hover:bg-darkBlue4"
          >
            What is House Call&apos;s Mission
            <ChevronDownIcon className="text-olive12 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content
            className="text-mauve11 bg-mauve2 overflow-hidden py-2 px-2 text-[15px] data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp 
          "
          >
            To provide a comprehensive suite of care services for patients while
            supporting and enabling caregivers.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};

export default AccordionEngine;
