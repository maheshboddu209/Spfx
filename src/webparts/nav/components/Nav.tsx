import * as React from 'react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import BankDetailsForm from './forms/BankDetailsForm';
import DocumentsForm from './forms/DocumentsForm';
import ReviewSubmit from './forms/ReviewSubmit';
import {
  PersonalInfo,
  BankDetails,
  Documents
} from './models/FormModels';
 
interface Props {
  description: string;
}

const Nav = ({ description }: Props): JSX.Element => {
  const [step, setStep] = React.useState(0);

  const [personalInfo, setPersonalInfo] = React.useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [bankDetails, setBankDetails] = React.useState<BankDetails>({
    accountNumber: '',
    ifsc: ''
  });

  const [documents, setDocuments] = React.useState<Documents>({
    aadhaar: '',
    pan: ''
  });

  switch (step) {
    case 0:
      return (
        <PersonalInfoForm
          data={personalInfo}
          onChange={setPersonalInfo}
          onNext={() => setStep(1)}
        />
      );

    case 1:
      return (
        <BankDetailsForm
          data={bankDetails}
          onChange={setBankDetails}
          onNext={() => setStep(2)}
          onBack={() => setStep(0)} value={''}        />
      );

    case 2:
      return (
        <DocumentsForm
          data={documents}
          onChange={setDocuments}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      );

    case 3:
      return (
        <ReviewSubmit
          personalInfo={personalInfo}
          bankDetails={bankDetails}
          documents={documents}
          onBack={() => setStep(2)}
          onSuccess={() => {
            // RESET ALL DATA
            setPersonalInfo({
              firstName: '',
              lastName: '',
              email: ''
            });
    
            setBankDetails({
              accountNumber: '',
              ifsc: ''
            });
    
            setDocuments({
              aadhaar: '',
              pan: ''
            });
    
            // GO BACK TO FIRST FORM
            setStep(0);
          }}
        />
      );

    default:
      <></>;
  }

  return <></>;
};

export default Nav;
