import * as React from 'react';
import { TextField, PrimaryButton } from '@fluentui/react';
import { Documents } from './../models/FormModels';
import styles from '../Nav.module.scss';

interface Props {
  data: Documents;
  onChange: (d: Documents) => void;
  onNext: () => void;
  onBack: () => void;
  maxLength?: number;
}

const DocumentsForm = ({
  data,
  onChange,
  onNext,
  onBack,
  maxLength = 12
}: Props): JSX.Element => {

  const isValid = data.aadhaar && data.pan;
  const hasAlphabets = /[a-z]/i.test(data.aadhaar);

  return (
    <>
      <TextField
        label="Aadhaar"
        value={data.aadhaar}
        maxLength={maxLength}
        placeholder="Enter your Aadhaar number"
        errorMessage={
        hasAlphabets ? 'Only numbers are allowed' : undefined
        }
         onChange={(_, v) => {
          const rawValue = v || '';
          const numericValue = rawValue.replace(/\D/g, '').slice(0, maxLength);
          onChange({ ...data, aadhaar: numericValue });
        }}
      />

      <TextField
        label="PAN"
        value={data.pan}
        placeholder="Enter your Pan Number"
        onChange={(_, v) => onChange({ ...data, pan: v || '' })}
      />

      <PrimaryButton text="Back" onClick={onBack} />
      <PrimaryButton
        text="Next"
        className={styles.nextButton}
        // styles={{ root: { marginTop: 20 } }}
        onClick={onNext}
        disabled={!isValid}
      />
    </>
  );
};

export default DocumentsForm;
