import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { create } from "ts-style";

interface EditableText {
  text: string;
  type: string;
  placeholder: string;
  childref: React.MutableRefObject<any>;
  style: React.CSSProperties;
  saveText: () => void;
}

export const Editable: React.FC<EditableText> = (props) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (props.childref && props.childref.current && isEditing === true) {
      props.childref.current.focus();
      console.log("FOcused", props.childref.current);
    }
  }, [isEditing, props.childref]);

  const handleKeyDown = (event: any, type: any) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      console.log("preseed enter key", props.childref);
      props.saveText();
      console.log("Setting the editing state");
      setEditing(false);
    }
  };

  const handleSaveButton = () => {
    props.saveText();
    setEditing(false);
  };

  return (
    <section style={props.style}>
      {isEditing ? (
        <div onKeyDown={(e) => handleKeyDown(e, props.type)}>
          {props.children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{props.text || props.placeholder || "Editable content"}</span>
        </div>
      )}
    </section>
  );
};

const styles = create({
  buttonGroup: {},
  button: {
    width: "30px",
    height: "30px",
    borderRadius: "50px",
    backgroundColor: "blue",
    borderWidth: "1.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
  },
});
