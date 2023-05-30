import { useDispatch } from "react-redux";
import {
    removeContact,
    setContactToEdit
} from "../../store/contact";
import type { Contact } from "../../store/contact";

type ContactCardProps = {
    contact: Contact;
    openContactForm: () => void;
};

const ContactCard = ({ contact, openContactForm }: ContactCardProps) => {
    const dispatch = useDispatch();
    function deleteContact() {
        dispatch(removeContact({
            id: contact.id,
        }));
    }
    function editContact() {
        dispatch(setContactToEdit(contact));
        openContactForm();
    }

    return (
        <div className="rounded shadow p-5 bg-white">
            <ul className="text-lg">
                <li>
                    <strong>First Name:</strong> {contact.firstName}
                </li>
                <li>
                    <strong>Last Name:</strong> {contact.lastName}
                </li>
                <li>
                    <strong>Status:</strong> {contact.status}
                </li>
            </ul>
            <div className="flex items-end justify-center gap-2.5 mt-2.5">
                <button onClick={editContact} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                </button>
                <button onClick={deleteContact} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ContactCard;