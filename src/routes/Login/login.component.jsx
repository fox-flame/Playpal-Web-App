import { useState } from "react";
import FormInput from "../../components/Input/input-field.component";
import { SignInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  Email: "",
  Password: "",
};

const LoginPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  //destructuring form fields from default form fields
  const { Email, Password } = formFields;

  //input validator
  const ShowError = (value) => {
    document.getElementById("error-box").innerHTML = value;
  };
  //clear from function
  const ResetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await SignInAuthUserWithEmailAndPassword(Email, Password);

      ResetForm();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        ShowError("No Account associated with this email");
      } else if (error.code === "auth/wrong-password") {
        ShowError("Password doesn't exist");
      }
      console.log("Error loggin in ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // getting event and attached attributes and destructuring them
    // console.log(event.target.value);
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      Welcome back
                    </h3>
                    <p className="mb-0">
                      Enter your email and password to sign in
                    </p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <label>Email</label>
                      <div className="mb-3">
                        <FormInput
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="email-addon"
                          name="Email"
                          onChange={handleChange}
                          value={Email}
                        />
                      </div>
                      <label>Password</label>
                      <div className="mb-3">
                        <FormInput
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="password-addon"
                          name="Password"
                          onChange={handleChange}
                          value={Password}
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div
                    className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    style={{
                      backgroundImage: `url('${require("../../assets/img/curved-images/curved-11.jpg")}')`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default LoginPage;
