"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { configuration } from "@/configuration";

export const DeclineInviteForm: React.FC = () => {
  return (
    <div className="py-2">
      <Typography as="h4">{"Are you sure :'("}</Typography>
      <div className="h-4" />
      <Button className="font-serif">Decline invitation</Button>
      <div className="h-4" />
      <Typography as="label">
        You have until {configuration.rsvp.expirationDate} to change your mind.
      </Typography>
    </div>
  );
};
