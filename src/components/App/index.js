import React from "react"
import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  StylesProvider
} from "@material-ui/core"
import green from "@material-ui/core/colors/green"
import blue from "@material-ui/core/colors/blue"
import Main from "components/Main"
import { upperCase } from "libraries/util"
import useLogic from "./useLogic"

const INCLUDED_KEYS = /palettePrimary/

function App() {
  const { update, handleClose } = useLogic(style)

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Dialog onClose={handleClose} open={!!update}>
          <DialogTitle>Nueva versión disponible</DialogTitle>

          <DialogContent>
            <DialogContentText>Pulsa "Actualizar" para aplicar los cambios</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancelar</Button>
            <Button onClick={handleClose} data-confirm color="primary">Actualizar</Button>
          </DialogActions>
        </Dialog>

        <Main />
      </MuiThemeProvider>
    </StylesProvider>
  )
}

function getStyle(value, path) {
  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [key, entry]) => {
      const style = getStyle(entry, path ? `${path}${upperCase(key)}` : key)
      return style ? acc + style : acc
    }, "")
  } else if (INCLUDED_KEYS.test(path)) {
    return `--${path}:${value};`
  }
}

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: green,
    secondary: blue,
  },
})

const style = `:root{${getStyle(theme)}}`

export default App