import React, { Component } from "react";
import "./style.css";
import API from "../../utils/api";
import Table from "../../components/table/table";
import $ from "jquery";

class Form extends Component {
  state = {
    searchTerm: "",
    userList: [],
    tableList: [],
    sortedTable: [],
    filteredTable: [],
  };

  componentDidMount() {
    this.searchEmployees();
  }

  searchEmployees() {
    API.search()
      .then(
        function (res) {
          const data = res.data.results;
          const newArray = [];
          for (let i = 0; i < data.length; i++) {
            newArray.push({
              id: i,
              firstName: data[i].name.first,
              lastName: data[i].name.last,
              pic: data[i].picture.medium,
              age: data[i].dob.age,
              phone: data[i].cell,
              email: data[i].email,
            });
          }
          this.setState({ userList: newArray });
          this.setTableList("");
        }.bind(this)
      )
      .catch((err) => console.log(err));
  }

  setTableList(search) {
    const data = this.state.userList;
    const newArray2 = [];
    const newKey = [];
    for (let i = 0; i < data.length; i++) {
      const name = `${data[i].firstName.toLocaleLowerCase()} ${data[
        i
      ].lastName.toLocaleLowerCase()}`;
      if (search === "" || name.indexOf(search.toLocaleLowerCase()) > -1) {
        newArray2.push(
          <tr>
            <td>
              {" "}
              <img src={data[i].pic} alt="pic{i}" />{" "}
            </td>
            <td>{data[i].firstName}</td>
            <td>{data[i].lastName}</td>
            <td>{data[i].age}</td>
            <td>{data[i].phone}</td>
            <td>{data[i].email}</td>
          </tr>
        );
        newKey.push(i.toString());
      }
    }
    this.setState({ tableList: { data: newArray2, key: newKey } });
  }

  handleInputChange(event) {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
    this.setTableList(event.target.value);
  }

  sortTable(column) {
    let change = false;

    if (column === "id") {
      this.state.userList.sort(function (b, a) {
        if (a.id < b.id) {
          change = true;
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      if (change === false) {
        this.state.userList.sort(function (a, b) {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
      }
    }

    if (column === "firstName") {
      this.state.userList.sort(function (b, a) {
        if (a.firstName < b.firstName) {
          change = true;
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
      if (change === false) {
        this.state.userList.sort(function (a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });
      }
    }

    if (column === "lastName") {
      this.state.userList.sort(function (b, a) {
        if (a.lastName < b.lastName) {
          change = true;
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      });
      if (change === false) {
        this.state.userList.sort(function (a, b) {
          if (a.lastName < b.lastName) {
            return -1;
          }
          if (a.lastName > b.lastName) {
            return 1;
          }
          return 0;
        });
      }
    }

    if (column === "age") {
      this.state.userList.sort(function (b, a) {
        if (a.age < b.age) {
          change = true;
          return -1;
        }
        if (a.age > b.age) {
          return 1;
        }
        return 0;
      });
      if (change === false) {
        this.state.userList.sort(function (a, b) {
          if (a.age < b.age) {
            return -1;
          }
          if (a.age > b.age) {
            return 1;
          }
          return 0;
        });
      }
    }
    this.setTableList($("#userSearch").val());
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>User Directory</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div
              className="input-group input-group-lg"
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Search
                </span>
              </div>
              <input
                className="form-control"
                id="userSearch"
                value={this.state.searchTerm}
                name="searchTerm"
                onChange={this.handleInputChange.bind(this)}
                type="text"
                placeholder="Name"
              />
            </div>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-12">
            <table id="myTable">
              <Table
                table={this.state.tableList.data}
                sort={this.sortTable.bind(this)}
              />
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
