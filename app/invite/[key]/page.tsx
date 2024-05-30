import { Gift } from "./_sections/Gift";
import { Hero } from "./_sections/Hero";
import { RSVP } from "./_sections/RSVP";

const Page = () => {
  return (
    <main>
      <Hero />
      <RSVP />
      <Gift />
    </main>
  );
};

export default Page;
