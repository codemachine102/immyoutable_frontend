import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

//styles
import './styles.scss';

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  dropdownOpen?: boolean;
  items?: any[];
  itemClassname?: string;
}

export const Dropdown: FC<DropdownProps> = ({
  className,
  dropdownOpen = false,
  items = [],
  itemClassname = '',
}) => {
  const linkDropdownClassnames = ({ isActive }: { isActive?: boolean }) =>
    cn(
      'dropdown__link',
      isActive ? 'dropdown__link--active' : undefined,
      itemClassname
    );
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    setActive(null);
  }, [dropdownOpen]);

  const renderText = useCallback(
    (item: any, index: number) =>
      active === index ? item?.activeText || item?.text : item?.text,
    [active]
  );

  return (
    <div
      className={cn('dropdown', dropdownOpen && 'dropdown--open', className)}
    >
      {items?.map((item, index) => {
        if (item.route) {
          return (
            <NavLink
              to={item.route}
              className={linkDropdownClassnames}
              key={`dropdown-${index}`}
            >
              {renderText(item, index)}
            </NavLink>
          );
        } else if (item.onClick) {
          return (
            <div
              onClick={() => {
                item.onClick();
                setActive(index);
              }}
              className={cn(
                'dropdown__link',
                active === index && 'dropdown__link--active',
                itemClassname
              )}
              key={`dropdown-${index}`}
            >
              {renderText(item, index)}
            </div>
          );
        } else {
          return (
            <div
              className={cn(
                'dropdown__link',
                'dropdown__link--inactive',
                itemClassname
              )}
              key={`dropdown-${index}`}
            >
              {renderText(item, index)}
            </div>
          );
        }
      })}
    </div>
  );
};
