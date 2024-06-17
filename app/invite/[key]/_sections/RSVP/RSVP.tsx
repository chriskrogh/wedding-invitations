import { format } from "date-fns/format";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import { configuration } from "@/configuration";
import { cn } from "@/lib/utils";

import { AcceptInviteForm } from "./AcceptInviteForm";
import { AddToCalendar } from "./AddToCalendar";
import { DeclineInviteForm } from "./DeclineInviteForm";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

type Props = {
  names: string[];
  _key: string;
  olderKids: boolean;
  canPlusOne: boolean;
  response: "1" | "0" | undefined;
};

export const RSVP: React.FC<Props> = ({ names, response, ...rest }) => {
  const pronoun = names.length > 1 ? "We" : "I";
  return (
    <div className="w-full flex justify-center mt-4 p-6">
      <div className="max-w-[848px] flex flex-col justify-center gap-4 md:flex-row md:gap-12">
        <div className="w-full flex flex-col justify-center md:justify-start md:w-[400px]">
          <Info />
        </div>
        <div className="w-full md:w-[400px] md:mt-12">
          {response ? (
            response === "1" ? (
              <>
                <Typography as="h4">See you there!</Typography>
                <div className="h-3" />
                <Typography>
                  {
                    "Your R.S.V.P has been received. We can't wait to celebrate with you."
                  }
                </Typography>
                <div className="h-3" />
                <AddToCalendar />
              </>
            ) : (
              <>
                <Typography as="h3">{"We'll miss you!"}</Typography>
              </>
            )
          ) : (
            <Tabs defaultValue="yes" className="w-full">
              <TabsList>
                <TabsTrigger
                  value="yes"
                  className="font-serif"
                >{`${pronoun}'ll be there`}</TabsTrigger>
                <TabsTrigger
                  value="no"
                  className="font-serif"
                >{`${pronoun} can't make it`}</TabsTrigger>
              </TabsList>
              <TabsContent value="yes">
                <AcceptInviteForm {...{ names, ...rest }} />
              </TabsContent>
              <TabsContent value="no">
                <DeclineInviteForm />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

const Info: React.FC = () => {
  return (
    <>
      <Typography as="h2" className={cn("pb-0", dancingScript.className)}>
        R.S.V.P
      </Typography>
      <div className="h-4" />
      <Typography as="h3" className={dancingScript.className}>
        When
      </Typography>
      <Typography className="font-serif">
        {format(configuration.rsvp.weddingDate, "MMMM d, yyyy")}
      </Typography>
      <div className="h-4" />
      <Typography as="h3" className={dancingScript.className}>
        Where
      </Typography>
      <div className="w-full flex justify-between items-center gap-4">
        <Typography className="font-serif">
          Ceremony ({configuration.rsvp.ceremony.startTime})
        </Typography>
        <Button variant="link" asChild className="text-blue-500">
          <Link
            href={configuration.rsvp.ceremony.location.link}
            target="_blank"
            className="py-0 px-0 w-fit border-0"
          >
            <Typography className="font-serif">
              {configuration.rsvp.ceremony.location.name}
            </Typography>
          </Link>
        </Button>
      </div>
      <div className="w-full flex justify-between items-center gap-4">
        <Typography className="font-serif">
          Reception ({configuration.rsvp.reception.startTime})
        </Typography>
        <Button variant="link" asChild className="text-blue-500">
          <Link
            href={configuration.rsvp.reception.location.link}
            target="_blank"
            className="py-0 px-0 w-fit border-0"
          >
            <Typography className="font-serif">
              {configuration.rsvp.reception.location.name}
            </Typography>
          </Link>
        </Button>
      </div>
    </>
  );
};
