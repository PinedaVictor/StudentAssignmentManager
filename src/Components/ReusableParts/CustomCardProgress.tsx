import React from "react";
import { Card, createMuiTheme, Grid, LinearProgress, makeStyles, responsiveFontSizes, ThemeProvider, Typography } from "@material-ui/core";
import {
  SECONDARY_COLOR,
  BORDER_COLOR,
  BORDER_COLOR_HOVER
} from "../../Styles/global";

interface Props {
    title: string;
    data: Object;
  }

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export const CustomCardProgress: React.FC<Props> = ({title, data}) => {

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

    return (
        <Card className = {classes.cardMain}>
          <Grid container direction = "column" justify = "center" alignItems = "center" spacing = {0}>

            <Grid key = {title} item xs = {12} className = {classes.header}>
              <ThemeProvider theme = {theme}>
                  <Typography variant = "h4">{title}</Typography>
              </ThemeProvider>
            </Grid>

            <Grid container direction = "row" justify = "flex-start" alignItems = "flex-start" className = {classes.contentContainer}>
                {Object.entries(data).map(([key, value], index) => (
                  <Grid container direction = "row" justify = "flex-start" alignItems = "flex-start">
                    <Grid key = {title + `-header-${key}`} item xs = {5} className = {classes.contentTitle}>
                      <ThemeProvider theme = {theme}>
                        <Typography display = "inline" variant = "h4" style = {{fontWeight: "bold", textDecoration: "underline"}}>{formatTitle(key) + ":"}</Typography>
                      </ThemeProvider>
                    </Grid>

                    <Grid key = {title + `-body-${key}`} item xs = {7} className = {classes.contentBody}>
                      <Grid container direction = "row" justify = "flex-start" alignItems = "center">
                        <Grid key = {title + `-bodybar-${index}`} item xs = {10}>
                          <LinearProgress
                          key = {title + `-muibar-${index}`}
                          className = {classes.linearBarRoot}
                          variant="determinate"
                          value={value}
                          color="secondary"
                          />
                        </Grid>

                        <Grid key = {title + `-bodyval-${index}`} item xs = {2}>
                          <ThemeProvider theme = {theme}>
                            <Typography display = "inline" variant = "h6">{value + "%"}</Typography>
                          </ThemeProvider>
                        </Grid>

                      </Grid>
                    </Grid>
                  </Grid>
                ))
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

    header: {
        display: "flex",
        width: "100%",
        padding: 12,
        justifyContent: "center"
    },

    contentContainer: {
        padding: 12
    },

    contentTitle: {
        paddingRight: 12,
        height: 25
    },

    contentBody: {
        display: "flex",
        alignContent: "center",
        width: "100%",
        padding: 0,
        height: 25
    },

    linearBarRoot: {
        height: 12,
        borderRadius: 5,
        marginRight: 10     
      }
  }))
