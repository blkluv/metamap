export interface Event {
  _id?: number;
  title: string;
  start: string;
  end: string;
  category: string;
  location: string;
  coordinates: { lng: number; lat: number };
  description: string;
  logo: string;
  creator?: string;
}

export interface EventsContext {
  events: Event[];
  onAddEvent?: (event: Event) => Promise<void>;
}

export interface EventHeader {
  _id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  logo: string;
}

export interface DateTimePickerProps {
  label: string;
}
