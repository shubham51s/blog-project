import { createContext, useState } from "react";
import { useRequestHandler } from "../hooks/requestHandler";

const ListContext = createContext();

const ListProvider = ({ children }) => {
  const { requestHandler } = useRequestHandler();
  const [myLists, setMyLists] = useState([]);
  const [isListLoader, setIsListLoader] = useState(true);

  const fetchMyLists = async () => {
    setIsListLoader(true);
    try {
      const response = await requestHandler("/list");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.lists) {
        setMyLists(result.data.lists);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsListLoader(false);
    }
  };

  const addNewListInArr = (newList) => {
    setMyLists((prev) => [prev[0], { ...newList }, ...prev.slice(1)]);
  };

  const deleteListFromArr = (listId) => {
    setMyLists((prev) => prev.filter((item) => item._id !== listId));
  };

  const updateListItemInArr = (list) => {
    setMyLists((prev) => prev.map((item) => (item._id === list._id ? list : item)));
  };

  const makeListItemPublic = (listId) => {
    setMyLists((prev) => prev.map((item) => (item._id === listId ? { ...item, isPrivate: false } : item)));
  };

  const makeListItemPrivate = (listId) => {
    setMyLists((prev) => prev.map((item) => (item._id === listId ? { ...item, isPrivate: true } : item)));
  };

  return <ListContext.Provider value={{ myLists, isListLoader, fetchMyLists, addNewListInArr, deleteListFromArr, updateListItemInArr, makeListItemPublic, makeListItemPrivate }}>{children}</ListContext.Provider>;
};

export { ListContext };
export default ListProvider;
