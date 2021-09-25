import React from "react";
import {
  Typography,
  Row,
  Col,
  Space,
  Button,
  Divider,
  Card,
  Popconfirm,
} from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const { Title, Text } = Typography;

class Page2 extends React.Component {
  state = {
    listcurrentoffice: [],
    currentcompany: {
      id: "",
      datacompanyName: "",
      datacompanyAddress: "",
      datacompanyRevenue: "",
      datacompanyPhone: [],
    },
  };

  //Its same also from Page1 problem on generating Card so using setstate
  async componentDidMount() {
    // console.log('this.props.clickedcompanyid',this.props.clickedcompanyid);
    if (this.props.clickedcompanyid !== "") {
      fetch(`http://localhost:4242/Company/${this.props.clickedcompanyid}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("data company fetched:", data);
          this.setState({
            currentcompany: data,
          });
          fetch(
            `http://localhost:4242/Office/?dataofficeCompany=${data.datacompanyName}`
          )
            .then((response) => {
              return response.json();
            })
            .then((listoffice) => {
              // console.log("data listcurrentoffices fetched:", listoffice);
              this.setState({
                listcurrentoffice: listoffice,
              });
            });
        });
    }
  }

  render() {
    //Handle Dispatch Action Redux Remove Office
    const handleRemoveOffice = (idvalue) => {
      console.log("id", idvalue);
      this.setState({
        listcurrentoffice: this.state.listcurrentoffice.filter(
          (item) => item.id !== idvalue
        ),
      });
      this.props.handleRemoveOffices(idvalue);
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
                left: "50px",
                top: "10px",
              }}
              level={2}
            >
              {this.state.currentcompany.datacompanyName}
            </Title>

            <Divider
              orientation="horizontal"
              style={{ borderColor: "black", borderWidth: "1px" }}
            />
            <Space size="small" direction="vertical">
              <Text
                style={{
                  width: "500px",
                  left: "30px",
                  position: "relative",
                  fontSize: "20px",
                }}
                strong={true}
              >
                Address:
              </Text>
              <Text
                style={{
                  width: "500px",
                  left: "30px",
                  position: "relative",
                  fontSize: "20px",
                }}
              >
                {this.state.currentcompany.datacompanyAddress}
              </Text>
              <Text
                style={{
                  width: "500px",
                  left: "30px",
                  position: "relative",
                  fontSize: "20px",
                }}
                strong={true}
              >
                Revenue:
              </Text>
              <Text
                style={{
                  width: "500px",
                  left: "30px",
                  position: "relative",
                  fontSize: "20px",
                }}
              >
                {this.state.currentcompany.datacompanyRevenue}
              </Text>
              <Text
                style={{
                  width: "500px",
                  left: "30px",
                  position: "relative",
                  fontSize: "20px",
                }}
                strong={true}
              >
                Phone No:
              </Text>
              <Text
                style={{
                  width: "500px",
                  left: "30px",
                  position: "relative",
                  fontSize: "20px",
                }}
              >
                +{this.state.currentcompany.datacompanyPhone.code}-
                {this.state.currentcompany.datacompanyPhone.phone}
              </Text>
              <Link to="/">
                <Button
                  style={{ width: "500px", left: "30px", position: "relative" }}
                >
                  Back to Overview
                </Button>
              </Link>
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
              left: "50px",
              top: "10px",
            }}
            level={2}
          >
            Offices
          </Title>
        </Row>
        <Row>
          {this.state.listcurrentoffice.length > 0 ? (
            this.state.listcurrentoffice.map((item) => (
              <Card
                hoverable={true}
                title={item.dataofficeName}
                extra={
                  <Popconfirm
                    title="Sure to Delete?"
                    onConfirm={() => {
                      handleRemoveOffice(item.id);
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
                <Space
                  onClick={() => {
                    // console.log("data card:", item);
                    this.props.handleClickedCompany(item.id);
                  }}
                  size="small"
                  direction="vertical"
                >
                  <Text strong={true}>Location :</Text>
                  <Text>Lat-{item.dataofficeLocLatitude}</Text>
                  <Text>Long-{item.dataofficeLocLongitude}</Text>
                  <Text strong={true}>Office Start Date :</Text>
                  <Text>{item.dataofficeStartDate}</Text>
                </Space>
              </Card>
            ))
          ) : (
            <p>there is no offices created yet</p>
          )}
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRemoveOffices: (val) =>
      dispatch({ type: "REMOVE_OFFICE", iddata: val }),
  };
};

const mapStateToProps = (state) => {
  return {
    clickedcompanyid: state.clickedcompanyid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page2);
