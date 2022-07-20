import { useAntdTable } from "ahooks";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";

const { Option } = Select;
const columns = [
  {
    title: "name",
    dataIndex: ["name", "last"],
  },
  {
    title: "email",
    dataIndex: "email",
  },
  {
    title: "phone",
    dataIndex: "phone",
  },
  {
    title: "gender",
    dataIndex: "gender",
  },
];

const getTableData = ({ current, pageSize }: any, formData: Object) => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((resp) => resp.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const UseAntdTable = () => {
  const [form] = Form.useForm();
  /* const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  }); */
  const { tableProps, search, params } = useAntdTable(getTableData, {
    form,
    defaultParams: [
      { current: 2, pageSize: 5 },
      { name: "hello", email: "abc@gmail.com", gender: "female" },
    ],
    defaultType: "advance",
  });

  const { type, changeType, submit, reset } = search;

  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="email" name="email">
              <Input placeholder="email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="phone" name="phone">
              <Input placeholder="phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify="end" style={{ marginBottom: 24 }}>
          <Button type="primary" onClick={submit}>
            Search
          </Button>
          <Button onClick={reset} style={{ marginLeft: 16 }}>
            Reset
          </Button>
          <Button type="link" onClick={changeType}>
            Simple Search
          </Button>
        </Row>
      </Form>
    </div>
  );

  const searchForm = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Form.Item name="gender" initialValue="male">
          <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
            <Option value="">all</Option>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "name is required" }]}
        >
          <Input.Search
            placeholder="enter name"
            style={{ width: 240 }}
            onSearch={submit}
          />
        </Form.Item>
        <Button type="link" onClick={changeType}>
          Advanced Search
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      {type === "simple" ? searchForm : advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

export default UseAntdTable;
