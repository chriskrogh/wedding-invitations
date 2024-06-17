"use client";

import { AddToCalendarButton } from "add-to-calendar-button-react";

import { configuration } from "@/configuration";

export const AddToCalendar: React.FC = () => {
  const { person1Name, person2Name } = configuration.common;
  const { ceremony, reception, weddingDate } = configuration.rsvp;
  const formattedDate = weddingDate.toISOString().split("T")[0];
  return (
    <AddToCalendarButton
      name={`${person1Name} & ${person2Name}'s Wedding`}
      options={["Apple", "Google", "Outlook.com"]}
      location={`Ceremony: ${configuration.rsvp.ceremony.location.name}, Reception: ${configuration.rsvp.reception.location.name}`}
      startDate={formattedDate}
      endDate={formattedDate}
      startTime={ceremony.startTime}
      endTime={reception.endTime}
      timeZone="America/La_Paz"
    />
  );
};
