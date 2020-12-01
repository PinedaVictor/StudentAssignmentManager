import React, { useState } from "react";
import { Card, CardContent, CardHeader, createMuiTheme, Grid, IconButton, makeStyles, responsiveFontSizes, ThemeProvider, Typography } from "@material-ui/core";
import {
  SECONDARY_COLOR,
  BORDER_COLOR,
  BORDER_COLOR_HOVER,
  BUTTON_DELETE_BACKGROUND_COLOR,
  BUTTON_EDIT_BACKGROUND_COLOR,
  ICON_BORDER,
  ICON_BORDER_HOVER,
} from "../../Styles/global";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

interface Props {
    title: string;
    data: Object;
    expandingData?: Object;
    editClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    deleteClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export const CustomCardStandard: React.FC<Props> = ({
    title,
    data,
    expandingData,
    editClick,
    deleteClick,
  }) => {

    const classes = useStyles()
    const [expandState, setExpandState] = useState(false);

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
              <Typography display = "inline" variant = "h4" style = {{fontWeight: "bold", textDecoration: "underline"}}>{formatTitle(key) + ":"}</Typography>
              <Typography display = "inline" variant = "h4">{"  " + value}</Typography>
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
                      key = {title + `-bodycontainer${fieldKey}`}
                      item
                      xs = {6}
                      style = {{paddingTop: 8}}
                      >
                        {
                          <ThemeProvider theme = {theme}>
                            <Typography display = "inline" variant = "h5" style = {{fontWeight: "bold"}}>{formatTitle(fieldKey) + ":"}</Typography>
                            <Typography display = "inline" variant = "h5" style = {{fontWeight: "bold"}}>{"  " + fieldVal}</Typography>
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
          direction = "column"
          justify = "center"
          alignItems = "center"
          >
            <Grid container direction = "row" alignItems = "center" justify = "center" style = {{padding: 18}}>
              
              <Grid key = {title + "EditIcon"} item xs = {1}>
                <IconButton className = {classes.iconButtonRoot} onClick = {editClick}>
                  <EditIcon
                  className = {classes.iconRoot}
                  style={{color: BUTTON_EDIT_BACKGROUND_COLOR }}
                  />
                </IconButton>
              </Grid>
              
              <Grid key = {title + "header"} item xs = {10}>
                <CardHeader
                className = {classes.cardMainHeader}
                title = {
                  <ThemeProvider theme = {theme}>
                    <Typography variant = "h3">{title}</Typography>
                  </ThemeProvider>
                }
                />
              </Grid>
              
              <Grid key = {title + "DeleteIcon"} item xs = {1}>
                <IconButton className = {classes.iconButtonRoot} onClick = {deleteClick}>
                  <DeleteIcon
                  className = {classes.iconRoot}
                  style={{color: BUTTON_DELETE_BACKGROUND_COLOR }}
                  />
                </IconButton>
              </Grid>

            </Grid>
            
            <Grid container direction = "column">
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
                        key = {title + `-bodyGrid-${index}`}
                        item
                        xs = {12}
                        className = {classes.cardContentsInner}
                        >
                          {checkDataType(key, value)}
                        </Grid>
                      ))
                    }
                  </Grid>
                  
                }

                {((expandingData !== undefined && expandingData !== null) && expandState === true) &&
                  <Grid
                  container
                  direction = "row"
                  spacing = {1}
                  justify = "center"
                  alignItems = "center"
                  >
                    {
                      Object.entries(expandingData).map(([key, value], index) => (
                        <Grid
                        key = {title + `-extraGrid-${index}`}
                        item
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

            <Grid key = {title + "expandIconContainer"} item xs = {12}>
            {(expandingData !== undefined) && (
              (expandState === false) ? 
              
              <IconButton  className = {classes.iconButtonRoot} onClick = {() => setExpandState(true)}>
                <ExpandMoreIcon 
                className = {classes.expandIconRoot}
                style={{color: BUTTON_EDIT_BACKGROUND_COLOR }}/>
              </IconButton>
              
              :
              <IconButton  className = {classes.iconButtonRoot} onClick = {() => setExpandState(false)}>
                <ExpandLessIcon 
                className = {classes.expandIconRoot}
                style={{color: BUTTON_EDIT_BACKGROUND_COLOR }}/>
              </IconButton>
              )
            }
            </Grid>
            
          </Grid>
        </Card>
    )
  }

  const useStyles = makeStyles((theme) => ({
    cardMain: {
      backgroundColor: SECONDARY_COLOR,
      border: "solid 1px",
      borderColor: BORDER_COLOR,
      height: "100%",
      width: "100%",
      color: "white",

      "&:hover": {
        transition: "all .35s ease",
        border: "solid 1px",
        borderColor: BORDER_COLOR_HOVER,
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
      backgroundColor: "#454545",
      boxShadow: "none",
      color: "white"
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
    },

    iconButtonRoot: {
      padding: 0,
      margin: 0,
    },

    iconRoot: {
      width: "1.8em", 
      height: "1.8em",
      stroke: ICON_BORDER,
      strokeWidth: "0.75",
      opacity: 0.75,

      '&:hover': {
        opacity: 1,
        width: "2em",
        height: "2em",
        stroke: ICON_BORDER_HOVER,
        strokeWidth: "0.75",
      }
    },

    expandIconRoot: {
      width: "4em", 
      height: "4em",
      stroke: ICON_BORDER,
      strokeWidth: "0.75",
      opacity: 0.75,

      '&:hover': {
        opacity: 1,
        width: "4.3em",
        height: "4.3em",
        stroke: ICON_BORDER_HOVER,
        strokeWidth: "0.75",
      }
    }
  }))
