import React, { FC, HTMLAttributes, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { Button } from '../Button';
import { UserSubscriptionPlanType } from '../../context/auth/types';
import { SubsriptionPlanType } from '../../context/common/types';
import { subscrPlans } from '../../constants';

export interface BillingPlanType extends HTMLAttributes<HTMLDivElement> {}

interface BillingPlanProps extends BillingPlanType {
  className?: string;
  plan: SubsriptionPlanType;
  // currentPlan: UserSubscriptionPlanType | null;
  // setCurrentPlan: React.Dispatch<React.SetStateAction<BillingPlanType>>;
  currentPlan: any | null;
  // setCurrentPlan: React.Dispatch<React.SetStateAction<any>>;
}

export const BillingPlan: FC<BillingPlanProps> = ({
  className,
  plan,
  currentPlan,
  // setCurrentPlan,
}) => {
  const buttonText = useMemo(
    () =>
      plan.id === currentPlan?.subscriptionPlanId
        ? `Cancel ${currentPlan?.subscriptionPlan?.plan}`
        : 'Purchase',
    [currentPlan, plan]
  );

  const listTitle = useMemo(
    () =>
      plan.plan === subscrPlans.premium.plan
        ? 'All the features of Essential plus:'
        : plan.plan === subscrPlans.scholar.plan
        ? 'All the features of Premium plus:'
        : '',
    [plan]
  );

  const isBasic = useMemo(
    () => plan.plan === subscrPlans.basic.plan,
    [plan, subscrPlans]
  );
  const isEssential = useMemo(
    () => plan.plan === subscrPlans.essential.plan,
    [plan, subscrPlans]
  );
  const isPremium = useMemo(
    () => plan.plan === subscrPlans.premium.plan,
    [plan, subscrPlans]
  );
  const isScholar = useMemo(
    () => plan.plan === subscrPlans.scholar.plan,
    [plan, subscrPlans]
  );

  return (
    <div
      className={cn(
        'billingPlan',
        (isPremium || isScholar) && 'billingPlan--premium',
        className
      )}
    >
      {!isBasic && (
        <div
          className={cn(
            'billingPlan__title',
            isPremium && 'billingPlan__title--premium',
            isScholar && 'billingPlan__title--scholar'
          )}
        >
          <h3>{plan.plan}</h3>
          {currentPlan?.subscriptionPlanId === plan.id && <span>Current</span>}
        </div>
      )}
      <div
        className={cn(
          'billingPlan__price',
          isBasic && 'billingPlan__price--basic'
        )}
      >
        {plan.price ? (
          <>
            <h4>${plan.price}</h4>
            {!!plan?.priceAfter && (
              <p>
                <span>${plan?.priceAfter}</span> each year after
              </p>
            )}
          </>
        ) : (
          <>
            <h4>Free</h4>
            {currentPlan?.subscriptionPlanId === plan.id && (
              <span>Current</span>
            )}
          </>
        )}
      </div>
      <ul className='billingPlan__list'>
        {(isPremium || isScholar) && (
          <div className='billingPlan__titleList'>{listTitle}</div>
        )}
        {plan.subscriptionPlanInfos?.map((el, index) => (
          <li key={`billingPlan__listItem--${el.id}`}>
            <div className='billingPlan__listTitle'>{el.title}</div>
            {el.description && (
              <div className='billingPlan__listText'>
                {el.description}
                {/* {el.description?.map((text, index) => (
                  <p className='' key={`billingPlan__listText--${index}`}>
                    {text}
                  </p>
                ))} */}
              </div>
            )}
          </li>
        ))}
      </ul>
      {!isBasic && (
        <Button
          buttonType={
            currentPlan?.subscriptionPlanId === plan.id ? 'outline' : 'full'
          }
          color={
            (isPremium || isScholar) &&
            currentPlan?.subscriptionPlanId !== plan.id
              ? 'blueGradient'
              : 'blue'
          }
          // onClick={() => setCurrentPlan(plan)}
          text={buttonText}
          className='billingPlan__button'
        />
      )}
    </div>
  );
};
