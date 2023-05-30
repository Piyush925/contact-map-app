import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";
import { RootState } from "../../store/store";

const ContactList = ({ openContactForm }: { openContactForm: () => void }) => {
  const allContacts = useSelector(
    (state: RootState) => state.contacts.allContacts
  );

  return (
    <section className="mx-auto max-w-md flex flex-col  items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openContactForm}
      >
        Create Contact
      </button>
      {allContacts.length === 0 && (
        <article className="m-5 p-5 border bg-slate-50 text-gray-500">
          <p className="text-center">
            No contacts found, Please add contact from create contact button
          </p>
        </article>
      )}

      <article className="grid sm:grid-cols-2 m-5 gap-5">
        {allContacts.map((contact) => (
          <ContactCard
            openContactForm={openContactForm}
            contact={contact}
            key={contact.id}
          />
        ))}
      </article>
    </section>
  );
};

export default ContactList;
