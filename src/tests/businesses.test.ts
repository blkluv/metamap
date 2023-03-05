import { cleanup } from "@testing-library/react";
import { setupStore } from "./utils/setStore";
import { testBusiness } from "./mocks/business";
import {
  addBusiness,
  deleteBusiness,
  getBusinesses,
  likeBusiness,
  rateBusiness,
} from "../store/businesses";

describe("BUSINESSES: get / create / like / rate / delete", () => {
  let store: any;

  beforeAll(async () => {
    store = setupStore({});
  });

  afterAll(() => {
    cleanup();
  });

  const businesses = () => store.getState().businesses.data;

  test("Business list should be empty at the beginning.", async () => {
    await store.dispatch(getBusinesses());

    expect(businesses().businesses).toEqual([]);
  });

  test("User should be able to add a business.", async () => {
    await store.dispatch(addBusiness(testBusiness));

    expect(businesses().businesses).toEqual([testBusiness]);
  });

  test("User should be able to rate a business.", async () => {
    await store.dispatch(rateBusiness({ id: "testBusinessId", rating: 3 }));

    expect(businesses().businesses[0].rating.rates[0]).toEqual({
      _id: "testUserId",
      rating: 3,
    });
  });

  test("User should be available to like a business.", async () => {
    await store.dispatch(likeBusiness("testBusinessId"));

    expect(businesses().businesses[0].likes[0]).toEqual({
      _id: "testUserId",
      name: "testUser",
    });
  });

  test("User should be able to delete a business.", async () => {
    await store.dispatch(deleteBusiness("testBusinessId"));

    expect(businesses().businesses).toEqual([]);
  });
});
