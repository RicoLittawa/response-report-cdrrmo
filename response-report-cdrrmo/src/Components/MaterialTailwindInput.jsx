import {
  Input,
  Radio,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";

const MaterialTailwindInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

const MaterialTailwindRadio = ({ field, form, ...props }) => {
  return <Radio {...field} {...props} />;
};

const MaterialTailwindSelect = ({ field, form, ...props }) => {
  return (
    <Select
      {...field}
      {...props}
      onChange={(e) => {
        form.setFieldValue(field.name, e); // Update the form's field with the selected value
      }}
    >
      <Option value="">Please select a gender</Option>
      <Option value="Male">Male</Option>
      <Option value="Female">Female</Option>
    </Select>
  );
};

export { MaterialTailwindInput, MaterialTailwindRadio, MaterialTailwindSelect };
