import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Input/input-field.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  phoneNumber: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
};
const Signup = () => {
  let navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  //destructuring form fields from default form fields
  const { displayName, phoneNumber, Email, Password, ConfirmPassword } =
    formFields;

  const ResetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("Passwords do not match");
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        Email,
        Password
      );
      console.log(user);
      createUserDocumentFromAuth(user, { displayName, phoneNumber });

      ResetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Email already in use");
      }
      console.log("Error signing up ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // getting event and attached attributes and destructuring them
    console.log(event.target.value);
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <main class="main-content  mt-0">
        <section class="min-vh-100 mb-8">
          <div
            class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
            style={{
              backgroundImage: `url('${require("../../assets/img/curved-images/curved11.jpg")}')`,
            }}
          >
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5 text-center mx-auto">
                  <h1 class="text-white mb-2 mt-5">Welcome!</h1>
                  <p class="text-lead text-white">
                    This form is only for the Ground Owners to manage their
                    bookings.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row mt-lg-n10 mt-md-n11 mt-n10">
              <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
                <div class="card z-index-0">
                  <div class="card-body">
                    <form
                      role="form text-left"
                      onSubmit={(event) => handleSubmit(event)}
                    >
                      <div class="mb-3">
                        <FormInput
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          aria-label="displayName"
                          aria-describedby="email-addon"
                          name="displayName"
                          onChange={handleChange}
                          value={displayName}
                        />
                      </div>
                      <div class="mb-3">
                        <FormInput
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                          aria-label="phoneNumber"
                          aria-describedby="email-addon"
                          name="phoneNumber"
                          onChange={handleChange}
                          value={phoneNumber}
                        />
                      </div>
                      <div class="mb-3">
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
                      <div class="mb-3">
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
                      <div class="mb-3">
                        <FormInput
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          aria-label="Password"
                          aria-describedby="password-addon"
                          name="ConfirmPassword"
                          onChange={handleChange}
                          value={ConfirmPassword}
                        />
                      </div>
                      <div class="form-check form-check-info text-left">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          I agree the&nbsp;
                          <a
                            href="javascript:;"
                            class="text-dark font-weight-bolder"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                      <div class="text-center">
                        <button
                          type="submit"
                          class="btn bg-gradient-dark w-100 my-4 mb-2"
                        >
                          Sign up
                        </button>
                      </div>
                      <p class="text-sm mt-3 mb-0 text-center">
                        Already have an account?&nbsp;
                        <span
                          onClick={() => navigate("/")}
                          class="text-dark font-weight-bolder"
                          style={{ cursor: "pointer" }}
                        >
                          Sign in
                        </span>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Signup;
