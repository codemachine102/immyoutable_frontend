import React, { FC, useRef, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import cn from 'classnames';

//styles
import './styles.scss';
//icons
import { dragIcon } from '../../assets/icons';
//components
import { Checkbox } from '../Checkbox';
//context
import { useProfile } from '../../context';
//types
import { WatchListItemType } from '../../context/profile/types';

interface WatchListItemExtendedType extends WatchListItemType {
  checked: boolean;
}

export interface CardProps {
  text: string;
  index: number;
  moveListItem?: (dragIndex: number, hoverIndex: number) => void;
  checked?: boolean;
  updateListItem: (itemIndex?: number, checked?: boolean) => void;
  item: WatchListItemExtendedType;
  isSearched?: boolean;
  hideIfChecked?: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const DndListItem: FC<CardProps> = ({
  text,
  index,
  moveListItem,
  updateListItem,
  item,
  isSearched,
  hideIfChecked = false,
}) => {
  const profile = useProfile();
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: 'item',
    item: { index },
    options: {
      dropEffect: 'copy',
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop<DragItem>({
    accept: 'item',
    hover: (item, monitor) => {
      // drop: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      //@ts-ignore
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem && moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef<any>(null);
  const ref2 = useRef<any>(null);

  const dragDropRef: any = dragRef(ref);
  const dragDropRef2: any = previewRef(dropRef(ref2));

  const opacity = isDragging ? 0 : 1;

  const checkIfChecked = useMemo(() => {
    const isSome = profile.userWatchList?.rows.some(
      (coin) => coin?.marketInfo?.id === item?.id
    );
    return isSome || false;
  }, [profile.userWatchList, item?.id]);

  const watchListId = useMemo(() => {
    return profile.userWatchList?.rows.find(
      (coin) => coin?.marketInfo?.id === item?.marketInfo?.id
    )?.id;
  }, [profile.userWatchList, item?.marketInfo?.id, checkIfChecked]);

  // console.log('item', item);
  if (hideIfChecked && isSearched && checkIfChecked) return <></>;
  return (
    <div ref={!isSearched ? dragDropRef2 : null} className='dndList__item'>
      <label className='align-center pointer'>
        <Checkbox
          checked={isSearched ? checkIfChecked : item.checked}
          onChange={(e) => {
            updateListItem(
              isSearched ? (checkIfChecked ? watchListId : item?.id) : item?.id,
              e.target.checked
            );
          }}
          className='mr8'
        />
        <span>{text}</span>
      </label>
      {!isSearched && (
        <div
          ref={dragDropRef}
          style={{
            opacity,
          }}
          className={cn('dndList__itemDrag')}
        >
          <img src={dragIcon} alt='Drag' draggable={false} />
        </div>
      )}
    </div>
  );
};
