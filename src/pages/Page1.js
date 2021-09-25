import React, { useEffect } from "react";
import {
  Typography,
  Row,
  Col,
  Space,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Divider,
  Card,
  Form,
  Popconfirm,
} from "antd";
import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";
import en from "world_countries_lists/data/en/world.json";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import { Messageboxalert } from "../Messageboxalert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const { Text, Title } = Typography;
const { Option } = Select;

class Page1 extends React.Component {
  state = {
    listCompany: this.props.listCompany,
    listcompanynames: [],
  };

  //Fetching Company To SetState For Changing UI of List Company Because 
  //I dont know when im using redux to changing UI it gettings late 1 data on generate Card Only
  //But if using redux globalstate in INPUT,SELECT,DATEPICKER,etc it works perfectly.
  async componentDidMount() {
    fetch("http://localhost:4242/Company")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          listCompany: data,
        });
      });
  }

  render() {
    ///Generate list string-> listcompanynames from List Company
    const getCompanyNameOption = () => {
      var listcompanynames = this.state.listCompany.map(function (item) {
        return item["datacompanyName"];
      });
      // console.log('listcompanynames',listcompanynames);
      if (listcompanynames.length > 0) {
        return listcompanynames.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ));
      }
    };

    //Dispatch Action Redux to Change Office Company
    const onChangeSelect = (value) => {
      // console.log(`selected ${value}`);
      this.props.handleChangeOfficeCompany(value);
    };

    function onSearchSelect(val) {
      // console.log("search:", val);
    }

    //Here Dispatch Action Redux to Add Office
    const onFinishOffice = (values) => {
      // console.log("values", values);
      var curlist = this.props.listOffice;

      var unique = curlist.find(
        (x) => x.dataofficeName == this.props.officeName
      );
      // console.log(unique);
      if (unique === undefined) {
        Messageboxalert("Success Add Office Company", "success");

        var newdata = {
          id: Math.floor(Math.random() * 100000),
          dataofficeName: this.props.officeName,
          dataofficeLocLatitude: this.props.officeLocLatitude,
          dataofficeLocLongitude: this.props.officeLocLongitude,
          dataofficeStartDate: this.props.officeStartDate,
          dataofficeCompany: this.props.officeCompany,
        };

        this.props.handleAddOffice(newdata);
      } else {
        Messageboxalert("Office Name Duplicate", "warning");
      }
    };

    //Here Dispatch Action Redux to Add Company + SetState Generate Card Company
    const onFinish = (values) => {
      if (
        this.props.companyName == "" ||
        this.props.companyAddress == "" ||
        this.props.companyRevenue == "" ||
        this.props.companyPhone.length == 0
      ) {
        Messageboxalert("Please fill all the data", "warning");
      } else {
        if (
          this.props.companyPhone.code === undefined ||
          this.props.companyPhone.phone === undefined ||
          this.props.companyPhone.short === undefined
        ) {
          Messageboxalert("Please fill all the data", "warning");
        } else {
          const { listCompany } = this.state;
          var curlist = this.state.listCompany;

          var unique = curlist.find(
            (x) => x.datacompanyName == this.props.companyName
          );
          // console.log(unique);
          if (unique === undefined) {
            Messageboxalert("Success Add Company Profile", "success");

            var newdata = {
              id: Math.floor(Math.random() * 100000),
              datacompanyName: this.props.companyName,
              datacompanyAddress: this.props.companyAddress,
              datacompanyRevenue: this.props.companyRevenue,
              datacompanyPhone: this.props.companyPhone,
            };
            // console.log("newdata", newdata);
            this.setState({
              listCompany: [...listCompany, newdata],
            });
            // console.log('Success:', values);
            this.props.handleAddCompany(newdata.id);
          } else {
            Messageboxalert("Company Name Duplicate", "warning");
          }
        }
      }
    };

    const onFinishFailed = (errorInfo) => {
      // console.log('Failed:', errorInfo);
    };
    
    //Handle Dispatch Action Redux for Delete Company
    const handleRemoveCompany = (idvalue) => {
      // console.log("id", idvalue);
      this.setState({
        listCompany: this.state.listCompany.filter(
          (item) => item.id !== idvalue
        ),
      });
      this.props.handleRemoveCompanies(idvalue);
    };

    return (
      <>
        <Row>
          <Col flex="auto">
            <Title
              style={{
                color: "black",
                fontWeight: "bold",
                position: "relative",
                left: "30px",
              }}
              level={3}
            >
              Create Company
            </Title>
            <Space size="small" direction="vertical">
              <Form
                name="formcreatecompany"
                labelCol={{
                  // span: 8,
                  offset: 2,
                }}
                wrapperCol={{
                  // span: 30,
                  offset: 2,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Form.Item
                  label="Name :"
                  name="companyname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company name!",
                    },
                  ]}
                >
                  <Input
                    value={this.props.companyName}
                    onChange={this.props.handleChangeCompanyName}
                    style={{ width: "500px" }}
                    placeholder="Name"
                  />
                </Form.Item>
                <Form.Item
                  label="Address :"
                  name="companyaddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company address!",
                    },
                  ]}
                >
                  <Input
                    value={this.props.companyAddress}
                    onChange={this.props.handleChangeCompanyAddress}
                    style={{ width: "500px" }}
                    placeholder="Address"
                  />
                </Form.Item>
                <Form.Item
                  label="Revenue :"
                  name="companyrevenue"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company revenue!",
                    },
                  ]}
                >
                  <InputNumber
                    min="0"
                    value={this.props.companyRevenue}
                    onChange={this.props.handleChangeCompanyRevenue}
                    style={{ width: "500px" }}
                    placeholder="Revenue"
                  />
                </Form.Item>
                <Form.Item
                  label="Phone No :"
                  name="companyphone"
                  rules={[
                    {
                      required: false,
                      message: "Please input your company phone!",
                    },
                  ]}
                >
                  <ConfigProvider locale={en}>
                    <CountryPhoneInput
                      // style={{ width: "500px", position: "relative", left: "30px" }}
                      value={this.props.handleChangeCompanyPhone}
                      onChange={this.props.handleChangeCompanyPhone}
                      style={{ width: "500px" }}
                      placeholder="Phone"
                    />
                  </ConfigProvider>
                </Form.Item>
                <Form.Item
                // wrapperCol={{
                //   offset: 2,
                //   span: 10,
                // }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "500px" }}
                  >
                    Create
                  </Button>
                </Form.Item>
              </Form>

              <br />
            </Space>
          </Col>
          <Col flex="1px" style={{ backgroundColor: "black" }} />
          <Col flex="auto">
            <Title
              style={{
                color: "black",
                fontWeight: "bold",
                position: "relative",
                left: "30px",
              }}
              level={3}
            >
              Create Office
            </Title>
            <Space size="small" direction="vertical">
              <Form
                name="formcreateoffice"
                labelCol={{
                  // span: 8,
                  offset: 2,
                }}
                wrapperCol={{
                  // span: 30,
                  offset: 2,
                }}
                onFinish={onFinishOffice}
                layout="vertical"
              >
                <Form.Item
                  label="Name :"
                  name="officename"
                  rules={[
                    {
                      required: true,
                      message: "Please input your office name!",
                    },
                  ]}
                >
                  <Input
                    value={this.props.officeName}
                    onChange={this.props.handleChangeOfficeName}
                    style={{ width: "500px" }}
                    placeholder="Name"
                  />
                </Form.Item>
                <Form.Item
                  label="Location :"
                  name="officeLocation"
                  rules={[
                    {
                      required: true,
                      message: "Please input your office location!",
                    },
                  ]}
                >
                  <Space size="small" direction="horizontal">
                    <InputNumber
                      min="0"
                      value={this.props.officeLocLatitude}
                      onChange={this.props.handleChangeOfficeLocLatitude}
                      style={{ width: "245px" }}
                      placeholder="Latitude"
                    />

                    <InputNumber
                      min="0"
                      value={this.props.officeLocLongitude}
                      onChange={this.props.handleChangeOfficeLocLongitude}
                      style={{ width: "245px" }}
                      placeholder="Longitude"
                    />
                  </Space>
                </Form.Item>
                <Form.Item
                  label="Office Start Date :"
                  name="officestartdate"
                  rules={[
                    {
                      required: true,
                      message: "Please input your office start date!",
                    },
                  ]}
                >
                  <DatePicker
                    value={this.props.officeStartDate}
                    onChange={this.props.handleChangeOfficeStartDate}
                    style={{ width: "500px" }}
                    placeholder="Office Start Date"
                  />
                </Form.Item>
                <Form.Item
                  label="Office :"
                  name="officecompany"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company!",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "500px" }}
                    showSearch
                    placeholder="Select Company"
                    optionFilterProp="children"
                    onChange={onChangeSelect}
                    onSearch={onSearchSelect}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {getCompanyNameOption()}
                  </Select>
                </Form.Item>
                <Form.Item
                // wrapperCol={{
                //   offset: 2,
                //   span: 10,
                // }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "500px" }}
                  >
                    Create
                  </Button>
                </Form.Item>
              </Form>

              <br />
            </Space>
          </Col>
        </Row>
        <Divider
          orientation="horizontal"
          style={{ borderColor: "black", borderWidth: "1px" }}
        />
        <Row>
          <Title
            style={{
              color: "black",
              fontWeight: "bold",
              position: "relative",
              left: "30px",
            }}
            level={3}
          >
            Companies
          </Title>
        </Row>
        <Row>
          {this.state.listCompany.length > 0 ? (
            this.state.listCompany.map((item) => (
              <Card
                hoverable={true}
                title={item.datacompanyName}
                extra={
                  <Popconfirm
                    title="Sure to Delete?"
                    onConfirm={() => {
                      handleRemoveCompany(item.id);
                    }}
                  >
                    <Button
                      type="danger"
                      shape="circle"
                      style={{ color: "white", zIndex: 10 }}
                    >
                      X
                    </Button>
                  </Popconfirm>
                }
              >
                <Link to="/page2">
                  <Space
                    onClick={() => {
                      console.log("data card:", item);
                      this.props.handleClickedCompany(item.id);
                    }}
                    size="small"
                    direction="vertical"
                  >
                    <Text strong={true}>Address :</Text>
                    <Text>{item.datacompanyAddress}</Text>
                    <Text strong={true}>Revenue :</Text>
                    <Text>{item.datacompanyRevenue}</Text>
                    <Text strong={true}>Phone :</Text>
                    <Text>
                      {item.datacompanyPhone.code}
                      {item.datacompanyPhone.phone}
                    </Text>
                  </Space>
                </Link>
              </Card>
            ))
          ) : (
            <p>there is no companies created yet</p>
          )}
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    companyName: state.companyName,
    companyAddress: state.companyAddress,
    companyRevenue: state.companyRevenue,
    companyPhone: state.companyPhone,
    listCompany: state.listCompany,
    officeName: state.officeName,
    officeLocLatitude: state.officeLocLatitude,
    officeLocLongitude: state.officeLocLongitude,
    officeStartDate: state.officeStartDate,
    officeCompany: state.officeCompany,
    listOffice: state.listOffice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddCompany: (val) => dispatch({ type: "ADD_COMPANY", text: val }),
    handleChangeCompanyName: (val) =>
      dispatch({ type: "INPUT_COMPANY_NAME", text: val.target.value }),
    handleChangeCompanyAddress: (val) =>
      dispatch({ type: "INPUT_COMPANY_ADDRESS", text: val.target.value }),
    handleChangeCompanyRevenue: (val) =>
      dispatch({ type: "INPUT_COMPANY_REVENUE", text: val }),
    handleChangeCompanyPhone: (val) =>
      dispatch({ type: "INPUT_COMPANY_PHONE", data: val }),
    handleRemoveCompanies: (val) =>
      dispatch({ type: "REMOVE_COMPANY", iddata: val }),
    handleChangeOfficeName: (val) =>
      dispatch({ type: "INPUT_OFFICE_NAME", text: val.target.value }),
    handleChangeOfficeLocLatitude: (val) =>
      dispatch({ type: "INPUT_OFFICE_LOCATION_LATITUDE", text: val }),
    handleChangeOfficeLocLongitude: (val) =>
      dispatch({ type: "INPUT_OFFICE_LOCATION_LONGITUDE", text: val }),
    handleChangeOfficeStartDate: (val) =>
      dispatch({ type: "INPUT_OFFICE_START_DATE", text: val }),
    handleChangeOfficeCompany: (val) =>
      dispatch({ type: "INPUT_OFFICE_COMPANY", text: val }),
    handleAddOffice: (val) => dispatch({ type: "ADD_OFFICE", text: val }),
    handleClickedCompany: (val) =>
      dispatch({ type: "CLICKED_COMPANY", text: val }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page1);
