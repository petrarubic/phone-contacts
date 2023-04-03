import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getContacts } from "../service/contacts";
import { useContactsStore } from "../store/contacts-store";
import { shallow } from "zustand/shallow";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Contacts = () => {
  const { contacts, setContacts } = useContactsStore((state) => {
    return {
      contacts: state.contacts,
      setContacts: state.setContacts,
    };
  }, shallow);

  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useQuery("contacts", async () => {
    try {
      const response = await getContacts();
      return response;
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (data) {
      setContacts(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading contacts...</p>;
  }

  if (isError) {
    return <p>Error loading contacts.</p>;
  }

  const numContacts = contacts.length;
  const numPages = Math.ceil(numContacts / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, numContacts);

  const handlePrevPage = () => setPage(Math.max(page - 1, 1));
  const handleNextPage = () => setPage(Math.min(page + 1, numPages));

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex items-center justify-end my-4">
        <label htmlFor="page-size" className="mr-2">
          Show contacts:
        </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
          className="p-1 border rounded"
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <table className="w-full table-auto border-collapse border overflow-x-scroll">
        <thead className="border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
          <tr>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Country</th>
            <th className="px-5 py-3">City</th>
            <th className="px-5 py-3">Address</th>
          </tr>
        </thead>
        <tbody>
          {contacts.slice(startIndex, endIndex).map((contact) => (
            <tr
              key={contact.id}
              className="hover:bg-gray-100 border-b flex-nowrap"
            >
              <td className="p-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={contact.avatar}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{contact.name}</span>
                </div>
              </td>
              <td className="p-2">{contact.country}</td>
              <td className="p-2">{contact.city}</td>
              <td className="p-2">{contact.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 items-center">
        <div className="text-xs">
          Showing {startIndex + 1} to {endIndex} of {numContacts} contacts
        </div>
        <div>
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="p-1 border rounded mr-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === numPages}
            className="p-1 border rounded"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
