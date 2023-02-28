import { get } from "lodash";

export const getStoreData = (path: string, initialData: any) => {
  const persistedStore = JSON.parse(
    localStorage.getItem("geoevents")
      ? JSON.parse(JSON.stringify(localStorage.getItem("geoevents")))
      : null
  );
  const storeDestination = get(persistedStore, path);

  return storeDestination ? storeDestination : initialData;
};
