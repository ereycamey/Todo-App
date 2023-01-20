import { Input, Button } from 'antd';
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined } from '@ant-design/icons';

const Styles = {
  input: {
    width: "100%",
    borderRadius: 4,
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    border: "1px solid #A8BDB1 "
  },
  inputUpdate: {
    width: "30%",
    borderRadius: 4,
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    border: "1px solid #A8BDB1 "
  },
  button: {
    backgroundColor: "black",
    width: "10%",
    height: "10%",
    color: "white",
    padding: "6px 10px",
    borderRadius: 6,
    marginLeft: 8,
    outline: "none"
  },
  buttonEdit: {
    backgroundColor: "black",
    width: "25%",
    height: "10%",
    color: "white",
    padding: "6px 10px",
    borderRadius: 6,
    marginLeft: 8,
    outline: "none",
    float:"right"
  },
  buttonMain: {
    width: "40%",
    height: "40%",
    backgroundColor: "black",
    color: "white",
    padding: "16px",
    borderRadius: 4,
    border: "1px solid #A8BDB1 ",
    marginLeft: 16,
    marginTop: 10,
    textAlign: "center",
    fontSize: 18
  },
  disp: {},

};

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        id: ""
      },
      value: [],
      isEdit: false,
      editValue: "",
      editId: "",
      styles1: "none"
    };
  }

  handleChange = e => {
    this.setState(
      {
        name: {
          value: e.target.value,
          id: uuidv4()
        }
      },
      () => console.log(this.state.name.value)
    );
  };

  submit = () => {
    console.log("button");
    if (this.state.name.value === "") {
      alert("please add todo");
      return;
    }
    this.setState(
      {
        name: {
          value: ""
        },
        value: [...this.state.value, this.state.name]
      },
      () => console.log(this.state)
    );
  };

  remove = id => {
    let value = this.state.value;
    const remove = value.filter(ele => ele.id !== id);
    this.setState({
      value: remove
    });
  };

  edit = (value, id) => {
    this.setState(
      {
        isEdit: true,
        editValue: value,
        editId: id
      },
      () => console.log(id, value)
    );
  };

  update = () => {
    let value = this.state.value;
    const item = value.filter(ele =>
      ele.id === this.state.editId
        ? (ele.value = this.state.editValue)
        : ele.value
    );

    this.setState({ value: item, isEdit: false }, () => {
      console.log(this.state.value);
    });
  };

  render() {
    const { isEdit } = this.state;

    if (!isEdit) {
      return (
        <>
          <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
            <div
              style={{
                width: "40%",
                textAlign: "center"
              }}
            >
                <br></br>
              <label>
                <Input 
                  style={Styles.input}
                  value={this.state.name.value}
                  onChange={this.handleChange}
                  placeholder="Add your todo"
                />
              </label>

              <Button type="primary" onClick={this.submit} style={Styles.buttonMain}>
              <PlusOutlined /> Add Todo
              </Button>
            </div>
          </div>

          <div style={{ margin: 10, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column" }}>
            {this.state.value &&
              this.state.value.map((ele, index) => (
                <div key={ele.id} style={{display:"flex", 
                justifyContent:"center",alignItems:"center",
                 margin:10, width:300, backgroundColor:"#E2E5F9",
                 textAlign:"left", padding:10, borderRadius:4,overflow:"auto"}}>
                   <span
                    style={{ textDecoration: `${this.state.styles1}`, fontSize:20, }}
                    onClick={() => {
                      this.setState({ styles1: "underline" });
                    }}
                  >
                    {ele.value}
                  </span>
                  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; 
                  <Button
                    style={Styles.buttonEdit}
                    onClick={e => this.edit(ele.value, ele.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={Styles.buttonEdit}
                    onClick={() => this.remove(ele.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <div style={{ fontSize: 18, margin: 6 }}>Edit</div>
          <Input
            style={Styles.inputUpdate}
            value={this.state.editValue}
            onChange={e => {
              this.setState({ editValue: e.target.value });
            }}
          />
          <br></br>
          <br></br>
          <Button style={Styles.button} onClick={this.update}>
            Update
          </Button>

          <Button
            style={Styles.button}
            onClick={() => {
              this.setState({ isEdit: false });
            }}
          >
            Cancel
          </Button>
        </div>
      );
    }
  }
}
