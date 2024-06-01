import { Dancing_Script } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import { configuration } from "@/configuration";
import { cn } from "@/lib/utils";

import { AcceptInviteForm } from "./AcceptInviteForm";
import { DeclineInviteForm } from "./DeclineInviteForm";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

type Props = {
  names: string[];
  olderKids: boolean;
  canPlusOne: boolean;
};

export const RSVP: React.FC<Props> = ({ names, ...rest }) => {
  const pronoun = names.length > 1 ? "We" : "I";
  return (
    <div className="w-full flex justify-center mt-4 p-6">
      <div className="max-w-[848px] flex flex-col justify-center gap-4 md:flex-row md:gap-12">
        <div className="w-full flex flex-col justify-center md:justify-start md:w-[400px]">
          <Info />
        </div>
        <Tabs defaultValue="yes" className="w-full md:w-[400px] md:mt-12">
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
      </div>
    </div>
  );
};

const Info: React.FC = () => {
  return (
    <>
      <Typography as="h2" className={cn("pb-0", dancingScript.className)}>
        RSVP
      </Typography>
      <div className="h-4" />
      <Typography as="h3" className={dancingScript.className}>
        When
      </Typography>
      <Typography className="font-serif">{configuration.rsvp.date}</Typography>
      <div className="h-4" />
      <Typography as="h3" className={dancingScript.className}>
        Where
      </Typography>
      <div className="w-full flex justify-between items-center gap-4">
        <Typography className="font-serif">
          Ceremony ({configuration.rsvp.ceremony.time})
        </Typography>
        <Button variant="link" asChild>
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
          Reception ({configuration.rsvp.reception.time})
        </Typography>
        <Button variant="link" asChild>
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
