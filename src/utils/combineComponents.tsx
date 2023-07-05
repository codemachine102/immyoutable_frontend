import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const combineComponents = (...components: FC<Props>[]): FC => {
  return components.reduce(
    (AccumulatedComponents: any, CurrentComponent: FC<Props>) => {
      return ({ children }: any): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};
