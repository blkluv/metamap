import { cleanup } from "@testing-library/react";
import { setupStore } from "./utils/setStore";
import {
  addEvent,
  deleteEvent,
  getEvents,
  joinEvent,
  rateEvent,
} from "../store/events";
import { testEvent } from "./mocks/event";

describe("EVENTS: get / create / rate / join / delete", () => {
  let store: any;

  beforeAll(async () => {
    store = setupStore({});
  });

  afterAll(() => {
    cleanup();
  });

  const events = () => store.getState().events.data;

  test("There should be no event available.", async () => {
    await store.dispatch(getEvents());

    expect(events().events).toEqual([]);
  });

  test("User should be able to add an event.", async () => {
    await store.dispatch(addEvent(testEvent));

    expect(events().events).toEqual([testEvent]);
  });

  test("User should be able to rate an event.", async () => {
    await store.dispatch(rateEvent({ id: "testEventId", rating: 3 }));

    expect(events().events[0].rating.rates[0]).toEqual({
      _id: "testUserId2",
      rating: 3,
    });
  });

  test("User should be able to join an event.", async () => {
    await store.dispatch(joinEvent("testEventId"));

    expect(events().events[0].participants).toEqual([
      { _id: "testUserId", name: "testUser" },
    ]);
  });

  test("User should be able to delete it's event.", async () => {
    await store.dispatch(deleteEvent("testEventId"));

    expect(events().events).toEqual([]);
  });
});
