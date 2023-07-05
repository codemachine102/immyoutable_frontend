import React, { HTMLAttributes, FC, useState, useEffect } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//axios
import axiosApiInstance from '../../../api/axios';
import { useAuth } from '../../../context';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'm1-link': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface MeasureOneDataProps {
  accessToken?: string;
  idvId?: string;
}

interface ProfileMeasureOneProps extends HTMLAttributes<HTMLDivElement> {
  setComplVerif: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileMeasureOne: FC<ProfileMeasureOneProps> = ({
  setComplVerif,
}) => {
  const auth = useAuth();
  const [measureOneDate, setMeasureOneDate] = useState<MeasureOneDataProps>({});
  const [error, setError] = useState('');

  const getMeasureOneAccessToken = async () => {
    try {
      setError('');
      const { data } = await axiosApiInstance.get(
        `private/user/degree-verfication/request`
      );
      console.log('getMeasureOneAccessToken data', data);
      if (data?.success) {
        setMeasureOneDate(data?.data);
        // startVerification(data?.data);
      } else {
        setError('SErver Error');
      }
      return data?.data?.token;
    } catch (e: any) {
      setError(e?.response?.data?.message);
      console.log('getMeasureOneAccessToken error', e);
    }
  };

  useEffect(() => {
    if (
      !measureOneDate ||
      !measureOneDate?.accessToken ||
      !measureOneDate?.idvId
    ) {
      getMeasureOneAccessToken();
    } else {
      startVerification(measureOneDate);
    }
  }, [measureOneDate]);

  var config = {
    link_id: 'lnk_2Kjht2Zz4PJlOZ3cgriB6OanbsR',
    access_key: '',
    host_name: 'api.measureone.com',
    branding: {
      styles: {
        primary_dark: '#0882d9',
        // primary_light: '#f43655',
        secondary_color: '#f0f0f0',
        min_height: '450px',
        font_family: '"Codec Pro", sans-serif',
      },
    },
    data: {
      individual_id: '',
    },
    options: {
      display_profile: true,
    },
  };

  const startVerification = async (data: MeasureOneDataProps) => {
    // console.log('startVerification', data);

    // Take reference to widget
    const m1_widget = document.querySelector('m1-link');

    if (data.accessToken) {
      config.access_key = data.accessToken;
    }
    if (data.idvId) {
      config.data.individual_id = data.idvId;
    }

    // console.log('CONFIG', config);

    // Add configuration
    m1_widget?.setAttribute('config', JSON.stringify(config));

    // Add event listeners
    m1_widget?.addEventListener('screenChange', (event) => {
      // Perform operation on screen change
      // console.log(event);
    });
  };

  // Select the target node
  const targetNode = document.querySelector('m1-link');

  // Options for the observer (which mutations to observe)
  const config2 = { childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList: any, observer: any) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (let node of mutation.addedNodes) {
          if (node.nodeName === 'M1-NOTIFICATION-SCREEN') {
            if (node.classList.contains('ng-star-inserted')) {
              setComplVerif(true);
              setPendingStatus();
            }
          }
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  useEffect(() => {
    if (targetNode?.shadowRoot) {
      observer.observe(targetNode?.shadowRoot, config2);
    }
  }, [targetNode]);

  const setPendingStatus = async () => {
    try {
      const { data } = await axiosApiInstance.post(
        `private/user/degree-verfication/set-pending-status`
      );
      console.log('setPendingStatus data', data);
      if (data?.success) {
        auth.getUserFn();
      } else {
      }
      return data?.data?.token;
    } catch (e: any) {
      setError(e?.response?.data?.message);
      console.log('setPendingStatus error', e);
    }
  };

  return (
    <div
      className={cn('profileMeasureOne', error && 'profileMeasureOne--error')}
    >
      {!error ? (
        <m1-link></m1-link>
      ) : (
        <div className='profileMeasureOne__error mb32'>{error}</div>
      )}
    </div>
  );
};
