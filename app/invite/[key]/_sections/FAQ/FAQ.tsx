import { Dancing_Script } from "next/font/google";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import { configuration } from "@/configuration";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

export const FAQ: React.FC = () => {
  return (
    <div className="w-full flex justify-center p-6">
      <div className="w-full max-w-[848px] flex flex-col">
        <Typography as="h2" className={dancingScript.className}>
          FAQs
        </Typography>
        <div className="h-2" />
        {configuration.faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {configuration.faqs.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-serif">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <Typography>{item.answer}</Typography>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : null}
      </div>
    </div>
  );
};
