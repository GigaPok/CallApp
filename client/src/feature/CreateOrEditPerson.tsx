import { Button, Form, Input, Select } from "antd";
import { Action, useStore } from "../store/Store";
import { DataType } from "../interfaces";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface Props {
  person?: DataType;
  action?: "edit" | "create";
  onFinish: () => void;
}

const CreateOrEditPerson = ({ person, action, onFinish }: Props) => {
  const [form] = Form.useForm();

  const isEdit = action === "edit" && !!person;
  const { AddItem, update } = useStore();

  const onSubmit = (values: DataType) => {
    if (isEdit) {
      update(Action.EditList, values, person.id, onFinish);
    } else {
      AddItem(Action.AddItem, values, onFinish);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSubmit}
      style={{ maxWidth: 600 }}
      scrollToFirstError
      initialValues={isEdit ? person : undefined}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input Name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["address", "city"]}
        label="City"
        rules={[{ required: true, message: "Please select city!" }]}
      >
        <Select placeholder="select your city">
          <Option value="Chicago">Chicago</Option>
          <Option value="San Diego">San Diego</Option>
          <Option value="New York">New York</Option>
          <Option value="Los Angeles">Los Angeles</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["address", "street"]}
        label="Street"
        rules={[{ required: true, message: "Please input Street" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {isEdit ? "Edit" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOrEditPerson;
