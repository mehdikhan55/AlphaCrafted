// validationSchema.js
import * as yup from 'yup';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  linkedinURL: yup.string().url('Invalid URL').required('Linkedin URL is required'),
  phone: yup.string().required('Phone Number is required'),
  summary: yup.string().required('Professional Summary is required'),
  experiences: yup.array().of(
    yup.object().shape({
      jobTitle: yup.string().required('Job Title is required'),
      company: yup.string().required('Company is required'),
      description: yup.string().required('Description is required'),
    })
  ),
  skills: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Skill is required'),
    })
  ),
});

export default schema;
