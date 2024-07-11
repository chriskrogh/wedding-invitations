"use client";

import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { configuration } from "@/configuration";

type Props = {
  _key: string;
  names: string[];
};

export const DeclineInviteForm: React.FC<Props> = ({ _key, names }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const body = names.map((name) => ({ name, response: "0" }));
      await fetch(`/invite/${_key}/respond`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <div className="py-2">
      <Typography as="h4">{"Are you sure :'("}</Typography>
      <div className="h-4" />
      <Button className="font-serif" onClick={onSubmit} disabled={isSubmitting}>
        Decline invitation
      </Button>
      <div className="h-4" />
      <Typography as="label">
        If you would like to change your mind, please let us know by{" "}
        {format(configuration.rsvp.inviteExpirationDate, "MMMM d, yyyy")}.
      </Typography>
    </div>
  );
};
