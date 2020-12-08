import * as yup from 'yup'

export const schemaSU = yup.object().shape({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is a required'),
    password: yup
      .string()
      .required('Password is a required')
      .min(6, 'password must be minimum 6 characters')
      .oneOf([yup.ref('confrimpassword')], 'Passwords must match'),
    confrimpassword: yup
      .string()
      .required('Confrim Password is a required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    remember: yup.boolean(),
  })

  export const schemaSI = yup.object().shape({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is a required'),
    password: yup
      .string()
      .required('Password is a required')
      .min(6, 'password must be minimum 6 characters'),
    remember: yup.boolean(),
  })
