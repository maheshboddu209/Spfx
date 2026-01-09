import * as React from 'react';
import { TextField, PrimaryButton } from '@fluentui/react';
import { PersonalInfo } from './../models/FormModels';
import styles from '../Nav.module.scss';

interface Props {
  data: PersonalInfo;
  onChange: (d: PersonalInfo) => void;
  onNext: () => void;
 
  
}

const PersonalInfoForm = ({
  data,
  onChange,
  onNext
}: Props): JSX.Element => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = emailRegex.test(data.email);
  const isValid =
    data.firstName.trim() &&
    data.lastName.trim() &&
    isEmailValid;

  return (
    <>
      <TextField
        label="First Name"
        value={data.firstName}
        placeholder="Enter your First name"
        onChange={(_, v) =>
          onChange({ ...data, firstName: v || '' })
        }
      />

      <TextField
        label="Last Name"
        value={data.lastName}
        placeholder="Enter your last name"
        onChange={(_, v) =>
          onChange({ ...data, lastName: v || '' })
        }
      />

      <TextField
        label="Email"
        value={data.email}
        placeholder="Enter your email name"
        onChange={(_, v) =>
          onChange({ ...data, email: v || '' })
        }
      />
      
      <PrimaryButton
        text="Next"
        // styles={{ root: { marginTop: 20 } }}
        className={styles.nextButton}
        onClick={onNext}
        disabled={!isValid}
      />
    </>
  );
};

export default PersonalInfoForm;
