import { useState } from 'react';
import { buildMembershipExperience, defaultMembershipExperience } from './data/mockData';
import Dashboard from './pages/Dashboard';
import PendingApprovalScreen from './screens/PendingApprovalScreen';
import PreRegistrationScreen from './screens/PreRegistrationScreen';
import { registerMembership } from './services/membershipRegistration';
import './styles/globals.css';
import type { AppStage, PreRegistrationData } from './types/app';

function App() {
  const [stage, setStage] = useState<AppStage>('preregistration');
  const [preregistrationData, setPreregistrationData] =
    useState<PreRegistrationData | null>(null);
  const [registrationError, setRegistrationError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState('');
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false);

  if (stage === 'preregistration') {
    return (
      <PreRegistrationScreen
        currentStage={stage}
        initialData={preregistrationData}
        isSubmitting={isSubmittingRegistration}
        submitError={registrationError}
        submitSuccess={registrationSuccess}
        onSubmit={async (data) => {
          setRegistrationError('');
          setRegistrationSuccess('');
          setIsSubmittingRegistration(true);

          try {
            const result = await registerMembership(data);
            setRegistrationSuccess(
              result.folio
                ? `Solicitud registrada. Folio de control: ${result.folio}.`
                : 'Solicitud registrada correctamente.',
            );
          } catch (error) {
            setRegistrationError(
              error instanceof Error
                ? error.message
                : 'No se pudo registrar la membresia.',
            );
            setIsSubmittingRegistration(false);
            return;
          }

          setPreregistrationData(data);
          setStage('validation');
          setIsSubmittingRegistration(false);
        }}
      />
    );
  }

  if (
    (stage === 'validation' || stage === 'payment' || stage === 'confirmation') &&
    preregistrationData
  ) {
    return (
      <PendingApprovalScreen
        currentStage={stage}
        data={preregistrationData}
        onBack={() => {
          if (stage === 'validation') {
            setStage('preregistration');
            return;
          }

          if (stage === 'payment') {
            setStage('validation');
            return;
          }

          setStage('payment');
        }}
        onContinue={() => {
          if (stage === 'validation') {
            setStage('payment');
            return;
          }

          if (stage === 'payment') {
            setStage('confirmation');
            return;
          }

          setStage('membership');
        }}
      />
    );
  }

  const membershipExperience = preregistrationData
    ? buildMembershipExperience(preregistrationData)
    : defaultMembershipExperience;

  return (
    <Dashboard membershipExperience={membershipExperience} />
  );
}

export default App;
