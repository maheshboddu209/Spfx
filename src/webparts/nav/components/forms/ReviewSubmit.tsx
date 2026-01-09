import * as React from 'react';
import { TextField, PrimaryButton, Stack } from '@fluentui/react';
import { sp } from '@pnp/sp/presets/all';
import {
  PersonalInfo,
  BankDetails,
  Documents
} from './../models/FormModels';

interface Props {
  personalInfo: PersonalInfo;
  bankDetails: BankDetails;
  documents: Documents;
  onBack: () => void;
  onSuccess: () => void;
}

const ReviewSubmit = ({
  personalInfo,
  bankDetails,
  documents,
  onSuccess,
  onBack
}: Props): JSX.Element => {

  const submitAll = async (): Promise<void> => {
    try {
      await sp.web.lists.getByTitle('EmployeePersonalInfo').items.add({
        FirstName: personalInfo.firstName,
        Title: personalInfo.lastName,
        Email_x003a_email: personalInfo.email
      });

      await sp.web.lists.getByTitle('EmployeeBankDetails').items.add({
        AccountNumber: bankDetails.accountNumber,
        IFSC: bankDetails.ifsc
      });

      await sp.web.lists.getByTitle('EmployeeDocuments').items.add({
        Adhaar: documents.aadhaar,
        Pan: documents.pan
      });

      alert('Submitted successfully');
      onSuccess();
    } catch (e) {
      console.error(e);
      alert('Submission failed');
    }
  };



  return (
    <>
      {/* <pre>{JSON.stringify({ personalInfo, bankDetails, documents }, null, 2)}</pre> */}
      <Stack tokens={{ childrenGap: 20 }}>
      <h3>Personal Information</h3>
      <TextField label="First Name"  value={personalInfo.firstName} readOnly />
      <TextField label="Last Name"  value={personalInfo.lastName} readOnly />
      <TextField label="Email"  value={personalInfo.email} readOnly />
      <h3>Bank Details</h3>
      <TextField label="Account Number" value={bankDetails.accountNumber} readOnly />
      <TextField label="IFSC Code"  value={bankDetails.ifsc} readOnly />
      <h3>Documents</h3>
      <TextField label="Aadhaar"  value={documents.aadhaar} readOnly />
      <TextField label="PAN"  value={documents.pan} readOnly />
      <PrimaryButton text="Back" onClick={onBack} />
      <PrimaryButton text="Submit All" onClick={submitAll} />
      </Stack>
    </>
  );
};

export default ReviewSubmit;
