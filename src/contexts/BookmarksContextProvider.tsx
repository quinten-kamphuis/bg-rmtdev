import React, { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemContentType } from "../lib/types";

type Props = {
  children: React.ReactNode;
};

export const BookmarksContext = createContext<{
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemContentType[] | null;
  loading: boolean;
} | null>(null);

export default function BookmarksContextProvider({ children }: Props) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const [bookmarkedJobItems, loading] = useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((i) => i !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        loading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
