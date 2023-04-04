import { Field, ErrorMessage } from "formik";

const SelectInput = ({ label, name, options, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
        {...rest}
      >
        <option value="">Select {label}</option>
        {options}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 absolute"
      />
    </div>
  );
};

export default SelectInput;
