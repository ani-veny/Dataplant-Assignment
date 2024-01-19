export interface Data {
  _id:string;
  title: string;
  description: string;
  subject:string;
  frequency:string;
  repeat:string;
  time:string;
};

export const dummy: Data[] = [
  { 
    _id : '1',
    title: "omkar",
    description: "this is new",
    subject: " learn type srcipt",
    frequency: "Daily",
    repeat: "",
    time: "11:40",
  },
  {
    _id:"2",
    title: "omkar",
    description: "this is new",
    subject: " learn type srcipt",
    frequency: "Weekly",
    repeat: 'mon,tue',
    time: "11:40",
  },
  { 
    _id:"3",
    title: "omkar",
    description: "this is new",
    subject: " learn type srcipt",
    frequency: "Monthly",
    repeat: "At Monday",
    time: "11:40",
  },
];
