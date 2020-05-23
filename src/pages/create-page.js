import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Header from "./../components/header";
import Footer from "./../components/footer";
import Loader from "./../components/loader";
import Axios from "axios";

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        _id: "",
        title: "",
        text: "",
      },
      formErrors: {
        title: "",
        text: "",
        serverError: "",
      },
      isLoading: false,
      error: "",
    };
    this.controllers = {};
    this.signals = {};
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    let _id;
    if (path !== "/create") {
      const pathArr = path.split("/");
      _id = pathArr[2];
      this.fetchRecipe(_id);
    }
  }

  fetchRecipe = (_id) => {
    this.setState({ isLoading: true });
    Axios.get(`/api/recipes/${_id}`)
      .then((data) => {
        this.setState({ form: { ...data.data.recipe }, isLoading: false });
      })
      .catch((e) => {
        console.log(e.response.data.message);
        this.props.history.push("/");
      });
  };

  setField = ({ target }) => {
    this.setState({
      form: {
        ...this.state.form,
        ...{
          [target.name]: target.value,
        },
      },
      formErrors: {
        ...this.state.formErrors,
        ...{ [target.name]: "", serverError: "" },
      },
    });
  };

  validateFields = () => {
    const { form, formErrors } = this.state;
    const errors = { ...formErrors };

    if (form.title.trim().length < 3) {
      errors.title = "Too short title. Min lenght 3 symbols.";
    }
    if (form.text.trim().length < 3) {
      errors.text = "Too short text. Min lenght 3 symbols.";
    }

    this.setState({ formErrors: errors });

    return Object.values(errors).every((text) => !text);
  };

  createRecipe = () => {
    const { form } = this.state;

    Axios.post(`/api/recipes/add`, {
      title: form.title,
      text: form.text,
    })
      .then(() => {
        this.setState({ isLoading: false });
        this.props.history.push("/");
      })
      .catch((e) => {
        this.setState({
          formErrors: {
            ...this.state.formErrors,
            serverError: e.response.data.message,
          },
        });
        this.setState({ isLoading: false });
      });
  };

  updateRecipe = () => {
    const { form } = this.state;

    Axios.put(`/api/recipes/update/${form._id}`, {
      title: form.title,
      text: form.text,
    })
      .then(() => {
        this.setState({ isLoading: false });
        this.props.history.push("/");
      })
      .catch((e) => {
        this.setState({
          formErrors: {
            ...this.state.formErrors,
            serverError: e.response.data.message,
          },
        });
        this.setState({ isLoading: false });
      });
  };

  createUpdateRecipe = (e) => {
    e.preventDefault();
    const validateForm = this.validateFields();
    const { form } = this.state;

    if (!validateForm) {
      return null;
    }
    this.setState({ isLoading: true });
    if (form._id) {
      this.updateRecipe();
    } else this.createRecipe();
  };

  abortCreating = () => {
    this.props.history.push("/");
  };

  render() {
    const { formErrors, form, isLoading } = this.state;
    return (
      <div className="create-page">
        <Header />
        <div className="header">
          <h2 className="title">{form._id ? "Update" : "Create"} recipe</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Form className="m-5">
            <FormGroup>
              <Label for="title" className=" d-flex justify-content-between">
                <span>Title</span>
                <span className="text-danger" hidden={!formErrors.title}>
                  {formErrors.title}
                </span>
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={form.title}
                onChange={this.setField}
              />
            </FormGroup>
            <FormGroup>
              <Label for="textArea" className=" d-flex justify-content-between">
                <span>Text</span>
                <span className="text-danger" hidden={!formErrors.text}>
                  {formErrors.text}
                </span>
              </Label>
              <Input
                type="textarea"
                name="text"
                id="textArea"
                value={form.text}
                onChange={this.setField}
              />
            </FormGroup>
            <FormGroup className="d-flex justify-content-between">
              <Button
                outline
                color="primary"
                onClick={this.createUpdateRecipe}
                disabled={isLoading}
              >
                {form._id ? "Update" : "Create"}
              </Button>
              <Button outline color="danger" onClick={this.abortCreating}>
                Cancel
              </Button>
            </FormGroup>
            <p className="text-danger">{formErrors.serverError}</p>
          </Form>
        )}
        <Footer />
      </div>
    );
  }
}

export default withRouter(CreatePage);
