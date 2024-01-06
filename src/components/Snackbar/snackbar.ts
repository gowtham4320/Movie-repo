export function snackBar(status: string) {
  let x = document.getElementsByClassName("snackbar")[0];

  x!.className = "snackbar show " + status;

  setTimeout(() => {
    x!.className = x!.className.replace("snackbar show " + status, "snackbar");
  }, 3500);
}
