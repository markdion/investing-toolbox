import { Box, Button } from "@mui/material";
import Category from "./Category";
import { useRootReducer } from "../providers/RootProvider";


export default function CategoryContainer() {

  const { state, dispatch } = useRootReducer();

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column",
      width: "100%"
    }}>
      <Button
        sx={{ margin: "1rem 0", width: "fit-content" }}
        variant="contained"
        onClick={() => dispatch({type: "addCategory" })}>
        Add Category
      </Button>
      <Box sx={{
        width: "100%"
      }}>
        {state.categories &&
          Array.from(state.categories).map(([categoryId, category], index) => (
            <Category
              key={categoryId}
              categoryId={categoryId}
              category={category}
              allCategories={
                new Map(Array.from(state.categories).filter((c) => c[0] !== categoryId))
              }
            />
          ))}
      </Box>
    </Box>
  )
}