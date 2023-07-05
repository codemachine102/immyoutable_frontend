import React, { useEffect, useState } from 'react';

//styles
import './styles.scss';
//components
import { BillingPlan, Button } from '../../components';
//constants
import { links } from '../../constants';
//context
import { useAuth, useCommon } from '../../context';

export const Billing = () => {
  const common = useCommon();
  const auth = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const getSubscriptionPlans = async () => {
    await common.getSubsriptionsPlans();
  };

  useEffect(() => {
    // console.log('common.subscriptionPlans', common.subscriptionPlans);
    if (!common.subscriptionPlans) {
      getSubscriptionPlans();
    }
  }, [common.subscriptionPlans]);

  // const [currentPlan, setCurrentPlan] = useState<any>({});

  return (
    <div className='profile'>
      <h2 className='profile__title profileBilling__title'>Billing details</h2>
      <div className='profileBilling'>
        <ul className='profileBilling__info'>
          <li>
            <h3>Renewal date</h3>
            <Button text='Purchase' buttonType='text' color='blueGradient' />
          </li>
          <li>
            <div className='profileBilling__infoTitle'>
              <h3>Card on file</h3>
              {paymentMethod && (
                <Button
                  text='Change'
                  buttonType='text'
                  onClick={() => setPaymentMethod(null)}
                />
              )}
            </div>
            {paymentMethod ? (
              <span className='profileBilling__infoCard'>{paymentMethod}</span>
            ) : (
              <Button
                text='Add payment method'
                buttonType='text'
                onClick={() => setPaymentMethod('XXXX XXXX XXXX 8923')}
              />
            )}
          </li>
        </ul>
        <div className='profileBilling__plans'>
          <h2 className='profileBilling__plansTitle'>For Alumni</h2>
          <div className='profileBilling__plansContainer'>
            {common.subscriptionPlans &&
              common.subscriptionPlans.map((plan, index) => (
                <BillingPlan
                  key={`profileBilling__plan--${index}`}
                  className='profileBilling__plan'
                  plan={plan}
                  currentPlan={auth.userSubscrPlan}
                  // currentPlan={currentPlan}
                  // setCurrentPlan={setCurrentPlan}
                />
              ))}
            {/* {plans.map((plan, index) => (
            <BillingPlan
              key={`profileBilling__plan--${index}`}
              className='profileBilling__plan'
              {...plan}
              plan={plan}
              currentPlan={currentPlan.type}
              setCurrrentPlan={setCurrrentPlan}
            />
          ))} */}
          </div>
        </div>
        <div className='profileBilling__universities'>
          <h2 className='profileBilling__plansTitle'>For universities</h2>
          <div className='profileBilling__universitiesContainer'>
            <p>
              For universities and colleges seeking campus wide premium features
              for students, graduates, and alumni
            </p>
            <Button text='Book a demo' href={links.calendly} />
          </div>
        </div>
      </div>
    </div>
  );
};
