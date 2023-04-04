import React, { useEffect, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactsValidationSchema } from "./validations";
import { useCountriesStore } from "../../store/countries-store";
import { getCountries } from "../../service/countries";
import { addContact } from "../../service/contacts";
import { useContactsStore } from "../../store/contacts-store";
import { shallow } from "zustand/shallow";

const initialValues = {
  name: "",
  country: "",
  city: "",
  address: "",
};

const ContactsForm = ({ onSubmit }) => {
  const { countries, setCountries } = useCountriesStore((state) => {
    return {
      countries: state.countries,
      setCountries: state.setCountries,
    };
  }, shallow);

  const { contacts, setContacts } = useContactsStore((state) => {
    return {
      contacts: state.contacts,
      setContacts: state.setContacts,
    };
  }, shallow);

  useEffect(() => {
    getCountries().then((data) => setCountries(data));
  }, [setCountries]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await addContact(values);
      console.log(response);
      setContacts([...contacts, values]);
      onSubmit();
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const countryOptions = useMemo(() => {
    return countries.map((country) => (
      <option key={country.name} value={country.name}>
        {country.name}
      </option>
    ));
  }, [countries]);

  return (
    <div className="rounded-lg overflow-hidden p-6 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Contact</h1>
      <hr />
      <Formik
        initialValues={initialValues}
        validationSchema={contactsValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 mt-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 absolute"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="country" className="mb-1">
                Country
              </label>
              <Field
                as="select"
                name="country"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 absolute"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="city" className="mb-1">
                City
              </label>
              <Field
                type="text"
                name="city"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 absolute"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="mb-1">
                Address
              </label>
              <Field
                type="text"
                name="address"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 absolute"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="p-1 border rounded mr-2 hover:text-white hover:bg-gray-300 hover:border-gray-300 disabled:hover:border-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-300"
            >
              <span className="px-2 py-2">Submit</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactsForm;
