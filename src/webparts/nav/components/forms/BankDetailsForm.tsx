import * as React from 'react';
import { TextField, PrimaryButton } from '@fluentui/react';
import { BankDetails } from './../models/FormModels';
import styles from '../Nav.module.scss';

interface Props {
  data: BankDetails;
  onChange: (d: BankDetails) => void;
  onNext: () => void;
  onBack: () => void;
  value: string;
  maxLength?: number;
}

const BankDetailsForm = ({
  data,
  onChange,
  onNext,
  onBack, value,maxLength = 8
}: Props): JSX.Element => {

  const isValid =
    data.accountNumber.trim() &&
    data.ifsc.trim();
    const IFSC_PREFIX = 'IFSC';

    const isInvalidIFSC =
      !data.ifsc.startsWith(IFSC_PREFIX) ||
      data.ifsc.length < 4;

  const hasAlphabets = /[a-z]/i.test(value);
  return (
    <>
      <TextField
        label="Account Number"
        value={data.accountNumber}
        maxLength={maxLength}
        placeholder="Enter your Account number"
        errorMessage={
        hasAlphabets ? 'Only numbers are allowed' : undefined
        }
         onChange={(_, v) => {
          const rawValue = v || '';
          const numericValue = rawValue.replace(/\D/g, '').slice(0, maxLength);
          onChange({ ...data, accountNumber: numericValue });
        }}
      />

      <TextField
        label="IFSC Code"
        value={data.ifsc}
        placeholder="Enter your IFSC code"
        errorMessage={
          isInvalidIFSC ? 'IFSC code must start with IFSC' : undefined
        }
        onChange={(_, v) => {
          let value = (v || '').toUpperCase();
      
          // Always enforce IFSC prefix
          if (!value.startsWith(IFSC_PREFIX)) {
            value = IFSC_PREFIX;
          }
      
          // Allow only alphanumeric after IFSC
          const suffix = value
            .slice(4)
            .replace(/[^A-Z0-9]/g, '');
      
          onChange({
            ...data,
            ifsc: IFSC_PREFIX + suffix
          });
        }}
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

export default BankDetailsForm;
