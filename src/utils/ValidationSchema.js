import * as Yup from "yup";
export const DashboardModal = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  prefix: Yup.string().required("prefix is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("gender is required"),
});

export const createMember = Yup.object().shape({
  prefix: Yup.string().required("prefix is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last Name is required"),

  gender: Yup.string().required("gender is required"),
  Weight: Yup.number()
    .typeError("Weight must be a number")
    .min(1, "Weight must be at least 1 kg")
    .max(300, "Weight cannot exceed 300 kg"),

  Height: Yup.number()
    .typeError("Height must be a number")
    .min(50, "Height must be at least 50 cm")
    .max(250, "Height cannot exceed 250 cm"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  // .test("is-valid-age", "You must be at least 18 years old", (value) => {
  //   if (!value) return false;
  //   const today = new Date();
  //   const birthDate = new Date(value);
  //   const age = today.getFullYear() - birthDate.getFullYear();
  //   return age >= 18;
  // }),
});

export const createMemberProfile = Yup.object().shape({
  prefix: Yup.string().required("prefix is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last Name is required"),
  profile: Yup.string().required("Profile is required"),
  gender: Yup.string().required("gender is required"),
  Weight: Yup.number()
    .typeError("Weight must be a number")
    .min(1, "Weight must be at least 1 kg")
    .max(300, "Weight cannot exceed 300 kg"),

  Height: Yup.number()
    .typeError("Height must be a number")
    .min(50, "Height must be at least 50 cm")
    .max(250, "Height cannot exceed 250 cm"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  // .test("is-valid-age", "You must be at least 18 years old", (value) => {
  //   if (!value) return false;
  //   const today = new Date();
  //   const birthDate = new Date(value);
  //   const age = today.getFullYear() - birthDate.getFullYear();
  //   return age >= 18;
  // }),
});

export const emailValidation = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});
export const mobileValidaiton = Yup.object().shape({
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
      "Please Enter Valid Phone Number"
    ),
});
export const DieasesModal = Yup.object().shape({
  dieases: Yup.string().required("Dieases is required"),
  // symptoms: Yup.string().required("symptoms is required"),
  description: Yup.string().required("Description is required"),
});
