import { Dancing_Script } from "next/font/google";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { configuration } from "@/configuration";

import { CopyToClipboard } from "./CopyToClipboard";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

export const Gift: React.FC = () => {
  return (
    <div className="w-full flex justify-center p-6">
      <div className="w-full max-w-[848px] flex flex-col">
        <Typography as="h2" className={dancingScript.className}>
          Registry
        </Typography>
        <div className="h-2" />
        <Typography>{configuration.gift.preamble}</Typography>
        <div className="h-2" />
        {configuration.gift.items.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {configuration.gift.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-serif">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  {item.details.map(({ key, value, copyable, link }, i) => (
                    <div key={key}>
                      {i > 0 && <div className="h-1" />}
                      {link ? (
                        <Button variant="link" asChild>
                          <Link href={link} target="_blank">
                            <Typography>{key}</Typography>
                          </Link>
                        </Button>
                      ) : copyable && value ? (
                        <div className="flex justify-between">
                          <Typography>{key}</Typography>
                          <Typography className="flex items-center">
                            <span className="mr-1">{value}</span>
                            <CopyToClipboard value={value} />
                          </Typography>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <Typography>{key}</Typography>
                          <Typography>{value}</Typography>
                        </div>
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : null}
      </div>
    </div>
  );
};
