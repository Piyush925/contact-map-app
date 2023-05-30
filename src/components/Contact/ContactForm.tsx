import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "./FormInput";
import Radio from "./Radio";
import { useDispatch, useSelector } from "react-redux";
import {
    addContact,
    editContact,
    removeContactToEdit
} from "../../store/contact";
import { RootState } from "../../store/store";
import type { Contact } from "../../store/contact";


export type ContactWithoutId = Omit<Contact, "id">;
const initalFormData: ContactWithoutId = {
    firstName: "",
    lastName: "",
    status: "inactive",
};

const ContactForm = (
    { closeContactForm }: { closeContactForm: () => void },
) => {
    const contactToEdit = useSelector((state: RootState) =>
        state.contacts.editContact
    );
    const isEditing = Boolean(contactToEdit);
    const [formData, setFormData] = useState<Contact | ContactWithoutId>(
        contactToEdit ?? initalFormData,
    );
    const dispatch = useDispatch();

    function onSubmitHandler(e: FormEvent) {
        e.preventDefault();
        const { firstName, lastName } = formData;
        if (!firstName || !lastName) return alert("Please fill out all fields");

        if (isEditing) {
            dispatch(editContact(formData as Contact));
            dispatch(removeContactToEdit());
        } else {
            dispatch(addContact(formData));
        }
        closeContactForm();
    }
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <>
            <h1 className="text-2xl font-medium text-center mb-5">
                {isEditing ? "Edit" : "Create"} Contact
            </h1>
            <form
                onSubmit={onSubmitHandler}
                className="  space-y-5 "
            >
                <section className="border space-y-3 p-5 bg-white">
                    <FormInput
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        name="firstName"
                        label="First Name:"
                    />
                    <FormInput
                        value={formData.lastName}
                        onChange={onChangeHandler}
                        name="lastName"
                        label="Last  Name:"
                    />
                    <Radio
                        name="status"
                        onChange={onChangeHandler}
                        label="Status:"
                        defaultValue={formData.status}
                    />
                </section>
                <div className="flex justify-center">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Save {isEditing && "Edited"} Contact
                    </button>
                </div>
            </form>
        </>
    );
};

export default ContactForm;