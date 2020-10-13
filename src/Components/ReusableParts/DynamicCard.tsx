import React from "react";
import { Button } from "react-bootstrap";
import { create } from "ts-style";
import { SECONDARY_COLOR , BORDER_COLOR , DELETE_BACKGROUND_COLOR , EDIT_BACKGROUND_COLOR } from "../../Styles/global";


/*
Required props:
    -header:        The title at the top of the card
    -hasDividers:   Whether the card format will have horizontal dividers between fields.  Either true or false
    -bodyTitles:    The titles for each body field.  Must be an array of strings
    -bodyTexts:     The content of the fields.  Must be an array of strings
    -maxWidth:      Determines the maximum width of the entire card.  Takes in a string with values of:
                        -"auto":  Let the card be scaled by the size of the browser winder
                        -"<number>":  Give a numeric value in quotes (either as px or percent) and it will scale to that value.
*/
const DynamicCard = (props: any) => {

    const renderBody = () => (
    props.bodyTitles.map((title: string, index: number) => (

    (props.hasDividers) ?

    <div style = {styles.bodyDividerStyle}>
        <div style = {styles.bodyTitle}>
            {title}
        </div>  

        <div style = {styles.bodyText}>
            {props.bodyTexts[index]}
        </div>
    </div>

     :
    
    <div style = {styles.bodyStandardStyle}>
        <text style = {styles.bodyTitle}>
            {title}:
        </text>  

        <text style = {styles.bodyText}>
            {"  " + props.bodyTexts[index]}
        </text>
    </div>

    ))
    )

    const renderButton = (type: string) => {
        var backColor;
        
        if(type === "delete")
            backColor = DELETE_BACKGROUND_COLOR;

        else if (type === "edit")
         backColor = EDIT_BACKGROUND_COLOR;

        else backColor = "#000000"

        return {
            display: 'flex',
            alignitems: 'center',
            justifyContent: 'center',
            height: 30,
            width: 70,
            padding: 0,
            marginRight: 20,
            marginLeft: 20,
            backgroundColor: backColor,
            border: 'solid black',
            borderWidth: 2,
            borderRadius: 3,
            color: 'white',
            fontWeight: 'bold' as 'bold',
            fontSize: 16
        }
    }

    const getScaledCardWidth = () => {

        if(props.maxWidth !== "auto")
            return props.maxWidth;

        if (window.innerWidth < 350)
            return 300;

        else if (window.innerWidth >= 350 && window.innerWidth < 550)
            return window.innerWidth / 2;

        else if (window.innerWidth >= 550 && window.innerWidth < 750)
            return window.innerWidth / 2.5;

        else return window.innerWidth / 6;
    }

    return (
      <div
      style={{
        display: 'grid',
        gridTemplateRows: "30px auto 40px",
        minWidth: getScaledCardWidth(),
        maxWidth: getScaledCardWidth(),
        margin: 10,
        border: 'solid',
        borderWidth: 2,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        backgroundColor: SECONDARY_COLOR
      }}
      >
        <div style = {styles.cardTitle}>
            {props.header}
        </div>

        <div>
            {renderBody()}
        </div>

        <div style = {{display: 'flex', height:35, justifyContent: 'center', width: "auto"}}>
            <Button style = {renderButton("delete")}>
                Delete
            </Button>

            <Button style = {renderButton("edit")}>
                Edit
            </Button>
        </div>

      </div>
    );
  };

const styles = create({
    cardTitle: {
        textAlign: 'center' as 'center', 
        fontWeight: 'bold' as 'bold',
        fontSize: 22,
        minWidth: 150,
        maxWidth: "auto"
    },

    bodyDividerStyle: {
        display: 'grid',
        alignText: 'center',
        justifyContent: 'center',
        borderTop: 'solid black',
        borderWidth: 1,
        minWidth: 100,
        maxWidth: "auto",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },

    bodyStandardStyle: {
        minWidth: 150,
        maxWidth: "auto",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    }, 

    bodyTitle: {
        fontWeight: 'bold' as 'bold',
        textDecorationLine: 'underline',
        fontSize: 18
    },

    bodyText: {
        fontSize: 16
    },
})

export default DynamicCard