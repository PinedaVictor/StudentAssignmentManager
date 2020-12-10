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

    const renderBodyContent = () => (
      Object.entries(data).map(([key, value], index) => (
          <Grid container direction = "row" justify = "flex-start" alignItems = "center">
              <Grid item xs = {4}>
                <ThemeProvider theme = {theme}>
                  <Typography display = "inline" variant = "h5" style = {{fontWeight: "bold", textDecoration: "underline"}}>{formatTitle(key) + ":"}</Typography>
                </ThemeProvider>
              </Grid>

              <Grid item xs = {6}>
                <LinearProgress
                key = {title + `-muibar-${index}`}
                className = {classes.linearBarRoot}
                variant="determinate"
                value={value}
                color="secondary"
                />
              </Grid>

              <Grid item xs = {1}>
                <ThemeProvider theme = {theme}>
                  <Typography display = "inline" variant = "h6">{value + "%"}</Typography>
                </ThemeProvider>
              </Grid>

            </Grid>
        ))
    )

    return (
        <Card className = {classes.cardMain}>
          <Grid container direction = "column" justify = "flex-start" alignItems = "flex-start" style = {{padding: 12}}>

            <Grid key = {title} item xs = {12} className = {classes.header}>
              <ThemeProvider theme = {theme}>
                  <Typography variant = "h4">{title}</Typography>
              </ThemeProvider>
            </Grid>

            {renderBodyContent()}

          </Grid>
        </Card>
    )
  }

  const useStyles = makeStyles((theme) => ({
    cardMain: {
      backgroundColor: SECONDARY_COLOR,
      border: "solid 1px",
      borderColor: BORDER_COLOR,
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
        paddingBottom: 12,
        justifyContent: "center"
    },

    linearBarRoot: {
        height: 8,
        borderRadius: 5,
        marginRight: 10
      }
  }))
