import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const noteSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  text: z.string(),
  date: z.string().datetime(),
  read: z.boolean(),
  labels: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Note = z.infer<typeof noteSchema>;

// data:

export const mock = () => {
  const getOne = (id: string, index: number) => {
    return [
      {
        id,
        name: "William Smith",
        email: "williamsmith@example.com",
        subject: "Meeting Tomorrow",
        text:
          "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
        date: "2023-10-22T09:00:00",
        read: true,
        labels: ["meeting", "work", "important"],
      },
      {
        id,
        name: "Alice Smith",
        email: "alicesmith@example.com",
        subject: "Re: Project Update",
        text:
          "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
        date: "2023-10-22T10:30:00",
        read: true,
        labels: ["work", "important"],
      },
      {
        id,
        name: "Bob Johnson",
        email: "bobjohnson@example.com",
        subject: "Weekend Plans",
        text:
          "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.\n\nIf you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.\n\nLooking forward to your response!\n\nBest, Bob",
        date: "2023-04-10T11:45:00",
        read: true,
        labels: ["personal"],
      },
      {
        id,
        name: "Emily Davis",
        email: "emilydavis@example.com",
        subject: "Re: Question about Budget",
        text:
          "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Emily",
        date: "2023-03-25T13:15:00",
        read: false,
        labels: ["work", "budget"],
      },
      {
        id,
        name: "Michael Wilson",
        email: "michaelwilson@example.com",
        subject: "Important Announcement",
        text:
          "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments to better meet our customers' needs.\n\nThis change is crucial to our success, and I look forward to discussing it with the team. Please be prepared to share your insights during the meeting.\n\nRegards, Michael",
        date: "2023-03-10T15:00:00",
        read: false,
        labels: ["meeting", "work", "important"],
      },
      {
        id,
        name: "Sarah Brown",
        email: "sarahbrown@example.com",
        subject: "Re: Feedback on Proposal",
        text:
          "Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.\n\nI've attached the revised proposal for your review.\n\nPlease let me know if you have any further comments or suggestions. Looking forward to your response.\n\nBest regards, Sarah",
        date: "2023-02-15T16:30:00",
        read: true,
        labels: ["work"],
      },
      {
        id,
        name: "David Lee",
        email: "davidlee@example.com",
        subject: "New Project Idea",
        text:
          "I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months.\n\nI've prepared a detailed proposal outlining the potential benefits and the strategy for execution.\n\nThis project has the potential to significantly impact our business positively. Let's set up a meeting to dive into the details and determine if it aligns with our current goals.\n\nBest regards, David",
        date: "2023-01-28T17:45:00",
        read: false,
        labels: ["meeting", "work", "important"],
      },
      {
        id,
        name: "Olivia Wilson",
        email: "oliviawilson@example.com",
        subject: "Vacation Plans",
        text:
          "Let's plan our vacation for next month. What do you think? I've been thinking of visiting a tropical paradise, and I've put together some destination options.\n\nI believe it's time for us to unwind and recharge. Please take a look at the options and let me know your preferences.\n\nWe can start making arrangements to ensure a smooth and enjoyable trip.\n\nExcited to hear your thoughts! Olivia",
        date: "2022-12-20T18:30:00",
        read: true,
        labels: ["personal"],
      },
      {
        id,
        name: "James Martin",
        email: "jamesmartin@example.com",
        subject: "Re: Conference Registration",
        text:
          "I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.\n\nI've also attached the conference schedule for your reference.\n\nIf there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.\n\nBest regards, James",
        date: "2022-11-30T19:15:00",
        read: true,
        labels: ["work", "conference"],
      },
      {
        id,
        name: "Sophia White",
        email: "sophiawhite@example.com",
        subject: "Team Dinner",
        text:
          "Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication.\n\nI've made reservations at a lovely restaurant, and I'm sure it'll be an enjoyable evening.\n\nPlease confirm your availability and any dietary preferences. Looking forward to a fun and memorable dinner with the team!\n\nBest, Sophia",
        date: "2022-11-05T20:30:00",
        read: false,
        labels: ["meeting", "work"],
      },
      {
        id,
        name: "Daniel Johnson",
        email: "danieljohnson@example.com",
        subject: "Feedback Request",
        text:
          "I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track.\n\nI've attached the deliverables for your review, and I'm particularly interested in any areas where you think we can further enhance the quality or efficiency.\n\nYour feedback is invaluable, and I appreciate your time and expertise. Let's work together to make this project a success.\n\nRegards, Daniel",
        date: "2022-10-22T09:30:00",
        read: false,
        labels: ["work"],
      },
      {
        id,
        name: "Ava Taylor",
        email: "avataylor@example.com",
        subject: "Re: Meeting Agenda",
        text:
          "Here's the agenda for our meeting next week. I've included all the topics we need to cover, as well as time allocations for each.\n\nIf you have any additional items to discuss or any specific points to address, please let me know, and we can integrate them into the agenda.\n\nIt's essential that our meeting is productive and addresses all relevant matters.\n\nLooking forward to our meeting! Ava",
        date: "2022-10-10T10:45:00",
        read: true,
        labels: ["meeting", "work"],
      },
      {
        id,
        name: "William Anderson",
        email: "williamanderson@example.com",
        subject: "Product Launch Update",
        text:
          "The product launch is on track. I'll provide an update during our call. We've made substantial progress in the development and marketing of our new product.\n\nI'm excited to share the latest updates with you during our upcoming call. It's crucial that we coordinate our efforts to ensure a successful launch. Please come prepared with any questions or insights you may have.\n\nLet's make this product launch a resounding success!\n\nBest regards, William",
        date: "2022-09-20T12:00:00",
        read: false,
        labels: ["meeting", "work", "important"],
      },
      {
        id,
        name: "Mia Harris",
        email: "miaharris@example.com",
        subject: "Re: Travel Itinerary",
        text:
          "I've received the travel itinerary. It looks great! Thank you for your prompt assistance in arranging the details. I've reviewed the schedule and the accommodations, and everything seems to be in order. I'm looking forward to the trip, and I'm confident it'll be a smooth and enjoyable experience.\n\nIf there are any specific activities or attractions you recommend at our destination, please feel free to share your suggestions.\n\nExcited for the trip! Mia",
        date: "2022-09-10T13:15:00",
        read: true,
        labels: ["personal", "travel"],
      },
      {
        id,
        name: "Ethan Clark",
        email: "ethanclark@example.com",
        subject: "Team Building Event",
        text:
          "Let's plan a team-building event for our department. Team cohesion and morale are vital to our success, and I believe a well-organized team-building event can be incredibly beneficial. I've done some research and have a few ideas for fun and engaging activities.\n\nPlease let me know your thoughts and availability. We want this event to be both enjoyable and productive.\n\nTogether, we'll strengthen our team and boost our performance.\n\nRegards, Ethan",
        date: "2022-08-25T15:30:00",
        read: false,
        labels: ["meeting", "work"],
      },
      {
        id,
        name: "Chloe Hall",
        email: "chloehall@example.com",
        subject: "Re: Budget Approval",
        text:
          "The budget has been approved. We can proceed with the project. I'm delighted to inform you that our budget proposal has received the green light from the finance department. This is a significant milestone, and it means we can move forward with the project as planned.\n\nI've attached the finalized budget for your reference. Let's ensure that we stay on track and deliver the project on time and within budget.\n\nIt's an exciting time for us! Chloe",
        date: "2022-08-10T16:45:00",
        read: true,
        labels: ["work", "budget"],
      },
      {
        id,
        name: "Samuel Turner",
        email: "samuelturner@example.com",
        subject: "Weekend Hike",
        text:
          "Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails and enjoy the beauty of nature.\n\nI've done some research and have a few routes in mind.\n\nLet me know if you're interested, and we can plan the details.\n\nIt's sure to be a memorable experience! Samuel",
        date: "2022-07-28T17:30:00",
        read: false,
        labels: ["personal"],
      },
    ][index];
  };

  return getOne(ulid(), faker.number.int({ min: 0, max: 16 }));
};

// i18n:

export const I18N = {
  "id": "Employee ID",
  "name": "Name",
  "email": "Email",
  "subject": "Subject",
  "text": "Text",
  "date": "Date",
  "read": "Read",
  "labels": "Labels",
  "createdAt": "Created at",
  "updatedAt": "Updated at",
};
