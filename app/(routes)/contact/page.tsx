import React from "react";
import Container from "@/components/container";
import ContactClient from "./components/contact-client";

export const metadata = {
  title: "Contact Us | FlavorDesk",
  description: "Get in touch with FlavorDesk for any queries, support, or feedback.",
};

const ContactPage = () => {
  return (
    <Container className="px-4 sm:px-6 lg:px-12 pb-24 pt-24 md:pt-32">
      <ContactClient />
    </Container>
  );
};

export default ContactPage;