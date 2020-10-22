import React from "react";
import {DynamicCard}  from "../ReusableParts/DynamicCard";
import { create } from "ts-style";

export const Courses: React.FC = () => {

  const cardTitles = ["Phil 101", "Comp 356", "Meh zzz", "Rand 555", "bleh 100", "phys 220a", "abc 123", "def 456"]

  const sectionTitles = ["Email", "Office Hours", "Late Work Policy", "Grading Scale", "Homework Weight", "Project Weight", "Exam Weight", "Quiz Weight"]

  const cardBodyData = [
    [
      "someguy@gmail.com", 
      "T/Th 3:00pm - 4:30pm dfghdfhdhhrthdrhdr dfghdfbsghd dgbdfesg", 
      "-20% off each day", 
      "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
      "20% (10 total)", 
      "30% (3 total)", 
      "40% (2 total)", 
      "10% (5 total)"
    ],
    [
      "someguy@gmail.com", 
      "T/Th 3:00pm - 4:30pm", 
      "-20% off each day", 
      "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
      "20% (10 total)", 
      "30% (3 total)", 
      "40% (2 total)", 
      "10% (5 total)"
    ],
    [
      "someguy@gmail.com", 
      "T/Th 3:00pm - 4:30pm", 
      "-20% off each day", 
      "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
      "20% (10 total)", 
      "30% (3 total)", 
      "40% (2 total)", 
      "10% (5 total)"
    ],
    [
      "someguy@gmail.com", 
      "T/Th 3:00pm - 4:30pm", 
      "-20% off each day", 
      "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
      "20% (10 total)", 
      "30% (3 total)", 
      "40% (2 total)", 
      "10% (5 total)"
    ],
    [
      "someguy@gmail.com", 
      "T/Th 3:00pm - 4:30pm", 
      "-20% off each day", 
      "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
      "20% (10 total)", 
      "30% (3 total)", 
      "40% (2 total)", 
      "10% (5 total)"
    ],
    [
      "someguy@gmail.com", 
      "T/Th 3:00pm - 4:30pm", 
      "-20% off each day", 
      "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
      "20% (10 total)", 
      "30% (3 total)", 
      "40% (2 total)", 
      "10% (5 total)"
    ],
    [
      "someguy@gmail.com", 
      "T/Th 3:00pm - 4:30pm", 
      "-20% off each day", 
      "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
      "20% (10 total)", 
      "30% (3 total)", 
      "40% (2 total)", 
      "10% (5 total)"
    ],
    [
      "someguy@gmail.com", 
      "T/Th 3:00pm - 4:30pm", 
      "-20% off each day", 
      "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
      "20% (10 total)", 
      "30% (3 total)", 
      "40% (2 total)", 
      "10% (5 total)"
    ]
  ]

  return (
    <div style = {styles.pageStyle}>
      {cardBodyData.map((item, i) => (
        <DynamicCard
        header={cardTitles[i]}
        bodyTitles={sectionTitles}
        bodyContents={item}
        width={"auto"}
        type="standard"
        /> 
      ))}
      
    </div>
  );
};

const styles = create({
  pageStyle: {
  display: 'flex',
  flexDirection: "row" as "row",
  verticalAlign: 'center',
  alignItems: 'left',
  justifyContent: 'left',
  width: "90%",
  height: "90%",
  paddingTop: 50,
  overflowX: "scroll" as "scroll"
  }
})