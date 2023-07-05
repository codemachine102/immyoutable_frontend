import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
//assets
import {
  facebookIcon,
  instagramIcon,
  linkedinIcon,
  linkIcon,
  shareIcon,
} from '../../assets/icons';
//hooks
import { useOnClickOutside } from '../../hooks';

interface ShareButtonProps extends HTMLAttributes<HTMLDivElement> {
  shareUrl?: string;
}

export const ShareButton: FC<ShareButtonProps> = ({ className, shareUrl }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setDropdownOpen(false));

  const copyToClipboard = useCallback(() => {
    if (!navigator.clipboard || !shareUrl) {
      return null;
    }

    navigator.clipboard.writeText(shareUrl).then(
      () => {
        // console.log('ok');
      },
      (err) => {
        // console.log('not ok');
      }
    );
  }, [shareUrl]);

  const shareData = {
    title: 'title',
    text: 'text',
    url: shareUrl,
  };

  const share = () => {
    if (navigator.share && shareUrl) {
      navigator
        .share(shareData)
        // .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  };

  const shareFacebook = (url?: string) => {
    if (window && url) {
      window
        .open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
        ?.focus();
    }
  };

  const shareLinkedin = (url?: string) => {
    if (window && url)
      window
        .open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}
    `,
          '_blank'
        )
        ?.focus();
  };

  return (
    <div className={cn('shareButton', className)} ref={ref}>
      <Button
        text='Share'
        buttonType='outline'
        color='blue'
        beforeIcon={shareIcon}
        onClick={() => setDropdownOpen((prev) => !prev)}
        className='shareButton__button'
      />
      <Dropdown
        dropdownOpen={dropdownOpen}
        items={[
          {
            text: (
              <>
                <img src={linkIcon} alt='link' />
                Copy link
              </>
            ),
            activeText: (
              <>
                <img src={linkIcon} alt='link' />
                Copied
              </>
            ),
            onClick: () => copyToClipboard(),
          },
          {
            text: (
              <>
                <img src={linkedinIcon} alt='linkedin' />
                Share on Linkedin
              </>
            ),
            onClick: () => shareLinkedin(shareUrl),
          },
          {
            text: (
              <>
                <img src={instagramIcon} alt='instagram' />
                Share on Instagram
              </>
            ),
            onClick: () => {},
          },
          {
            text: (
              <>
                <img src={facebookIcon} alt='facebook' />
                Share on Facebook
              </>
            ),
            onClick: () => shareFacebook(shareUrl),
          },
        ]}
        itemClassname='shareButton__link'
      />
    </div>
  );
};
