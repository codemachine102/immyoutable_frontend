import React, { FC, HTMLAttributes, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//styles
import './styles.scss';
//context
import { useProfile } from '../../context';
//types
import { WatchListItemType } from '../../context/profile/types';
//components
import { DndListItem } from './DndListItem';

interface WatchListItemExtendedType extends WatchListItemType {
  checked: boolean;
}

interface DndListProps extends HTMLAttributes<HTMLDivElement> {
  searchedCrypto: any[];
  items: WatchListItemExtendedType[];
  setItems?: any;
  searchText?: string;
  defaultCrypto?: any[];
}

export const DndList: FC<DndListProps> = ({
  searchedCrypto,
  items,
  setItems,
  searchText,
  defaultCrypto,
}) => {
  const profile = useProfile();
  // const [items, setItems] = useState<WatchListItemType[]>([]);

  const moveListItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = items[dragIndex];
      const hoverItem = items[hoverIndex];
      // Swap places of dragItem and hoverItem in the items array
      // console.log('dragItem', dragIndex, dragItem);
      // console.log('hoverItem', hoverIndex, hoverItem);

      setItems((oldItems: WatchListItemType[]) => {
        const updatedItems = [...oldItems];
        updatedItems[dragIndex] = hoverItem;
        updatedItems[hoverIndex] = dragItem;
        return updatedItems;
      });
    },
    [items]
  );

  const addCoinToWatchList = async (id: number) => {
    const res = await profile.addWatchList(id);
    // console.log('addCoinToWatchList res', res);
    return res;
  };
  const deleteCoinFromWatchList = async (id: number) => {
    const res = await profile.deleteWatchList(id);
    // console.log('deleteCoinFromWatchList res', res);
    return res;
  };

  const updateCoin = async (id?: number, checked?: boolean) => {
    if (!id) return;
    if (checked) {
      await addCoinToWatchList(id);
    } else {
      await deleteCoinFromWatchList(id);
    }

    profile.getWatchListAll();
  };

  useEffect(() => {
    // console.log('profile.userWatchList', profile.userWatchList);

    if (!profile.userWatchList) {
      profile.getWatchListAll();
    } else {
      const itemsWithChecked = profile.userWatchList.rows.map((coin) => ({
        ...coin,
        checked: true,
      }));
      // console.log('itemsWithChecked', itemsWithChecked);
      setItems(itemsWithChecked);
    }
  }, [profile]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='dndList'>
        {/* {searchedCoins && <div>{newCoin.name}</div>} */}
        {searchedCrypto && searchText ? (
          searchedCrypto.map((item, index) => (
            <DndListItem
              key={`dndList-${item.id}-${index}`}
              index={index}
              text={item.name}
              // moveListItem={moveListItem}
              updateListItem={updateCoin}
              item={item}
              isSearched
            />
          ))
        ) : (
          <>
            {items.map((item, index) => (
              <DndListItem
                key={`dndList-${item.id}-${index}`}
                index={index}
                text={item.marketInfo.name}
                moveListItem={moveListItem}
                updateListItem={updateCoin}
                item={item}
              />
            ))}
            {defaultCrypto &&
              defaultCrypto.map((item, index) => {
                return (
                  <DndListItem
                    key={`dndList-${item.id}-${index}`}
                    index={index}
                    text={item.name}
                    // moveListItem={moveListItem}
                    updateListItem={updateCoin}
                    item={item}
                    isSearched
                    hideIfChecked
                  />
                );
              })}
          </>
        )}
      </div>
    </DndProvider>
  );
};
