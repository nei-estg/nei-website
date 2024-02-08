// const now = new Date();

// export default [
//   {
//     id: 0,
//     title: "All Day Event very long title",
//     allDay: true,
//     start: new Date(2015, 3, 0),
//     end: new Date(2015, 3, 1)
//   },
//   {
//     id: 1,
//     title: "Long Event",
//     start: new Date(2015, 3, 7),
//     end: new Date(2015, 3, 10)
//   },

//   {
//     id: 2,
//     title: "DTS STARTS",
//     start: new Date(2016, 2, 13, 0, 0, 0),
//     end: new Date(2016, 2, 20, 0, 0, 0)
//   },

//   {
//     id: 3,
//     title: "DTS ENDS",
//     start: new Date(2016, 10, 6, 0, 0, 0),
//     end: new Date(2016, 10, 13, 0, 0, 0)
//   },

//   {
//     id: 4,
//     title: "Some Event",
//     start: new Date(2015, 3, 9, 0, 0, 0),
//     end: new Date(2015, 3, 10, 0, 0, 0)
//   },
//   {
//     id: 5,
//     title: "Conference",
//     start: new Date(2015, 3, 11),
//     end: new Date(2015, 3, 13),
//     desc: "Big conference for important people"
//   },
//   {
//     id: 6,
//     title: "Meeting",
//     start: new Date(2015, 3, 12, 10, 30, 0, 0),
//     end: new Date(2015, 3, 12, 12, 30, 0, 0),
//     desc: "Pre-meeting meeting, to prepare for the meeting"
//   },
//   {
//     id: 7,
//     title: "Lunch",
//     start: new Date(2015, 3, 12, 12, 0, 0, 0),
//     end: new Date(2015, 3, 12, 13, 0, 0, 0),
//     desc: "Power lunch"
//   },
//   {
//     id: 8,
//     title: "Meeting",
//     start: new Date(2015, 3, 12, 14, 0, 0, 0),
//     end: new Date(2015, 3, 12, 15, 0, 0, 0)
//   },
//   {
//     id: 9,
//     title: "Happy Hour",
//     start: new Date(2015, 3, 12, 17, 0, 0, 0),
//     end: new Date(2015, 3, 12, 17, 30, 0, 0),
//     desc: "Most important meal of the day"
//   },
//   {
//     id: 10,
//     title: "Dinner",
//     start: new Date(2015, 3, 12, 20, 0, 0, 0),
//     end: new Date(2015, 3, 12, 21, 0, 0, 0)
//   },
//   {
//     id: 11,
//     title: "Planning Meeting with Paige",
//     start: new Date(2015, 3, 13, 8, 0, 0),
//     end: new Date(2015, 3, 13, 10, 30, 0)
//   },
//   {
//     id: 11.1,
//     title: "Inconvenient Conference Call",
//     start: new Date(2015, 3, 13, 9, 30, 0),
//     end: new Date(2015, 3, 13, 12, 0, 0)
//   },
//   {
//     id: 11.2,
//     title: "Project Kickoff - Lou's Shoes",
//     start: new Date(2015, 3, 13, 11, 30, 0),
//     end: new Date(2015, 3, 13, 14, 0, 0)
//   },
//   {
//     id: 11.3,
//     title: "Quote Follow-up - Tea by Tina",
//     start: new Date(2015, 3, 13, 15, 30, 0),
//     end: new Date(2015, 3, 13, 16, 0, 0)
//   },
//   {
//     id: 12,
//     title: "Late Night Event",
//     start: new Date(2015, 3, 17, 19, 30, 0),
//     end: new Date(2015, 3, 18, 2, 0, 0)
//   },
//   {
//     id: 12.5,
//     title: "Late Same Night Event",
//     start: new Date(2015, 3, 17, 19, 30, 0),
//     end: new Date(2015, 3, 17, 23, 30, 0)
//   },
//   {
//     id: 13,
//     title: "Multi-day Event",
//     start: new Date(2015, 3, 20, 19, 30, 0),
//     end: new Date(2015, 3, 22, 2, 0, 0)
//   },
//   {
//     id: 14,
//     title: "Today",
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3))
//   },
//   {
//     id: 15,
//     title: "Point in Time Event",
//     start: now,
//     end: now
//   },
//   {
//     id: 16,
//     title: "Video Record",
//     start: new Date(2015, 3, 14, 15, 30, 0),
//     end: new Date(2015, 3, 14, 19, 0, 0)
//   },
//   {
//     id: 17,
//     title: "Dutch Song Producing",
//     start: new Date(2015, 3, 14, 16, 30, 0),
//     end: new Date(2015, 3, 14, 20, 0, 0)
//   },
//   {
//     id: 18,
//     title: "Itaewon Halloween Meeting",
//     start: new Date(2015, 3, 14, 16, 30, 0),
//     end: new Date(2015, 3, 14, 17, 30, 0)
//   },
//   {
//     id: 19,
//     title: "Online Coding Test",
//     start: new Date(2015, 3, 14, 17, 30, 0),
//     end: new Date(2015, 3, 14, 20, 30, 0)
//   },
//   {
//     id: 20,
//     title: "An overlapped Event",
//     start: new Date(2015, 3, 14, 17, 0, 0),
//     end: new Date(2015, 3, 14, 18, 30, 0)
//   },
//   {
//     id: 21,
//     title: "Phone Interview",
//     start: new Date(2015, 3, 14, 17, 0, 0),
//     end: new Date(2015, 3, 14, 18, 30, 0)
//   },
//   {
//     id: 22,
//     title: "Cooking Class",
//     start: new Date(2015, 3, 14, 17, 30, 0),
//     end: new Date(2015, 3, 14, 19, 0, 0)
//   },
//   {
//     id: 23,
//     title: "Go to the gym",
//     start: new Date(2015, 3, 14, 18, 30, 0),
//     end: new Date(2015, 3, 14, 20, 0, 0)
//   }
// ];

import { ICalendar } from "@src/interfaces/ICalendar";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import { ICourse } from "@src/interfaces/ICourse";

const now = new Date();

const courses: ICurricularUnit[] = [
  {
    id: 1,
    name: "Computer Science",
    abbreviation: "CS",
    year: 1,
    course: [
      {
        id: 101,
        name: "Introduction to Programming",
        abbreviation: "CS101"
      },
      // ... other courses for Computer Science year 1
    ]
  },
  {
    id: 2,
    name: "Mathematics",
    abbreviation: "MATH",
    year: 2,
    course: [
      {
        id: 201,
        name: "Calculus",
        abbreviation: "MATH201"
      },
      // ... other courses for Mathematics year 2
    ]
  },
  // ... add other curricular units with their respective courses
];

const events: ICalendar[] = [
  {
    id: 0,
    name: "Event 1",
    date: new Date(2024, 1, 1),
    description: "Description for Event 1",
    place: "Event Place 1",
    curricular_unit: courses[0]
  },
  {
    id: 1,
    name: "Event 2",
    date: new Date(2024, 1, 5),
    description: "Description for Event 2",
    place: "Event Place 2",
    curricular_unit: courses[1]
  },
  {
    id: 2,
    name: "Event 3",
    date: new Date(2024, 1, 10),
    description: "Description for Event 3",
    place: "Event Place 3",
    curricular_unit: courses[2]
  },
  {
    id: 3,
    name: "Event 4",
    date: new Date(2024, 1, 15),
    description: "Description for Event 4",
    place: "Event Place 4",
    curricular_unit: courses[0]
  },
  {
    id: 4,
    name: "Event 5",
    date: new Date(2024, 1, 20),
    description: "Description for Event 5",
    place: "Event Place 5",
    curricular_unit: courses[1]
  },
  {
    id: 5,
    name: "Event 6",
    date: new Date(2024, 1, 25),
    description: "Description for Event 6",
    place: "Event Place 6",
    curricular_unit: courses[2]
  },
  {
    id: 6,
    name: "Event 7",
    date: new Date(2024, 1, 8),
    description: "Description for Event 7",
    place: "Event Place 7",
    curricular_unit: courses[0]
  },
  {
    id: 7,
    name: "Event 8",
    date: new Date(2024, 1, 12),
    description: "Description for Event 8",
    place: "Event Place 8",
    curricular_unit: courses[1]
  },
  {
    id: 8,
    name: "Event 9",
    date: new Date(2024, 1, 17),
    description: "Description for Event 9",
    place: "Event Place 9",
    curricular_unit: courses[2]
  },
  {
    id: 9,
    name: "Event 10",
    date: new Date(2024, 1, 22),
    description: "Description for Event 10",
    place: "Event Place 10",
    curricular_unit: courses[0]
  },
];

export default events;

