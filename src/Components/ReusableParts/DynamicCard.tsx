import React from "react";
import { create } from "ts-style";
import {
  SECONDARY_COLOR,
  BORDER_COLOR,
  BUTTON_DELETE_BACKGROUND_COLOR,
  BUTTON_EDIT_BACKGROUND_COLOR,
} from "../../Styles/global";

import { CustomButton } from "./CustomButton";

interface Props {
  header: string;
  bodyContents: Object;
  width: string;
  type: "standard" | "divided" | "tiny";
  editClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

/*
Required props:
    -header:        The title at the top of the card
    -bodyTitles:    The titles for each body field.  Must be an array of strings
    -bodyContents:     The content of the fields.  Must be an array of strings
    -maxWidth:      Determines the maximum width of the entire card.  Takes in a string with values of:
                        -"auto":  Let the card be scaled by the size of the browser winder
                        -"<number>":  Give a numeric value in quotes (either as px or percent) and it will scale to that value.
    -type:          The general style of the card.  Takes a string with the values of either:
                        -"standard": Has 3 rows, with buttons at the bottom.  No dividers between the body sections.  Text is on the same line as the headers.
                        -"divided": Has 3 rows, with buttons at the bottom.  Has dividers between the body sections.  Text starts on a line below the headers.  Headers are centered.
*/
export const DynamicCard: React.FC<Props> = ({
  header,
  bodyContents,
  width,
  type,
  editClick,
  deleteClick,
}) => {
  const formatTitle = (title: string) => {
    if (title !== null && title !== undefined) {
      var words = title.split(/(?=[A-Z])/);

      var index = 0;

      for (index; index < words.length; index++) {
        words[index] =
          words[index].charAt(0).toUpperCase() + words[index].slice(1);
      }

      return words.join(" ");
    }
  };

  const checkForObject = (index: number, item: (string | number) | Object) => {
    if (typeof item === "string" || item instanceof String)
      return item.toString();
    else if (typeof item === "number" || item instanceof Number)
      return item.toString() + "%";
    else {
      return (
        <div
          style={{
            borderBottom: "solid 1px black",
            borderTop: "solid 1px black",
            marginTop: 10,
            marginBottom: 10,
            width: "100%",
          }}
        >
          {Object.entries(item).map(([key, value], index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row" as "row",
              }}
            >
              <text
                style={{
                  fontSize: 18,
                  fontWeight: "bold" as "bold",
                }}
              >
                {formatTitle(key)}
              </text>
              :
              <text
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                {value}
                {(typeof value === "number" || value instanceof Number) && "%"}
              </text>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderBody = () =>
    Object.entries(bodyContents).map(([key, value], index) =>
      type === "divided" ? (
        <div style={styles.bodyDividerStyle}>
          <div style={styles.bodyTitle}>{formatTitle(key)}</div>

          <div style={styles.bodyContent}>{checkForObject(index, value)}</div>
        </div>
      ) : type === "standard" ? (
        <div style={styles.bodyStandardStyle}>
          <div style={{ display: "flex", flexDirection: "row" as "row" }}>
            <text>
              <text style={styles.bodyTitle}>{formatTitle(key)}:</text>
              <text style={{ fontSize: 16 }}>
                {checkForObject(index, value)}
              </text>
            </text>
          </div>
        </div>
      ) : (
        <div style={styles.bodyStandardStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "row" as "row",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <div style={styles.bodyTitle}>{formatTitle(key)}:</div>
            <div style={{ fontSize: 16 }}>{value}</div>
          </div>
        </div>
      )
    );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows:
          type === "standard" || type === "divided"
            ? "30px auto 40px"
            : "30px auto",
        minWidth: width !== "auto" ? width : window.innerWidth / 5,
        maxWidth: width !== "auto" ? width : window.innerWidth / 5,
        margin: 10,
        border: "solid",
        borderWidth: 2,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        backgroundColor: SECONDARY_COLOR,
      }}
    >
      <div style={styles.cardTitle}>{header}</div>

      <div>{renderBody()}</div>

      {(type === "standard" || type === "divided") && (
        <div
          style={{
            display: "flex",
            height: 35,
            justifyContent: "center",
            width: "auto",
          }}
        >
          <CustomButton
            dimensions={{
              width: 70,
              height: 30,
              marginRight: 25,
            }}
            onClick={
              editClick !== undefined && editClick !== null
                ? editClick
                : () => {}
            }
            theme="edit"
            title="Edit"
          />

          <CustomButton
            dimensions={{
              width: 70,
              height: 30,
            }}
            onClick={
              deleteClick !== undefined && deleteClick !== null
                ? deleteClick
                : () => {}
            }
            theme="delete"
            title="Delete"
          />
        </div>
      )}
    </div>
  );
};

const styles = create({
  cardTitle: {
    textAlign: "center" as "center",
    fontWeight: "bold" as "bold",
    fontSize: 26,
    minWidth: 150,
    maxWidth: "auto",
  },

  bodyDividerStyle: {
    display: "grid",
    alignText: "center",
    justifyContent: "center",
    borderTop: "solid black",
    borderWidth: 1,
    minWidth: 100,
    maxWidth: "auto",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },

  bodyStandardStyle: {
    display: "grid",
    verticalAlign: "center",
    minWidth: 150,
    maxWidth: "auto",
    maxHeight: "auto",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },

  bodyTitle: {
    fontWeight: "bold" as "bold",
    textDecorationLine: "underline",
    fontSize: 22,
    marginRight: 10,
  },

  bodyContent: {
    fontSize: 20,
  },

  button: {
    display: "flex",
    alignitems: "center",
    justifyContent: "center",
    height: 30,
    width: 70,
    padding: 0,
    marginRight: 20,
    marginLeft: 20,
    border: "solid black",
    borderWidth: 2,
    borderRadius: 3,
    color: "white",
    fontWeight: "bold" as "bold",
    fontSize: 16,
  },

  buttonEdit: {
    backgroundColor: BUTTON_EDIT_BACKGROUND_COLOR,
  },

  buttonDelete: {
    backgroundColor: BUTTON_DELETE_BACKGROUND_COLOR,
  },
});
