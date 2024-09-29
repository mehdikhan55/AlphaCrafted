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
      description: yup.string(),
    })
  ),
  skills: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Skill is required'),
    })
  ),
  education: yup.array().of(
    yup.object().shape({
      degree: yup.string().required('Degree is required'),
      institution: yup.string().required('Institution is required'),
      description: yup.string(),
    })
  ),
  projects: yup.array().of(
    yup.object().shape({
      title: yup.string().required('Project title is required'),
      description: yup.string().required('Project description is required'),
    })
  ),
  certifications: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Certification name is required'),
      authority: yup.string().required('Certification authority is required'),
      description: yup.string(),
    })
  ),
});

export default schema;
