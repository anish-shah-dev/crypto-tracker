import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "2px solid #092A66",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: "pointer",
      backgroundColor: selected ? "#092A66" : "",
      color: "#fff",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "#092A66",
        color: "#fff",
      },
      width: "20%",
      marginLeft: 5
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;