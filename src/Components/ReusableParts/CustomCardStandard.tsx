import React from "react";
import { create } from "ts-style";
import { Button, Card, CardActions, CardContent, CardHeader, createMuiTheme, Grid, makeStyles, responsiveFontSizes, ThemeProvider, Typography } from "@material-ui/core";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  BORDER_COLOR,
  BUTTON_DELETE_BACKGROUND_COLOR,
  BUTTON_EDIT_BACKGROUND_COLOR,
} from "../../Styles/global";
import { CustomButton } from "./CustomButton";

interface Props {
    title: string;
    data: Object;
    editClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    deleteClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export const CustomCardStandard: React.FC<Props> = ({
    title,
    data,
    editClick,
    deleteClick,
  }) => {

    const classes = useStyles()

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

    const checkDataType = (key: string, value: (string | number) | Object) => {

      if((typeof value === "string" || value instanceof String) || (typeof value === "number" || value instanceof Number)){
        return (
          <div>
            <ThemeProvider theme = {theme}>
              <Typography display = "inline" variant = "h4">{formatTitle(key) + ":"}</Typography>
              <Typography display = "inline" variant = "h5">{"  " + value}</Typography>
            </ThemeProvider>
          </div>
        )
      }

      else {
        return (
          <Card className = {classes.cardInner}>
            <CardHeader
            className = {classes.cardInnerHeader}
            title = {
              <ThemeProvider theme = {theme}>
                <Typography variant = "h4">{formatTitle(key)}</Typography>
              </ThemeProvider>
            }
            />
            <CardContent>
              {
                <Grid
                container
                direction = "row"
                spacing = {2}
                >
                  {
                    Object.entries(value).map(([fieldKey, fieldVal]) => (
                      <Grid
                      xs = {6}
                      style = {{paddingTop: 8}}
                      >
                        {
                          <ThemeProvider theme = {theme}>
                            <Typography display = "inline" variant = "h5">{formatTitle(fieldKey) + ":"}</Typography>
                            <Typography display = "inline" variant = "h5">{"  " + fieldVal}</Typography>
                          </ThemeProvider>
                        }
                      </Grid>
                    ))
                  }
                </Grid>
              }
            </CardContent>
          </Card>
        )
      }
    }

    return (
        <Card className = {classes.cardMain}>
          <Grid
          container
          direction = "row"
          justify = "center"
          alignItems = "center"
          style = {{height: "100%"}}
          >
            <Grid item alignItems = "center" justify = "center">
              <CardHeader
              className = {classes.cardMainHeader}
              title = {
                <ThemeProvider theme = {theme}>
                  <Typography variant = "h3" >{title}</Typography>
                </ThemeProvider>
              }
              />
            </Grid>
            
            <Grid item>
              <CardContent>
                {
                  <Grid
                  container
                  direction = "row"
                  spacing = {1}
                  justify = "center"
                  alignItems = "center"
                  >
                    {
                      Object.entries(data).map(([key, value], index) => (
                        <Grid
                        xs = {12}
                        className = {classes.cardContentsInner}
                        >
                          {checkDataType(key, value)}
                        </Grid>
                      ))
                    }
                  </Grid>
                  
                }
              </CardContent>
            </Grid>
            
            <Grid container direction = "row" alignContent = "center" justify = "space-evenly" style = {{paddingBottom: 12}}>
                <CustomButton
                title = "Edit"
                onClick = {editClick}
                theme = "edit"
                />

                <CustomButton
                title = "Delete"
                onClick = {deleteClick}
                theme = "delete"
                />
            </Grid>

          </Grid>
        </Card>
    )
  }

  const useStyles = makeStyles((theme) => ({
    cardMain: {
      backgroundColor: SECONDARY_COLOR,
      boxShadow: "4px 4px 4px rgba(0,0,0,0.3)",
      border: "solid 1px",
      borderColor: PRIMARY_COLOR,
      height: "100%",
      width: "100%",

      "&:hover": {
        boxShadow: "6px 6px 6px rgba(0,0,0,0.4)",
        transition: "all .35s ease",
        backgroundColor: "#add8ff",
        border: "solid 1px",
        borderColor: "#1da1f0",
      }
    },

    cardMainHeader: {
      justifyContent: "center",
      textAlign: "center",
      marginLeft: 12,
      marginTop: 12,
      marginRight: 12,
      marginBottom: 0,
      padding: 0
    },

    cardInner: {
      marginTop: 15,
      marginBotton: 15,
      backgroundColor: "#c2e2ff",
      boxShadow: "none"
    },

    cardContentsInner: {
      marginLeft: 12,
      marginTop: 5,
      marginRight: 10,
      marginBottom: 0
    },

    cardInnerHeader: {
      justifyContent: "center",
      textAlign: "center",
      paddingLeft: 12,
      paddingTop: 8,
      paddingBottom: 0
    }
  }))
