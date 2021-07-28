import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Input, Space, Row, Col } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./myUI.css";
import MovieRow from "./MovieRow.jsx";
import { getMovie } from "../API";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Search } = Input;

class UserInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //This method is execute after render method executed (?)
  componentDidMount() {
    this.getMovieFromApi();
  }

  async getMovieFromApi(query) {
    if (query === undefined) {
      query = "A";
    }

    try {
      const axiosResponse = await getMovie(query);
      this.setState({ movieData: axiosResponse.data.results });
    } catch (err) {
      console.log(err);
    }
  }

  searchMovie(search) {
    this.getMovieFromApi(search);
  }

  render() {
    return (
      <div>
        <Layout>
          <Header className="header">
            <div className="logo">
              <h1 className="miniTitle">Movie Search</h1>
            </div>
            <Row>
              <Col>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[""]}>
                  <Menu.Item key="1">Home</Menu.Item>
                  <Menu.Item key="2">Help</Menu.Item>
                </Menu>
              </Col>
              <Col>
                <Space direction="horizontal">
                  <Search
                    placeholder="input search text"
                    onSearch={this.searchMovie.bind(this)}
                    style={{
                      width: 200,
                      position: "absolute",
                      left: "0%",
                      top: "50%",
                      transform: "translate(0%, -50%)",
                    }}
                  />
                </Space>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={[""]}
                defaultOpenKeys={[""]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                  <Menu.Item key="1">option1</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Dunno">
                  <Menu.Item key="5">option2</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="Another Dunno"
                >
                  <Menu.Item key="9">option3</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                {this.state.movieData && (
                  <MovieRow movie={this.state.movieData} />
                )}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default UserInterface;
