import { useState } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

function Contacts() {
    const [isContactForm, setIsContactForm] = useState(false);
    function openContactForm() {
        setIsContactForm(true);
    }
    function closeContactForm() {
        setIsContactForm(false);
    }
    return (
        <main className="max-w-md mx-auto mt-20">
            {isContactForm
                ? <ContactForm closeContactForm={closeContactForm} />
                : <ContactList openContactForm={openContactForm} />}
        </main>
    );
}

export default Contacts;