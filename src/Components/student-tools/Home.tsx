import React, { useState } from "react";
import { create } from "ts-style";
import { Card } from "react-bootstrap";
import { DynamicCard } from "../ReusableParts/DynamicCard";
import { CustomModal } from "../ReusableParts/CustomModal";
import { CustomTable } from "../ReusableParts/CustomTable";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { PRIMARY_COLOR } from "../../Styles/global";
import { Box } from "@material-ui/core";
import { CustomButton } from "../ReusableParts/CustomButton";

const classData = [
  {
    id: 1,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
  },
  {
    id: 2,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
  },
  {
    id: 3,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
  },
  {
    id: 4,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
  },
  {
    id: 5,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
  },
];

const assignmentsData = [
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
];

const tableColumns = [
  "Class",
  "Assignment",
  "Due By",
  "Duration",
  "Priority",
  "Section Weight",
  "Overall Weight",
];

export const Home: React.FC = () => {
  const [gradeSettingsModal, setGradeSettingsModal] = useState(false);
  const [assignmentsSettingsModal, setAssignmentsSettingsModal] = useState(
    false
  );

  function CircularProgressWithLabel(value: number) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          style={{ height: 40, borderRadius: 10 }}
          variant="determinate"
          value={value}
          color="secondary"
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <text style={{ fontSize: 12 }}>{`${Math.round(value)}%`}</text>
        </Box>
      </Box>
    );
  }

  const renderGradeSettingsModal = () => (
    <div>
      <CustomButton
        title="Close"
        onClick={() => setGradeSettingsModal(false)}
      />
    </div>
  );

  const renderAssignmentSettingsModal = () => (
    <div>
      <CustomButton
        title="Close"
        onClick={() => setAssignmentsSettingsModal(false)}
      />
    </div>
  );

  return (
    <div style={styles.pageLayout}>
      <Card style={styles.cardParent}>
        <div style={styles.cardHeader}>
          <div style={styles.buttonContainer}>
            <CustomButton
              title="Settings"
              onClick={() => setGradeSettingsModal(true)}
              size = "small"
            />

            <CustomModal
              layout={renderGradeSettingsModal()}
              modalState={gradeSettingsModal}
            />
          </div>

          <text style={styles.headerTitle}>Grades</text>
        </div>

        <Card.Body style={styles.cardBody}>
          {classData.map((item) => (
            <DynamicCard
              header={item.Name}
              bodyContents={{
                Total: CircularProgressWithLabel(item.Total),
                Homework: CircularProgressWithLabel(item.Homework),
                Exams: CircularProgressWithLabel(item.Exams),
                Projects: CircularProgressWithLabel(item.Projects),
              }}
              width={"225px"}
              type="tiny"
            />
          ))}
        </Card.Body>
      </Card>

      <Card style={styles.cardParent}>
        <div style={styles.cardHeader}>
          <div style={styles.buttonContainer}>
            <CustomButton
              title="Settings"
              onClick={() => setAssignmentsSettingsModal(true)}
              size = "small"
            />
            <CustomModal
              layout={renderAssignmentSettingsModal()}
              modalState={assignmentsSettingsModal}
            />
          </div>

          <text style={styles.headerTitle}>Assignments</text>
        </div>

        <Card.Body style={styles.cardBody}>
          <Paper
            style={{
              maxHeight: 300,
              width: "100%",
            }}
          >
            <CustomTable headerText={tableColumns} data={assignmentsData} />
          </Paper>
        </Card.Body>
      </Card>
    </div>
  );
};

const styles = create({
  pageLayout: {
    display: "grid",
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  cardParent: {
    display: "grid",
    gridTemplateRows: "40px auto",
    minWidth: 400,
    maxWidth: 1080,
    height: "auto",
    marginBottom: 50,
  },

  cardHeader: {
    display: "grid",
    gridTemplateColumns: "auto 1fr 85px",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingBottom: 15,
    backgroundColor: PRIMARY_COLOR,
    fontWeight: "bold" as "bold",
    fontSize: 24,
    color: "black",
  },

  headerTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  cardBody: {
    display: "flex",
    flexDirection: "row" as "row",
    overflowX: "scroll" as "scroll",
    marginTop: 25,
    paddingBottom: 10,
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 85,
    height: 35,
    paddingLeft: 10,
  },
});
